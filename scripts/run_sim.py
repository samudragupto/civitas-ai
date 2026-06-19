import asyncio
import sys
import os
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

from app.models.simulation import ScenarioType
from app.services.forecasting.engine import generate_complete_forecast

async def run_simulation_cli():
    print("--- CivitasAI CLI Scenario Execution ---")
    sliders = {
        "ai_advancement": 85,
        "climate_action": 70,
        "global_stability": 60,
        "population_growth": 50,
        "energy_innovation": 80,
        "space_investment": 75,
        "automation_adoption": 65,
        "education_quality": 60,
        "healthcare_innovation": 80
    }
    print(f"Inputs: {json.dumps(sliders, indent=2)}")
    print("Running strategic simulation for 2030, 2050, 2100...")
    
    result = await generate_complete_forecast(sliders, ScenarioType.optimistic, enhance_with_ai=False)
    print("\n--- EXECUTIVE SUMMARY ---")
    print(result.executive_summary[:800] + "...\n")
    
    print("--- CONFIDENCE SCORES ---")
    for score in result.confidence_scores:
        print(f"• {score.item}: {score.confidence_percentage}%")
        
    print("\nExecution Completed Successfully.")

if __name__ == "__main__":
    asyncio.run(run_simulation_cli())
