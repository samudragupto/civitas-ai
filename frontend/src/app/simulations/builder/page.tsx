"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { APIClient } from "@/lib/api";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CivilizationScorecard } from "@/components/visualizations/CivilizationScorecard";
import {
  Globe2,
  Sliders,
  Sparkles,
  Zap,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  HeartPulse,
  BookOpen,
  Rocket,
  ShieldCheck,
  Users,
  Loader2,
  Check,
  Info,
} from "lucide-react";

export default function ScenarioBuilderPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Overarching Meta
  const [title, setTitle] = useState("Overarching Macro Trajectory 2026-2100");
  const [description, setDescription] = useState("Executive quantitative scenario modeling accelerated AGI pacing and baseload Tokamak fusion integration.");
  const [scenarioType, setScenarioType] = useState<"optimistic" | "realistic" | "pessimistic">("realistic");

  // 9 Input Parameters (0-100)
  const [aiAdvancement, setAiAdvancement] = useState(75);
  const [climateAction, setClimateAction] = useState(65);
  const [globalStability, setGlobalStability] = useState(55);
  const [populationGrowth, setPopulationGrowth] = useState(50);
  const [energyInnovation, setEnergyInnovation] = useState(80);
  const [spaceInvestment, setSpaceInvestment] = useState(70);
  const [automationAdoption, setAutomationAdoption] = useState(65);
  const [educationQuality, setEducationQuality] = useState(60);
  const [healthcareInnovation, setHealthcareInnovation] = useState(75);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerSimulationExecution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide a definitive simulation document title.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        title,
        description,
        scenario_type: scenarioType,
        ai_advancement: aiAdvancement,
        climate_action: climateAction,
        global_stability: globalStability,
        population_growth: populationGrowth,
        energy_innovation: energyInnovation,
        space_investment: spaceInvestment,
        automation_adoption: automationAdoption,
        education_quality: educationQuality,
        healthcare_innovation: healthcareInnovation,
      };

      const sim = await APIClient.createSimulation(payload);

      // Trigger Confetti Celebration for Optimistic Trajectories
      if (scenarioType === "optimistic") {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"],
        });
      }

      router.push(`/simulations/${sim.id}`);
    } catch (err: any) {
      setError(err.message || "An internal forecasting engine exception occurred during asynchronous calculations.");
      setIsLoading(false);
    }
  };

  const applyPresetMacro = (preset: "utopia" | "collapse" | "cyberpunk" | "balanced") => {
    if (preset === "utopia") {
      setScenarioType("optimistic");
      setAiAdvancement(95);
      setClimateAction(90);
      setGlobalStability(85);
      setPopulationGrowth(45);
      setEnergyInnovation(98);
      setSpaceInvestment(90);
      setAutomationAdoption(80);
      setEducationQuality(90);
      setHealthcareInnovation(95);
    } else if (preset === "collapse") {
      setScenarioType("pessimistic");
      setAiAdvancement(35);
      setClimateAction(15);
      setGlobalStability(20);
      setPopulationGrowth(75);
      setEnergyInnovation(25);
      setSpaceInvestment(20);
      setAutomationAdoption(30);
      setEducationQuality(25);
      setHealthcareInnovation(30);
    } else if (preset === "cyberpunk") {
      setScenarioType("realistic");
      setAiAdvancement(98);
      setClimateAction(30);
      setGlobalStability(35);
      setPopulationGrowth(60);
      setEnergyInnovation(85);
      setSpaceInvestment(75);
      setAutomationAdoption(95);
      setEducationQuality(40);
      setHealthcareInnovation(80);
    } else {
      setScenarioType("realistic");
      setAiAdvancement(50);
      setClimateAction(50);
      setGlobalStability(50);
      setPopulationGrowth(50);
      setEnergyInnovation(50);
      setSpaceInvestment(50);
      setAutomationAdoption(50);
      setEducationQuality(50);
      setHealthcareInnovation(50);
    }
  };

  return (
    <div className="container space-y-12 pt-8 pb-32 max-w-7xl mx-auto select-none">
      {/* ---------------------------------------------------- */}
      {/* COMMAND HEADER */}
      {/* ---------------------------------------------------- */}
      <div className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-3xl relative z-10">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs uppercase font-extrabold">
            QUANTITATIVE MODELING SUITE
          </Badge>
          <h1 className="text-4xl font-black text-white tracking-tight sm:text-6xl leading-tight">
            Scenario Execution Engine
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            Fine-tune foundational global boundary indices below. Our multi-domain computational engine will compute interlocking timelines, empirical Black Swan alerts, and confidence percentages up to the year 2100.
          </p>
        </div>

        {/* Live Predictor Prompt Pill */}
        <div className="glass-card p-5 rounded-2xl border border-white/10 relative z-10 shrink-0 flex flex-col items-center sm:items-end text-center sm:text-right space-y-1">
          <span className="text-xs font-mono text-slate-400 uppercase font-black">Empirical Verification</span>
          <span className="text-emerald-400 font-mono font-bold text-sm flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Asynchronous Compute Active</span>
          </span>
        </div>
      </div>

      <form onSubmit={triggerSimulationExecution} className="space-y-12">
        {error && (
          <div className="glass-panel border-destructive/50 bg-destructive/10 p-6 rounded-2xl text-destructive flex items-center space-x-4 shadow-xl">
            <AlertTriangle className="h-8 w-8 shrink-0" />
            <p className="font-bold text-base">{error}</p>
          </div>
        )}

        {/* Executive Identity Box */}
        <div className="glass-panel p-8 lg:p-10 rounded-3xl border border-white/10 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-extrabold text-white flex items-center space-x-2.5">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              <span>1. Executive Document Ledgers</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Report Metadata</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono font-black uppercase text-slate-300">
                Workspace Ledger Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                required
                className="h-12 bg-slate-900/90 border-white/10 text-white font-bold text-base rounded-xl px-4 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-black uppercase text-slate-300">
                Scenario Typology Stance
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setScenarioType("optimistic")}
                  className={`h-12 rounded-xl text-xs font-mono font-black tracking-wider transition-all border ${
                    scenarioType === "optimistic"
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/25 scale-102"
                      : "bg-slate-900 text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  OPTIMISTIC
                </button>
                <button
                  type="button"
                  onClick={() => setScenarioType("realistic")}
                  className={`h-12 rounded-xl text-xs font-mono font-black tracking-wider transition-all border ${
                    scenarioType === "realistic"
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/25 scale-102"
                      : "bg-slate-900 text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  REALISTIC
                </button>
                <button
                  type="button"
                  onClick={() => setScenarioType("pessimistic")}
                  className={`h-12 rounded-xl text-xs font-mono font-black tracking-wider transition-all border ${
                    scenarioType === "pessimistic"
                      ? "bg-destructive text-white border-destructive/40 shadow-lg shadow-destructive/25 scale-102"
                      : "bg-slate-900 text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  PESSIMISTIC
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-black uppercase text-slate-300">
              Executive Overview Synthesis Context
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              className="h-12 bg-slate-900/90 border-white/10 text-slate-300 text-sm font-medium rounded-xl px-4 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Dynamic Preset Macro Box */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-950/40">
          <div className="flex items-center space-x-3">
            <Zap className="h-5 w-5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-black uppercase text-white tracking-wider">
              Strategic Preset Macros:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => applyPresetMacro("utopia")} className="rounded-xl border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 font-mono font-bold text-xs px-3">
              Post-Scarcity Utopia
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => applyPresetMacro("cyberpunk")} className="rounded-xl border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 font-mono font-bold text-xs px-3">
              High-Automation Cyberpunk
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => applyPresetMacro("collapse")} className="rounded-xl border-destructive/40 text-destructive hover:bg-destructive/10 font-mono font-bold text-xs px-3">
              Systemic Breakdown
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => applyPresetMacro("balanced")} className="rounded-xl border-white/10 bg-slate-900 text-white font-mono font-bold text-xs px-3">
              Baseline Equilibrium
            </Button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 9 PARAMETER SLIDERS GRID */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-extrabold text-white flex items-center space-x-2.5">
              <Sliders className="h-5 w-5 text-indigo-400" />
              <span>2. Foundational Boundary Sliders (0 - 100 Continuous Scale)</span>
            </h3>
            <span className="text-xs font-mono text-indigo-400 font-bold">Empirical Interactive Synthesis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* 1. AI */}
            <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 hover:border-indigo-500/50 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-indigo-400 flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-indigo-400" />
                    <span>AI Advancement</span>
                  </span>
                  <span className="text-2xl font-mono font-black text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/30">
                    {aiAdvancement}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">Pacing of foundational models, multi-modal reasoning algorithms, and general superintelligence readiness.</p>
              </div>
              <Slider value={[aiAdvancement]} onValueChange={(val) => setAiAdvancement(val[0])} max={100} step={1} className="py-2" />
            </motion.div>

            {/* 2. Climate */}
            <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 hover:border-emerald-500/50 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                    <Globe2 className="h-4 w-4 text-emerald-400" />
                    <span>Climate Action</span>
                  </span>
                  <span className="text-2xl font-mono font-black text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
                    {climateAction}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">Enforcement of aggressive Circular Carbon baselines, Direct Air Capture swarms, and global green tariffs.</p>
              </div>
              <Slider value={[climateAction]} onValueChange={(val) => setClimateAction(val[0])} max={100} step={1} className="py-2" />
            </motion.div>

            {/* 3. Energy */}
            <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 hover:border-amber-500/50 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span>Energy Innovation</span>
                  </span>
                  <span className="text-2xl font-mono font-black text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30">
                    {energyInnovation}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">Commercial readiness of magnetic confinement Tokamak fusion baseload and orbital solar ring collectors.</p>
              </div>
              <Slider value={[energyInnovation]} onValueChange={(val) => setEnergyInnovation(val[0])} max={100} step={1} className="py-2" />
            </motion.div>

            {/* 4. Space */}
            <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 hover:border-purple-500/50 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-purple-400 flex items-center space-x-2">
                    <Rocket className="h-4 w-4 text-purple-400" />
                    <span>Space Investment</span>
                  </span>
                  <span className="text-2xl font-mono font-black text-purple-300 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/30">
                    {spaceInvestment}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">State and private capital committed to permanent lunar South Pole mass drivers and Mars Valles terraforming rovers.</p>
              </div>
              <Slider value={[spaceInvestment]} onValueChange={(val) => setSpaceInvestment(val[0])} max={100} step={1} className="py-2" />
            </motion.div>

            {/* 5. Stability */}
            <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 hover:border-blue-500/50 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-blue-400 flex items-center space-x-2">
                    <ShieldCheck className="h-4 w-4 text-blue-400" />
                    <span>Global Stability</span>
                  </span>
                  <span className="text-2xl font-mono font-black text-blue-300 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/30">
                    {globalStability}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">Resilience of post-WWII international security architectures, automatic judicial pacts, and secure trade straits.</p>
              </div>
              <Slider value={[globalStability]} onValueChange={(val) => setGlobalStability(val[0])} max={100} step={1} className="py-2" />
            </motion.div>

            {/* 6. Automation */}
            <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 hover:border-cyan-500/50 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-cyan-400 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-cyan-400" />
                    <span>Automation Adoption</span>
                  </span>
                  <span className="text-2xl font-mono font-black text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/30">
                    {automationAdoption}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">Pacing of enterprise AI software agents, prompt curation upskilling, and humanoid municipal saturation entirely.</p>
              </div>
              <Slider value={[automationAdoption]} onValueChange={(val) => setAutomationAdoption(val[0])} max={100} step={1} className="py-2" />
            </motion.div>

            {/* 7. Healthcare */}
            <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 hover:border-rose-500/50 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-rose-400 flex items-center space-x-2">
                    <HeartPulse className="h-4 w-4 text-rose-400" />
                    <span>Healthcare Innov</span>
                  </span>
                  <span className="text-2xl font-mono font-black text-rose-300 bg-rose-500/10 px-3 py-1 rounded-xl border border-rose-500/30">
                    {healthcareInnovation}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">Universal clinical accessibility of artificial wombs, comprehensive organ bioprinting entirely ending transplant lines.</p>
              </div>
              <Slider value={[healthcareInnovation]} onValueChange={(val) => setHealthcareInnovation(val[0])} max={100} step={1} className="py-2" />
            </motion.div>

            {/* 8. Education */}
            <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 hover:border-teal-500/50 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-teal-400 flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-teal-400" />
                    <span>Education Quality</span>
                  </span>
                  <span className="text-2xl font-mono font-black text-teal-300 bg-teal-500/10 px-3 py-1 rounded-xl border border-teal-500/30">
                    {educationQuality}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">Rollout of adaptive 1-on-1 AI Socratic learning and high-bandwidth synthetic conceptual language downloads.</p>
              </div>
              <Slider value={[educationQuality]} onValueChange={(val) => setEducationQuality(val[0])} max={100} step={1} className="py-2" />
            </motion.div>

            {/* 9. Population */}
            <motion.div whileHover={{ translateY: -3 }} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 border border-white/10 hover:border-pink-500/50 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-pink-400 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-pink-400" />
                    <span>Population Momentum</span>
                  </span>
                  <span className="text-2xl font-mono font-black text-pink-300 bg-pink-500/10 px-3 py-1 rounded-xl border border-pink-500/30">
                    {populationGrowth}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">Global demographic trajectories, fertility stabilization index, and smart vertical megacity urbanization ratios.</p>
              </div>
              <Slider value={[populationGrowth]} onValueChange={(val) => setPopulationGrowth(val[0])} max={100} step={1} className="py-2" />
            </motion.div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* EXECUTE ACTION WIDGET */}
        {/* ---------------------------------------------------- */}
        <div className="glass-panel p-10 lg:p-14 rounded-3xl border border-indigo-500/50 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-3xl font-black tracking-tight sm:text-5xl text-white">
              Launch Asynchronous Prediction Synthesis
            </h3>
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-medium">
              Your final output will produce professional executive briefs, multi-horizon 2030-2100 interactive Recharts area graphs, Black Swan anomaly matrices, and confident prediction percentages entirely.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full max-w-xl mx-auto py-8 text-lg font-black bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white shadow-2xl shadow-indigo-500/30 rounded-2xl space-x-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-7 w-7 animate-spin text-amber-300" />
                <span>Executing Distributed Asynchronous Cloud Core...</span>
              </>
            ) : (
              <>
                <Zap className="h-7 w-7 fill-current text-amber-300 animate-bounce" />
                <span>Compute Multi-Domain Production Scenario</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
