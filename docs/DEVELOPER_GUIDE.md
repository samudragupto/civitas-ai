# CivitasAI Enterprise Developer Guide

Welcome to the active codebase of **CivitasAI**. This guide provides streamlined workflows for local development, AI provider extension, and test execution.

## Local Environment Setup

### 1. Standalone Docker Compose (Recommended Workflow)
You can launch the entire ecosystem (PostgreSQL, Redis, OpenSearch, FastAPI Backend, Next.js Frontend, NGINX) locally:
```bash
docker-compose up --build
```
- **Frontend Dashboard:** `http://localhost:3000`
- **FastAPI OpenAPI Docs:** `http://localhost:8000/docs`
- **NGINX Proxy Gateway:** `http://localhost:80`

### 2. Manual Virtual Environment Setup
To develop Python backend features independently:
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
To run the auto-reloading API locally:
```bash
uvicorn app.main:app --reload --port 8000
```

---

## Adding New AI Models

Our architecture features an elegant **Model Abstraction Layer** (`backend/app/services/ai_service.py`). Adding a new third-party AI provider requires zero alterations to overarching endpoint routing.

### Step-by-Step Implementation:
1. Create a concrete class implementing `BaseAIProvider`:
   ```python
   class NewLLMProvider(BaseAIProvider):
       def __init__(self, api_key: str):
           self.api_key = api_key
           
       async def generate_text(self, prompt: str, max_tokens: int = 3000) -> str:
           # Async HTTP Client execution
           return "Generated narrative"
   ```
2. Register the provider within `AIService._register_providers()`:
   ```python
   self.providers["new_llm"] = NewLLMProvider(os.getenv("NEW_LLM_API_KEY"))
   ```
3. Set your active `.env` or Kubernetes ConfigMap:
   ```env
   PRIMARY_AI_MODEL="new_llm"
   ```

---

## Testing Verification

We maintain a strict **80%+ code coverage target**. To execute the Pytest suite locally:
```bash
cd backend
PYTHONPATH=. pytest tests/ -v
```
To run local database seeding scripts:
```bash
python scripts/init_db.py
```
