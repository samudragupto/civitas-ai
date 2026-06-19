"use client";

import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Globe2, TrendingDown, Thermometer, Waves, CloudRain } from "lucide-react";

interface AdvancedClimateProps {
  data?: Record<string, Array<{ year: number; value: number }>>;
}

export const AdvancedClimateLineChart: React.FC<AdvancedClimateProps> = ({ data }) => {
  const temp = data?.global_temperature_change_c || [];
  const emissions = data?.carbon_emissions_gt || [];
  const seaLevel = data?.sea_level_rise_cm || [];

  const years = [2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100];
  const chartData = years.map((y) => {
    const tItem = temp.find((item) => item.year === y);
    const eItem = emissions.find((item) => item.year === y);
    const slItem = seaLevel.find((item) => item.year === y);
    return {
      year: y,
      "Temp Anomaly (°C)": tItem ? tItem.value : +(1.35 + (y - 2020) * 0.015).toFixed(2),
      "Net CO2 Emissions (Gt)": eItem ? eItem.value : +(36.8 - (y - 2020) * 0.45).toFixed(2),
      "Sea Level Rise (cm)": slItem ? slItem.value : +(10.0 + (y - 2030) * 0.35).toFixed(2),
    };
  });

  return (
    <div className="glass-panel p-8 rounded-3xl space-y-6 border border-white/10 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <Badge variant="outline" className="text-teal-400 border-teal-400/40 bg-teal-500/10 px-3 py-1 font-mono text-xs">
            BIOSPHERE EQUILIBRIUM
          </Badge>
          <h3 className="text-2xl font-black text-white flex items-center space-x-2 tracking-tight">
            <Thermometer className="h-6 w-6 text-teal-400" />
            <span>Advanced Atmospheric Evolution & Decarbonization Curves (2030 → 2100)</span>
          </h3>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/10 text-xs font-mono">
          <TrendingDown className="h-4 w-4 text-emerald-400 animate-bounce" />
          <span className="text-slate-300">Direct Air Capture Active</span>
        </div>
      </div>

      <div className="h-[440px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="emissionsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
            
            <XAxis dataKey="year" stroke="#94a3b8" fontFamily="monospace" fontSize={12} tickLine={false} />
            <YAxis yAxisId="left" stroke="#f59e0b" orientation="left" fontFamily="monospace" fontSize={12} tickLine={false} />
            <YAxis yAxisId="right" stroke="#3b82f6" orientation="right" fontFamily="monospace" fontSize={12} tickLine={false} />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(16px)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontFamily: "monospace", color: "#e2e8f0", paddingTop: "12px" }} />

            {/* Filled Area for CO2 transition to net negative */}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="Net CO2 Emissions (Gt)"
              fill="url(#emissionsGrad)"
              stroke="#ef4444"
              strokeWidth={2.5}
            />

            {/* Polished Line for Surface Temp */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Temp Anomaly (°C)"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 5, fill: "#f59e0b", stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 8, stroke: "#ffffff", strokeWidth: 2 }}
            />

            {/* Polished Line for Sea Level Rise */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Sea Level Rise (cm)"
              stroke="#3b82f6"
              strokeWidth={3}
              strokeDasharray="6 6"
              dot={{ r: 5, fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 8, stroke: "#ffffff", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
