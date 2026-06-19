from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models.user import User, UserRole
from app.models.simulation import Simulation, ScenarioType
from app.schemas.simulation import SimulationCreate, SimulationResponse, SimulationSummaryResponse
from app.schemas.forecast import StructuredForecastOutput
from app.services.forecasting.engine import generate_complete_forecast
from app.api.deps import get_current_active_user, get_current_registered_user

router = APIRouter()

@router.post("/demo", response_model=StructuredForecastOutput)
async def run_demo_simulation(
    scenario: ScenarioType = Query(ScenarioType.realistic, description="Scenario typology"),
    ai_advancement: int = Query(65, ge=0, le=100),
    climate_action: int = Query(55, ge=0, le=100),
    energy_innovation: int = Query(70, ge=0, le=100),
    space_investment: int = Query(60, ge=0, le=100)
) -> Any:
    """
    Public demo simulation accessible for Guest users and frontend previews.
    """
    sliders = {
        "ai_advancement": ai_advancement,
        "climate_action": climate_action,
        "global_stability": 50,
        "population_growth": 50,
        "energy_innovation": energy_innovation,
        "space_investment": space_investment,
        "automation_adoption": 60,
        "education_quality": 50,
        "healthcare_innovation": 60
    }
    result = await generate_complete_forecast(sliders, scenario, enhance_with_ai=False)
    return result


@router.post("/", response_model=SimulationResponse, status_code=status.HTTP_201_CREATED)
async def create_simulation(
    sim_in: SimulationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_registered_user)
) -> Any:
    """
    Create and execute a production civilization simulation.
    """
    sliders = {
        "ai_advancement": sim_in.ai_advancement,
        "climate_action": sim_in.climate_action,
        "global_stability": sim_in.global_stability,
        "population_growth": sim_in.population_growth,
        "energy_innovation": sim_in.energy_innovation,
        "space_investment": sim_in.space_investment,
        "automation_adoption": sim_in.automation_adoption,
        "education_quality": sim_in.education_quality,
        "healthcare_innovation": sim_in.healthcare_innovation
    }
    
    forecast_res = await generate_complete_forecast(
        sliders=sliders,
        scenario_type=sim_in.scenario_type,
        enhance_with_ai=True if current_user.role in [UserRole.researcher, UserRole.admin] else False
    )
    
    new_sim = Simulation(
        user_id=current_user.id,
        title=sim_in.title,
        description=sim_in.description,
        scenario_type=sim_in.scenario_type,
        ai_advancement=sim_in.ai_advancement,
        climate_action=sim_in.climate_action,
        global_stability=sim_in.global_stability,
        population_growth=sim_in.population_growth,
        energy_innovation=sim_in.energy_innovation,
        space_investment=sim_in.space_investment,
        automation_adoption=sim_in.automation_adoption,
        education_quality=sim_in.education_quality,
        healthcare_innovation=sim_in.healthcare_innovation,
        results=forecast_res.model_dump()
    )
    db.add(new_sim)
    await db.commit()
    await db.refresh(new_sim)
    return new_sim


@router.get("/", response_model=List[SimulationSummaryResponse])
async def list_simulations(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Retrieve user simulations. Admins see all, users see their own.
    """
    if current_user.role == UserRole.admin:
        stmt = select(Simulation).offset(skip).limit(limit)
    else:
        stmt = select(Simulation).where(Simulation.user_id == current_user.id).offset(skip).limit(limit)
        
    res = await db.execute(stmt)
    return res.scalars().all()


@router.get("/{id}", response_model=SimulationResponse)
async def get_simulation(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    stmt = select(Simulation).where(Simulation.id == id)
    res = await db.execute(stmt)
    sim = res.scalars().first()
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
    if sim.user_id != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not permitted to access this simulation")
    return sim


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_simulation(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> None:
    stmt = select(Simulation).where(Simulation.id == id)
    res = await db.execute(stmt)
    sim = res.scalars().first()
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
    if sim.user_id != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not permitted to delete this simulation")
        
    await db.delete(sim)
    await db.commit()
