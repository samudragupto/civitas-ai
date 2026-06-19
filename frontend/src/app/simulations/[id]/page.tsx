"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { APIClient, CompleteSimulation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ClimateChart } from "@/components/charts/ClimateChart";
import { EconomicChart } from "@/components/charts/EconomicChart";
import { TechRoadmapChart } from "@/components/charts/TechRoadmapChart";
import { InfluenceHeatmapChart } from "@/components/charts/InfluenceHeatmapChart";
import { CivilizationScorecard } from "@/components/visualizations/CivilizationScorecard";
import { AdvancedClimateLineChart } from "@/components/visualizations/AdvancedClimateLineChart";
import { RadarSuperpowerVisualizer } from "@/components/visualizations/RadarSuperpowerVisualizer";
import { InfluenceNetworkGraph } from "@/components/visualizations/InfluenceNetworkGraph";
import {
  Globe2,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldAlert,
  Compass,
  ArrowLeft,
  Download,
  FileText,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  Layers,
  Cpu,
  Activity,
  Calendar,
  Share2,
  Check,
  Network,
  Rocket,
  Info,
} from "lucide-react";

import Cookies from "js-cookie";
import { API_BASE } from "@/lib/api";

const handleExport = async (
  simId: number,
  format: "pdf" | "docx" | "json"
) => {
  try {
    const token = Cookies.get("civitas_access_token");

    const response = await fetch(
      `${API_BASE}/exports/${simId}/${format}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Export failed (${response.status})`);
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `simulation-${simId}.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};

export default function SimulationResultsPage() {
  const params = useParams();
  const router = useRouter();
  const simId = Number(params.id);

  const [simulation, setSimulation] = useState<CompleteSimulation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!simId) return;
    const fetchSim = async () => {
      setIsLoading(true);
      try {
        const data = await APIClient.getSimulation(simId);
        setSimulation(data);
      } catch (err: any) {
        setError(err.message || "Failed to retrieve specific simulation document briefing.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSim();
  }, [simId]);

  if (isLoading) {
    return (
      <div className="container space-y-10 pt-12 pb-32 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="h-56 w-full rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 w-full rounded-3xl" />
          <Skeleton className="h-96 w-full rounded-3xl lg:col-span-2" />
        </div>
      </div>
    );
  }

  if (error || !simulation) {
    return (
      <div className="container pt-20 pb-32 max-w-md mx-auto text-center select-none">
        <Card className="glass-panel border-destructive/50 p-8 text-destructive space-y-5 shadow-2xl">
          <AlertTriangle className="h-14 w-14 mx-auto text-destructive animate-pulse" />
          <h3 className="text-2xl font-black text-white tracking-tight">Briefing Extraction Failed</h3>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">{error || "Document not found or access denied entirely."}</p>
          <Link href="/dashboard">
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl py-6 space-x-2 border border-white/10">
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Hub Ledger</span>
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const { results } = simulation;

  return (
    <div className="container space-y-12 pt-8 pb-32 max-w-7xl mx-auto select-none">
      {/* ---------------------------------------------------- */}
      {/* SHORTCUT BACK LEDGER */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="space-x-2 text-slate-400 hover:text-white rounded-xl px-3 hover:bg-white/5 font-mono text-xs">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard Hub</span>
          </Button>
        </Link>
        <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/5">
          Workspace Ledger: <span className="text-amber-400 font-bold">#{simulation.id}</span> | Stance: <span className="text-white font-bold">{simulation.scenario_type.toUpperCase()}</span>
        </span>
      </div>

      {/* ---------------------------------------------------- */}
      {/* PREMIUM BRIEFING HEADER */}
      {/* ---------------------------------------------------- */}
      <div className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <Badge
              variant="outline"
              className={`px-3 py-1 font-black uppercase tracking-wider ${
                simulation.scenario_type === "optimistic"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : simulation.scenario_type === "pessimistic"
                  ? "bg-destructive/10 text-destructive border-destructive/30"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/30"
              }`}
            >
              {simulation.scenario_type} SCENARIO
            </Badge>
            <Badge variant="outline" className="px-3 py-1 space-x-1.5 border-white/10 bg-slate-900/90 text-slate-300">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              <span>Computed {new Date(simulation.created_at).toLocaleDateString()}</span>
            </Badge>
          </div>

          <h1 className="text-4xl font-black text-white tracking-tight sm:text-6xl leading-tight">
            {simulation.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
            {simulation.description || "Executive scenario projection incorporating advanced R&D parameters and multi-state empirical alignments."}
          </p>
        </div>

        {/* Export System Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 relative z-10 shrink-0 bg-slate-900/80 p-6 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block w-full text-center lg:text-left mb-1">
            Export Deliverables:
          </span>
          <Button
            onClick={() => handleExport(simulation.id, "pdf")}
          >
            Export PDF
          </Button>
          <div className="grid grid-cols-2 gap-2 w-full">
            <a href={APIClient.getExportUrl(simulation.id, "docx")} target="_blank" rel="noreferrer" className="w-full">
              <Button variant="outline" size="sm" className="w-full bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs space-x-1.5 rounded-xl border-white/10">
                <Download className="h-3.5 w-3.5 text-blue-400" />
                <span>DOCX</span>
              </Button>
            </a>
            <a href={APIClient.getExportUrl(simulation.id, "json")} target="_blank" rel="noreferrer" className="w-full">
              <Button variant="outline" size="sm" className="w-full bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs space-x-1.5 rounded-xl border-white/10">
                <FileCode className="h-3.5 w-3.5 text-amber-400" />
                <span>JSON</span>
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* TABS WORKSPACE */}
      {/* ---------------------------------------------------- */}
      <Tabs defaultValue="summary" className="space-y-8">
        <div className="flex justify-center overflow-x-auto">
          <TabsList className="h-14 p-1.5 bg-slate-900/90 border border-white/10 rounded-2xl space-x-2 shadow-xl">
            <TabsTrigger value="summary" className="text-xs font-mono px-5 py-2.5 rounded-xl data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-black tracking-wider uppercase transition-all">
              Executive Brief
            </TabsTrigger>
            <TabsTrigger value="horizons" className="text-xs font-mono px-5 py-2.5 rounded-xl data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-black tracking-wider uppercase transition-all">
              Domain Visuals
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="text-xs font-mono px-5 py-2.5 rounded-xl data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-black tracking-wider uppercase transition-all">
              Roadmap Feed
            </TabsTrigger>
            <TabsTrigger value="risk_opp" className="text-xs font-mono px-5 py-2.5 rounded-xl data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-black tracking-wider uppercase transition-all">
              Risks & Opportunities
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 1. SUMMARY TAB */}
        {/* ---------------------------------------------------- */}
        <TabsContent value="summary" className="space-y-8">
          {/* Civilization Scorecard Widget */}
          <div className="w-full">
            <CivilizationScorecard scenario={simulation.scenario_type} targetYear={2050} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Narrative Synthesis */}
            <div className="lg:col-span-8 glass-panel p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                <Sparkles className="h-6 w-6 text-indigo-400" />
                <h3 className="text-2xl font-black text-white tracking-tight">Professional Executive Report Narrative</h3>
              </div>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                {results.executive_summary.split("\n\n").map((para, i) => {
                  const cleaned = para.replace(/# /g, "").replace(/\*\*/g, "");
                  if (!cleaned.trim()) return null;
                  if (cleaned.startsWith("Strategic Highlights") || cleaned.startsWith("Strategic Deep")) {
                    return (
                      <h4 key={i} className="text-lg font-black text-white pt-4 border-t border-white/10 flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-indigo-400" />
                        <span>{cleaned}</span>
                      </h4>
                    );
                  }
                  return <p key={i} className="bg-slate-900/40 p-4 rounded-2xl border border-white/5">{cleaned}</p>;
                })}
              </div>
            </div>

            {/* Side Meta Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card p-7 rounded-3xl border border-white/10 space-y-6 shadow-xl">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <h4 className="text-lg font-black text-white flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>Empirical Confidence Indices</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">Estimated operational certainty index for critical breakthroughs entirely.</p>
                </div>
                <div className="space-y-5">
                  {results.confidence_scores.map((score, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-slate-200 line-clamp-1 mr-2">{score.item}</span>
                        <span className="text-emerald-400 font-black shrink-0">{score.confidence_percentage}%</span>
                      </div>
                      <Progress value={score.confidence_percentage} className="h-2 bg-slate-800" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Summary */}
              <div className="glass-card p-7 rounded-3xl border border-white/10 space-y-4 shadow-xl font-mono text-xs">
                <span className="text-xs font-mono font-black uppercase text-indigo-400 tracking-wider block border-b border-white/10 pb-3">Foundational Boundary Telemetry</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-white/5">
                    <span className="text-slate-500 block">AI PACING:</span>
                    <span className="text-base font-black text-white">{simulation.ai_advancement} / 100</span>
                  </div>
                  <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-white/5">
                    <span className="text-slate-500 block">CLIMATE ACT:</span>
                    <span className="text-base font-black text-emerald-400">{simulation.climate_action} / 100</span>
                  </div>
                  <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-white/5">
                    <span className="text-slate-500 block">ENERGY INN:</span>
                    <span className="text-base font-black text-amber-400">{simulation.energy_innovation} / 100</span>
                  </div>
                  <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-white/5">
                    <span className="text-slate-500 block">SPACE INV:</span>
                    <span className="text-base font-black text-purple-400">{simulation.space_investment} / 100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Feed Cards */}
          <div className="space-y-6 pt-6">
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
              <Compass className="h-7 w-7 text-indigo-400" />
              <span>Milestone Horizons Feed (2030, 2050, 2100)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {[2030, 2050, 2100].map((yr) => {
                const yrData = results.forecasts[yr];
                if (!yrData) return null;
                return (
                  <motion.div whileHover={{ translateY: -4 }} key={yr} className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-mono font-black text-6xl pointer-events-none">
                      {yr}
                    </div>

                    <div className="space-y-4 relative z-10">
                      <Badge variant="outline" className="text-amber-400 border-amber-400/40 bg-amber-500/10 px-3 py-1 font-mono text-xs">
                        HORIZON {yr}
                      </Badge>
                      <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                        {yr === 2030 ? "Foundation & Pacing" : yr === 2050 ? "Transition & Abundance" : "Interplanetary Continuity"}
                      </h3>

                      <div className="space-y-4 pt-2 text-xs leading-relaxed">
                        <div className="space-y-1 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                          <span className="font-mono font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5"><Cpu className="h-3.5 w-3.5" /><span>Technology:</span></span>
                          <p className="text-slate-300 font-medium">{yrData.technology.agi} {yrData.technology.robotics}</p>
                        </div>

                        <div className="space-y-1 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                          <span className="font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5"><TrendingUp className="h-3.5 w-3.5" /><span>Economy & GDP:</span></span>
                          <p className="text-slate-300 font-medium">GDP Growth Rate: <span className="text-emerald-400 font-bold">{yrData.economy.gdp_growth_rate}%</span>. {yrData.economy.automation_impact}</p>
                        </div>

                        <div className="space-y-1 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                          <span className="font-mono font-black text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5"><Globe2 className="h-3.5 w-3.5" /><span>Environment:</span></span>
                          <p className="text-slate-300 font-medium">Projected Sea Level Rise: <span className="text-cyan-400 font-bold">{yrData.climate.sea_level_rise_cm} cm</span>. {yrData.climate.biodiversity_index}</p>
                        </div>

                        <div className="space-y-1 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                          <span className="font-mono font-black text-purple-400 uppercase tracking-wider flex items-center space-x-1.5"><Rocket className="h-3.5 w-3.5" /><span>Space Exploration:</span></span>
                          <p className="text-slate-300 font-medium">{yrData.space.lunar_colonies} {yrData.space.mars_missions}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* ---------------------------------------------------- */}
        {/* 2. VISUALS TAB */}
        {/* ---------------------------------------------------- */}
        <TabsContent value="horizons" className="space-y-8">
          <div className="w-full">
            <AdvancedClimateLineChart data={results.visualizations.climate_evolution} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 flex flex-col justify-between">
              <div className="space-y-1 border-b border-white/10 pb-4 font-mono text-xs">
                <Badge variant="outline" className="text-emerald-400 border-emerald-400/40 bg-emerald-500/10">INDUSTRY FLOWS</Badge>
                <h3 className="text-2xl font-black text-white pt-2 tracking-tight">Economic Transformation Analysis</h3>
                <p className="text-xs text-slate-400 font-medium">Overarching civilizational industry shifts across 2030, 2050, and 2100 targets.</p>
              </div>
              <div className="w-full pt-2">
                <EconomicChart data={results.visualizations.economic_transformation} />
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 flex flex-col justify-between">
              <div className="space-y-1 border-b border-white/10 pb-4 font-mono text-xs">
                <Badge variant="outline" className="text-indigo-400 border-indigo-400/40 bg-indigo-500/10">SUPERPOWER RADAR</Badge>
                <h3 className="text-2xl font-black text-white pt-2 tracking-tight">Global Influence Heatmap Matrix</h3>
                <p className="text-xs text-slate-400 font-medium">Comparative superpower radar capabilities across emerging national and corporate hubs entirely.</p>
              </div>
              <div className="w-full pt-2">
                <InfluenceHeatmapChart data={results.visualizations.global_influence_heatmap} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ---------------------------------------------------- */}
        {/* 3. ROADMAP TAB */}
        {/* ---------------------------------------------------- */}
        <TabsContent value="roadmap" className="space-y-8">
          <div className="w-full">
            <InfluenceNetworkGraph />
          </div>

          <div className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <Badge variant="outline" className="text-amber-400 border-amber-400/40 bg-amber-500/10 font-mono text-xs">DEFINITIVE ROADMAP</Badge>
                <h3 className="text-2xl font-black text-white flex items-center space-x-2.5 tracking-tight pt-1">
                  <Compass className="h-6 w-6 text-amber-400" />
                  <span>Detailed Chronological Prediction Feed</span>
                </h3>
              </div>
            </div>

            <div className="space-y-8 relative pl-4 sm:pl-8 border-l-2 border-amber-500/30 ml-2">
              {results.visualizations.timeline.map((event, idx) => (
                <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} key={idx} className="relative pl-6 sm:pl-10 group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 h-10 w-10 rounded-full bg-slate-950 border-4 border-amber-500 flex items-center justify-center font-mono font-black text-xs text-amber-400 group-hover:scale-125 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-xl">
                    {event.year}
                  </div>
                  <div className="glass-card p-6 rounded-2xl space-y-3 border border-white/5 group-hover:border-amber-500/40 transition-all shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge variant="outline" className="border-white/10 bg-slate-900 text-slate-300 font-mono text-xs">
                        {event.category.toUpperCase()}
                      </Badge>
                      <Badge variant={event.impact === "Revolutionary" ? "default" : "secondary"} className="text-xs font-black uppercase">
                        {event.impact} IMPACT
                      </Badge>
                    </div>
                    <h4 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-900/60 p-4 rounded-xl border border-white/5">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ---------------------------------------------------- */}
        {/* 4. RISKS & OPPORTUNITIES TAB */}
        {/* ---------------------------------------------------- */}
        <TabsContent value="risk_opp" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* 1. Risks */}
            <div className="glass-panel p-8 lg:p-10 rounded-3xl border border-destructive/40 shadow-2xl space-y-6">
              <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                <ShieldAlert className="h-7 w-7 text-destructive animate-pulse" />
                <h3 className="text-2xl font-black text-white tracking-tight">Systemic Risks & Black Swan Warnings</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-400">Major Strategic Infrastructure Threats:</span>
                  <div className="space-y-2.5">
                    {results.risk_analysis.major_threats.map((threat, idx) => (
                      <div key={idx} className="glass-card p-4 rounded-2xl border-destructive/30 bg-destructive/10 text-xs font-medium text-white flex items-start space-x-3 shadow-md">
                        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{threat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-400">Black Swan System Anomalies:</span>
                  <div className="space-y-2.5">
                    {results.risk_analysis.black_swan_events.map((swan, idx) => (
                      <div key={idx} className="glass-card p-4 rounded-2xl border-amber-500/30 bg-amber-500/10 text-xs font-medium text-white flex items-start space-x-3 shadow-md">
                        <Zap className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{swan}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Opportunities */}
            <div className="glass-panel p-8 lg:p-10 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6">
              <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                <Lightbulb className="h-7 w-7 text-emerald-400 animate-bounce" />
                <h3 className="text-2xl font-black text-white tracking-tight">Interplanetary Opportunity Index</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-400">Emerging Transformative Industries:</span>
                  <div className="space-y-2.5">
                    {results.opportunity_analysis.emerging_industries.map((ind, idx) => (
                      <div key={idx} className="glass-card p-4 rounded-2xl border-emerald-500/30 bg-emerald-500/10 text-xs font-medium text-white flex items-center space-x-3 shadow-md">
                        <Layers className="h-5 w-5 text-emerald-400 shrink-0" />
                        <span className="leading-relaxed font-bold">{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-400">High-Value Future Job Guilds:</span>
                  <div className="space-y-2.5">
                    {results.opportunity_analysis.future_jobs.map((job, idx) => (
                      <div key={idx} className="glass-card p-4 rounded-2xl border-blue-500/30 bg-blue-500/10 text-xs font-medium text-white flex items-center space-x-3 shadow-md">
                        <Briefcase className="h-5 w-5 text-blue-400 shrink-0" />
                        <span className="leading-relaxed font-bold">{job}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
