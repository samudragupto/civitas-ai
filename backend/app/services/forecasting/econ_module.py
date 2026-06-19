from typing import Dict, Any
from app.schemas.forecast import EconForecast

def forecast_economy(year: int, sliders: Dict[str, Any], scenario: str) -> EconForecast:
    auto_adop = sliders.get("automation_adoption", 50)
    ai_adv = sliders.get("ai_advancement", 50)
    edu_qual = sliders.get("education_quality", 50)
    global_stab = sliders.get("global_stability", 50)

    # Multiplier
    growth_mult = (ai_adv * 1.2 + auto_adop - edu_qual * 0.2 + global_stab) / 200.0

    if year == 2030:
        if scenario == "optimistic" or growth_mult > 1.1:
            return EconForecast(
                gdp_growth_rate=3.9,
                automation_impact="High productivity boom; AI tools empower creative and professional workers to 3x output.",
                job_market_shifts="Rapid upskilling programs successfully absorb displaced routine desk workers into AI curation and prompt engineering.",
                currency_evolution="Central Bank Digital Currencies (CBDCs) roll out smoothly in 40+ nations with cross-border interoperability."
            )
        elif scenario == "pessimistic" or growth_mult < 0.8:
            return EconForecast(
                gdp_growth_rate=1.2,
                automation_impact="Severe white-collar layoffs push global unemployment up by 3.5%; social safety nets strained.",
                job_market_shifts="Labor mismatch creates structural stagnation; gig economy explodes with insecure micro-tasks.",
                currency_evolution="Fragmented currency wars; volatile speculative crypto swings trigger strict regulatory bans."
            )
        else:
            return EconForecast(
                gdp_growth_rate=2.6,
                automation_impact="Moderate automation gains; standard administrative roles decline while tech maintenance surges.",
                job_market_shifts="Shift from traditional corporate employment to decentralized autonomous project teams.",
                currency_evolution="Coexistence of sovereign fiat currencies, dominant stablecoins, and early digital trade federations."
            )

    elif year == 2050:
        if scenario == "optimistic" or growth_mult > 1.1:
            return EconForecast(
                gdp_growth_rate=5.5,
                automation_impact="Abundance economy fueled by nearly free solar energy and automated manufacturing.",
                job_market_shifts="Universal Basic Income (UBI) instituted across OECD; human labor shifts entirely to scientific exploration and philosophical arts.",
                currency_evolution="Global energy-backed algorithmic currency stabilizes international commerce and resource allocation."
            )
        elif scenario == "pessimistic" or growth_mult < 0.8:
            return EconForecast(
                gdp_growth_rate=0.4,
                automation_impact="Extreme wealth concentration causes severe neo-feudal societal stratification.",
                job_market_shifts="Mass technological displacement without adequate welfare safety nets; informal barter economies emerge.",
                currency_evolution="Hyper-surveilled localized fiat scrips contend with underground untraceable cryptographic tokens."
            )
        else:
            return EconForecast(
                gdp_growth_rate=3.1,
                automation_impact="Significant industrial productivity; 60% of physical goods manufactured entirely by autonomous robotics.",
                job_market_shifts="Adoption of a structured 4-day workweek; massive expansion of the experiential, caring, and virtual entertainment economies.",
                currency_evolution="Consolidation of two major rival digital currency blocs anchored by Western and Eastern financial alliances."
            )

    elif year == 2100:
        if scenario == "optimistic" or growth_mult > 1.1:
            return EconForecast(
                gdp_growth_rate=6.2,
                automation_impact="Post-scarcity civilization; standard economic measures of GDP transition to Gross Planetary Well-Being.",
                job_market_shifts="Voluntary self-actualization endeavors replace traditional concepts of wage labor entirely.",
                currency_evolution="Compute-and-matter distribution protocols replace traditional monetary transactions."
            )
        elif scenario == "pessimistic" or growth_mult < 0.8:
            return EconForecast(
                gdp_growth_rate=-0.8,
                automation_impact="Severe economic contracture caused by resource exhaustion and corporate automation wars.",
                job_market_shifts="Indenture contracts for biological workers maintaining degraded AI server infrastructure.",
                currency_evolution="Corporate megaconglomerate credits serve as the sole viable medium of exchange."
            )
        else:
            return EconForecast(
                gdp_growth_rate=3.5,
                automation_impact="Fully mature automated interplanetary production network spanning Earth, Moon, and Asteroid Belt.",
                job_market_shifts="Interstellar mission planners, planetary bio-engineers, and virtual world architects form the primary guilds.",
                currency_evolution="Interplanetary decentralized credit ledger utilizing quantum entanglement verification."
            )
    
    return EconForecast(
        gdp_growth_rate=2.5,
        automation_impact="Standard automation.",
        job_market_shifts="Standard shift.",
        currency_evolution="Standard currency."
    )
