from typing import Dict, Any
from app.schemas.forecast import TechForecast

def forecast_technology(year: int, sliders: Dict[str, Any], scenario: str) -> TechForecast:
    ai_adv = sliders.get("ai_advancement", 50)
    health_inn = sliders.get("healthcare_innovation", 50)
    energy_inn = sliders.get("energy_innovation", 50)

    # Calculate an overall tech multiplier
    mult = (ai_adv + health_inn + energy_inn) / 150.0

    if year == 2030:
        if scenario == "optimistic" or (mult > 1.1 and ai_adv > 75):
            return TechForecast(
                agi="Proto-AGI achieved in top research labs; multimodal AI handles major scientific research tasks independently.",
                robotics="Humanoid robots deployed in millions for warehouse and eldercare support.",
                quantum_computing="First commercial 1,000-logical-qubit systems operational for chemical simulation.",
                biotechnology="CRISPR 2.0 cures sickle cell and multiple single-gene genetic disorders universally.",
                brain_computer_interfaces="Non-invasive sub-vocal typing and high-bandwidth medical BCI implants commercially viable.",
                nanotechnology="Targeted lipid nanoparticles routinely used for cancer immunotherapy."
            )
        elif scenario == "pessimistic" or mult < 0.8:
            return TechForecast(
                agi="LLM scaling hits substantial data and energy walls; domain-specific AI remains standard.",
                robotics="Industrial robotics expand, but general-purpose humanoids remain too expensive for mass consumer use.",
                quantum_computing="Noisy Intermediate-Scale Quantum (NISQ) persists with minor real-world advantage.",
                biotechnology="High costs limit advanced gene therapies to ultra-wealthy populations.",
                brain_computer_interfaces="BCIs restricted largely to motor-impaired medical trials.",
                nanotechnology="Incremental materials improvements; complex molecular nanotech remains elusive."
            )
        else:
            return TechForecast(
                agi="Highly autonomous AI agents handle complex programming and administrative workflows.",
                robotics="Commercial humanoid robots begin mass production; rapid enterprise adoption.",
                quantum_computing="Quantum advantage proven in financial optimization and encryption research.",
                biotechnology="Personalized mRNA cancer vaccines enter widespread clinical deployment.",
                brain_computer_interfaces="Early commercial neural links offer high-fidelity cursor and sensory control.",
                nanotechnology="Advanced nanomaterials enhance battery energy density by 40%."
            )

    elif year == 2050:
        if scenario == "optimistic" or (mult > 1.0 and ai_adv > 70):
            return TechForecast(
                agi="Full Artificial Superintelligence (ASI) acts as global co-steward for economic and ecological management.",
                robotics="Replicating robotic swarms build solar infrastructure and habitats self-sufficiently.",
                quantum_computing="Universal fault-tolerant quantum mainframes solve high-temp superconductivity.",
                biotechnology="Biological age reversal therapies extend healthy human lifespan beyond 120 years.",
                brain_computer_interfaces="Synthetic neocortex extensions enable direct conceptual telepathy across users.",
                nanotechnology="Atomically precise manufacturing (APM) fabricates structural materials at near-zero marginal cost."
            )
        elif scenario == "pessimistic" or mult < 0.8:
            return TechForecast(
                agi="AGI achieved but heavily fragmented and weaponized among rival geopolitical superpowers.",
                robotics="Widespread automation leads to massive societal friction; robot taxes instituted globally.",
                quantum_computing="Quantum decryption forces a painful and chaotic transition of global banking ledgers.",
                biotechnology="Anti-aging breakthroughs occur but spark severe demographic and ethical conflicts.",
                brain_computer_interfaces="Surveillance concerns severely restrict consumer BCI adoption.",
                nanotechnology="Industrial nanotech widespread, but strict safety moratoriums halt self-assembling materials."
            )
        else:
            return TechForecast(
                agi="Widespread AGI powers automated scientific discovery engine, generating weekly medical breakthroughs.",
                robotics="Ubiquitous domestic and municipal automation; robots outnumber humans in urban centers.",
                quantum_computing="Cloud-accessible quantum networks break RSA and establish post-quantum cryptography.",
                biotechnology="Artificial wombs and comprehensive organ printing end transplant waiting lists entirely.",
                brain_computer_interfaces="Millions participate in fully immersive neural virtual realities.",
                nanotechnology="Smart nanomaterial filtration systems actively clean microplastics and toxins from global waterways."
            )

    elif year == 2100:
        if scenario == "optimistic":
            return TechForecast(
                agi="ASI merges seamlessly with human consciousness; post-scarcity computational biosphere established.",
                robotics="Molecular machines construct mega-scale planetary defense and space orbital rings.",
                quantum_computing="Sub-atomic quantum computing allows real-time planet-wide climatic and economic simulation.",
                biotechnology="Complete mastery of the human genome allows configurable biology and radiation immunity.",
                brain_computer_interfaces="Humanity exists in a hybrid physical-digital continuum.",
                nanotechnology="Self-healing, intelligent nanite matter forms the bedrock of all human habitats."
            )
        elif scenario == "pessimistic":
            return TechForecast(
                agi="Centralized AI monopolies dictate technological progress amid severe resource rationing.",
                robotics="Autonomous enforcement swarms patrol walled megacities protecting elites.",
                quantum_computing="Highly centralized quantum compute vaults accessible only by sovereign state entities.",
                biotechnology="Severe biological stratification divides humanity into genetically augmented elites and non-augmented majorities.",
                brain_computer_interfaces="Compulsory neural links used for worker optimization and behavioral monitoring.",
                nanotechnology="Ecological grey-goo containment protocols active in designated hazardous zones."
            )
        else:
            return TechForecast(
                agi="Benevolent AGI network coordinates interstellar probes and deep Earth geoclimatic engineering.",
                robotics="Fully automated global supply chains operate underground and via sub-orbital trajectories.",
                quantum_computing="Global quantum internet provides instantaneous, perfectly secure data transmission across the solar system.",
                biotechnology="Synthetic biology allows humanity to adapt to extraterrestrial environments like Mars and Titan.",
                brain_computer_interfaces="Neural memory backups and digital legacy twins become standard societal institutions.",
                nanotechnology="Programmable matter consumer goods can alter form and function on demand."
            )
    
    return TechForecast(
        agi="Standard advancement.",
        robotics="Standard advancement.",
        quantum_computing="Standard advancement.",
        biotechnology="Standard advancement.",
        brain_computer_interfaces="Standard advancement.",
        nanotechnology="Standard advancement."
    )
