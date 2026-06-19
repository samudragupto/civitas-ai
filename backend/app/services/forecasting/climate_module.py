from typing import Dict, Any
from app.schemas.forecast import ClimateForecast

def forecast_climate(year: int, sliders: Dict[str, Any], scenario: str) -> ClimateForecast:
    clim_act = sliders.get("climate_action", 50)
    energy_inn = sliders.get("energy_innovation", 50)
    pop_growth = sliders.get("population_growth", 50)

    # Base values for 2026
    # temp_base = 1.35 C, emissions_base = 36.8 Gt
    
    # Efficiency index
    eco_index = (clim_act * 1.5 + energy_inn - pop_growth * 0.5) / 100.0

    if year == 2030:
        if scenario == "optimistic" or eco_index > 1.2:
            return ClimateForecast(
                sea_level_rise_cm=3.2,
                carbon_emissions_gt=28.5,
                global_temperature_change_c=1.45,
                biodiversity_index="Moderate Stabilization: Massive reforestation and 30x30 marine protection initiatives halt decline."
            )
        elif scenario == "pessimistic" or eco_index < 0.8:
            return ClimateForecast(
                sea_level_rise_cm=5.0,
                carbon_emissions_gt=39.2,
                global_temperature_change_c=1.58,
                biodiversity_index="Critical Decline: Amazon tipping point triggers accelerated habitat fragmentation."
            )
        else:
            return ClimateForecast(
                sea_level_rise_cm=4.1,
                carbon_emissions_gt=34.0,
                global_temperature_change_c=1.51,
                biodiversity_index="Vulnerable: Conservation efforts struggle against expanding agricultural footprint."
            )

    elif year == 2050:
        if scenario == "optimistic" or eco_index > 1.2:
            return ClimateForecast(
                sea_level_rise_cm=11.5,
                carbon_emissions_gt=4.2,  # Near net zero
                global_temperature_change_c=1.60,
                biodiversity_index="Regenerative Recovery: Widespread rewilding, lab-grown meat adoption, and AI ecosystem stewardship."
            )
        elif scenario == "pessimistic" or eco_index < 0.8:
            return ClimateForecast(
                sea_level_rise_cm=26.0,
                carbon_emissions_gt=42.0,
                global_temperature_change_c=2.30,
                biodiversity_index="Severe Collapse: Broad marine coral extinction and collapse of major pollinator insect networks."
            )
        else:
            return ClimateForecast(
                sea_level_rise_cm=18.0,
                carbon_emissions_gt=18.5,
                global_temperature_change_c=1.85,
                biodiversity_index="Stabilized at Low Baseline: Genetically engineered resilient crops and targeted geoengineering support fragile ecosystems."
            )

    elif year == 2100:
        if scenario == "optimistic" or eco_index > 1.2:
            return ClimateForecast(
                sea_level_rise_cm=28.0,
                carbon_emissions_gt=-8.0,  # Net negative via direct air capture and olivine weathering
                global_temperature_change_c=1.35,  # Returning to 2020 levels
                biodiversity_index="Flourishing Biosphere: Assisted evolution and de-extinction programs restore Holocene-level ecological complexity."
            )
        elif scenario == "pessimistic" or eco_index < 0.8:
            return ClimateForecast(
                sea_level_rise_cm=88.0,
                carbon_emissions_gt=35.0,
                global_temperature_change_c=3.80,
                biodiversity_index="Catastrophic Depletion: Mass Sixth Extinction event; biomes restricted largely to controlled artificial greenhouses."
            )
        else:
            return ClimateForecast(
                sea_level_rise_cm=52.0,
                carbon_emissions_gt=5.0,
                global_temperature_change_c=2.20,
                biodiversity_index="Managed Artificial Equilibrium: Major biomes actively maintained through robotic pollination and climatic shields."
            )
    
    return ClimateForecast(
        sea_level_rise_cm=10.0,
        carbon_emissions_gt=30.0,
        global_temperature_change_c=1.5,
        biodiversity_index="Stable."
    )
