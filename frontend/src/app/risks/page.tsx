"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ShieldAlert,
  AlertTriangle,
  Zap,
  Globe2,
  ArrowRight,
  ExternalLink,
  Layers,
  Check,
  Activity,
  Info,
} from "lucide-react";

export default function RiskAnalysisDashboard() {
  const [selectedScenario, setSelectedScenario] = useState<"realistic" | "optimistic" | "pessimistic">("realistic");

  const riskDatastores = {
    realistic: {
      majorThreats: [
        { title: "Persistent Asymmetric Cyber Warfare", domain: "Infrastructure", likelihood: 75, impact: "Critical", mitigation: "Mandatory implementation of automated sub-second AI intrusion sentinels across municipal grids entirely." },
        { title: "Accelerating Climate Adaptation Overhead", domain: "Economy", likelihood: 85, impact: "High", mitigation: "Deployment of green-technology tariff corridors and massive global Direct Air Capture allocation." },
        { title: "Structural Labor Disruption by Autonomous Agents", domain: "Society", likelihood: 80, impact: "High", mitigation: "Progressive institution of Universal Basic Income (UBI) frameworks and prompt curation upskilling." },
      ],
      blackSwans: [
        { title: "Autonomous Deep Web Financial Malware", likelihood: "Low (12%)", consequence: "Systemic temporary freezing of inter-bank digital asset transfers entirely." },
        { title: "Unanticipated LEO Collision Cascade (Kessler Syndrome)", likelihood: "Moderate (28%)", consequence: "Loss of unshielded civilian satellite broadband constellations for 18 months." },
      ],
      systemicRisks: [
        { title: "Bifurcation of Global Trade into Antagonistic Hardware Blocs", level: "Severe", trigger: "Semiconductor sovereignty embargos." },
        { title: "Socio-Political Polarization Accelerated by Generative Hyper-Reality", level: "High", trigger: "Multi-modal disinformation feeds entirely." },
      ],
    },
    optimistic: {
      majorThreats: [
        { title: "AI Value Misalignment during Superintelligence Transition", domain: "Technology", likelihood: 40, impact: "Existential", mitigation: "International collaborative oversight frameworks and mathematical alignment proofs entirely." },
        { title: "Cybernetic & Longevity Stratification", domain: "Society", likelihood: 60, impact: "High", mitigation: "Subsidized generic biochemical age reversal rollout for all registered OECD populations." },
      ],
      blackSwans: [
        { title: "Unmitigated Extreme Solar Coronal Mass Ejection (CME)", likelihood: "Low (8%)", consequence: "Crippling of unshielded interplanetary orbital satellites entirely." },
        { title: "Synthetic Biological Pathogen Leak from Decentralized Labs", likelihood: "Low (14%)", consequence: "Rapid execution of tailored automated mRNA vaccine printers entirely." },
      ],
      systemicRisks: [
        { title: "Over-Reliance on Centralized AI Planetary Resource Grids", level: "High", trigger: "Single-point orchestration bottlenecks." },
      ],
    },
    pessimistic: {
      majorThreats: [
        { title: "Uncontrolled Climatic Tipping Points (Permafrost Methane Release)", domain: "Environment", likelihood: 92, impact: "Catastrophic", mitigation: "Emergency deployment of stratospheric aerosol geoengineering shields entirely." },
        { title: "Global Escalation of Resource Attrition into Armed Skirmishes", domain: "Geopolitics", likelihood: 88, impact: "Catastrophic", mitigation: "Enforced United Nations multi-state peacekeeper drone deployment." },
        { title: "Complete Fragmentation of Internet Protocols into Intranets", domain: "Technology", likelihood: 82, impact: "Critical", mitigation: "Decentralized mesh networks utilizing laser satellite cross-links entirely." },
      ],
      blackSwans: [
        { title: "Runaway Self-Assembling Weaponized Nanite Swarms", likelihood: "Moderate (22%)", consequence: "Compulsory activation of designated ecological grey-goo containment perimeters." },
        { title: "Total Collapse of Key Agricultural Breadbaskets", likelihood: "High (45%)", consequence: "Multi-continent famine requiring subterranean hydroponic rationing entirely." },
      ],
      systemicRisks: [
        { title: "Hyper-Inflationary Collapse of Global Fiat Banking Ledgers", level: "Critical", trigger: "Prolonged currency wars entirely." },
        { title: "Demographic Collapse Caused by Technological Stagnation", level: "Severe", trigger: "Widespread financial contracture entirely." },
      ],
    },
  };

  const currentVault = riskDatastores[selectedScenario];

  return (
    <div className="container space-y-12 pt-8 pb-32 max-w-7xl mx-auto select-none">
      {/* Premium Header */}
      <div className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-3xl relative z-10">
          <Badge variant="outline" className="text-rose-400 border-rose-500/40 bg-rose-500/10 px-3 py-1 font-mono text-xs uppercase font-extrabold">
            ENTERPRISE VULNERABILITY MONITOR
          </Badge>
          <h1 className="text-4xl font-black text-white tracking-tight sm:text-6xl leading-tight">
            System Risk Assessment Matrix
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            Evaluate major civilizational vulnerabilities, existential threats, and Black Swan probabilities entirely. Select scenario stance below.
          </p>
        </div>

        {/* Stance Selector */}
        <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 relative z-10 shrink-0">
          {(["optimistic", "realistic", "pessimistic"] as const).map((scen) => (
            <button
              key={scen}
              onClick={() => setSelectedScenario(scen)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all ${
                selectedScenario === scen
                  ? scen === "pessimistic" ? "bg-destructive text-white shadow-lg shadow-destructive/30 scale-105" : "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {scen} STANCE
            </button>
          ))}
        </div>
      </div>

      {/* Summary Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
        <div className="glass-card p-7 rounded-3xl border border-white/10 space-y-2 flex flex-col justify-between shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Threat Count Active</span>
          <div className="text-4xl font-black text-rose-500">{currentVault.majorThreats.length} Vectors</div>
          <p className="text-xs text-slate-300 font-medium pt-1">Requiring automatic AI mitigation protocol entirely</p>
        </div>

        <div className="glass-card p-7 rounded-3xl border border-white/10 space-y-2 flex flex-col justify-between shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Black Swan Warnings</span>
          <div className="text-4xl font-black text-amber-400">{currentVault.blackSwans.length} Anomalies</div>
          <p className="text-xs text-slate-300 font-medium pt-1">Low-probability high-consequence system shocks</p>
        </div>

        <div className="glass-card p-7 rounded-3xl border border-white/10 space-y-2 flex flex-col justify-between shadow-xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">System Vulnerability</span>
          <div className="text-4xl font-black text-indigo-400">{currentVault.systemicRisks.length} Macro Frictions</div>
          <p className="text-xs text-slate-300 font-medium pt-1">Overarching structural macro-interdependencies entirely</p>
        </div>
      </div>

      {/* 1. Feed */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-7 w-7 text-rose-500 animate-pulse" />
          <h2 className="text-3xl font-black text-white tracking-tight">Major Civilizational Threats</h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedScenario}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          >
            {currentVault.majorThreats.map((threat, idx) => (
              <motion.div whileHover={{ translateY: -4 }} key={idx} className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-rose-500/50 flex flex-col justify-between space-y-6 shadow-xl group">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <Badge variant="outline" className="border-rose-500/40 text-rose-400 bg-rose-500/10 px-3 py-1 font-bold">
                      {threat.domain}
                    </Badge>
                    <Badge variant="destructive" className="text-xs font-black uppercase">
                      {threat.impact} IMPACT
                    </Badge>
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-rose-400 transition-colors leading-tight">
                    {threat.title}
                  </h3>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                      <span>Empirical Likelihood</span>
                      <span className="text-rose-400">{threat.likelihood}%</span>
                    </div>
                    <Progress value={threat.likelihood} className="h-2 bg-slate-800" />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-wider block flex items-center space-x-1.5"><Check className="h-3.5 w-3.5" /><span>Automatic Mitigation Recommendation:</span></span>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-900/60 p-3.5 rounded-2xl border border-white/5">
                    {threat.mitigation}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Black Swans & System Vectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-6">
        <div className="glass-panel p-8 lg:p-10 rounded-3xl border border-amber-500/40 shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <Zap className="h-7 w-7 text-amber-400 animate-bounce" />
            <h3 className="text-2xl font-black text-white tracking-tight">Black Swan Potential Events</h3>
          </div>
          <div className="space-y-4 pt-2">
            {currentVault.blackSwans.map((swan, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/5 space-y-2 shadow-md">
                <div className="flex items-center justify-between font-mono text-xs">
                  <Badge variant="outline" className="text-amber-400 border-amber-400/40 bg-amber-500/10 font-bold">BLACK SWAN</Badge>
                  <span className="text-slate-400 font-bold">{swan.likelihood}</span>
                </div>
                <h4 className="text-lg font-black text-white pt-1">{swan.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium"><b>System Consequence:</b> {swan.consequence}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8 lg:p-10 rounded-3xl border border-indigo-500/40 shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <Layers className="h-7 w-7 text-indigo-400 animate-pulse" />
            <h3 className="text-2xl font-black text-white tracking-tight">Overarching System macro Vectors</h3>
          </div>
          <div className="space-y-4 pt-2">
            {currentVault.systemicRisks.map((sys, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/5 space-y-2 shadow-md">
                <div className="flex items-center justify-between font-mono text-xs">
                  <Badge variant="destructive" className="font-bold text-[10px] tracking-wider uppercase">{sys.level} VULNERABILITY</Badge>
                </div>
                <h4 className="text-lg font-black text-white pt-1">{sys.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium"><b>Trigger Threshold:</b> {sys.trigger}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-10 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl mt-8">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl font-black text-white tracking-tight">Need to evaluate Black Swans under tailored parameters?</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Execute a simulation inside our Builder to compute customized confidence scores and structural macro risk matrices entirely.
          </p>
        </div>
        <Link href="/simulations/builder" className="shrink-0">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-black text-base px-8 py-7 shadow-xl shadow-indigo-500/25 space-x-2 rounded-2xl">
            <span>Launch Command</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
