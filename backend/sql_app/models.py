# models.py
from sqlalchemy import Column, String, Float, Date
from sqlalchemy.dialects.postgresql import UUID
import uuid

from backend.sql_app.database import Base


class Company(Base):
    __tablename__ = "company"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name_company = Column(String, index=True)
    name_job = Column(String, index=True)
    salary_minimum = Column(Float)
    salary_maximum = Column(Float)
    published_at_date = Column(Date)
    city = Column(String)
    benefits = Column(String)
    profile = Column(String)
    highlight_result = Column(String)
    slug = Column(String)
