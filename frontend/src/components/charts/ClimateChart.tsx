"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ClimateChartProps {
  data: Record<string, Array<{ year: number; value: number }>>;
}

export const ClimateChart: React.FC<ClimateChartProps> = ({ data }) => {
  const temp = data?.global_temperature_change_c || [];
  const emissions = data?.carbon_emissions_gt || [];
  const seaLevel = data?.sea_level_rise_cm || [];

  // Merge datasets by year
  const years = [2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100];
  const chartData = years.map((y) => {
    const tItem = temp.find((item) => item.year === y);
    const eItem = emissions.find((item) => item.year === y);
    const slItem = seaLevel.find((item) => item.year === y);
    return {
      year: y,
      temperatureAnomaly: tItem ? tItem.value : 1.5,
      carbonEmissionsGt: eItem ? eItem.value : 30.0,
      seaLevelRiseCm: slItem ? slItem.value : 15.0,
    };
  });

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="seaLevelGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis dataKey="year" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", color: "#f8fafc" }}
          />
          <Legend wrapperStyle={{ color: "#e2e8f0", paddingTop: "10px" }} />
          <Area
            type="monotone"
            dataKey="temperatureAnomaly"
            name="Temp Anomaly (°C)"
            stroke="#f97316"
            fillOpacity={1}
            fill="url(#tempGradient)"
          />
          <Area
            type="monotone"
            dataKey="carbonEmissionsGt"
            name="Carbon Emissions (Gt)"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#emissionsGradient)"
          />
          <Area
            type="monotone"
            dataKey="seaLevelRiseCm"
            name="Sea Level Rise (cm)"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#seaLevelGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
