"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe2, Compass, Filter, Sparkles, Zap, ArrowRight, ExternalLink, Network, Calendar } from "lucide-react";

export default function TimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const timelineData = [
    { year: 2028, category: "Technology", title: "Sub-Vocal Multimodal Pendants", description: "Mass consumer shift to subtle subvocal computational AI hardware replacing handheld screens entirely.", impact: "High", horizon: 2030, color: "#3b82f6" },
    { year: 2031, category: "Technology", title: "1,000-Logical-Qubit Quantum Mainframes", description: "Universal fault-tolerant quantum arrays operational for high-temp superconductivity and chemical simulation.", impact: "Revolutionary", horizon: 2030, color: "#6366f1" },
    { year: 2032, category: "Environment", title: "30x30 Biodiversity Protection Passed", description: "Global coalition successfully enforces active protection across 30% of critical terrestrial and marine biodiversity hot zones.", impact: "High", horizon: 2030, color: "#10b981" },
    { year: 2035, category: "Economy", title: "Universal Commercial Humanoid Saturation", description: "Over 100 million domestic and industrial humanoid robots officially outnumber human municipal labor entirely.", impact: "Transformative", horizon: 2030, color: "#06b6d4" },
    { year: 2042, category: "Space", title: "Lunar South Pole Mass Driver Operational", description: "Automated electromagnetic catapults launch refined Helium-3 and propellant ice from permanent polar bases.", impact: "Transformative", horizon: 2050, color: "#f59e0b" },
    { year: 2048, category: "Energy", title: "Commercial Magnetic Confinement Fusion", description: "First 5 Gigawatt fusion Tokamak connects directly to the European high-voltage direct current baseload grid.", impact: "Revolutionary", horizon: 2050, color: "#10b981" },
    { year: 2055, category: "Society", title: "Universal Biological Longevity Escape Velocity", description: "CRISPR and epigenetic rejuvenation therapies enter generic subsidized pharmaceutical distribution lines globally.", impact: "Revolutionary", horizon: 2050, color: "#ec4899" },
    { year: 2070, category: "Environment", title: "Global Decarbonization Net-Negative Equilibrium", description: "Atmospheric CO2 levels officially execute a persistent downward trajectory powered by Direct Air Capture swarms.", impact: "Transformative", horizon: 2100, color: "#10b981" },
    { year: 2080, category: "Geopolitics", title: "Earth-Space Economic Federation Charter", description: "Constitutional treaty formalizing complete political and fiscal equality between terrestrial nations and Martian assemblies.", impact: "High", horizon: 2100, color: "#8b5cf6" },
    { year: 2095, category: "Space", title: "First Interstellar Light Sail Fleet Launch", description: "Autonomous light sail probes depart Earth orbit targeting Proxima Centauri and Alpha Centauri at 0.2c entirely.", impact: "Revolutionary", horizon: 2100, color: "#f59e0b" },
  ];

  const categories = ["ALL", "Technology", "Environment", "Economy", "Energy", "Society", "Space", "Geopolitics"];

  const filteredEvents = selectedCategory === "ALL"
    ? timelineData
    : timelineData.filter((evt) => evt.category.toUpperCase() === selectedCategory.toUpperCase());

  return (
    <div className="container space-y-12 pt-8 pb-32 max-w-7xl mx-auto select-none">
      {/* Premium Header */}
      <div className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-3xl relative z-10">
          <Badge variant="outline" className="text-amber-400 border-amber-400/40 bg-amber-500/10 px-3 py-1 font-mono text-xs uppercase font-extrabold">
            CHRONOLOGICAL MILESTONE LEDGER
          </Badge>
          <h1 className="text-4xl font-black text-white tracking-tight sm:text-6xl leading-tight">
            Civilization Future Timeline
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            Chronological milestone pathways constructed from multi-variable strategic foresight modeling. Filter by specific civilizational sector below.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-3 rounded-xl border border-white/10 text-xs font-mono relative z-10 shrink-0">
          <Calendar className="h-4 w-4 text-amber-400" />
          <span className="text-slate-300">Century Milestones Ranging 2028 - 2095</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-900/80 border border-white/10 p-2.5 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-400 px-3">
          <Filter className="h-3.5 w-3.5 text-indigo-400" />
          <span>SECTOR FILTER:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-black tracking-wider uppercase transition-all ${
              selectedCategory === cat
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="relative border-l-2 border-amber-500/40 ml-4 md:ml-12 space-y-12 py-6">
        <AnimatePresence>
          {filteredEvents.map((evt, idx) => (
            <motion.div
              key={evt.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.04 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Dot */}
              <div className="absolute -left-[21px] top-4 h-10 w-10 rounded-full bg-slate-950 border-4 border-amber-500 flex items-center justify-center font-mono font-black text-xs text-amber-400 group-hover:scale-125 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-2xl">
                {evt.year}
              </div>

              {/* Polished Glass Panel */}
              <div className="glass-panel p-8 rounded-3xl space-y-4 border border-white/10 group-hover:border-amber-500/50 transition-all shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-white font-bold px-3 py-1 rounded-lg bg-slate-900 border border-white/5 uppercase" style={{ color: evt.color }}>
                    {evt.category} DOMAIN
                  </span>
                  <Badge variant={evt.impact === "Revolutionary" ? "default" : "secondary"} className="text-xs font-black uppercase">
                    {evt.impact} BREAKTHROUGH
                  </Badge>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors leading-tight">
                  {evt.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                  {evt.description}
                </p>

                <div className="flex justify-end pt-2">
                  <Link href="/simulations/builder">
                    <Button variant="link" size="sm" className="text-xs font-mono font-bold space-x-1.5 text-indigo-400 hover:text-white p-0">
                      <span>Explore target inside Scenario Engine</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Simulation Prompt */}
      <div className="glass-card p-10 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl font-black text-white tracking-tight">Require a specific custom timeline execution?</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Execute a simulation with exact boundary parameters to observe plausible divergent Black Swan and long-term investment pathways entirely.
          </p>
        </div>
        <Link href="/simulations/builder" className="shrink-0">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base px-8 py-7 shadow-xl shadow-amber-500/25 space-x-2 rounded-2xl">
            <span>Launch Builder</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
