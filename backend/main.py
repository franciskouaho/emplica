import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.compagnies import get_focused_jobs
from backend.download_files import process_files_from_bucket
from backend.matching_score import match_cv_to_job
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


@app.get('/match')
async def match(cv_path: str = 'backend/cv.json', job_path: str = 'backend/fiche_poste.json'):
    try:
        if not os.path.exists(cv_path):
            return {"error": f"File not found: {cv_path}"}, 404
        if not os.path.exists(job_path):
            return {"error": f"File not found: {job_path}"}, 404

        result = match_cv_to_job(cv_path, job_path)
        return result
    except Exception as e:
        return {"error": str(e)}, 500
