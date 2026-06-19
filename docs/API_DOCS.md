# CivitasAI REST API Documentation

Base Endpoint: `https://civitasai.org/api/v1`

## Authentication Endpoints

### 1. Register Account
- **Method:** `POST`
- **Path:** `/auth/register`
- **Headers:** `Content-Type: application/json`
- **Payload:**
  ```json
  {
    "email": "user@example.com",
    "username": "example_user",
    "password": "SuperSecurePassword123!",
    "role": "registered"
  }
  ```
- **Response (201 Created):** Returns user metadata and unique ID.

### 2. Authenticate / Login
- **Method:** `POST`
- **Path:** `/auth/login`
- **Headers:** `Content-Type: application/x-www-form-urlencoded`
- **Payload:** `username=example_user&password=SuperSecurePassword123!`
- **Response (200 OK):**
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
    "token_type": "bearer",
    "user": {
      "id": 1,
      "username": "example_user",
      "email": "user@example.com",
      "role": "registered"
    }
  }
  ```

---

## Simulations & Forecasting Engine Endpoints

### 1. Public Demo Simulation
- **Method:** `POST`
- **Path:** `/simulations/demo?scenario=realistic&ai_advancement=65&climate_action=55`
- **Access:** Public (No Auth Required)
- **Response (200 OK):** Returns complete structured JSON forecast outputs.

### 2. Execute Production Simulation
- **Method:** `POST`
- **Path:** `/simulations/`
- **Headers:** `Authorization: Bearer <JWT>`
- **Payload:**
  ```json
  {
    "title": "Global Cyber-Biological Forecast 2026",
    "description": "Evaluating high automation adoption.",
    "scenario_type": "optimistic",
    "ai_advancement": 85,
    "climate_action": 70,
    "global_stability": 60,
    "population_growth": 45,
    "energy_innovation": 90,
    "space_investment": 80,
    "automation_adoption": 75,
    "education_quality": 80,
    "healthcare_innovation": 85
  }
  ```
- **Response (201 Created):** Returns stored Simulation document with generated structured predictions for 2030, 2050, 2100.

### 3. Retrieve User Simulations
- **Method:** `GET`
- **Path:** `/simulations/?skip=0&limit=50`
- **Headers:** `Authorization: Bearer <JWT>`
- **Response (200 OK):** List of summary documents.

### 4. Delete Simulation
- **Method:** `DELETE`
- **Path:** `/simulations/{id}`
- **Headers:** `Authorization: Bearer <JWT>`
- **Response (204 No Content):** Successfully purged.

---

## Data Source Adapters Endpoints

### 1. List Active Agencies
- **Method:** `GET`
- **Path:** `/data/sources`
- **Response (200 OK):** Returns metadata for World Bank, IMF, UN, NASA, OECD, OWID adapters.

### 2. Retrieve All Indicators
- **Method:** `GET`
- **Path:** `/data/indicators`
- **Response (200 OK):** Returns global trend metrics.

---

## Report Export System Endpoints

### 1. Download JSON Dataset
- **Method:** `GET`
- **Path:** `/exports/{sim_id}/json`
- **Headers:** `Authorization: Bearer <JWT>`
- **Response:** Raw JSON attachment.

### 2. Download Professional PDF Report
- **Method:** `GET`
- **Path:** `/exports/{sim_id}/pdf`
- **Headers:** `Authorization: Bearer <JWT>` (Researcher / Admin access)
- **Response:** Binary PDF document attachment.

### 3. Download Formatted DOCX Report
- **Method:** `GET`
- **Path:** `/exports/{sim_id}/docx`
- **Headers:** `Authorization: Bearer <JWT>` (Researcher / Admin access)
- **Response:** Binary Microsoft Word (`.docx`) document attachment.
