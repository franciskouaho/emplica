import os

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from backend.compagnies import get_focused_jobs
from backend.download_files import process_files_from_bucket
from backend.matching_score import match_cv_to_job
from backend.pdf_to_json import pdf_to_json
from backend.s3_config import get_s3_client
from backend.sql_app.database import Base, engine, SessionLocal
from backend.sql_app.jobs.save_jobs_to_database import get_jobs_from_database

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


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

        # Check if CV file already exists in the bucket
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
                return {"error": f"File not found: {cv_path}"}, 404

            with open(cv_path, "rb") as f:
                s3.put_object(
                    Bucket='jobpilot',
                    Key=cv_key,
                    Body=f
                )

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
