"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Sparkles,
  TrendingUp,
  Briefcase,
  Layers,
  ArrowRight,
  ExternalLink,
  DollarSign,
  Rocket,
  Cpu,
  HeartPulse,
} from "lucide-react";

export default function OpportunityVaultPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");

  const opportunitiesFeed = [
    { title: "Planetary Geoengineering & Biosphere Regeneration", category: "Environment", marketCapEst: "$4.5 Trillion", roiIndex: "12.4x", jobs: ["Martian Soil Biome Terraformer", "Ecological Contamination Adjudicator"], description: "Massive state and corporate capital inflows directed into direct air capture swarms, ocean iron fertilization, and assisted evolutionary crop enhancement entirely." },
    { title: "Interstellar Probe Propulsion Engineering", category: "Space", marketCapEst: "$1.8 Trillion", roiIndex: "8.5x", jobs: ["Light Sail Antimatter Refiner", "Interstellar Mission Epigeneticist"], description: "Commercial ventures building scalable orbital shipyards and laser relay arrays for automated high-fraction c scientific probes entirely." },
    { title: "Synthetic Neocortex & Conceptual Immersion", category: "Technology", marketCapEst: "$8.2 Trillion", roiIndex: "15.0x", jobs: ["AI-Human Symbiosis Ethicist", "Conceptual Telepathy Content Architect"], description: "Ubiquitous sub-vocal and non-invasive BCI adoption enabling instantaneous conceptual problem-solving and full-bandwidth digital experiential commerce entirely." },
    { title: "Commercial Near-Earth Asteroid Prospecting & Refining", category: "Space", marketCapEst: "$12.0 Trillion", roiIndex: "20.2x", jobs: ["Autonomous Asteroid Prospecting Syndic", "Zero-G Structural Metamaterials Diver"], description: "Extraction of platinum-group metals and water ice from carbonaceous chondrites completely fulfilling structural construction overhead in cis-lunar orbit entirely." },
    { title: "Next-Generation Solid-State Battery Refineries", category: "Energy", marketCapEst: "$5.1 Trillion", roiIndex: "9.8x", jobs: ["Perovskite Solar Matrix Maintenance", "Fusion Grid High-Voltage Dispatcher"], description: "Elimination of historical lithium constraints through advanced sodium and solid-state mineral refinement lines entirely." },
    { title: "Personalized Biomanufacturing & Organ Printing", category: "Healthcare", marketCapEst: "$3.9 Trillion", roiIndex: "11.1x", jobs: ["Biological Longevity Escapist", "CRISPR Epigenetic Cleansing Adjudicator"], description: "Universal clinical accessibility of artificial wombs, comprehensive organ bioprinting entirely ending transplant waiting lists entirely." },
  ];

  const domains = ["ALL", "Technology", "Space", "Environment", "Energy", "Healthcare"];

  const filteredOpps = selectedDomain === "ALL"
    ? opportunitiesFeed
    : opportunitiesFeed.filter((o) => o.category.toUpperCase() === selectedDomain.toUpperCase());

  return (
    <div className="container space-y-12 pt-8 pb-32 max-w-7xl mx-auto select-none">
      {/* Premium Header */}
      <div className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-3xl relative z-10">
          <Badge variant="outline" className="text-emerald-400 border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs uppercase font-extrabold">
            STRATEGIC COMMERCIAL OPPORTUNITY INDEX
          </Badge>
          <h1 className="text-4xl font-black text-white tracking-tight sm:text-6xl leading-tight">
            Opportunity Vault Index
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            High-yield emerging industries, future job indices, and projected capital allocation trajectories constructed from multi-horizon empirical simulations entirely.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-3 rounded-xl border border-white/10 text-xs font-mono relative z-10 shrink-0">
          <DollarSign className="h-4 w-4 text-emerald-400" />
          <span className="text-emerald-400 font-bold">$35.5 Trillion Projected Inflows</span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-900/80 border border-white/10 p-2.5 rounded-2xl shadow-xl max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-400 px-3">
          <Layers className="h-3.5 w-3.5 text-emerald-400" />
          <span>SECTOR:</span>
        </div>
        {domains.map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-black tracking-wider uppercase transition-all ${
              selectedDomain === dom
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 font-black scale-105"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Feed */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
        <AnimatePresence>
          {filteredOpps.map((opp, idx) => (
            <motion.div
              key={opp.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ translateY: -4 }}
              className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-white/10 hover:border-emerald-500/50 shadow-2xl group space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-xs px-3 py-1 font-bold">
                    {opp.category}
                  </Badge>
                  <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg flex items-center space-x-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>ROI: {opp.roiIndex}</span>
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white group-hover:text-emerald-400 transition-colors leading-tight tracking-tight">
                  {opp.title}
                </h3>

                <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/5 text-xs font-mono">
                  <span className="text-slate-400">Market Cap Est: </span>
                  <span className="text-white font-bold">{opp.marketCapEst}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium bg-slate-900/40 p-4 rounded-2xl border border-white/5">
                  {opp.description}
                </p>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block">Principal Future Guild Jobs:</span>
                <div className="flex flex-wrap gap-2">
                  {opp.jobs.map((job, j) => (
                    <span key={j} className="inline-flex items-center space-x-1.5 bg-slate-900 text-slate-200 px-3 py-1.5 rounded-xl border border-white/5 text-xs font-mono">
                      <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{job}</span>
                    </span>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <Link href="/simulations/builder">
                    <Button variant="link" size="sm" className="text-xs font-mono font-bold space-x-1 text-emerald-400 hover:text-white p-0">
                      <span>Simulate Market In Scenario Engine</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Prompt */}
      <div className="glass-panel p-10 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl mt-8">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl font-black text-white tracking-tight">Require an executive report covering 2050 investment matrices?</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Admins and Academic Researchers can fully download raw JSON and professional PDF simulation briefing suites entirely.
          </p>
        </div>
        <Link href="/dashboard" className="shrink-0">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base px-8 py-7 shadow-xl shadow-emerald-500/25 space-x-2 rounded-2xl">
            <span>Enter Command Ledger</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
