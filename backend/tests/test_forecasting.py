import pytest
from app.models.simulation import ScenarioType
from app.services.forecasting.engine import generate_complete_forecast
from app.services.forecasting.tech_module import forecast_technology
from app.services.forecasting.climate_module import forecast_climate
from app.services.forecasting.econ_module import forecast_economy
from app.services.forecasting.geo_module import forecast_geopolitics
from app.services.forecasting.space_module import forecast_space

@pytest.mark.asyncio
async def test_generate_complete_forecast_realistic():
    sliders = {
        "ai_advancement": 50,
        "climate_action": 50,
        "global_stability": 50,
        "population_growth": 50,
        "energy_innovation": 50,
        "space_investment": 50,
        "automation_adoption": 50,
        "education_quality": 50,
        "healthcare_innovation": 50
    }
    output = await generate_complete_forecast(sliders, ScenarioType.realistic, enhance_with_ai=False)
    
    assert "Realistic Scenario" in output.executive_summary
    assert 2030 in output.forecasts
    assert 2050 in output.forecasts
    assert 2100 in output.forecasts
    assert len(output.confidence_scores) == 5
    assert len(output.visualizations.timeline) > 0
    assert len(output.visualizations.climate_evolution["global_temperature_change_c"]) == 8


@pytest.mark.asyncio
async def test_generate_complete_forecast_optimistic():
    sliders = {
        "ai_advancement": 80,
        "climate_action": 80,
        "global_stability": 80,
        "population_growth": 40,
        "energy_innovation": 90,
        "space_investment": 85,
        "automation_adoption": 70,
        "education_quality": 80,
        "healthcare_innovation": 90
    }
    output = await generate_complete_forecast(sliders, ScenarioType.optimistic, enhance_with_ai=False)
    
    assert "Optimistic Scenario" in output.executive_summary
    assert output.forecasts[2050].technology.agi is not None
    # Verify risk analysis optimistic themes
    assert len(output.risk_analysis.major_threats) > 0


def test_tech_module():
    res = forecast_technology(2030, {"ai_advancement": 90, "healthcare_innovation": 90, "energy_innovation": 90}, "optimistic")
    assert "Proto-AGI" in res.agi

def test_climate_module():
    res = forecast_climate(2050, {"climate_action": 90, "energy_innovation": 90, "population_growth": 40}, "optimistic")
    assert res.sea_level_rise_cm < 15.0

def test_econ_module():
    res = forecast_economy(2030, {"automation_adoption": 80, "ai_advancement": 80}, "optimistic")
    assert res.gdp_growth_rate > 3.0
