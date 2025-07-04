import os
from sqlalchemy import create_engine, Column, String, JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class SimulationJob(Base):
    __tablename__ = "simulation_jobs"
    job_id = Column(String, primary_key=True, index=True)
    status = Column(String)
    metrics = Column(JSON)
    insight = Column(String)

def store_result(job_id, metrics, insight):
    db = SessionLocal()
    job = SimulationJob(job_id=job_id, status="completed", metrics=metrics, insight=insight)
    db.merge(job)
    db.commit()
    db.close()

def get_result_by_job_id(job_id):
    db = SessionLocal()
    job = db.query(SimulationJob).filter(SimulationJob.job_id == job_id).first()
    db.close()
    if not job:
        return None
    return {
        "job_id": job.job_id,
        "status": job.status,
        "metrics": job.metrics,
        "insight": job.insight,
    }
