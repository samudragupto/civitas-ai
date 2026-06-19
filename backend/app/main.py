import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings
from app.database import engine, Base, AsyncSessionLocal
from app.api.router import api_router
from app.models.user import User, UserRole
from app.services.auth_service import get_password_hash
from app.models import Simulation, ScenarioType

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger(__name__)

async def seed_database():
    """Ensure database tables exist and seed initial production admin & mock data."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as session:
        # Check if admin exists
        from sqlalchemy.future import select
        result = await session.execute(select(User).where(User.username == "admin"))
        if not result.scalars().first():
            logger.info("Seeding primary CivitasAI Enterprise Admin account...")
            admin_user = User(
                email="admin@civitasai.org",
                username="admin",
                hashed_password=get_password_hash("CivitasEnterprise2026!"),
                role=UserRole.admin,
                is_active=True
            )
            session.add(admin_user)
            
            # Seed standard researcher account
            researcher_user = User(
                email="researcher@civitasai.org",
                username="researcher",
                hashed_password=get_password_hash("Foresight2026!"),
                role=UserRole.researcher,
                is_active=True
            )
            session.add(researcher_user)

            # Seed standard user account
            demo_user = User(
                email="user@civitasai.org",
                username="demo_user",
                hashed_password=get_password_hash("DemoUser2026!"),
                role=UserRole.registered,
                is_active=True
            )
            session.add(demo_user)
            await session.commit()
            
            # Seed initial simulation
            from app.services.forecasting.engine import generate_complete_forecast
            sliders = {
                "ai_advancement": 75,
                "climate_action": 65,
                "global_stability": 55,
                "population_growth": 50,
                "energy_innovation": 80,
                "space_investment": 70,
                "automation_adoption": 65,
                "education_quality": 60,
                "healthcare_innovation": 75
            }
            fc = await generate_complete_forecast(sliders, ScenarioType.realistic, enhance_with_ai=False)
            initial_sim = Simulation(
                user_id=1,  # admin
                title="Global Strategic Synthesis 2026-2100",
                description="Comprehensive baseline civilization forecast incorporating advanced AGI integration and commercial fusion baseload transitions.",
                scenario_type=ScenarioType.realistic,
                results=fc.model_dump()
            )
            session.add(initial_sim)
            await session.commit()
            logger.info("Database seeding successfully completed.")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting CivitasAI Human Civilization Forecasting Engine API...")
    await seed_database()
    yield
    # Shutdown
    logger.info("Shutting down CivitasAI API...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production config can specify specific frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Application security & exception handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled system exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal forecasting engine error occurred. Please try again later."}
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health")
@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "engine": "CivitasAI v2.4.0-production", "timestamp": "2026-06-18"}
