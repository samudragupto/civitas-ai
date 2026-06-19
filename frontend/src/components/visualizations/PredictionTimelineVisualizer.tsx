"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Compass, Sparkles, Zap, ShieldCheck, TrendingUp, Cpu, ExternalLink } from "lucide-react";

interface Milestone {
  year: number;
  category: "Technology" | "Environment" | "Economy" | "Society" | "Space" | "Geopolitics" | "Energy";
  title: string;
  desc: string;
  impact: "Revolutionary" | "Transformative" | "High";
  prob: number;
}

export const PredictionTimelineVisualizer: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");

  const milestones: Milestone[] = [
    { year: 2028, category: "Technology", title: "Sub-Vocal Multimodal Pendants", desc: "Mass shift to subtle subvocal computational AI hardware replacing handheld smartphones entirely.", impact: "High", prob: 94 },
    { year: 2031, category: "Technology", title: "1,000-Logical-Qubit Quantum Mainframes", desc: "Universal fault-tolerant quantum arrays operational for high-temp superconductivity and chemical simulation.", impact: "Revolutionary", prob: 88 },
    { year: 2032, category: "Environment", title: "30x30 Biodiversity Protection Passed", desc: "Global coalition enforces active protection across 30% of critical terrestrial and marine biodiversity hot zones.", impact: "High", prob: 91 },
    { year: 2035, category: "Economy", title: "Universal Commercial Humanoid Saturation", desc: "Over 100 million autonomous domestic and industrial humanoid robots officially outnumber human municipal labor.", impact: "Transformative", prob: 89 },
    { year: 2042, category: "Space", title: "Lunar South Pole Mass Driver Operational", desc: "Automated electromagnetic catapults launch refined Helium-3 and propellant ice from permanent polar bases.", impact: "Transformative", prob: 82 },
    { year: 2048, category: "Energy", title: "Commercial Magnetic Confinement Fusion", desc: "First 5 Gigawatt fusion reactor connects directly to the European high-voltage direct current baseload grid.", impact: "Revolutionary", prob: 85 },
    { year: 2055, category: "Society", title: "Universal Biological Longevity Escape Velocity", desc: "CRISPR and epigenetic rejuvenation therapies enter generic subsidized pharmaceutical distribution lines globally.", impact: "Revolutionary", prob: 78 },
    { year: 2070, category: "Environment", title: "Global Decarbonization Net-Negative Equilibrium", desc: "Atmospheric CO2 levels officially execute a persistent downward trajectory powered by Direct Air Capture swarms.", impact: "Transformative", prob: 80 },
    { year: 2080, category: "Geopolitics", title: "Earth-Space Economic Federation Charter", desc: "Constitutional treaty formalizing complete political and fiscal equality between terrestrial nations and Martian assemblies.", impact: "High", prob: 75 },
    { year: 2095, category: "Space", title: "First Interstellar Light Sail Probe Fleet Launch", desc: "Autonomous light sail probes depart Earth orbit targeting Proxima Centauri and Alpha Centauri at 0.2c.", impact: "Revolutionary", prob: 72 },
  ];

  const categories = ["ALL", "Technology", "Space", "Environment", "Energy", "Economy", "Society", "Geopolitics"];

  const filtered = selectedCat === "ALL"
    ? milestones
    : milestones.filter((m) => m.category.toUpperCase() === selectedCat.toUpperCase());

  return (
    <div className="glass-panel p-8 rounded-3xl space-y-8 border border-white/10 shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <Badge variant="outline" className="text-amber-400 border-amber-400/40 bg-amber-500/10 px-3 py-1 font-mono text-xs">
            CHRONOLOGICAL MILESTONES
          </Badge>
          <h3 className="text-2xl font-black text-white flex items-center space-x-2 tracking-tight">
            <Compass className="h-6 w-6 text-amber-400" />
            <span>Overarching Civilization Prediction Timeline (2026 → 2100)</span>
          </h3>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedCat === c
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 font-black scale-105"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="relative border-l-2 border-amber-500/30 ml-4 sm:ml-8 space-y-10 py-4">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="relative pl-8 sm:pl-10 group"
          >
            {/* Year Dot */}
            <div className="absolute -left-[21px] top-3 h-10 w-10 rounded-full bg-slate-950 border-4 border-amber-500 flex items-center justify-center font-mono font-black text-xs text-amber-400 group-hover:scale-125 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-xl">
              {item.year}
            </div>

            {/* Card */}
            <div className="glass-card p-6 rounded-2xl space-y-3 border border-white/10 group-hover:border-amber-500/40 transition-all shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="border-white/20 text-white font-mono text-xs bg-slate-900">
                    {item.category}
                  </Badge>
                  <Badge
                    variant={item.impact === "Revolutionary" ? "default" : "secondary"}
                    className="text-xs font-black uppercase tracking-wider"
                  >
                    {item.impact} IMPACT
                  </Badge>
                </div>
                <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg flex items-center space-x-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{item.prob}% Empirical Confidence</span>
                </span>
              </div>

              <h4 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                {item.title}
              </h4>

              <p className="text-sm text-slate-300 leading-relaxed font-medium bg-slate-900/60 p-3.5 rounded-xl border border-white/5">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
