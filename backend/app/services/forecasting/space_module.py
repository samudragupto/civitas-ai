from typing import Dict, Any
from app.schemas.forecast import SpaceForecast

def forecast_space(year: int, sliders: Dict[str, Any], scenario: str) -> SpaceForecast:
    space_inv = sliders.get("space_investment", 50)
    energy_inn = sliders.get("energy_innovation", 50)
    ai_adv = sliders.get("ai_advancement", 50)

    space_score = (space_inv * 1.5 + energy_inn + ai_adv * 0.5) / 150.0

    if year == 2030:
        if scenario == "optimistic" or space_score > 1.1:
            return SpaceForecast(
                lunar_colonies="Permanent crewed Artemis and International Lunar Research Station (ILRS) bases operational at the lunar South Pole.",
                mars_missions="Successful uncrewed Starship cargo landings on Mars deliver fuel plants and autonomous habitat construction ro rovers.",
                asteroid_mining="First commercial prospecting probes arrive at near-Earth asteroids (e.g. Psyche and Bennu targets).",
                commercial_space_economy="Explosive growth; private space stations operational in LEO replacing the decommissioned ISS."
            )
        elif scenario == "pessimistic" or space_score < 0.8:
            return SpaceForecast(
                lunar_colonies="Severe budget cuts and rocket development delays push crewed lunar return missions back to the late 2030s.",
                mars_missions="High risks and life support failures result in an international moratorium on crewed Mars attempts.",
                asteroid_mining="Strictly academic curiosity; no commercial mining ventures secure necessary venture capital funding.",
                commercial_space_economy="Stagnation caused by Kessler Syndrome debris alarms in LEO and soaring insurance premiums."
            )
        else:
            return SpaceForecast(
                lunar_colonies="Regular rotation of international astronauts to lunar surface habitats; early extraction of lunar water ice.",
                mars_missions="Preparatory orbital reconnaissance and automated sample return missions successfully complete.",
                asteroid_mining="Proof-of-concept autonomous extraction of water and platinum group metals from carbonaceous chondrites.",
                commercial_space_economy="Strong expansion of broadband satellite constellations and private space tourism orbital flights."
            )

    elif year == 2050:
        if scenario == "optimistic" or space_score > 1.1:
            return SpaceForecast(
                lunar_colonies="Bustling lunar metropolis of 10,000+ permanent residents featuring mass driver launch facilities and fusion reactors.",
                mars_missions="Self-sustaining Martian settlement established in Valles Marineris with a thriving population of over 5,000 colonists.",
                asteroid_mining="Trillion-dollar commercial asteroid mining operations provide 40% of Earth's industrial rare Earth metals.",
                commercial_space_economy="Deep-space commercial economy booms; space elevators and orbital ring prototypes under active construction."
            )
        elif scenario == "pessimistic" or space_score < 0.8:
            return SpaceForecast(
                lunar_colonies="Highly automated scientific outposts operated by robotic telepresence with sporadic human oversight crews.",
                mars_missions="Mars remains a hostile scientific outpost; multiple early settlement attempts abandoned due to radiation hazards.",
                asteroid_mining="High launch overhead keeps asteroid mining localized exclusively to cis-lunar refueling stations.",
                commercial_space_economy="Heavily monopolized by two sovereign military-industrial corporate titans; strict access gates instituted."
            )
        else:
            return SpaceForecast(
                lunar_colonies="Permanent industrial settlements on the Moon extract Helium-3 and construct heavy solar orbital satellites.",
                mars_missions="A well-established scientific research base of 500 inhabitants operates continuously under the Martian regolith.",
                asteroid_mining="Fully automated robotic fleets mine asteroid belts, ferrying refined materials back to cis-lunar manufacturing hubs.",
                commercial_space_economy="Space manufacturing produces perfect fiber optics, delicate pharmaceuticals, and zero-g alloys."
            )

    elif year == 2100:
        if scenario == "optimistic" or space_score > 1.1:
            return SpaceForecast(
                lunar_colonies="The Moon is an independent, fully terraformed biospheric hub and the principal shipyard for interstellar generation arks.",
                mars_missions="Mars is undergoing active terraforming; dense artificial atmosphere created, with flowing surface streams and millions of citizens.",
                asteroid_mining="The Asteroid Belt is fully mapped and industrialized, serving as the raw backbone of the solar system's economy.",
                commercial_space_economy="Dyson swarm construction underway around the Sun; routine fusion-powered passenger liners connect inner and outer planets."
            )
        elif scenario == "pessimistic" or space_score < 0.8:
            return SpaceForecast(
                lunar_colonies="Quarantined lunar mining colonies inhabited by penal workers and automated security sentinels.",
                mars_missions="Martian habitats severed from Earth support struggle in deep isolation, developing distinct subterranean splinter factions.",
                asteroid_mining="Destructive orbital skirmishes between rival corporate asteroid cartels contaminate deep space navigation corridors.",
                commercial_space_economy="Extreme cost barriers restrict deep space travel exclusively to highly privileged corporate sovereign executives."
            )
        else:
            return SpaceForecast(
                lunar_colonies="A thriving multi-million population cis-lunar economic commonwealth with extensive subterranean biosphere vaults.",
                mars_missions="A highly sophisticated Martian Republic with 500,000 citizens operating a major scientific university and spaceport hub.",
                asteroid_mining="Ubiquitous autonomous asteroid mining syndicates fulfill 100% of all in-space structural construction requirements.",
                commercial_space_economy="A robust and deeply integrated Solar System economy spanning from the orbit of Mercury out to the Kuiper Belt."
            )
    
    return SpaceForecast(
        lunar_colonies="Standard advancement.",
        mars_missions="Standard advancement.",
        asteroid_mining="Standard advancement.",
        commercial_space_economy="Standard advancement."
    )
