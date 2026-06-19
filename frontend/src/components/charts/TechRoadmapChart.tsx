"use client";

import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface TechRoadmapChartProps {
  data: Array<{
    technology: string;
    estimated_year: number;
    readiness_level: number;
  }>;
}

export const TechRoadmapChart: React.FC<TechRoadmapChartProps> = ({ data }) => {
  const chartData = data?.map((item) => ({
    name: item.technology,
    year: item.estimated_year,
    readiness: item.readiness_level,
  })) || [];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis type="number" dataKey="year" name="Est. Horizon" domain={[2026, 2100]} stroke="#94a3b8" />
          <YAxis type="number" dataKey="readiness" name="Readiness Index (1-10)" domain={[1, 10]} stroke="#94a3b8" />
          <ZAxis type="category" dataKey="name" name="Innovation" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", color: "#f8fafc" }}
            formatter={(value: any, name: any, props: any) => {
              if (name === "Innovation") return [value, "Technology"];
              return [value, name];
            }}
          />
          <Scatter name="Technological Milestones" data={chartData} fill="#06b6d4" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
