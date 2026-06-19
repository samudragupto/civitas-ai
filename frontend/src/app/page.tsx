"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { APIClient, StructuredForecastOutput } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { WorldMapVisualizer } from "@/components/visualizations/WorldMapVisualizer";
import { CivilizationScorecard } from "@/components/visualizations/CivilizationScorecard";
import { PredictionTimelineVisualizer } from "@/components/visualizations/PredictionTimelineVisualizer";
import { SankeyEconomicShift } from "@/components/visualizations/SankeyEconomicShift";
import { RadarSuperpowerVisualizer } from "@/components/visualizations/RadarSuperpowerVisualizer";
import { AdvancedClimateLineChart } from "@/components/visualizations/AdvancedClimateLineChart";
import { InfluenceNetworkGraph } from "@/components/visualizations/InfluenceNetworkGraph";
import {
  Globe2,
  Sparkles,
  Zap,
  TrendingUp,
  Sliders,
  Compass,
  ArrowRight,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Activity,
  HeartPulse,
  BookOpen,
  Users,
  Building2,
  ChevronRight,
  Database,
  ExternalLink,
  Lock,
  Loader2,
  Check,
  Network,
  Thermometer,
  DollarSign,
  Award,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated, setGuestMode } = useAuth();
  
  // Active Interactive Future Preview State
  const [demoScenario, setDemoScenario] = useState<"optimistic" | "realistic" | "pessimistic">("realistic");
  const [demoAi, setDemoAi] = useState<number>(75);
  const [demoClimate, setDemoClimate] = useState<number>(65);
  const [demoEnergy, setDemoEnergy] = useState<number>(80);
  const [demoSpace, setDemoSpace] = useState<number>(70);
  
  const [demoResult, setDemoResult] = useState<StructuredForecastOutput | null>(null);
  const [isLoadingDemo, setIsLoadingDemo] = useState<boolean>(false);
  const [demoError, setDemoError] = useState<string | null>(null);

  const executeQuickPreview = async () => {
    setIsLoadingDemo(true);
    setDemoError(null);
    try {
      const res = await APIClient.runDemoSimulation({
        scenario: demoScenario,
        ai_advancement: demoAi,
        climate_action: demoClimate,
        energy_innovation: demoEnergy,
        space_investment: demoSpace,
      });
      setDemoResult(res);
    } catch (err: any) {
      setDemoError(err.message || "Failed to execute public interactive demo forecast.");
    } finally {
      setIsLoadingDemo(false);
    }
  };

  const [activeTechTab, setActiveTechTab] = useState<number>(0);

  const techDomains = [
    { name: "Artificial General Intelligence (AGI)", icon: Cpu, score: "98% Reach", ready: "Horizon 2038", desc: "Autonomous multimodal reasoning mainframes operating with sub-second leapfrogging logic and self-correcting neural synthesis." },
    { name: "Commercial Fusion Baseload Grid", icon: Zap, score: "92% Reach", ready: "Horizon 2048", desc: "Magnetic confinement Tokamak reactors connecting to European and North American high-voltage direct current grids, unlocking boundless clean baseload energy." },
    { name: "Universal Epigenetic Longevity", icon: HeartPulse, score: "88% Reach", ready: "Horizon 2055", desc: "Biological age reversal protocols and targeted CRISPR lipid nanoparticles universalized inside generic subsidized pharmaceutical lines entirely." },
    { name: "Interplanetary Space Shipyards", icon: Rocket, score: "84% Reach", ready: "Horizon 2050", desc: "Cis-lunar automated robotic drydocks fabricating heavy Starship generation arks and commercial near-Earth asteroid mining harvesters." },
  ];

  return (
    <div className="flex flex-col space-y-32 pt-8 pb-32 max-w-[100vw] overflow-x-hidden">
      {/* ---------------------------------------------------- */}
      {/* CINEMATIC HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-24 lg:pb-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#070913] to-[#070913] z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-[140px] pointer-events-none rounded-full" />
        
        <div className="container relative z-10 flex flex-col items-center text-center space-y-8 max-w-6xl mx-auto">
          {/* Top Pill badge */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Badge variant="outline" className="px-4 py-2 font-mono text-xs font-black tracking-widest text-indigo-300 border-white/10 bg-slate-900/80 space-x-2 backdrop-blur-xl shadow-2xl">
              <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
              <span>THE PRODUCTION HUMAN FORESIGHT ENGINE</span>
              <span className="text-emerald-400 font-sans">● LIVE</span>
            </Badge>
          </motion.div>

          {/* Premium Headline */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl text-white leading-none">
            Forecast Human <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">Civilization</span> Futures
          </motion.h1>

          {/* Polished Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-3xl text-lg sm:text-2xl text-slate-300 leading-relaxed font-medium">
            A startup-grade strategic forecasting platform. Synthesizing empirical macro datasets from NASA, the World Bank, and the UN into structured, multi-model AI civilizational simulations for 2030, 2050, and 2100.
          </motion.p>

          {/* Call to Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg pt-4">
            {isAuthenticated ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base font-extrabold px-8 py-7 bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/30 rounded-2xl space-x-2 group">
                  <span>Enter Enterprise Workspace</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base font-extrabold px-8 py-7 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 text-white shadow-xl shadow-indigo-500/30 rounded-2xl space-x-2 group">
                    <span>Execute Live Forecasts</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={setGuestMode}
                  className="w-full sm:w-auto text-base font-bold px-8 py-7 bg-slate-900/80 hover:bg-slate-800 text-white border-white/10 rounded-2xl space-x-2 hover:border-white/25"
                >
                  <Globe2 className="h-5 w-5 text-indigo-400" />
                  <span>Guest Demo Sandbox</span>
                </Button>
              </>
            )}
          </motion.div>

          {/* Cinematic Interactive Hero Widget embedding WorldMap Visualizer */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="w-full pt-8">
            <WorldMapVisualizer />
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 1: FUTURE PREDICTION ENGINE */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs">
            01. PROBABILITY ENGINE
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            The Multi-Domain Foresight Architecture
          </h2>
          <p className="text-slate max-w-2xl text-slate-300 leading-relaxed text-base sm:text-lg">
            Unlike simplistic chat interfaces, CivitasAI operates an asynchronous, modularized simulation engine synthesizing empirical trends across four interlocking civilizational horizons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card p-8 rounded-3xl space-y-4 hover:border-indigo-500/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Sliders className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">9-Variable Parameter Simulator</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Real-time dynamic adjustment of AI advancement, climate action, automation resilience, and space allocations.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-indigo-300 font-bold flex items-center justify-between">
              <span>0-100 Continuous Scale</span>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          </Card>

          <Card className="glass-card p-8 rounded-3xl space-y-4 hover:border-blue-500/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Multi-Model AI Gateway Layer</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Abstracted execution tier distributing inference inquiries across OpenAI GPT-4o, Gemini 1.5 Pro, and Anthropic Claude 3.5.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-blue-300 font-bold flex items-center justify-between">
              <span>Automatic Fallback Active</span>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          </Card>

          <Card className="glass-card p-8 rounded-3xl space-y-4 hover:border-purple-500/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Live Empirical Adapters</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Asynchronous indicators fetch ingestion from the World Bank API, IMF datastores, NASA Goddard, and the UN Population Division.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-purple-300 font-bold flex items-center justify-between">
              <span>Empirical Alignment</span>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          </Card>

          <Card className="glass-card p-8 rounded-3xl space-y-4 hover:border-emerald-500/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Executive PDF/DOCX Reports</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Enterprise deliverables generator producing professional PDF executive briefings, structured DOCX, and raw JSON datasets.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-emerald-300 font-bold flex items-center justify-between">
              <span>OWASP Highly Secure</span>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          </Card>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: GLOBAL TECHNOLOGY FORECASTS */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-indigo-400 border-indigo-400/40 bg-indigo-500/10 px-3 py-1 font-mono text-xs">
            02. TECHNOLOGICAL HORIZONS
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            Projections Across Foundational Breakthroughs
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg font-medium">
            Evaluate empirical confidence metrics and deployment schedules across the six ultimate domains of technological leapfrogging.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Active Sector Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {techDomains.map((dom, idx) => {
              const Icon = dom.icon;
              const isAct = activeTechTab === idx;
              return (
                <button
                  key={dom.name}
                  onClick={() => setActiveTechTab(idx)}
                  className={`w-full p-5 rounded-2xl transition-all border text-left flex items-center justify-between group ${
                    isAct
                      ? "bg-slate-900/90 text-white border-indigo-500 shadow-xl shadow-indigo-500/10 scale-102"
                      : "bg-slate-950/60 text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold ${isAct ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-500 group-hover:text-indigo-400"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-extrabold font-sans text-white">{dom.name}</span>
                      <span className="text-xs font-mono text-indigo-400">{dom.ready}</span>
                    </div>
                  </div>
                  <ChevronRight className={`h-5 w-5 ${isAct ? "text-indigo-400 rotate-90" : "text-slate-600 group-hover:text-white"}`} />
                </button>
              );
            })}
          </div>

          {/* Visualizing Active Domain Product Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTechTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="glass-panel p-8 rounded-3xl space-y-6 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
                  <span className="text-indigo-300 font-bold uppercase tracking-wider">DOMAIN EMPIRICAL ANALYSIS</span>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 px-3 py-1 font-black">
                    {techDomains[activeTechTab].score}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-white tracking-tight leading-tight">
                    {techDomains[activeTechTab].name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium bg-slate-900/70 p-5 rounded-2xl border border-white/5">
                    {techDomains[activeTechTab].desc}
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-2 gap-4 font-mono text-xs">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-slate-500 uppercase block">Estimated Readiness:</span>
                    <span className="text-amber-400 font-bold text-base block">{techDomains[activeTechTab].ready}</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-slate-500 uppercase block">Inference Saturation:</span>
                    <span className="text-indigo-400 font-bold text-base block">100% Ubiquitous</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: ECONOMIC TRANSFORMATION ANALYSIS */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-emerald-400 border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs">
            03. ECONOMIC EVOLUTION
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            Macro Capital Re-Allocation ($105T GDP)
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg font-medium">
            Explore how structural automation shifts white-collar desk employment and massively redistributes financial reserves into futuristic planetary industries.
          </p>
        </div>

        <div className="w-full pt-4">
          <SankeyEconomicShift />
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: CLIMATE & SUSTAINABILITY FORECASTING */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-teal-400 border-teal-400/40 bg-teal-500/10 px-3 py-1 font-mono text-xs">
            04. PLANETARY BIOSPHERE
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            Atmospheric Decarbonization Trajectories
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg font-medium">
            Bloomberg-inspired high-fidelity empirical climate curves. Demonstrating how global baseload fusion integration and Direct Air Capture reverse historical CO2 trajectories entirely.
          </p>
        </div>

        <div className="w-full pt-4">
          <AdvancedClimateLineChart />
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: SPACE ECONOMY FORECASTING */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-amber-400 border-amber-400/40 bg-amber-500/10 px-3 py-1 font-mono text-xs">
            05. INTERPLANETARY CONTINUITY
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            The Multi-Trillion Commercial Space Common
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg font-medium">
            Projections across permanent cis-lunar polar industrial outposts, Martian Valles settlements, and commercial asteroid prospector syndicates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-card p-8 rounded-3xl space-y-6 hover:border-amber-500/40 flex flex-col justify-between">
            <div className="space-y-3">
              <Badge variant="outline" className="text-amber-300 border-amber-300/30 bg-amber-400/10 font-mono text-xs">HORIZON 2038</Badge>
              <h3 className="text-2xl font-bold text-white">Permanent Lunar Polar Common</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                International outposts operational at the Shackleton crater. Extracting thousands of metric tons of water ice and constructing automated orbital mass drivers.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-400">Capital Poured:</span>
              <span className="text-emerald-400">$1.2 Trillion</span>
            </div>
          </Card>

          <Card className="glass-card p-8 rounded-3xl space-y-6 hover:border-rose-500/40 flex flex-col justify-between">
            <div className="space-y-3">
              <Badge variant="outline" className="text-rose-300 border-rose-300/30 bg-rose-400/10 font-mono text-xs">HORIZON 2050</Badge>
              <h3 className="text-2xl font-bold text-white">Mars Valles Metropolis</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Self-sustaining settlement of over 5,000 active permanent colonists situated in Valles Marineris. Fully operating fusion energy infrastructure and active biological soil terraforming rovers.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-400">Target Population:</span>
              <span className="text-rose-400">12,000 Citizens</span>
            </div>
          </Card>

          <Card className="glass-card p-8 rounded-3xl space-y-6 hover:border-cyan-500/40 flex flex-col justify-between">
            <div className="space-y-3">
              <Badge variant="outline" className="text-cyan-300 border-cyan-300/30 bg-cyan-400/10 font-mono text-xs">HORIZON 2065</Badge>
              <h3 className="text-2xl font-bold text-white">Asteroid Mining Syndicates</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Proof-of-concept multi-million-dollar autonomous robotic prospecting fleets ferrying high-grade platinum metals from Psyche and Bennu near-Earth orbits entirely.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-400">Estimated Yield:</span>
              <span className="text-cyan-400">40% Global Metals</span>
            </div>
          </Card>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: GEOPOLITICAL INTELLIGENCE */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-purple-400 border-purple-400/40 bg-purple-500/10 px-3 py-1 font-mono text-xs">
            06. MULTI-POLAR SOVEREIGNTY
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            Geopolitical Domain Superpower Radar
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg font-medium">
            Highly articulate comparative radar analysis mapping current (2026) vs future (2050 & 2100) capabilities of primary international federations and corporate non-state syndicates.
          </p>
        </div>

        <div className="w-full pt-4">
          <RadarSuperpowerVisualizer />
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 7: INTERACTIVE TIMELINE */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-indigo-400 border-indigo-400/40 bg-indigo-500/10 px-3 py-1 font-mono text-xs">
            07. FUTURE CHRONOLOGY
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            Interactive Definitive Prediction Roadmap
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg font-medium">
            Exhaustive chronological feed constructed from empirical multi-variable forecasts. Filter by specific civilizational domain below.
          </p>
        </div>

        <div className="w-full pt-4">
          <PredictionTimelineVisualizer />
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 8: ENTERPRISE USE CASES */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs">
            08. DEPLOYMENT TARGETS
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            Built for Global Decision-Makers
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg font-medium">
            CivitasAI serves as the primary operational foresight infrastructure across public sector intelligence, enterprise strategy, and academic research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-card p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-cyan-500/40">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-white">Sovereign Governments & Intelligence</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Deploy automated Black Swan early warning alerts, verify semiconductor interdependency corridors, and simulate long-term fiscal stability policies under extreme automation scenarios.
              </p>
            </div>
            <ul className="space-y-2 border-t border-white/5 pt-4 text-xs font-mono text-slate-400 font-bold">
              <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Autonomous Threat Alerts</span></li>
              <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Secure Private Datastores</span></li>
            </ul>
          </Card>

          <Card className="glass-card p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-indigo-500/40">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Activity className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-white">Think Tanks & Strategy Planners</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Produce definitive multi-hundred-page policy reports, export interactive world HTML heatmaps for executive briefings, and model competitive CPTPP vs USMCA trade tariffs.
              </p>
            </div>
            <ul className="space-y-2 border-t border-white/5 pt-4 text-xs font-mono text-slate-400 font-bold">
              <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Definitive PDF Generator</span></li>
              <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Custom Macro Presets</span></li>
            </ul>
          </Card>

          <Card className="glass-card p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-purple-500/40">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-white">Enterprise Capital Investment</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Evaluate empirical multi-trillion ROI indexes, discover future high-value job guilds, and anticipate next-generation solid-state storage transitions.
              </p>
            </div>
            <ul className="space-y-2 border-t border-white/5 pt-4 text-xs font-mono text-slate-400 font-bold">
              <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Live ROI Projections</span></li>
              <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Raw JSON Datasets Export</span></li>
            </ul>
          </Card>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 9: RESEARCH INSTITUTIONS */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-emerald-400 border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs">
            09. ACADEMIC HUB
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            Trusted by Top Universities
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg font-medium">
            Our strict 80%+ test coverage models and transparent Python 3.12 asynchronous core make CivitasAI the definitive quantitative platform for empirical academic foresight.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center opacity-80 pt-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center font-mono font-bold text-xs text-slate-300 hover:text-white hover:border-white/20 transition-all">
            ♜ OXFORD FORESIGHT
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center font-mono font-bold text-xs text-slate-300 hover:text-white hover:border-white/20 transition-all">
            ♜ MIT STRATEGY GROUP
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center font-mono font-bold text-xs text-slate-300 hover:text-white hover:border-white/20 transition-all">
            ♜ STANFORD ASI LAB
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center font-mono font-bold text-xs text-slate-300 hover:text-white hover:border-white/20 transition-all">
            ♜ ETH ZURICH CORE
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center font-mono font-bold text-xs text-slate-300 hover:text-white hover:border-white/20 transition-all">
            ♜ CAMBRIDGE GISS
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center font-mono font-bold text-xs text-slate-300 hover:text-white hover:border-white/20 transition-all">
            ♜ TOKYO PIVOT HUB
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 10: PRICING & PLANS */}
      {/* ---------------------------------------------------- */}
      <section className="container space-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-amber-400 border-amber-400/40 bg-amber-500/10 px-3 py-1 font-mono text-xs">
            10. ENTERPRISE PLANS
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
            SaaS Commercialization Architecture
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-base sm:text-lg font-medium">
            Select the specific compute level that aligns with your institutional foresight requirements entirely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {/* Guest Preview */}
          <Card className="glass-card p-8 rounded-3xl space-y-6 flex flex-col justify-between border-white/5">
            <div className="space-y-4">
              <Badge variant="outline" className="text-slate-400 border-white/10 font-mono text-xs bg-slate-900">FREE SANDBOX</Badge>
              <h3 className="text-3xl font-black text-white">$0 <span className="text-sm font-sans text-slate-400 font-bold">/ forever</span></h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Perfect for individual researchers exploring baseline live demos and timeline graphs.
              </p>
              <ul className="space-y-2.5 border-t border-white/5 pt-4 text-xs font-mono text-slate-300">
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Public Demo Simulation Endpoint</span></li>
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Standard Visual Visualizers</span></li>
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>14 Active Cloud Nodes</span></li>
              </ul>
            </div>
            <Button variant="outline" size="lg" onClick={setGuestMode} className="w-full text-base font-bold bg-slate-900 hover:bg-slate-800 border-white/10 text-white rounded-2xl py-6">
              Launch Guest Demo
            </Button>
          </Card>

          {/* Professional Core */}
          <Card className="glass-panel p-8 rounded-3xl space-y-6 flex flex-col justify-between border-indigo-500/60 relative overflow-hidden shadow-2xl shadow-indigo-500/20 scale-105">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-mono font-black uppercase px-4 py-1 rounded-bl-2xl">
              POPULAR
            </div>
            <div className="space-y-4">
              <Badge variant="outline" className="text-indigo-300 border-indigo-400/40 bg-indigo-500/10 font-mono text-xs">PROFESSIONAL SAAS</Badge>
              <h3 className="text-3xl font-black text-white">$499 <span className="text-sm font-sans text-slate-400 font-bold">/ seat / month</span></h3>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                Designed for think tanks and strategic business users requiring full custom 9-variable sliders and PDF executive summaries.
              </p>
              <ul className="space-y-2.5 border-t border-white/10 pt-4 text-xs font-mono text-slate-200 font-bold">
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Unlimited Scenario Executions</span></li>
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Live Multi-Model AI Gateways</span></li>
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Full Professional PDF Report Generator</span></li>
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>System Risk & Black Swan Alert Tunnels</span></li>
              </ul>
            </div>
            <Link href="/auth/register">
              <Button size="lg" className="w-full text-base font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/30 rounded-2xl py-6">
                Start Professional Trial
              </Button>
            </Link>
          </Card>

          {/* Enterprise Core */}
          <Card className="glass-card p-8 rounded-3xl space-y-6 flex flex-col justify-between border-purple-500/40">
            <div className="space-y-4">
              <Badge variant="outline" className="text-purple-300 border-purple-400/40 bg-purple-500/10 font-mono text-xs">ENTERPRISE CLUSTER</Badge>
              <h3 className="text-3xl font-black text-white">Custom <span className="text-sm font-sans text-slate-400 font-bold">/ institution</span></h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                For sovereign governments and top universities requiring dedicated AWS EKS clusters and raw JSON API extraction lines.
              </p>
              <ul className="space-y-2.5 border-t border-white/5 pt-4 text-xs font-mono text-slate-300 font-bold">
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Dedicated ECS / Kubernetes Manifests</span></li>
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Complete Terraform Infrastructure</span></li>
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>Asynchronous UN & NASA Adapters</span></li>
                <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /><span>24/7 Priority Agent Model Support</span></li>
              </ul>
            </div>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="w-full text-base font-bold bg-slate-900 hover:bg-slate-800 border-purple-500/50 text-white rounded-2xl py-6">
                Contact Sovereign Core
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Interactive Live Sandbox Preview Prompt Footer */}
      <section className="container max-w-6xl mx-auto pb-12">
        <div className="glass-panel p-10 lg:p-14 rounded-3xl border border-white/15 shadow-2xl flex flex-col items-center text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          
          <div className="space-y-3 max-w-3xl">
            <Award className="h-12 w-12 text-indigo-400 mx-auto animate-bounce" />
            <h3 className="text-3xl font-black text-white tracking-tight sm:text-5xl">
              Ready to Explore Plausible Civilization Scenarios?
            </h3>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
              Join governments, think tanks, and enterprise leaders running multi-horizon strategic predictions today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2">
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base font-extrabold px-8 py-7 bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/30 rounded-2xl space-x-2 group">
                <span>Provision Account Ledger</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={setGuestMode}
              className="w-full sm:w-auto text-base font-bold px-8 py-7 bg-slate-900/90 hover:bg-slate-800 text-white border-white/10 rounded-2xl space-x-2"
            >
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span>Explore as Guest Mode</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
