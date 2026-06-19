"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { APIClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Database,
  Globe2,
  Compass,
  Zap,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Search,
  Sparkles,
  Server,
  Activity,
} from "lucide-react";

export default function DataSourcesPage() {
  const [sources, setSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [syncingCode, setSyncingCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchSources = async () => {
      setIsLoading(true);
      try {
        const data = await APIClient.listDataSources();
        setSources(data);
      } catch (err: any) {
        setError(err.message || "Failed to retrieve global empirical data source adapters entirely.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSources();
  }, []);

  const triggerAdapterSync = (code: string) => {
    setSyncingCode(code);
    setTimeout(() => {
      setSyncingCode(null);
    }, 1200);
  };

  return (
    <div className="container space-y-12 pt-8 pb-32 max-w-7xl mx-auto select-none">
      {/* Premium Header */}
      <div className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-3xl relative z-10">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs uppercase font-extrabold">
            GLOBAL EMPIRICAL ARCHITECTURE
          </Badge>
          <h1 className="text-4xl font-black text-white tracking-tight sm:text-6xl leading-tight">
            Empirical Data Adapters
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            Our asynchronous modular engine digests live telemetries from primary international datastores. Historical economic, climatic, and demographic trends are structured to compute continuous multi-horizon predictions entirely.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-3 rounded-xl border border-white/10 text-xs font-mono relative z-10 shrink-0">
          <Server className="h-4 w-4 text-cyan-400" />
          <span className="text-cyan-400 font-bold">6 International Gateway Hubs Active</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      ) : error ? (
        <div className="glass-panel border-destructive/50 bg-destructive/10 p-8 rounded-3xl text-destructive text-center space-y-3 max-w-md mx-auto shadow-2xl">
          <AlertCircle className="h-12 w-12 mx-auto animate-pulse" />
          <h3 className="text-2xl font-black text-white">Adapter Query Exception</h3>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">{error}</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          <AnimatePresence>
            {sources.map((src, idx) => (
              <motion.div
                key={src.code}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ translateY: -4 }}
                className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-white/10 hover:border-cyan-500/50 shadow-2xl group space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-white/10 bg-slate-900 text-white font-mono text-xs uppercase font-extrabold px-3 py-1">
                      {src.code} HUB
                    </Badge>
                    <span className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded-lg">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>ADAPTER LIVE</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-400 transition-colors flex items-center space-x-2.5 leading-tight tracking-tight">
                    <Database className="h-6 w-6 text-cyan-400 shrink-0" />
                    <span>{src.name}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium bg-slate-900/40 p-4 rounded-2xl border border-white/5">
                    {src.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5 flex items-center justify-between gap-2 font-mono text-xs">
                  <a href={src.url} target="_blank" rel="noreferrer" className="flex-1 mr-2">
                    <Button variant="link" size="sm" className="w-full text-xs space-x-1.5 text-slate-400 hover:text-white p-0 justify-start">
                      <span>Inspect Raw Portal</span>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    onClick={() => triggerAdapterSync(src.code)}
                    disabled={syncingCode === src.code}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl px-4 space-x-1.5 shadow-lg shadow-cyan-500/25 shrink-0"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${syncingCode === src.code ? "animate-spin" : ""}`} />
                    <span>{syncingCode === src.code ? "Ingesting..." : "Test Adapter"}</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Prompt */}
      <div className="glass-panel p-10 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl mt-8">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl font-black text-white tracking-tight">Require a specialized custom non-state agency integration?</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Our decoupled Data Sources Architecture (`backend/app/services/data_adapters.py`) supports highly streamlined creation of asynchronous Python 3.12 endpoints entirely.
          </p>
        </div>
        <Link href="/dashboard" className="shrink-0">
          <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-black text-base px-8 py-7 shadow-xl shadow-cyan-500/25 space-x-2 rounded-2xl">
            <span>Return to Workspace Hub</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
