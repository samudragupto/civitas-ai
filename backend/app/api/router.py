from fastapi import APIRouter
from app.api.routes import auth, simulations, data_sources, exports, analytics

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(simulations.router, prefix="/simulations", tags=["Simulations & Forecasting Engine"])
api_router.include_router(data_sources.router, prefix="/data", tags=["Global Data Sources Adapters"])
api_router.include_router(exports.router, prefix="/exports", tags=["Reports Export System"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Dashboard Analytics"])

@api_router.get("/health", tags=["System Health"])
async def router_health_check():
    return {"status": "healthy", "engine": "CivitasAI v2.4.0-production", "timestamp": "2026-06-18"}
