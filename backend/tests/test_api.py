import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_run_demo_simulation(client: AsyncClient):
    response = await client.post("/api/v1/simulations/demo?scenario=optimistic&ai_advancement=85&climate_action=80")
    assert response.status_code == 200
    data = response.json()
    assert "executive_summary" in data
    assert "forecasts" in data
    assert "2030" in data["forecasts"]
    assert "visualizations" in data


@pytest.mark.asyncio
async def test_create_and_list_simulation(client: AsyncClient, user_token: str):
    headers = {"Authorization": f"Bearer {user_token}"}
    payload = {
        "title": "My Strategic Report 2026",
        "description": "Testing REST API endpoints",
        "scenario_type": "optimistic",
        "ai_advancement": 90,
        "climate_action": 80
    }
    create_res = await client.post("/api/v1/simulations/", json=payload, headers=headers)
    assert create_res.status_code == 201
    sim_data = create_res.json()
    assert sim_data["title"] == payload["title"]
    assert "results" in sim_data
    sim_id = sim_data["id"]

    # List simulations
    list_res = await client.get("/api/v1/simulations/", headers=headers)
    assert list_res.status_code == 200
    list_data = list_res.json()
    assert len(list_data) >= 1

    # Get specific simulation
    get_res = await client.get(f"/api/v1/simulations/{sim_id}", headers=headers)
    assert get_res.status_code == 200
    assert get_res.json()["title"] == payload["title"]


@pytest.mark.asyncio
async def test_data_sources_endpoints(client: AsyncClient):
    src_res = await client.get("/api/v1/data/sources")
    assert src_res.status_code == 200
    assert len(src_res.json()) == 6

    ind_res = await client.get("/api/v1/data/indicators/world_bank")
    assert ind_res.status_code == 200
    assert "global_gdp_usd" in ind_res.json()


@pytest.mark.asyncio
async def test_analytics_dashboard(client: AsyncClient, admin_token: str):
    headers = {"Authorization": f"Bearer {admin_token}"}
    res = await client.get("/api/v1/analytics/dashboard", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert "platform_metrics" in data
