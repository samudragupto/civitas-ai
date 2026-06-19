import random
from typing import Dict, Any, List
from app.models.simulation import ScenarioType
from app.schemas.forecast import (
    StructuredForecastOutput, MilestoneYearForecast, RiskAnalysis,
    OpportunityAnalysis, ConfidenceScore, Visualizations, TimelineEvent,
    TechMilestone, EconIndustryShift, CountryInfluence, DataPoint
)
from app.services.forecasting.scenario_engine import apply_scenario_adjustments
from app.services.forecasting.tech_module import forecast_technology
from app.services.forecasting.climate_module import forecast_climate
from app.services.forecasting.econ_module import forecast_economy
from app.services.forecasting.geo_module import forecast_geopolitics
from app.services.forecasting.space_module import forecast_space
from app.services.ai_service import ai_service


async def generate_complete_forecast(
    sliders: Dict[str, Any],
    scenario_type: ScenarioType,
    enhance_with_ai: bool = False
) -> StructuredForecastOutput:
    adjusted_sliders, scenario_theme = apply_scenario_adjustments(sliders, scenario_type)

    # Years to forecast
    years = [2030, 2050, 2100]
    forecasts: Dict[int, MilestoneYearForecast] = {}

    for yr in years:
        tech = forecast_technology(yr, adjusted_sliders, scenario_type.value)
        climate = forecast_climate(yr, adjusted_sliders, scenario_type.value)
        econ = forecast_economy(yr, adjusted_sliders, scenario_type.value)
        geo = forecast_geopolitics(yr, adjusted_sliders, scenario_type.value)
        space = forecast_space(yr, adjusted_sliders, scenario_type.value)

        # Domain specific additions
        if yr == 2030:
            hc = "CRISPR gene editing and AI diagnostic systems routinely catch 95% of malignancies in Stage 0."
            tr = "Autonomous electric VTOL air taxis begin regular municipal airport-to-downtown passenger transfers."
            ed = "Adaptive personalized AI tutors provide universal 1-on-1 Socratic learning, closing historical educational disparities."
            en = "Next-generation solid-state batteries and massive deployment of offshore wind and perovskite solar panels."
            sc = "Commercial orbital space stations fully replace ISS; permanent human habitats begin construction on the Moon."
        elif yr == 2050:
            hc = "Comprehensive synthetic organ manufacturing and biological age reversal therapies become clinically accessible."
            tr = "Evacuated hyperloop magnetic levitation corridors link continental capital cities at Mach 1 velocities."
            ed = "Direct neuro-symbolic conceptual downloads allow students to acquire fluency in complex languages and advanced calculus in weeks."
            en = "Commercial magnetic confinement fusion power stations connect to the grid, providing clean, limitless baseload energy."
            sc = "Self-sustaining Martian settlement of over 5,000 citizens established; cis-lunar economy reaches trillions in annual output."
        else: # 2100
            hc = "Complete elimination of biological disease and aging; humanity exists in a deeply configurable biological and cybernetic state."
            tr = "Sub-orbital ballistic transport networks allow any-point to any-point travel on Earth within 45 minutes."
            ed = "A decentralized global planetary collective consciousness repository allows shared, instantaneous experiential learning."
            en = "Space orbital solar power collectors and Helium-3 fusion reactors completely power planetary civilization."
            sc = "Fully established interplanetary civilization spanning Earth, Moon, Mars, and the Asteroid Belt, with preliminary automated probes heading to Alpha Centauri."

        forecasts[yr] = MilestoneYearForecast(
            year=yr,
            technology=tech,
            climate=climate,
            economy=econ,
            geopolitics=geo,
            space=space,
            healthcare=hc,
            transportation=tr,
            education=ed,
            energy=en,
            space_colonization=sc
        )

    # Risk Analysis
    if scenario_type == ScenarioType.optimistic:
        risks = RiskAnalysis(
            major_threats=["AI value misalignment during autonomous superintelligence transition", "Cybernetic inequality between early adopters and non-augmented humans"],
            black_swan_events=["Sudden unexpected coronal mass ejection (CME) crippling global unshielded orbital satellites", "Synthetic biological pathogen leak from decentralized synthetic biology laboratories"],
            systemic_risks=["Over-reliance on centralized AI planetary resource orchestration grids", "Vulnerability to deep space Kessler Syndrome events disrupting cis-lunar navigation"]
        )
    elif scenario_type == ScenarioType.pessimistic:
        risks = RiskAnalysis(
            major_threats=["Uncontrolled climatic tipping points (permafrost methane release, AMOC collapse)", "Global escalation of resource wars into thermonuclear or biological deployments", "Complete fragmentation of internet protocols into state-surveilled localized intranets"],
            black_swan_events=["Runaway ecological grey-goo or self-assembling weaponized nanite swarms", "Total collapse of key agricultural breadbaskets leading to multi-continent famine"],
            systemic_risks=["Hyper-inflationary collapse of global fiat banking ledgers", "Prolonged societal depression and demographic collapse caused by widespread technological unemployment"]
        )
    else: # Realistic
        risks = RiskAnalysis(
            major_threats=["Persistent asymmetric cyber warfare disrupting automated municipal power and water grids", "Accelerating climate adaptation costs straining municipal and national fiscal budgets"],
            black_swan_events=["Sudden emergence of autonomous self-replicating deep web financial malware", "Unanticipated orbital collision cascade damaging primary global communications rings"],
            systemic_risks=["Bifurcation of global trade into mutually antagonistic financial and technological blocs", "Socio-political polarization accelerated by hyper-realistic generative AI disinformation"]
        )

    # Opportunity Analysis
    if scenario_type == ScenarioType.optimistic:
        opps = OpportunityAnalysis(
            emerging_industries=["Planetary Geo-engineering & Biosphere Regeneration", "Interstellar Probe Propulsion Engineering", "Synthetic Neocortex Architecture & Digital Immersion", "Commercial Asteroid Prospecting & Refining"],
            future_jobs=["AI-Human Symbiosis Ethicist", "Martian Soil Biome Terraformer", "Quantum Encryption Ledger Architect", "Conceptual Telepathy Content Creator"],
            investment_opportunities=["Commercial Fusion Reactor Development Hubs", "Cis-Lunar Heavy Robotic Construction Fleet", "Biological Longevity & Epigenetic Cleansing Labs", "Atomically Precise Manufacturing Fabricators"]
        )
    elif scenario_type == ScenarioType.pessimistic:
        opps = OpportunityAnalysis(
            emerging_industries=["Subterranean Hydroponic Agricultural Vaults", "Autonomous High-Fidelity Infrastructure Security Swarms", "Kinetic Orbital Debris Sweeping & Recycling", "Localized Off-Grid EMP-Shielded Energy Micro-grids"],
            future_jobs=["Ecological Contamination Reclamation Technician", "Mercenary Drone Swarm Commander", "Water Basin Allocation Adjudicator", "Digital Scarcity Data Auditor"],
            investment_opportunities=["Heavily Fortified Climate Survival Commonwealths", "Decentralized Untraceable Distributed Compute Meshes", "Synthetic Alternative Protein Bio-Reactors", "Deep Earth Geothermal Power Tunnels"]
        )
    else: # Realistic
        opps = OpportunityAnalysis(
            emerging_industries=["Commercial LEO Biomanufacturing & Organ Printing", "Autonomous Robotic Eldercare & Domestic Assistants", "Post-Quantum Cryptographic Data Migration", "Direct Air Carbon Capture & Storage Networks"],
            future_jobs=["Prompt Engineering & Multi-Modal AI Auditor", "Orbital Solar Ring Maintenance Diver", "Decentralized Autonomous Organization (DAO) Strategist", "Urban Vertical Farm Agronomist"],
            investment_opportunities=["Next-Generation Solid-State Battery Refineries", "Universal Commercial Humanoid Robotics Syndicates", "Modular Nuclear Micro-Reactors (SMRs)", "AI-Driven Hyper-Personalized Healthcare Platforms"]
        )

    # Confidence Scores
    # Base calculation related to global stability and inputs
    conf_base = adjusted_sliders.get("global_stability", 50)
    conf_agi = min(98, max(30, int(conf_base * 0.4 + adjusted_sliders.get("ai_advancement", 50) * 0.6)))
    conf_fusion = min(95, max(25, int(conf_base * 0.3 + adjusted_sliders.get("energy_innovation", 50) * 0.7)))
    conf_mars = min(90, max(20, int(conf_base * 0.3 + adjusted_sliders.get("space_investment", 50) * 0.7)))
    conf_longevity = min(92, max(25, int(conf_base * 0.3 + adjusted_sliders.get("healthcare_innovation", 50) * 0.7)))
    conf_climate = min(95, max(30, int(conf_base * 0.5 + adjusted_sliders.get("climate_action", 50) * 0.5)))

    conf_scores = [
        ConfidenceScore(item="AGI Commercialization by 2045", confidence_percentage=conf_agi),
        ConfidenceScore(item="Commercial Fusion Baseless Power by 2050", confidence_percentage=conf_fusion),
        ConfidenceScore(item="Permanent Self-Sustaining Mars Settlement by 2060", confidence_percentage=conf_mars),
        ConfidenceScore(item="Universal Longevity Escape Velocity by 2055", confidence_percentage=conf_longevity),
        ConfidenceScore(item="Global Climate Decarbonization Equilibrium by 2070", confidence_percentage=conf_climate),
    ]

    # Visualizations
    timeline = [
        TimelineEvent(year=2028, category="Technology", title="First Sub-Vocal AI Wearables", description="Mass consumer shift to subtle subvocal computational pendants replacing bulky handheld devices.", impact="High"),
        TimelineEvent(year=2032, category="Environment", title="30x30 Biodiversity Milestone Passed", description="Global coalition successfully protects 30% of critical terrestrial and marine biodiversity hot zones.", impact="High"),
        TimelineEvent(year=2036, category="Economy", title="First Commercial Autonomous Humanoid Fleet", description="Over 10 million domestic and industrial humanoid robots officially registered in active operational duty.", impact="Transformative"),
        TimelineEvent(year=2042, category="Space", title="Lunar South Pole Ice Extraction Operations", description="Automated rovers begin routine extraction of thousands of metric tons of water ice for rocket propellant.", impact="Transformative"),
        TimelineEvent(year=2050, category="Technology", title="Commercial Fusion Grid Integration", description="First 5 Gigawatt fusion reactor connects directly to the European high-voltage direct current grid.", impact="Revolutionary"),
        TimelineEvent(year=2065, category="Society", title="Universal Epigenetic Rejuvenation Rollout", description="Biochemical age reversal protocols enter generic subsidized pharmaceutical distribution lines globally.", impact="Revolutionary"),
        TimelineEvent(year=2080, category="Geopolitics", title="Earth-Space Economic Federation Charter", description="Treaty formalizing political and fiscal equality between terrestrial nations and Martian assemblies.", impact="High"),
        TimelineEvent(year=2095, category="Space", title="First Interstellar Laser Sail Probe Launch", description="Breakthrough Starshot autonomous light sail probe departs Earth orbit targeting Proxima Centauri at 0.2c.", impact="Revolutionary")
    ]

    tech_roadmap = [
        TechMilestone(technology="1,000-Logical-Qubit Quantum Mainframes", estimated_year=2031, readiness_level=8),
        TechMilestone(technology="General Purpose Industrial Humanoid Robotics", estimated_year=2035, readiness_level=7),
        TechMilestone(technology="Autonomous Multimodal Scientific Proto-AGI", estimated_year=2039, readiness_level=6),
        TechMilestone(technology="Commercial Magnetic Confinement Fusion", estimated_year=2048, readiness_level=5),
        TechMilestone(technology="Full Epigenetic Longevity Escape Velocity", estimated_year=2055, readiness_level=4),
        TechMilestone(technology="Atomically Precise Nanite Fabrication", estimated_year=2072, readiness_level=3),
        TechMilestone(technology="Interstellar Generation Ark Shipyards", estimated_year=2090, readiness_level=2)
    ]

    # Climate evolution data points
    # Let's generate elegant curves for 2030 -> 2100 in 10 year steps
    temp_curve = []
    emissions_curve = []
    sea_level_curve = []
    
    base_t = 1.35
    base_e = 36.8
    base_sl = 0.0

    clim_act_slider = adjusted_sliders.get("climate_action", 50)
    
    for y in range(2030, 2101, 10):
        step = (y - 2020) / 10.0
        if scenario_type == ScenarioType.optimistic or clim_act_slider > 70:
            # Emssions drop rapidly to net negative
            e_val = max(-10.0, base_e - step * 6.5)
            # Temp rises slightly then falls
            t_val = base_t + 0.15 * step if y < 2050 else max(1.2, base_t + 0.15*3 - (y-2050)*0.015)
            # Sea level rises gently and flattens
            sl_val = step * 3.5
        elif scenario_type == ScenarioType.pessimistic or clim_act_slider < 30:
            e_val = base_e + step * 1.5
            t_val = base_t + step * 0.32
            sl_val = step * 11.0
        else:
            e_val = max(3.0, base_e - step * 3.8)
            t_val = base_t + step * 0.12
            sl_val = step * 6.5

        temp_curve.append(DataPoint(year=y, value=round(t_val, 2)))
        emissions_curve.append(DataPoint(year=y, value=round(e_val, 2)))
        sea_level_curve.append(DataPoint(year=y, value=round(sl_val, 2)))

    climate_evolution = {
        "global_temperature_change_c": temp_curve,
        "carbon_emissions_gt": emissions_curve,
        "sea_level_rise_cm": sea_level_curve
    }

    econ_transformation = [
        EconIndustryShift(industry="AI & Autonomous Software Services", share_2030=18.5, share_2050=34.0, share_2100=48.0),
        EconIndustryShift(industry="Green Energy & Storage Refining", share_2030=16.0, share_2050=28.5, share_2100=35.0),
        EconIndustryShift(industry="Traditional Fossil Extraction", share_2030=22.0, share_2050=7.0, share_2100=0.5),
        EconIndustryShift(industry="Commercial Space Operations & Mining", share_2030=4.5, share_2050=14.0, share_2100=28.5),
        EconIndustryShift(industry="Synthetic Biology & Bio-Manufacturing", share_2030=9.0, share_2050=18.5, share_2100=25.0),
        EconIndustryShift(industry="Traditional Physical Retail & Administration", share_2030=30.0, share_2050=12.0, share_2100=3.0)
    ]

    influence_heatmap = [
        CountryInfluence(country="United States", influence_score_2030=92, influence_score_2050=88, influence_score_2100=85),
        CountryInfluence(country="China", influence_score_2030=90, influence_score_2050=89, influence_score_2100=86),
        CountryInfluence(country="European Union", influence_score_2030=84, influence_score_2050=86, influence_score_2100=88),
        CountryInfluence(country="India", influence_score_2030=78, influence_score_2050=85, influence_score_2100=90),
        CountryInfluence(country="ASEAN Bloc", influence_score_2030=72, influence_score_2050=80, influence_score_2100=84),
        CountryInfluence(country="Gulf States Alliance", influence_score_2030=76, influence_score_2050=78, influence_score_2100=75),
        CountryInfluence(country="East African Federation", influence_score_2030=60, influence_score_2050=74, influence_score_2100=82),
        CountryInfluence(country="Brazil", influence_score_2030=68, influence_score_2050=72, influence_score_2100=76)
    ]

    visualizations = Visualizations(
        timeline=timeline,
        technology_roadmap=tech_roadmap,
        climate_evolution=climate_evolution,
        economic_transformation=econ_transformation,
        global_influence_heatmap=influence_heatmap
    )

    # Enhance summary if asked
    if enhance_with_ai:
        ai_narrative = await ai_service.enhance_forecast(
            domain="Global Civilizational Future",
            scenario=scenario_type.value,
            slider_params=adjusted_sliders
        )
        executive_summary = f"{scenario_theme}\n\nStrategic Deep AI Synthesis:\n{ai_narrative}"
    else:
        executive_summary = (
            f"# Executive Foresight Report: CivitasAI Civilizational Projection\n\n"
            f"**Scenario Typology:** {scenario_type.value.capitalize()} Trajectory\n\n"
            f"{scenario_theme}\n\n"
            f"### Strategic Highlights\n"
            f"- **2030 Horizon:** Foundation Phase. Key transformations center around widespread algorithmic productivity, transition to early autonomous commercial robotics, and aggressive enforcement of global decarbonization baselines.\n"
            f"- **2050 Horizon:** Transition & Abundance Phase. Civilizational infrastructure is deeply altered by commercial fusion commercialization, early AGI co-stewardship, and permanent cis-lunar and Martian settlements.\n"
            f"- **2100 Horizon:** Interplanetary Continuity Phase. A deeply stabilized, post-scarcity global civilization with automated material abundance, complete biological configurability, and deep interstellar robotic exploration."
        )

    return StructuredForecastOutput(
        executive_summary=executive_summary,
        forecasts=forecasts,
        risk_analysis=risks,
        opportunity_analysis=opps,
        confidence_scores=conf_scores,
        visualizations=visualizations
    )
