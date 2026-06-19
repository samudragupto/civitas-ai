import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_register_user(client: AsyncClient):
    payload = {
        "email": "new_researcher@civitasai.org",
        "username": "new_researcher",
        "password": "SecurePassword123!",
        "role": "researcher"
    }
    response = await client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == payload["email"]
    assert data["username"] == payload["username"]
    assert "id" in data


@pytest.mark.asyncio
async def test_login_user(client: AsyncClient):
    payload = {
        "username": "user_test",
        "password": "TestUser2026!"
    }
    response = await client.post("/api/v1/auth/login", data=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["username"] == "user_test"


@pytest.mark.asyncio
async def test_get_me(client: AsyncClient, user_token: str):
    headers = {"Authorization": f"Bearer {user_token}"}
    response = await client.get("/api/v1/auth/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "user_test"
