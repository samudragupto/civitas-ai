import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_export_json_pdf_docx(client: AsyncClient, admin_token: str):
    headers = {"Authorization": f"Bearer {admin_token}"}
    
    # First create a simulation to export
    payload = {
        "title": "Export Target Simulation",
        "description": "Will be exported to PDF and DOCX",
        "scenario_type": "realistic"
    }
    create_res = await client.post("/api/v1/simulations/", json=payload, headers=headers)
    assert create_res.status_code == 201
    sim_id = create_res.json()["id"]

    # Export JSON
    json_res = await client.get(f"/api/v1/exports/{sim_id}/json", headers=headers)
    assert json_res.status_code == 200
    assert "application/json" in json_res.headers["content-type"]

    # Export PDF
    pdf_res = await client.get(f"/api/v1/exports/{sim_id}/pdf", headers=headers)
    assert pdf_res.status_code == 200
    assert "application/pdf" in pdf_res.headers["content-type"]
    assert pdf_res.content.startswith(b"%PDF")

    # Export DOCX
    docx_res = await client.get(f"/api/v1/exports/{sim_id}/docx", headers=headers)
    assert docx_res.status_code == 200
    assert "wordprocessingml" in docx_res.headers["content-type"]
