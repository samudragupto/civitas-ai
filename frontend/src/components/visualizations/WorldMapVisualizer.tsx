"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe2, Shield, TrendingUp, AlertTriangle, Cpu, Layers, ExternalLink } from "lucide-react";

export const WorldMapVisualizer: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("Indo-Pacific Pivot");

  const regions = [
    {
      id: "North American Economic Federation",
      cx: 220,
      cy: 160,
      gdp: "$38.5 Trillion",
      automation: 88,
      stability: 85,
      stance: "High Tech Green Tariff Wall",
      techHubs: ["Silicon Valley ASI Vault", "Austin Quantum Core"],
      color: "#3b82f6",
      desc: "Dominant AI compute infrastructure paired with advanced nuclear micro-reactors and aggressive orbital manufacturing syndicates.",
    },
    {
      id: "European Union & CANZUK Green Alliance",
      cx: 480,
      cy: 140,
      gdp: "$26.2 Trillion",
      automation: 84,
      stability: 89,
      stance: "Universal Ethical AI Charter",
      techHubs: ["Paris Bio-Printing Hub", "Frankfurt Fusion Grid"],
      color: "#10b981",
      desc: "World leader in biological longevity regulations, comprehensive Circular Carbon accounting, and multi-state autonomous judicial tribunals.",
    },
    {
      id: "Indo-Pacific Pivot & ASEAN Technocracy",
      cx: 720,
      cy: 230,
      gdp: "$31.0 Trillion",
      automation: 90,
      stability: 78,
      stance: "Hyper-Growth Interoperability",
      techHubs: ["Bengaluru Post-Scarcity Core", "Singapore Robotics Swarm"],
      color: "#8b5cf6",
      desc: "The primary manufacturing and demographic engine of the globe. Exploiting ultra-cheap perovskite solar and ubiquitous humanoid robotics adoption.",
    },
    {
      id: "East African Geothermal Commonwealth",
      cx: 550,
      cy: 310,
      gdp: "$8.4 Trillion",
      automation: 65,
      stability: 74,
      stance: "Leapfrog Infrastructure Pivot",
      techHubs: ["Nairobi LEO Spaceport", "Addis Ababa Agritech Node"],
      color: "#f59e0b",
      desc: "Rapid youth demographics powered entirely by massive Rift Valley geothermal installations and tokenized decentralized compute cooperatives.",
    },
    {
      id: "Gulf States Energy Federation",
      cx: 590,
      cy: 210,
      gdp: "$11.2 Trillion",
      automation: 82,
      stability: 80,
      stance: "Sovereign AI Curation Tunnels",
      techHubs: ["Abu Dhabi ASI Oasis", "Riyadh Autonomous Fleet"],
      color: "#06b6d4",
      desc: "Leveraging vast historical financial endowments to build post-oil solar desalination mega-projects and sovereign AI mainframes.",
    },
    {
      id: "Latin American Bio-Regenerative Union",
      cx: 310,
      cy: 360,
      gdp: "$9.8 Trillion",
      automation: 70,
      stability: 76,
      stance: "Biosphere Stewardship Index",
      techHubs: ["São Paulo Carbon Sink Core", "Santiago Synthetic Bio"],
      color: "#ec4899",
      desc: "Monetizing the Amazon and primary biomes as actively protected global ecological utilities supported by autonomous robotic conservation sentinels.",
    },
  ];

  const current = regions.find((r) => r.id === selectedRegion) || regions[2];

  return (
    <div className="glass-panel p-8 rounded-3xl space-y-8 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs">
            STRATEGIC GEOPOLITICAL PIVOT
          </Badge>
          <h3 className="text-2xl font-black text-white flex items-center space-x-2.5 tracking-tight">
            <Globe2 className="h-6 w-6 text-indigo-400" />
            <span>Interactive World Influence Heatmap</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-xl font-medium">
            Select major macro-regions below or click interactive nodes on the map to evaluate regional compute alliances, sovereign wealth shifts, and automation saturation.
          </p>
        </div>

        {/* Region Pills */}
        <div className="flex flex-wrap items-center gap-2 max-w-md justify-end">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                selectedRegion === reg.id
                  ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/25 scale-105"
                  : "bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              {reg.id.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Interactive World Map */}
        <div className="lg:col-span-8 bg-[#04060d]/80 rounded-2xl p-6 border border-white/5 relative flex items-center justify-center min-h-[380px] overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          
          <svg viewBox="0 0 1000 500" className="w-full h-full max-h-[420px] drop-shadow-xl select-none z-10">
            {/* Simplified High-Fidelity Continents Contours */}
            <path
              d="M150,80 Q250,50 300,100 Q280,200 200,250 Q120,200 150,80 Z"
              fill="#1e293b"
              opacity={0.5}
              stroke="#475569"
              strokeWidth="1.5"
              className="transition-colors hover:fill-slate-700/60 cursor-pointer"
              onClick={() => setSelectedRegion("North American Economic Federation")}
            />
            <path
              d="M260,260 Q360,280 340,420 Q240,480 200,340 Q240,280 260,260 Z"
              fill="#1e293b"
              opacity={0.5}
              stroke="#475569"
              strokeWidth="1.5"
              className="transition-colors hover:fill-slate-700/60 cursor-pointer"
              onClick={() => setSelectedRegion("Latin American Bio-Regenerative Union")}
            />
            <path
              d="M450,70 Q580,50 620,150 Q520,190 440,140 Q420,100 450,70 Z"
              fill="#1e293b"
              opacity={0.5}
              stroke="#475569"
              strokeWidth="1.5"
              className="transition-colors hover:fill-slate-700/60 cursor-pointer"
              onClick={() => setSelectedRegion("European Union & CANZUK Green Alliance")}
            />
            <path
              d="M620,70 Q920,50 900,220 Q750,280 620,180 Z"
              fill="#1e293b"
              opacity={0.5}
              stroke="#475569"
              strokeWidth="1.5"
              className="transition-colors hover:fill-slate-700/60 cursor-pointer"
              onClick={() => setSelectedRegion("Indo-Pacific Pivot & ASEAN Technocracy")}
            />
            <path
              d="M480,180 Q620,220 580,380 Q480,400 440,280 Z"
              fill="#1e293b"
              opacity={0.5}
              stroke="#475569"
              strokeWidth="1.5"
              className="transition-colors hover:fill-slate-700/60 cursor-pointer"
              onClick={() => setSelectedRegion("East African Geothermal Commonwealth")}
            />
            <path
              d="M580,180 Q660,190 640,260 Q560,250 580,180 Z"
              fill="#1e293b"
              opacity={0.5}
              stroke="#475569"
              strokeWidth="1.5"
              className="transition-colors hover:fill-slate-700/60 cursor-pointer"
              onClick={() => setSelectedRegion("Gulf States Energy Federation")}
            />
            <path
              d="M750,300 Q880,290 850,420 Q720,410 750,300 Z"
              fill="#1e293b"
              opacity={0.3}
              stroke="#334155"
              strokeDasharray="4 4"
            />

            {/* Global Superconnection Intersecting Tunnels */}
            <path d="M220,160 Q480,80 720,230" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 6" opacity={0.4} />
            <path d="M480,140 Q550,220 550,310" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6 6" opacity={0.4} />
            <path d="M720,230 Q650,280 590,210" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="6 6" opacity={0.4} />

            {/* Nodes */}
            {regions.map((reg) => {
              const isSel = selectedRegion === reg.id;
              return (
                <g key={reg.id} className="cursor-pointer transition-transform duration-300 hover:scale-125" onClick={() => setSelectedRegion(reg.id)}>
                  {isSel && (
                    <circle cx={reg.cx} cy={reg.cy} r="28" fill={reg.color} opacity="0.2" className="animate-ping" />
                  )}
                  <circle cx={reg.cx} cy={reg.cy} r={isSel ? "12" : "8"} fill={reg.color} stroke="#ffffff" strokeWidth="2" />
                  <text x={reg.cx} y={reg.cy - 18} fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" className="font-mono drop-shadow-md">
                    {reg.id.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 left-4 bg-slate-900/90 p-3 rounded-xl border border-white/10 flex items-center space-x-4 text-xs font-mono">
            <span className="flex items-center space-x-1.5 text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Active Superpower Nodes</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Global Laser Relays Operational</span>
          </div>
        </div>

        {/* Selected Region Detailed Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-4 glass-card p-6 rounded-2xl space-y-6 border border-white/10 shadow-xl"
          >
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black uppercase text-indigo-400 tracking-wider">SOVEREIGNTY PROFILE</span>
                <Badge variant="outline" className="border-white/20 text-white font-mono text-[10px] bg-slate-900">
                  {current.stance}
                </Badge>
              </div>
              <h4 className="text-2xl font-black text-white tracking-tight leading-tight">
                {current.id}
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {current.desc}
            </p>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-white/5">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-400">Regional Gross Product:</span>
                  <span className="text-emerald-400 font-extrabold text-sm">{current.gdp}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-indigo-300">Automation Saturation</span>
                  <span className="text-white">{current.automation}%</span>
                </div>
                <Progress value={current.automation} className="h-2 bg-slate-800" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-blue-300">Geopolitical Stability</span>
                  <span className="text-white">{current.stability}%</span>
                </div>
                <Progress value={current.stability} className="h-2 bg-slate-800" />
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2">
              <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block">Principal Multi-Domain AI Vaults:</span>
              <div className="flex flex-wrap gap-2">
                {current.techHubs.map((hub, h) => (
                  <span key={h} className="inline-flex items-center space-x-1.5 bg-slate-900/90 text-slate-200 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
                    <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                    <span>{hub}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
