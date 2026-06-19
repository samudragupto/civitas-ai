import enum
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON, Enum, func
from sqlalchemy.orm import relationship
from app.database import Base

class ScenarioType(str, enum.Enum):
    optimistic = "optimistic"
    realistic = "realistic"
    pessimistic = "pessimistic"

class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    scenario_type = Column(Enum(ScenarioType), default=ScenarioType.realistic, nullable=False)

    # Simulation Sliders (0-100)
    ai_advancement = Column(Integer, default=50)
    climate_action = Column(Integer, default=50)
    global_stability = Column(Integer, default=50)
    population_growth = Column(Integer, default=50)
    energy_innovation = Column(Integer, default=50)
    space_investment = Column(Integer, default=50)
    automation_adoption = Column(Integer, default=50)
    education_quality = Column(Integer, default=50)
    healthcare_innovation = Column(Integer, default=50)

    # Generated Output JSON
    results = Column(JSON, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    user = relationship("User", backref="simulations")
