from celery import Celery
from app.simulation import run_simulation
from app.openai_client import get_insight
from app.db import store_result
import os
from dotenv import load_dotenv

load_dotenv()

celery = Celery(
    "worker",
    broker=os.getenv("REDIS_URL"),
    backend=os.getenv("REDIS_URL"),
)

@celery.task(bind=True)
def run_simulation_task(self, input_data):
    job_id = self.request.id
    metrics = run_simulation(input_data)
    insight = get_insight(metrics)
    store_result(job_id, metrics, insight)
    return {"job_id": job_id, "metrics": metrics, "insight": insight, "status": "completed"}
