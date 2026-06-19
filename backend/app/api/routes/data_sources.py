from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from app.services.data_adapters import data_source_service
from app.api.deps import get_current_active_user

router = APIRouter()

@router.get("/sources", response_model=List[Dict[str, str]])
async def list_data_sources() -> Any:
    """List all configured global empirical data source adapters."""
    return data_source_service.list_sources()


@router.get("/indicators", response_model=Dict[str, Dict[str, Any]])
async def get_all_indicators() -> Any:
    """Retrieve global empirical indices across all primary international agencies."""
    return await data_source_service.fetch_all_data()


@router.get("/indicators/{source_code}", response_model=Dict[str, Any])
async def get_source_indicators(source_code: str) -> Any:
    """Retrieve indicators from a specific source adapter."""
    data = await data_source_service.fetch_source_data(source_code)
    if data is None:
        raise HTTPException(status_code=404, detail=f"Data source adapter '{source_code}' not found.")
    return data
