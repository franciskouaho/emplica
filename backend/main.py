import os
import aioredis

from fastapi import FastAPI, Request, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

from backend.compagnies import get_focused_jobs
from backend.download_files import process_files_from_bucket
from backend.matching_score import match_cv_to_job
from backend.pdf_to_json import pdf_to_json
from backend.s3_config import get_s3_client
from backend.sql_app.database import Base, engine, SessionLocal
from backend.sql_app.jobs.save_jobs_to_database import get_jobs_from_database
from backend.auth_utils import verify_password, get_password_hash

from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from backend.sql_app.models.user import User
from backend.auth_utils import get_db

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://backend.localhost",
    "http://emplica.fr:3000",
    "http://api.emplica.fr/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

redis_client = aioredis.from_url("redis://redis:6379", decode_responses=True)

SESSION_SECRET_KEY = "eazkeazgvegazcgecazkhgcehkgcazhgczge"
serializer = URLSafeTimedSerializer(SESSION_SECRET_KEY)


class SignupRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


from fastapi.responses import JSONResponse


@app.get("/")
async def health():
    return {"status": "ok"}


@app.post("/token")
async def login(login_request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_request.email).first()
    if not user or not verify_password(login_request.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email ou mot de passe")

    session_token = serializer.dumps(user.username)

    print(f"Setting session token: {session_token}")

    await redis_client.set(session_token, user.username, ex=3600)

    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=False,
        samesite="lax",
        domain=".localhost",
        max_age=3600,
        expires=3600
    )

    return response


@app.get("/auth")
async def auth(request: Request):
    print(f"Request cookies: {request.cookies}")
    session_token = request.cookies.get("session_token")
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        username = await redis_client.get(session_token)
        print(f"Username: {username}")
        if not username:
            raise HTTPException(status_code=401, detail="Session token has expired, please log in again.")
    except (BadSignature, SignatureExpired):
        raise HTTPException(status_code=401, detail="Invalid session token, please log in again.")

    response = JSONResponse(content={"message": "Authenticated"})
    response.headers["X-User"] = username
    return response


@app.post("/signup")
async def signup(signup_request: SignupRequest, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(signup_request.password)
    user = User(username=signup_request.username, email=signup_request.email, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "User created successfully"}


@app.get("/users/me")
async def read_users_me(request: Request, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    session_token = request.cookies.get("session_token")
    if not session_token:
        raise credentials_exception

    try:
        username = await redis_client.get(session_token)
        if not username:
            raise credentials_exception
    except (BadSignature, SignatureExpired):
        raise credentials_exception

    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception

    return user


@app.get("/get_companies")
async def companies():
    get_focused_jobs()
    return {"companies": "ok"}


@app.get("/get_jobs")
async def jobs():
    db = SessionLocal()
    jobs_data = get_jobs_from_database(db)
    db.close()
    return jobs_data


@app.get("/process_files_from_bucket")
async def save_to_database():
    process_files_from_bucket()
    return {"files": "ok"}


@app.post('/match')
async def match(cv_file: UploadFile = File(...), job_name: str = Form(...)):
    print(f"Matching CV to job: {job_name}")
    try:
        s3 = get_s3_client()
        cv_key = f'{cv_file.filename}'
        job_key = f'{job_name}.json'

        try:
            s3.head_object(Bucket='jobpilot', Key=cv_key)
            cv_exists = True
        except s3.exceptions.ClientError as e:
            if e.response['Error']['Code'] == '404':
                cv_exists = False
            else:
                raise

        if not cv_exists:
            cv_path = f"/tmp/{cv_file.filename}"
            with open(cv_path, "wb") as f:
                f.write(cv_file.file.read())

            if not os.path.exists(cv_path):
                raise Exception("CV file not found after writing to disk")

            with open(cv_path, "rb") as f:
                s3.put_object(Bucket='jobpilot', Key=cv_key, Body=f)

        job_obj = s3.get_object(Bucket='jobpilot', Key=job_key)
        job_content = job_obj['Body'].read().decode('utf-8')

        if not cv_exists:
            cv_json = pdf_to_json(cv_path)
        else:
            cv_obj = s3.get_object(Bucket='jobpilot', Key=cv_key)
            cv_path = f"/tmp/{cv_file.filename}"
            with open(cv_path, "wb") as f:
                f.write(cv_obj['Body'].read())
            cv_json = pdf_to_json(cv_path)

        result = match_cv_to_job(cv_json, job_content)

        return result

    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        if not cv_exists and os.path.exists(cv_path):
            os.remove(cv_path)
