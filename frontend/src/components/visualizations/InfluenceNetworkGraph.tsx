"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Cpu, Shield, Globe2, Rocket, Zap, ExternalLink, Network, Sparkles } from "lucide-react";

export const InfluenceNetworkGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>("Planetary ASI Mainframe");

  const nodes = [
    {
      id: "Planetary ASI Mainframe",
      cx: 380,
      cy: 220,
      r: 34,
      color: "#6366f1",
      type: "Compute",
      connections: ["Decentralized Quantum Mesh", "Orbital Solar Ring Core", "Universal Cybernetic Link", "Cis-Lunar Heavy Shipyard"],
      power: "10^30 FLOPS",
      desc: "The overarching planetary sovereign Artificial Superintelligence grid coordinating municipal energy dispatch and scientific exploration.",
    },
    {
      id: "Cis-Lunar Heavy Shipyard",
      cx: 160,
      cy: 120,
      r: 28,
      color: "#f59e0b",
      type: "Space",
      connections: ["Planetary ASI Mainframe", "Orbital Solar Ring Core", "Mars Valles Outpost"],
      power: "14,000 Metric Tons/Yr",
      desc: "Fully automated orbital robotic drydocks fabricating fusion-powered interstellar probes and near-Earth asteroid capture harvesters.",
    },
    {
      id: "Orbital Solar Ring Core",
      cx: 600,
      cy: 100,
      r: 30,
      color: "#10b981",
      type: "Energy",
      connections: ["Planetary ASI Mainframe", "Cis-Lunar Heavy Shipyard", "Universal Cybernetic Link"],
      power: "450 Gigawatts",
      desc: "Mega-scale photovoltaic collectors orbiting the equator, transmitting limitless clean baseload energy down to terrestrial rectennas via microwave arrays.",
    },
    {
      id: "Decentralized Quantum Mesh",
      cx: 240,
      cy: 360,
      r: 26,
      color: "#3b82f6",
      type: "Cyber",
      connections: ["Planetary ASI Mainframe", "Universal Cybernetic Link"],
      power: "100,000 Qubits",
      desc: "Global fault-tolerant quantum entanglement communication relays replacing traditional undersea fiber optic networks entirely.",
    },
    {
      id: "Universal Cybernetic Link",
      cx: 560,
      cy: 340,
      r: 28,
      color: "#ec4899",
      type: "Society",
      connections: ["Planetary ASI Mainframe", "Orbital Solar Ring Core", "Decentralized Quantum Mesh"],
      power: "4.2 Billion Adopt",
      desc: "High-bandwidth synthetic neocortex prosthetics providing real-time direct conceptual downloads and shared experiential telepathy.",
    },
    {
      id: "Mars Valles Outpost",
      cx: 100,
      cy: 280,
      r: 22,
      color: "#ef4444",
      type: "Space",
      connections: ["Cis-Lunar Heavy Shipyard"],
      power: "12,000 Colonists",
      desc: "Self-sustaining biospheric subterranean metropolis situated in Valles Marineris undergoing active atmospheric terraforming.",
    },
  ];

  const current = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="glass-panel p-8 rounded-3xl space-y-8 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <Badge variant="outline" className="text-indigo-400 border-indigo-400/40 bg-indigo-500/10 px-3 py-1 font-mono text-xs">
            STRATEGIC INTERDEPENDENCY
          </Badge>
          <h3 className="text-2xl font-black text-white flex items-center space-x-2 tracking-tight">
            <Network className="h-6 w-6 text-indigo-400" />
            <span>Multi-Domain Civilizational Influence Network</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-xl font-medium">
            Explore the topological node-and-edge matrix interconnecting global computational mainframes, cis-lunar shipyards, and orbital energy collectors.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/10 text-xs font-mono">
          <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
          <span className="text-white font-bold">{nodes.length} Primary Network Anchors</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Network Visualizer */}
        <div className="lg:col-span-7 bg-[#04060d]/80 rounded-2xl p-6 border border-white/5 relative min-h-[420px] flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

          <svg viewBox="0 0 750 460" className="w-full h-full max-h-[440px] select-none z-10">
            {/* Edges / Connections */}
            <g strokeWidth="2" opacity={0.4}>
              <line x1="380" y1="220" x2="160" y2="120" stroke="#f59e0b" className="transition-all" />
              <line x1="380" y1="220" x2="600" y2="100" stroke="#10b981" className="transition-all" />
              <line x1="380" y1="220" x2="240" y2="360" stroke="#3b82f6" className="transition-all" />
              <line x1="380" y1="220" x2="560" y2="340" stroke="#ec4899" className="transition-all" />
              <line x1="160" y1="120" x2="600" y2="100" stroke="#10b981" strokeDasharray="6 6" />
              <line x1="160" y1="120" x2="100" y2="280" stroke="#ef4444" />
              <line x1="600" y1="100" x2="560" y2="340" stroke="#ec4899" strokeDasharray="6 6" />
              <line x1="240" y1="360" x2="560" y2="340" stroke="#3b82f6" strokeDasharray="6 6" />
            </g>

            {/* Highlighting specific active connections */}
            {current && (
              <g stroke="#ffffff" strokeWidth="3" strokeDasharray="8 8" className="animate-pulse">
                {nodes.map((target) => {
                  if (current.connections.includes(target.id)) {
                    return <line key={target.id} x1={current.cx} y1={current.cy} x2={target.cx} y2={target.cy} />;
                  }
                  return null;
                })}
              </g>
            )}

            {/* Nodes */}
            {nodes.map((n) => {
              const isSel = selectedNode === n.id;
              return (
                <g key={n.id} className="cursor-pointer transition-transform duration-300 hover:scale-125" onClick={() => setSelectedNode(n.id)}>
                  {isSel && (
                    <circle cx={n.cx} cy={n.cy} r={n.r + 10} fill={n.color} opacity="0.25" className="animate-ping" />
                  )}
                  <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} stroke="#ffffff" strokeWidth={isSel ? "4" : "2"} className="drop-shadow-lg" />
                  <text x={n.cx} y={n.cy + 5} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" className="font-mono drop-shadow">
                    {n.type}
                  </text>
                  <text x={n.cx} y={n.cy - n.r - 8} fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-sans">
                    {n.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Details Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-5 glass-card p-6 rounded-2xl space-y-6 border border-white/10 shadow-xl"
          >
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-white/20 text-white font-mono text-xs bg-indigo-600">
                  {current.type} ANCHOR
                </Badge>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
                  {current.power}
                </span>
              </div>
              <h4 className="text-2xl font-black text-white tracking-tight leading-tight">
                {current.id}
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-900/60 p-4 rounded-xl border border-white/5">
              {current.desc}
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-black text-slate-400 uppercase tracking-wider block">Direct Network Interlink Tunnels:</span>
              <div className="space-y-2">
                {current.connections.map((conn, c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedNode(conn)}
                    className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between text-xs font-mono text-white group"
                  >
                    <span className="flex items-center space-x-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 group-hover:scale-150 transition-transform" />
                      <span>{conn}</span>
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
