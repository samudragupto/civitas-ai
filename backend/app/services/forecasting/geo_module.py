from typing import Dict, Any
from app.schemas.forecast import GeoForecast

def forecast_geopolitics(year: int, sliders: Dict[str, Any], scenario: str) -> GeoForecast:
    global_stab = sliders.get("global_stability", 50)
    space_inv = sliders.get("space_investment", 50)
    clim_act = sliders.get("climate_action", 50)

    geo_score = (global_stab * 1.5 + clim_act - space_inv * 0.2) / 100.0

    if year == 2030:
        if scenario == "optimistic" or geo_score > 1.2:
            return GeoForecast(
                alliances="Strengthened UN mandate and diplomatic revitalization freeze major ongoing territorial conflicts.",
                trade_blocs="Expansion of CPTPP and green-technology tariff corridors incentivize sustainable global supply chains.",
                regional_conflicts="De-escalation in Eastern Europe and the Middle East through multi-state economic reconstruction treaties.",
                emerging_powers="India and the ASEAN bloc solidify their positions as primary global technological and manufacturing pivots."
            )
        elif scenario == "pessimistic" or geo_score < 0.8:
            return GeoForecast(
                alliances="Severe fracturing of post-WWII security architecture; multi-polar proxy skirmishes proliferate.",
                trade_blocs="Aggressive protectionist trade walls and critical mineral export embargos cripple global high-tech manufacturing.",
                regional_conflicts="High-intensity conflict over semiconductor sovereignty and maritime trade straits in the Indo-Pacific.",
                emerging_powers="Autonomous non-state corporate syndicates and mercenary networks wield decisive regional sovereignty."
            )
        else:
            return GeoForecast(
                alliances="Tense but stable multipolar competition; regional security dialogues prevent direct superpower confrontation.",
                trade_blocs="Bifurcation of global tech ecosystems into distinct, non-interoperable hardware/software spheres.",
                regional_conflicts="Sporadic resource skirmishes over freshwater basins and arable land in sub-Saharan Africa.",
                emerging_powers="The Gulf States leverage vast sovereign wealth funds to dominate global AI and energy transition infrastructure."
            )

    elif year == 2050:
        if scenario == "optimistic" or geo_score > 1.2:
            return GeoForecast(
                alliances="Formation of the Global Democratic Federation, pooling resources for planetary climate defense and space colonization.",
                trade_blocs="Seamless global digital market with standardized ethical AI governance and carbon border adjustments.",
                regional_conflicts="Near-total elimination of armed interstate warfare; disputes adjudicated by autonomous international tribunals.",
                emerging_powers="The East African Federation emerges as an economic titan powered by geothermal energy and rapid youth demographics."
            )
        elif scenario == "pessimistic" or geo_score < 0.8:
            return GeoForecast(
                alliances="New Cold War solidifies into hostile, highly fortified ideological fortresses with automated border perimeters.",
                trade_blocs="Total collapse of globalized shipping; localized self-sufficient survival enclaves trade via heavily armed convoys.",
                regional_conflicts="Persistent autonomous drone warfare over Arctic shipping lanes and Antarctic mineral deposits.",
                emerging_powers="Megacity city-states break away from crumbling national governments to establish independent corporate fiefdoms."
            )
        else:
            return GeoForecast(
                alliances="Pragmatic regional coalitions dominate: European Union, CANZUK, ASEAN-Plus, and the Pan-African Union.",
                trade_blocs="Tri-polar global economy centered around North America, Europe, and an integrated Asian Economic Zone.",
                regional_conflicts="Asymmetric cyber and orbital interference campaigns replace physical deployment of boots on the ground.",
                emerging_powers="Brazil and Nigeria emerge as dominant cultural and agricultural anchors of the Southern Hemisphere."
            )

    elif year == 2100:
        if scenario == "optimistic" or geo_score > 1.2:
            return GeoForecast(
                alliances="United Earth Directorate coordinates global civilization, interplanetary exploration, and contact protocols.",
                trade_blocs="A unified planetary resource distribution ledger eliminates the historical concept of competing trade blocs.",
                regional_conflicts="Warfare viewed as an archaic historical relic; global societal energy is directed outward into the cosmos.",
                emerging_powers="Lunar and Martian sovereign assemblies gain equal representation on the Earth-Space Council."
            )
        elif scenario == "pessimistic" or geo_score < 0.8:
            return GeoForecast(
                alliances="Fragmented warlord territories and authoritarian AI states engaged in perpetual, low-attrition resource attrition.",
                trade_blocs="Barter networks between sovereign orbital habitats and depleted terrestrial scavenger settlements.",
                regional_conflicts="Devastating kinetic orbital bombardment and tailored biological skirmishes leave vast terrestrial zones uninhabitable.",
                emerging_powers="Deep Earth subterranean excavation sanctuaries and automated orbital defense platforms."
            )
        else:
            return GeoForecast(
                alliances="Earth is governed by a decentralized assembly of 500 semi-sovereign bio-regions and orbital habitats.",
                trade_blocs="Dynamic free-trade network connecting terrestrial ports with cis-lunar shipyards and Asteroid Belt refineries.",
                regional_conflicts="Political tensions shift from Earth to jurisdictional disputes over lucrative near-Earth asteroid mining claims.",
                emerging_powers="Outer Solar System autonomous scientific communes on Callisto, Titan, and Enceladus."
            )
    
    return GeoForecast(
        alliances="Standard alliances.",
        trade_blocs="Standard blocs.",
        regional_conflicts="Standard conflicts.",
        emerging_powers="Standard powers."
    )
