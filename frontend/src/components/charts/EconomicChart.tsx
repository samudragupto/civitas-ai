"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface EconomicChartProps {
  data: Array<{
    industry: string;
    share_2030: number;
    share_2050: number;
    share_2100: number;
  }>;
}

export const EconomicChart: React.FC<EconomicChartProps> = ({ data }) => {
  const chartData = data?.map((item) => ({
    name: item.industry.replace("&", "/"),
    "Horizon 2030 (%)": item.share_2030,
    "Horizon 2050 (%)": item.share_2050,
    "Horizon 2100 (%)": item.share_2100,
  })) || [];

  return (
    <div className="h-[450px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 120, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis type="category" dataKey="name" stroke="#94a3b8" width={110} tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", color: "#f8fafc" }}
          />
          <Legend wrapperStyle={{ color: "#e2e8f0", paddingTop: "10px" }} />
          <Bar dataKey="Horizon 2030 (%)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          <Bar dataKey="Horizon 2050 (%)" fill="#10b981" radius={[0, 4, 4, 0]} />
          <Bar dataKey="Horizon 2100 (%)" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
