from typing import Any
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models.user import User, UserRole
from app.models.simulation import Simulation
from app.schemas.forecast import StructuredForecastOutput
from app.services.export_service import export_forecast_json, export_forecast_pdf, export_forecast_docx
from app.api.deps import get_current_researcher, get_current_registered_user

router = APIRouter()

@router.get("/{sim_id}/json", response_class=Response)
async def export_json(
    sim_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_registered_user)
) -> Any:
    stmt = select(Simulation).where(Simulation.id == sim_id)
    res = await db.execute(stmt)
    sim = res.scalars().first()
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
    if sim.user_id != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not permitted to access this simulation")
        
    forecast_data = StructuredForecastOutput(**sim.results)
    json_str = export_forecast_json(forecast_data)
    
    return Response(
        content=json_str,
        media_type="application/json",
        headers={"Content-Disposition": f"attachment; filename=civitas_ai_simulation_{sim_id}.json"}
    )


@router.get("/{sim_id}/pdf", response_class=Response)
async def export_pdf(
    sim_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_researcher)
) -> Any:
    """
    Generate professional PDF executive summary report. Researcher/Admin access.
    """
    stmt = select(Simulation).where(Simulation.id == sim_id)
    res = await db.execute(stmt)
    sim = res.scalars().first()
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
        
    forecast_data = StructuredForecastOutput(**sim.results)
    pdf_buffer = export_forecast_pdf(forecast_data, sim.title)
    
    return Response(
        content=pdf_buffer.getvalue(),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=civitas_ai_report_{sim_id}.pdf"}
    )


@router.get("/{sim_id}/docx", response_class=Response)
async def export_docx(
    sim_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_researcher)
) -> Any:
    """
    Generate professional DOCX report. Researcher/Admin access.
    """
    stmt = select(Simulation).where(Simulation.id == sim_id)
    res = await db.execute(stmt)
    sim = res.scalars().first()
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
        
    forecast_data = StructuredForecastOutput(**sim.results)
    docx_buffer = export_forecast_docx(forecast_data, sim.title)
    
    return Response(
        content=docx_buffer.getvalue(),
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename=civitas_ai_report_{sim_id}.docx"}
    )
