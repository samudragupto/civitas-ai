"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Zap,
  Sparkles,
  HeartPulse,
  Cpu,
  Rocket,
  Globe2,
  TrendingUp,
  Info,
  ShieldCheck,
  Award,
} from "lucide-react";

interface ScorecardProps {
  scenario: "optimistic" | "realistic" | "pessimistic";
  targetYear?: number;
}

export const CivilizationScorecard: React.FC<ScorecardProps> = ({
  scenario,
  targetYear = 2050,
}) => {
  const meta = {
    optimistic: {
      kardashev: "Type 1.15",
      kardashevValue: 92,
      gpwScore: "94.8 / 100",
      gpwValue: 95,
      longevity: "Escape Velocity Achieved",
      longevityAge: "135+ Years Avg",
      compute: "10^30 FLOPS (Planetary ASI)",
      energy: "98% Clean (Fusion Baseload)",
      space: "Self-Sustaining Mars Metropolis",
    },
    realistic: {
      kardashev: "Type 0.92",
      kardashevValue: 74,
      gpwScore: "76.2 / 100",
      gpwValue: 76,
      longevity: "Moderate Age Reversal",
      longevityAge: "92 Years Avg",
      compute: "10^27 FLOPS (Commercial AGI)",
      energy: "72% Clean (Renewables + Fission)",
      space: "Permanent Lunar South Pole Outposts",
    },
    pessimistic: {
      kardashev: "Type 0.76",
      kardashevValue: 45,
      gpwScore: "48.5 / 100",
      gpwValue: 48,
      longevity: "Stagnant (Resource Constrained)",
      longevityAge: "71 Years Avg",
      compute: "10^25 FLOPS (Fragmented LLMs)",
      energy: "41% Clean (Fossil Dependency)",
      space: "Intermittent LEO Scientific Stations",
    },
  };

  const current = meta[scenario];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs">
            PLANETARY METRICS LEDGER
          </Badge>
          <h3 className="text-2xl font-black tracking-tight text-white flex items-center space-x-2">
            <Globe2 className="h-6 w-6 text-indigo-400" />
            <span>Civilization Development Scorecard</span>
          </h3>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/10 text-xs font-mono">
          <span className="text-slate-400">Target Horizon:</span>
          <span className="text-amber-400 font-bold text-sm">{targetYear}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Kardashev Type */}
        <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 flex items-center space-x-1.5">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Kardashev Index</span>
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-slate-500 hover:text-white transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  Mesures total planetary energy mastery. Type 1 completely harnesses all incoming solar and terrestrial energy.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-black gradient-text-gold tracking-tight">
              {current.kardashev}
            </div>
            <p className="text-xs text-slate-400 font-medium">Planetary energy mastery ratio</p>
          </div>

          <Progress value={current.kardashevValue} className="h-2 bg-slate-800" />
        </motion.div>

        {/* Gross Planetary Well-Being */}
        <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center space-x-1.5">
              <Award className="h-4 w-4 text-emerald-400" />
              <span>Gross Planetary Well-Being</span>
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-slate-500 hover:text-white transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  Universal composite index replacing GDP. Evaluates health, ecological stability, compute access, and personal freedom.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-black gradient-text-emerald tracking-tight">
              {current.gpwScore}
            </div>
            <p className="text-xs text-slate-400 font-medium">Composite universal human thriving</p>
          </div>

          <Progress value={current.gpwValue} className="h-2 bg-slate-800" />
        </motion.div>

        {/* Longevity Escape Velocity */}
        <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300 flex items-center space-x-1.5">
              <HeartPulse className="h-4 w-4 text-rose-400" />
              <span>Biological Longevity</span>
            </span>
            <Badge variant="outline" className="border-rose-500/40 text-rose-400 bg-rose-500/10 text-[10px]">
              {current.longevityAge}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="text-lg font-extrabold text-white leading-tight">
              {current.longevity}
            </div>
            <p className="text-xs text-slate-400 font-medium">CRISPR & epigenetic age reversal</p>
          </div>

          <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-mono">
            <ShieldCheck className="h-4 w-4" />
            <span>Universal Baseline Active</span>
          </div>
        </motion.div>

        {/* Compute & ASI Saturation */}
        <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center space-x-1.5">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span>Computational Biosphere</span>
            </span>
            <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
          </div>

          <div className="space-y-1">
            <div className="text-lg font-extrabold text-white leading-tight">
              {current.compute}
            </div>
            <p className="text-xs text-slate-400 font-medium">AI inference density grid</p>
          </div>

          <div className="pt-2 flex items-center space-x-2 text-xs text-indigo-300 font-mono">
            <TrendingUp className="h-4 w-4 text-indigo-400" />
            <span>Quantum Mainframe Nodes</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
