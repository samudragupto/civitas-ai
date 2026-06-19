from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, ConfigDict
from app.models.simulation import ScenarioType
from app.schemas.forecast import StructuredForecastOutput

class SimulationBase(BaseModel):
    title: str
    description: Optional[str] = None
    scenario_type: ScenarioType = ScenarioType.realistic
    ai_advancement: int = 50
    climate_action: int = 50
    global_stability: int = 50
    population_growth: int = 50
    energy_innovation: int = 50
    space_investment: int = 50
    automation_adoption: int = 50
    education_quality: int = 50
    healthcare_innovation: int = 50

class SimulationCreate(SimulationBase):
    pass

class SimulationResponse(SimulationBase):
    id: int
    user_id: int
    results: Optional[StructuredForecastOutput] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class SimulationSummaryResponse(SimulationBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
