"use client";

import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
} from "recharts";

interface InfluenceHeatmapProps {
  data: Array<{
    country: string;
    influence_score_2030: number;
    influence_score_2050: number;
    influence_score_2100: number;
  }>;
}

export const InfluenceHeatmapChart: React.FC<InfluenceHeatmapProps> = ({ data }) => {
  const chartData = data?.map((item) => ({
    country: item.country,
    "2030 Horizon": item.influence_score_2030,
    "2050 Horizon": item.influence_score_2050,
    "2100 Horizon": item.influence_score_2100,
  })) || [];

  return (
    <div className="h-[450px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
          <PolarGrid stroke="#334155" opacity={0.6} />
          <PolarAngleAxis dataKey="country" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 100]} stroke="#64748b" />
          <Radar name="Horizon 2030" dataKey="2030 Horizon" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
          <Radar name="Horizon 2050" dataKey="2050 Horizon" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
          <Radar name="Horizon 2100" dataKey="2100 Horizon" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", color: "#f8fafc" }}
          />
          <Legend wrapperStyle={{ color: "#e2e8f0" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
