from sqlalchemy.orm import Session
from backend.sql_app.models.company import Company

def get_jobs_from_database(db: Session):
    return db.query(Company).all()
