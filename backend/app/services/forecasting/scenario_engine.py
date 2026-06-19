from typing import Dict, Any, Tuple
from app.models.simulation import ScenarioType

def apply_scenario_adjustments(sliders: Dict[str, Any], scenario: ScenarioType) -> Tuple[Dict[str, Any], str]:
    """
    Adjust slider parameters and return an overarching executive scenario theme.
    """
    adjusted = sliders.copy()
    
    if scenario == ScenarioType.optimistic:
        for k in adjusted:
            if isinstance(adjusted[k], (int, float)):
                adjusted[k] = min(100, int(adjusted[k] * 1.25))
        
        theme = (
            "The Optimistic Scenario characterizes a path of transformative global convergence. "
            "Artificial General Intelligence (AGI) successfully solves complex molecular biology, unlocking nearly free universal "
            "healthcare and dramatic longevity. Commercial fusion commercialization provides clean, boundless baseload energy, "
            "drastically reversing historical climatic decline and powering a massive commercial expansion into interplanetary colonization."
        )

    elif scenario == ScenarioType.pessimistic:
        for k in adjusted:
            if isinstance(adjusted[k], (int, float)):
                adjusted[k] = max(0, int(adjusted[k] * 0.75))
        
        theme = (
            "The Pessimistic Scenario outlines a trajectory marked by systemic fragmentation and resource vulnerability. "
            "Severe tipping points in the global climatic system trigger accelerated sea level rise and severe agricultural instability. "
            "These ecological strains provoke prolonged global financial recessions and high-intensity geopolitical conflicts over critical "
            "resources, creating extreme friction that hinders technological distribution and space exploration."
        )

    else:
        # Realistic / Balanced
        theme = (
            "The Realistic Scenario portrays a deeply complex, balanced civilizational evolution. "
            "Accelerating breakthroughs in AGI and automation generate stunning productivity and new opportunities, balanced against "
            "structural labor disruptions and ethical governance debates. Active decarbonization and green innovation stabilize "
            "the biosphere, though legacy emissions require costly managed equilibrium. Multi-polar geopolitical competition transitions "
            "into pragmatic regional trade federations and collaborative commercial space undertakings."
        )

    return adjusted, theme
