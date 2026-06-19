# CivitasAI System Architecture & Engine Specification

CivitasAI is built upon a state-of-the-art, highly decoupled cloud-native microservices architecture designed to support over 100,000 concurrent users running computationally intensive civilization foresight simulations.

```
                                  +--------------------------------------------------+
                                  |                 AWS CloudFront CDN               |
                                  +--------------------------------------------------+
                                                           |
                                  +--------------------------------------------------+
                                  |              NGINX Reverse Proxy                 |
                                  |  (Rate Limiting, CSRF, OWASP Security Headers)   |
                                  +--------------------------------------------------+
                                            /                              \
                                           /                                \
              +----------------------------------------+        +----------------------------------------+
              |           Next.js 15 Frontend          |        |             FastAPI Backend            |
              |     (Scenario Builder, Interactive     |        |      (Async Python 3.12 Core API)      |
              |      Charts, Timeline Visualizations)  |        +----------------------------------------+
              +----------------------------------------+              /      |       |            \
                                                                     /       |       |             \
            +----------------------------------+                    /        |       |              \
            |        AI Model Abstraction      |                   /         |       |               \
            |   (OpenAI / Gemini / Anthropic / |                  /          |       |                \
            |            Ollama / Mock)        |                 /           |       |                 \
            +----------------------------------+                /            |       |                  \
                                                               /             |       |                   \
            +----------------------------------+              /              |       |                    \
            |       Empirical Data Adapters    |             /               |       |                     \
            |  (World Bank, IMF, UN, NASA, etc)|            /                |       |                      \
            +----------------------------------+           /                 |       |                       \
                                                          v                  v       v                        v
                                            +---------------+    +--------------+ +----------------+ +------------------+
                                            |  PostgreSQL   |    |    Redis     | |   OpenSearch   | |    Export System |
                                            | (Primary DB)  |    | (Cache Layer)| |(Fulltext / Log)| | (PDF/DOCX/JSON)  |
                                            +---------------+    +--------------+ +----------------+ +------------------+
```

## Core Engine Modules

The **Forecasting Engine** is fully modularized to permit isolated updates and domain-specific algorithm improvements:

1. **Technology Forecast Module:** Evaluates R&D expenditure and AI compute acceleration to project AGI development timelines, molecular nanotechnology readiness, robotics saturation, biotechnology breakthroughs (CRISPR/mRNA), and Brain-Computer Interfaces (BCIs).
2. **Climate Forecast Module:** Incorporates NASA and UN empirical indices to compute sea level rise (cm), atmospheric carbon emissions (Gt), global surface temperature anomalies (°C), and overall biodiversity resilience under varying policy stances.
3. **Economic Forecast Module:** Synthesizes World Bank and IMF economic indices with automation adoption curves to forecast real global GDP growth rates, white-collar and industrial automation impacts, structural job market shifts, and international currency evolution (CBDCs/cryptographic distribution).
4. **Geopolitical Forecast Module:** Projects international security pacts, rival trade blocs, regional resource frictions, and emerging powers (e.g., East African Federation, ASEAN, Gulf States).
5. **Space Forecast Module:** Evaluates cis-lunar industrialization, permanent lunar polar settlements, Martian biospheric colonization, commercial near-Earth asteroid mining, and deep-space infrastructure deployment.
6. **Scenario Typology Engine:** Evaluates multi-variable slider adjustments (0-100 scale) through an overarching scenario lens: **Optimistic** (technological convergence & abundance), **Realistic** (balanced socio-technical evolution), and **Pessimistic** (climatic shocks & systemic fragmentation).

## Security & Scalability
- **Authentication:** Asymmetric JSON Web Tokens (JWT) with secure password hashing (Bcrypt).
- **Rate Limiting:** Managed in memory across multiple tiers (NGINX zones + FastAPI application state) to prevent DDoS and API abuse.
- **Data Encapsulation:** Strict separation of stateless computational nodes from stateful datastores (Amazon RDS, ElastiCache Redis).
