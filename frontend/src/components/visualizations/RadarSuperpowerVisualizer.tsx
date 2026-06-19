"use client";

import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Sparkles, TrendingUp, Network, Cpu } from "lucide-react";

export const RadarSuperpowerVisualizer: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<"US" | "China" | "EU" | "India" | "Corporate">("US");

  const datastore = {
    US: [
      { domain: "AI & ASI Mainframes", Current: 92, Horizon2050: 98, Horizon2100: 99 },
      { domain: "Cis-Lunar Operations", Current: 85, Horizon2050: 95, Horizon2100: 98 },
      { domain: "Kinetic Military Power", Current: 95, Horizon2050: 90, Horizon2100: 85 },
      { domain: "Global Cyber War", Current: 90, Horizon2050: 94, Horizon2100: 96 },
      { domain: "Economic Capital", Current: 92, Horizon2050: 88, Horizon2100: 86 },
      { domain: "Longevity & Biotech", Current: 88, Horizon2050: 96, Horizon2100: 99 },
    ],
    China: [
      { domain: "AI & ASI Mainframes", Current: 90, Horizon2050: 96, Horizon2100: 97 },
      { domain: "Cis-Lunar Operations", Current: 88, Horizon2050: 97, Horizon2100: 99 },
      { domain: "Kinetic Military Power", Current: 92, Horizon2050: 88, Horizon2100: 84 },
      { domain: "Global Cyber War", Current: 91, Horizon2050: 95, Horizon2100: 97 },
      { domain: "Economic Capital", Current: 89, Horizon2050: 90, Horizon2100: 88 },
      { domain: "Longevity & Biotech", Current: 84, Horizon2050: 92, Horizon2100: 96 },
    ],
    EU: [
      { domain: "AI & ASI Mainframes", Current: 82, Horizon2050: 90, Horizon2100: 94 },
      { domain: "Cis-Lunar Operations", Current: 76, Horizon2050: 86, Horizon2100: 92 },
      { domain: "Kinetic Military Power", Current: 78, Horizon2050: 74, Horizon2100: 70 },
      { domain: "Global Cyber War", Current: 85, Horizon2050: 91, Horizon2100: 95 },
      { domain: "Economic Capital", Current: 86, Horizon2050: 87, Horizon2100: 89 },
      { domain: "Longevity & Biotech", Current: 91, Horizon2050: 98, Horizon2100: 100 },
    ],
    India: [
      { domain: "AI & ASI Mainframes", Current: 78, Horizon2050: 92, Horizon2100: 96 },
      { domain: "Cis-Lunar Operations", Current: 74, Horizon2050: 88, Horizon2100: 95 },
      { domain: "Kinetic Military Power", Current: 82, Horizon2050: 85, Horizon2100: 82 },
      { domain: "Global Cyber War", Current: 80, Horizon2050: 89, Horizon2100: 94 },
      { domain: "Economic Capital", Current: 80, Horizon2050: 91, Horizon2100: 95 },
      { domain: "Longevity & Biotech", Current: 72, Horizon2050: 87, Horizon2100: 93 },
    ],
    Corporate: [
      { domain: "AI & ASI Mainframes", Current: 95, Horizon2050: 100, Horizon2100: 100 },
      { domain: "Cis-Lunar Operations", Current: 80, Horizon2050: 96, Horizon2100: 100 },
      { domain: "Kinetic Military Power", Current: 60, Horizon2050: 82, Horizon2100: 90 },
      { domain: "Global Cyber War", Current: 94, Horizon2050: 99, Horizon2100: 100 },
      { domain: "Economic Capital", Current: 96, Horizon2050: 99, Horizon2100: 100 },
      { domain: "Longevity & Biotech", Current: 90, Horizon2050: 99, Horizon2100: 100 },
    ],
  };

  const chartData = datastore[selectedEntity];

  return (
    <div className="glass-panel p-8 rounded-3xl space-y-6 border border-white/10 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <Badge variant="outline" className="text-purple-400 border-purple-400/40 bg-purple-500/10 px-3 py-1 font-mono text-xs">
            SUPERPOWER DOMAIN EQUILIBRIUM
          </Badge>
          <h3 className="text-2xl font-black text-white flex items-center space-x-2 tracking-tight">
            <Network className="h-6 w-6 text-purple-400" />
            <span>Overarching Domain Superiority Radar Matrix</span>
          </h3>
        </div>

        {/* Entity Selector */}
        <div className="flex flex-wrap gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10">
          {(["US", "China", "EU", "India", "Corporate"] as const).map((ent) => (
            <button
              key={ent}
              onClick={() => setSelectedEntity(ent)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedEntity === ent
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {ent === "Corporate" ? "Decentralized Corporate Syndicates" : `${ent} Superpower`}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[460px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
            <PolarGrid stroke="#334155" opacity={0.6} />
            <PolarAngleAxis dataKey="domain" stroke="#cbd5e1" fontFamily="monospace" fontSize={11} />
            <PolarRadiusAxis domain={[0, 100]} stroke="#64748b" fontFamily="monospace" fontSize={10} />
            
            <Radar
              name="Current Level (2026)"
              dataKey="Current"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.25}
            />
            <Radar
              name="Horizon 2050"
              dataKey="Horizon2050"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.25}
            />
            <Radar
              name="Horizon 2100"
              dataKey="Horizon2100"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.25}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(16px)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontFamily: "monospace", color: "#e2e8f0" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
