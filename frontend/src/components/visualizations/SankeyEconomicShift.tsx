"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Layers, ArrowRight, TrendingUp, DollarSign, ExternalLink } from "lucide-react";

export const SankeyEconomicShift: React.FC = () => {
  const [activeFlow, setActiveFlow] = useState<number | null>(null);

  const flows = [
    {
      source: "Sovereign Wealth Endowment ($42T)",
      target: "Planetary Geoengineering & Biosphere ($14T)",
      value: 14,
      color: "#10b981",
      path: "M200,100 C350,100 350,80 550,80",
      roi: "14.2x Est ROI",
      desc: "Massive sovereign debt re-allocated into atmospheric Direct Air Capture and ocean iron fertilization.",
    },
    {
      source: "Sovereign Wealth Endowment ($42T)",
      target: "Universal Commercial Humanoid Fleet ($18T)",
      value: 18,
      color: "#3b82f6",
      path: "M200,100 C350,100 350,180 550,180",
      roi: "22.5x Est ROI",
      desc: "Capital inflows building 100+ million industrial robots outnumbering human municipal labor.",
    },
    {
      source: "Private Tech Megaconglomerates ($38T)",
      target: "Planetary ASI Mainframes & Compute ($24T)",
      value: 24,
      color: "#8b5cf6",
      path: "M200,260 C350,260 350,280 550,280",
      roi: "35.0x Est ROI",
      desc: "Private capital expanding 1,000-logical-qubit systems and automated scientific discovery engines.",
    },
    {
      source: "Private Tech Megaconglomerates ($38T)",
      target: "Commercial Near-Earth Asteroid Mining ($14T)",
      value: 14,
      color: "#f59e0b",
      path: "M200,260 C350,260 350,380 550,380",
      roi: "19.8x Est ROI",
      desc: "Prospecting fleets ferrying refined platinum-group structural rare Earths to cis-lunar manufacturing hubs.",
    },
    {
      source: "Global Green Federations ($25T)",
      target: "Next-Gen Solid State Battery Refineries ($15T)",
      value: 15,
      color: "#06b6d4",
      path: "M200,420 C350,420 350,460 550,460",
      roi: "11.4x Est ROI",
      desc: "Eliminating legacy lithium dependency through advanced sodium and solid-state mineral refinement.",
    },
  ];

  return (
    <div className="glass-panel p-8 rounded-3xl space-y-8 border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <Badge variant="outline" className="text-emerald-400 border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs">
            MACRO-ECONOMIC FLOWS
          </Badge>
          <h3 className="text-2xl font-black text-white flex items-center space-x-2 tracking-tight">
            <DollarSign className="h-6 w-6 text-emerald-400" />
            <span>Global Civilizational Capital Transformation ($105 Trillion GDP)</span>
          </h3>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono bg-slate-900/80 px-4 py-2 rounded-xl border border-white/10 text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Capital Flow LEDGER</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Flow Diagram */}
        <div className="lg:col-span-8 bg-[#04060d]/80 rounded-2xl p-6 border border-white/5 relative min-h-[460px] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 750 520" className="w-full h-full max-h-[500px] select-none">
            {/* Source Origin Nodes */}
            <g className="font-mono font-bold text-xs">
              <rect x="20" y="60" width="180" height="80" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="110" y="100" fill="#ffffff" textAnchor="middle">Sovereign Wealth</text>
              <text x="110" y="120" fill="#94a3b8" textAnchor="middle" fontSize="10">($42.0 Trillion)</text>

              <rect x="20" y="220" width="180" height="80" rx="12" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
              <text x="110" y="260" fill="#ffffff" textAnchor="middle">Tech Megaconglom</text>
              <text x="110" y="280" fill="#94a3b8" textAnchor="middle" fontSize="10">($38.0 Trillion)</text>

              <rect x="20" y="380" width="180" height="80" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="110" y="420" fill="#ffffff" textAnchor="middle">Green Federations</text>
              <text x="110" y="440" fill="#94a3b8" textAnchor="middle" fontSize="10">($25.0 Trillion)</text>
            </g>

            {/* Flows */}
            {flows.map((fl, idx) => {
              const isSel = activeFlow === idx;
              return (
                <g key={idx} className="cursor-pointer transition-all" onMouseEnter={() => setActiveFlow(idx)} onMouseLeave={() => setActiveFlow(null)}>
                  <path
                    d={fl.path}
                    fill="none"
                    stroke={fl.color}
                    strokeWidth={isSel ? fl.value * 2.2 : fl.value * 1.5}
                    opacity={isSel ? 0.85 : 0.35}
                    className="transition-all duration-300"
                  />
                  {isSel && (
                    <path
                      d={fl.path}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeDasharray="8 8"
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}

            {/* Target Future Industry Nodes */}
            <g className="font-mono font-bold text-xs">
              <rect x="550" y="40" width="180" height="70" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="640" y="70" fill="#ffffff" textAnchor="middle">Biosphere Regen</text>
              <text x="640" y="90" fill="#10b981" textAnchor="middle" fontSize="10">$14T (14.2x ROI)</text>

              <rect x="550" y="140" width="180" height="70" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="640" y="170" fill="#ffffff" textAnchor="middle">Humanoid Fleet</text>
              <text x="640" y="190" fill="#3b82f6" textAnchor="middle" fontSize="10">$18T (22.5x ROI)</text>

              <rect x="550" y="240" width="180" height="70" rx="12" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
              <text x="640" y="270" fill="#ffffff" textAnchor="middle">Planetary ASI</text>
              <text x="640" y="290" fill="#8b5cf6" textAnchor="middle" fontSize="10">$24T (35.0x ROI)</text>

              <rect x="550" y="340" width="180" height="70" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="640" y="370" fill="#ffffff" textAnchor="middle">Asteroid Mining</text>
              <text x="640" y="390" fill="#f59e0b" textAnchor="middle" fontSize="10">$14T (19.8x ROI)</text>

              <rect x="550" y="430" width="180" height="70" rx="12" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
              <text x="640" y="460" fill="#ffffff" textAnchor="middle">Solid State Storage</text>
              <text x="640" y="480" fill="#06b6d4" textAnchor="middle" fontSize="10">$15T (11.4x ROI)</text>
            </g>
          </svg>
        </div>

        {/* Dynamic Context Card */}
        <div className="lg:col-span-4 space-y-5">
          {activeFlow !== null ? (
            <motion.div
              key={activeFlow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-2xl space-y-5 border border-white/15 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <Badge variant="outline" className="border-white/20 text-white font-mono text-xs bg-slate-900">
                  {flows[activeFlow].roi}
                </Badge>
                <span className="text-xs font-mono font-black text-emerald-400">${flows[activeFlow].value} Trillion Flow</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Capital Origin Flow:</span>
                <h4 className="text-lg font-bold text-white">{flows[activeFlow].source}</h4>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Target Industry Sector:</span>
                <h4 className="text-xl font-black text-indigo-300">{flows[activeFlow].target}</h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-900/60 p-3.5 rounded-xl border border-white/5">
                {flows[activeFlow].desc}
              </p>
            </motion.div>
          ) : (
            <div className="glass-card p-8 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]">
              <TrendingUp className="h-12 w-12 text-emerald-400/50 animate-bounce" />
              <h4 className="text-lg font-bold text-white">Hover over any flow ribbon</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Hover or click the intersecting economic capital ribbons on the left to reveal exact R&D liquidity transformations and multi-horizon ROI projections.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
