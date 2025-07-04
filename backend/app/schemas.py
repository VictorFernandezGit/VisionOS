from pydantic import BaseModel
from typing import Optional, Dict

class SimulationInput(BaseModel):
    traffic: int
    cpc: float
    conversion_rate: float
    price: float
    churn: float
    # Add more fields as needed

class SimulationResult(BaseModel):
    job_id: str
    status: str
    metrics: Dict[str, float]
    insight: Optional[str]
