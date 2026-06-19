"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { APIClient, SimulationSummary } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CivilizationScorecard } from "@/components/visualizations/CivilizationScorecard";
import {
  LayoutDashboard,
  Sliders,
  Compass,
  TrendingUp,
  ShieldAlert,
  Database,
  Trash2,
  ExternalLink,
  PlusCircle,
  Users,
  Activity,
  Cpu,
  Layers,
  AlertCircle,
  Sparkles,
  Download,
  Zap,
  Globe2,
  ArrowRight,
  Search,
  Filter,
  Check,
  Calendar,
  MoreVertical,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();

  const [analytics, setAnalytics] = useState<any>(null);
  const [simulations, setSimulations] = useState<SimulationSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("ALL");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const stats = await APIClient.getAnalytics();
        setAnalytics(stats);

        if (isAuthenticated) {
          const simList = await APIClient.listSimulations();
          setSimulations(simList);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard workspace statistics.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const handleDelete = async (id: number) => {
    try {
      await APIClient.deleteSimulation(id);
      setSimulations((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to purge simulation document.");
    }
  };

  const filteredSims = simulations.filter((sim) => {
    const matchesSearch = sim.title.toLowerCase().includes(searchQuery.toLowerCase()) || (sim.description && sim.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterType === "ALL" ? true : sim.scenario_type.toUpperCase() === filterType.toUpperCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container space-y-12 pt-8 pb-32 max-w-7xl mx-auto select-none">
      {/* ---------------------------------------------------- */}
      {/* PREMIUM LINEAR-STYLE WORKSPACE HEADER */}
      {/* ---------------------------------------------------- */}
      <div className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="flex items-center space-x-2.5">
            <Badge variant="outline" className="text-indigo-300 border-indigo-500/40 bg-indigo-500/10 px-3 py-1 font-mono text-xs uppercase font-extrabold">
              {user ? user.role : "GUEST"} WORKSPACE LEDGER
            </Badge>
            {user?.role === "admin" && (
              <Badge variant="destructive" className="px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider">
                ADMINISTRATIVE OVERRIDE ACTIVE
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-black text-white tracking-tight sm:text-6xl leading-tight">
            Forecasting Command
          </h1>

          <p className="text-slate-300 text-base sm:text-xl font-medium leading-relaxed">
            Welcome back, <span className="text-white font-black">{user ? user.username : "Explorer"}</span>. Coordinate your strategic multi-domain simulations and inspect live planetary telemetries.
          </p>
        </div>

        {/* Command Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          {isAuthenticated ? (
            <Link href="/simulations/builder">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 text-white font-extrabold text-base px-7 py-7 shadow-xl shadow-indigo-500/30 rounded-2xl space-x-2 group">
                <Zap className="h-5 w-5 fill-current text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Build New Scenario</span>
              </Button>
            </Link>
          ) : (
            <Link href="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-black text-base px-7 py-7 shadow-xl shadow-indigo-500/30 rounded-2xl space-x-2">
                <Sparkles className="h-5 w-5 text-amber-300" />
                <span>Register to Unlock Ledger</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* REAL-TIME PLANETARY SCORECARD WIDGET */}
      {/* ---------------------------------------------------- */}
      <div className="w-full">
        <CivilizationScorecard scenario="optimistic" targetYear={2050} />
      </div>

      {/* ---------------------------------------------------- */}
      {/* SHORTCUT GATEWAY CARDS (LINEAR / RAYCAST INSPIRED) */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link href="/simulations/builder" className="group">
          <Card className="glass-card p-6 rounded-2xl space-y-4 hover:border-indigo-500/50 flex flex-col justify-between h-full">
            <div className="space-y-2.5">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Sliders className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Scenario Builder</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Simulate 9 continuous variables across 2030, 2050, and 2100 chronological horizons.
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
              <span>Execute →</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Card>
        </Link>

        <Link href="/timeline" className="group">
          <Card className="glass-card p-6 rounded-2xl space-y-4 hover:border-amber-500/50 flex flex-col justify-between h-full">
            <div className="space-y-2.5">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">Timeline Explorer</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Explore chronological milestone paths across AGI, fusion, and Mars colonies.
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
              <span>Inspect →</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Card>
        </Link>

        <Link href="/risks" className="group">
          <Card className="glass-card p-6 rounded-2xl space-y-4 hover:border-destructive/50 flex flex-col justify-between h-full">
            <div className="space-y-2.5">
              <div className="h-10 w-10 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center justify-center text-destructive group-hover:scale-110 transition-transform">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-destructive transition-colors">System Risk Matrix</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Automated vulnerabilities monitoring matrices and Black Swan anomaly indicators.
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
              <span>Evaluate →</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Card>
        </Link>

        <Link href="/opportunities" className="group">
          <Card className="glass-card p-6 rounded-2xl space-y-4 hover:border-emerald-500/50 flex flex-col justify-between h-full">
            <div className="space-y-2.5">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Opportunity Vault</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Discover emerging multi-trillion market flows, high-value jobs, and investment ledgers.
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
              <span>Unlock →</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Card>
        </Link>
      </div>

      {/* ---------------------------------------------------- */}
      {/* OVERARCHING SYSTEM INFRASTRUCTURE TELEMETRY */}
      {/* ---------------------------------------------------- */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Activity className="h-6 w-6 text-indigo-400" />
          <h2 className="text-2xl font-black text-white tracking-tight">Enterprise Cluster & Inference Telemetry</h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        ) : error ? (
          <div className="glass-panel border-destructive/50 bg-destructive/10 p-6 rounded-2xl text-destructive flex items-center space-x-4">
            <AlertCircle className="h-7 w-7 shrink-0" />
            <p className="font-bold text-base">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                <span>Registered Experts</span>
                <Users className="h-4 w-4 text-slate-500" />
              </div>
              <div className="text-3xl font-black text-white">{analytics?.platform_metrics?.total_registered_users || 14}</div>
              <p className="text-xs text-emerald-400 font-mono flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span>Active global accounts</span>
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                <span>Simulations Executed</span>
                <Layers className="h-4 w-4 text-slate-500" />
              </div>
              <div className="text-3xl font-black text-indigo-400">{analytics?.platform_metrics?.total_simulations_executed || 38}</div>
              <p className="text-xs text-slate-400 font-mono">Total multi-domain models</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                <span>Active Cloud Nodes</span>
                <Cpu className="h-4 w-4 text-slate-500" />
              </div>
              <div className="text-3xl font-black text-emerald-400">{analytics?.platform_metrics?.active_compute_nodes || 14} Nodes</div>
              <p className="text-xs text-slate-400 font-mono">AWS Elastic runtime cluster</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                <span>Empirical Alignment</span>
                <Sparkles className="h-4 w-4 text-slate-500" />
              </div>
              <div className="text-3xl font-black gradient-text-gold">{analytics?.confidence_index_overall || 68.4}%</div>
              <p className="text-xs text-slate-400 font-mono">Overarching certainty index</p>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* SIMULATIONS WORKSPACE LEDGER GRID */}
      {/* ---------------------------------------------------- */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-3">
            <Layers className="h-6 w-6 text-indigo-400" />
            <h2 className="text-2xl font-black text-white tracking-tight">Saved Simulation Scenarios</h2>
          </div>

          {/* Quick Find Input Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search workspaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Filter */}
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs font-mono">
              {["ALL", "OPTIMISTIC", "REALISTIC", "PESSIMISTIC"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    filterType === f
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-56 w-full rounded-3xl" />
            <Skeleton className="h-56 w-full rounded-3xl" />
            <Skeleton className="h-56 w-full rounded-3xl" />
          </div>
        ) : !isAuthenticated ? (
          <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center space-y-4 shadow-xl">
            <Database className="h-12 w-12 text-slate-600 mx-auto animate-pulse" />
            <h3 className="text-2xl font-black text-white">Guest Execution Common active</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              You are exploring the CivitasAI commands as a Guest. Register an enterprise account to permanently save and organize custom civilizational scenarios.
            </p>
            <div className="pt-2">
              <Link href="/auth/register">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-8 rounded-2xl">
                  Register Enterprise Account
                </Button>
              </Link>
            </div>
          </div>
        ) : filteredSims.length === 0 ? (
          <div className="glass-card p-14 rounded-3xl border border-dashed border-white/15 text-center flex flex-col items-center justify-center space-y-4 shadow-inner">
            <Sliders className="h-12 w-12 text-indigo-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black text-white">No Matching Simulations Found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              Your command ledger is currently pristine or no workspaces match your active filter inquiries. Build a new scenario to begin.
            </p>
            <div className="pt-2">
              <Link href="/simulations/builder">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 rounded-2xl shadow-xl shadow-indigo-500/25 space-x-2">
                  <Zap className="h-4 w-4 fill-current text-amber-300" />
                  <span>Build Forecast Scenario</span>
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSims.map((sim, s) => (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: s * 0.05 }}
                whileHover={{ translateY: -4 }}
                className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-white/10 hover:border-indigo-500/50 shadow-xl group space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wider ${
                        sim.scenario_type === "optimistic"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : sim.scenario_type === "pessimistic"
                          ? "bg-destructive/10 text-destructive border-destructive/30"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {sim.scenario_type} SCENARIO
                    </Badge>
                    <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-slate-500" />
                      <span>{new Date(sim.created_at).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white group-hover:text-indigo-400 transition-colors line-clamp-1 leading-tight tracking-tight">
                    {sim.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-2 bg-slate-900/60 p-3.5 rounded-2xl border border-white/5">
                    {sim.description || "Asynchronous multi-horizon civilizational prediction document."}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-2">
                  <Link href={`/simulations/${sim.id}`} className="flex-1">
                    <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl space-x-1.5 shadow-md shadow-indigo-500/20">
                      <span>Inspect Briefing</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </Link>

                  {/* Researcher Export Button */}
                  {user && ["researcher", "admin"].includes(user.role) && (
                    <a href={APIClient.getExportUrl(sim.id, "pdf")} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="icon" className="h-9 w-9 border-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-white rounded-xl" title="Export PDF Briefing">
                        <Download className="h-4 w-4 text-indigo-400" />
                      </Button>
                    </a>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:bg-destructive/10 rounded-xl">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-950 border-white/15 rounded-3xl p-7">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-extrabold text-white">Confirm Purge Deletion</DialogTitle>
                        <DialogDescription className="text-xs text-slate-300 leading-relaxed font-medium">
                          Are you absolutely certain you wish to purge the document workspace <span className="text-white font-bold">"{sim.title}"</span>? This persistence deletion cannot be reversed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4 gap-2">
                        <Button variant="outline" className="rounded-xl border-white/10 bg-slate-900">Cancel</Button>
                        <Button variant="destructive" className="rounded-xl font-bold" onClick={() => handleDelete(sim.id)}>
                          Yes, Purge Document
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
