from fastapi import APIRouter, HTTPException
from app.schemas import SimulationInput, SimulationResult
from app.celery_worker import run_simulation_task
from app.db import get_result_by_job_id

router = APIRouter()

@router.post("/simulate")
def simulate(input: SimulationInput):
    job = run_simulation_task.delay(input.dict())
    return {"job_id": job.id}

@router.get("/results/{job_id}", response_model=SimulationResult)
def get_results(job_id: str):
    result = get_result_by_job_id(job_id)
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    return result
