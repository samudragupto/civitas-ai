from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class TechForecast(BaseModel):
    agi: str
    robotics: str
    quantum_computing: str
    biotechnology: str
    brain_computer_interfaces: str
    nanotechnology: str

class ClimateForecast(BaseModel):
    sea_level_rise_cm: float
    carbon_emissions_gt: float
    global_temperature_change_c: float
    biodiversity_index: str

class EconForecast(BaseModel):
    gdp_growth_rate: float
    automation_impact: str
    job_market_shifts: str
    currency_evolution: str

class GeoForecast(BaseModel):
    alliances: str
    trade_blocs: str
    regional_conflicts: str
    emerging_powers: str

class SpaceForecast(BaseModel):
    lunar_colonies: str
    mars_missions: str
    asteroid_mining: str
    commercial_space_economy: str

class MilestoneYearForecast(BaseModel):
    year: int
    technology: TechForecast
    climate: ClimateForecast
    economy: EconForecast
    geopolitics: GeoForecast
    space: SpaceForecast
    healthcare: str
    transportation: str
    education: str
    energy: str
    space_colonization: str

class RiskAnalysis(BaseModel):
    major_threats: List[str]
    black_swan_events: List[str]
    systemic_risks: List[str]

class OpportunityAnalysis(BaseModel):
    emerging_industries: List[str]
    future_jobs: List[str]
    investment_opportunities: List[str]

class ConfidenceScore(BaseModel):
    item: str
    confidence_percentage: int

class TimelineEvent(BaseModel):
    year: int
    category: str  # Technology, Economy, Society, Environment, Geopolitics, Space
    title: str
    description: str
    impact: str

class TechMilestone(BaseModel):
    technology: str
    estimated_year: int
    readiness_level: int  # 1-10

class DataPoint(BaseModel):
    year: int
    value: float

class EconIndustryShift(BaseModel):
    industry: str
    share_2030: float
    share_2050: float
    share_2100: float

class CountryInfluence(BaseModel):
    country: str
    influence_score_2030: int  # 0-100
    influence_score_2050: int
    influence_score_2100: int

class Visualizations(BaseModel):
    timeline: List[TimelineEvent]
    technology_roadmap: List[TechMilestone]
    climate_evolution: Dict[str, List[DataPoint]]  # e.g. "temperature", "emissions", "sea_level"
    economic_transformation: List[EconIndustryShift]
    global_influence_heatmap: List[CountryInfluence]

class StructuredForecastOutput(BaseModel):
    executive_summary: str
    forecasts: Dict[int, MilestoneYearForecast]  # 2030, 2050, 2100
    risk_analysis: RiskAnalysis
    opportunity_analysis: OpportunityAnalysis
    confidence_scores: List[ConfidenceScore]
    visualizations: Visualizations
