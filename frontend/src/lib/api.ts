import Cookies from "js-cookie";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

export interface User {
  id: number;
  username: string;
  email: string;
  role: "guest" | "registered" | "researcher" | "admin";
}

export interface SimulationSummary {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  scenario_type: "optimistic" | "realistic" | "pessimistic";
  created_at: string;
  updated_at: string;
}

export interface StructuredForecastOutput {
  executive_summary: string;
  forecasts: Record<number, any>;
  risk_analysis: {
    major_threats: string[];
    black_swan_events: string[];
    systemic_risks: string[];
  };
  opportunity_analysis: {
    emerging_industries: string[];
    future_jobs: string[];
    investment_opportunities: string[];
  };
  confidence_scores: Array<{ item: string; confidence_percentage: number }>;
  visualizations: {
    timeline: Array<any>;
    technology_roadmap: Array<any>;
    climate_evolution: Record<string, Array<{ year: number; value: number }>>;
    economic_transformation: Array<any>;
    global_influence_heatmap: Array<any>;
  };
}

export interface CompleteSimulation extends SimulationSummary {
  results: StructuredForecastOutput;
  ai_advancement: number;
  climate_action: number;
  global_stability: number;
  population_growth: number;
  energy_innovation: number;
  space_investment: number;
  automation_adoption: number;
  education_quality: number;
  healthcare_innovation: number;
}

export class APIClient {
  private static getHeaders(isForm: boolean = false): HeadersInit {
    const token = Cookies.get("civitas_access_token");
    const headers: Record<string, string> = {};
    if (!isForm) {
      headers["Content-Type"] = "application/json";
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  static async runDemoSimulation(params: {
    scenario: string;
    ai_advancement: number;
    climate_action: number;
    energy_innovation: number;
    space_investment: number;
  }): Promise<StructuredForecastOutput> {
    const query = new URLSearchParams({
      scenario: params.scenario,
      ai_advancement: params.ai_advancement.toString(),
      climate_action: params.climate_action.toString(),
      energy_innovation: params.energy_innovation.toString(),
      space_investment: params.space_investment.toString(),
    });
    const res = await fetch(`${API_BASE}/simulations/demo?${query}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to execute public demo simulation");
    }
    return res.json();
  }

  static async createSimulation(payload: any): Promise<CompleteSimulation> {
    const res = await fetch(`${API_BASE}/simulations/`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to execute professional simulation");
    }
    return res.json();
  }

  static async listSimulations(): Promise<SimulationSummary[]> {
    const res = await fetch(`${API_BASE}/simulations/`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to retrieve user simulations");
    }
    return res.json();
  }

  static async getSimulation(id: number): Promise<CompleteSimulation> {
    const res = await fetch(`${API_BASE}/simulations/${id}`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Simulation workspace not found");
    }
    return res.json();
  }

  static async deleteSimulation(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/simulations/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to purge simulation workspace");
    }
  }

  static async getAnalytics(): Promise<any> {
    const res = await fetch(`${API_BASE}/analytics/dashboard`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to fetch platform dashboard metrics");
    }
    return res.json();
  }

  static async listDataSources(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/data/sources`);
    if (!res.ok) throw new Error("Failed to list global empirical datastores");
    return res.json();
  }

  static getExportUrl(simId: number, format: "json" | "pdf" | "docx"): string {
    return `${API_BASE}/exports/${simId}/${format}`;
  }
}
