import React from "react";
import Link from "next/link";
import { Globe2, Heart, Shield, Cpu, Sparkles, Network } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#04060d] py-16 text-white select-none z-30 relative">
      <div className="container grid grid-cols-1 gap-12 md:grid-cols-5">
        {/* Startup Brand info */}
        <div className="flex flex-col space-y-5 md:col-span-2 max-w-sm">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
              <div className="h-full w-full bg-[#04060d] rounded-[10px] flex items-center justify-center">
                <Globe2 className="h-4 w-4 text-indigo-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Civitas<span className="gradient-text-primary">AI</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Human Civilization Forecasting Engine. Built on advanced multi-domain asynchronous synthesis layers. Designed for researchers, sovereign governments, and strategic enterprise decision-makers.
          </p>
          <div className="flex items-center space-x-3 text-xs font-mono text-slate-500">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Infrastructure Ready</span>
            </span>
          </div>
        </div>

        {/* Strategic Products Hub */}
        <div className="flex flex-col space-y-3.5 text-xs font-mono">
          <span className="text-slate-400 font-black tracking-wider uppercase">STRATEGIC FORESIGHT</span>
          <Link href="/simulations/builder" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all">
            Scenario Execution Engine
          </Link>
          <Link href="/timeline" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all">
            Civilization Future Timeline
          </Link>
          <Link href="/risks" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all">
            Systemic Risk Matrix
          </Link>
          <Link href="/opportunities" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all">
            Opportunity Vault Index
          </Link>
        </div>

        {/* Empirical Data Adapters */}
        <div className="flex flex-col space-y-3.5 text-xs font-mono">
          <span className="text-slate-400 font-black tracking-wider uppercase">EMPIRICAL ADAPTERS</span>
          <Link href="/data-sources" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all">
            World Bank Group
          </Link>
          <Link href="/data-sources" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all">
            International Monetary Fund
          </Link>
          <Link href="/data-sources" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all">
            NASA Goddard GISS
          </Link>
          <Link href="/data-sources" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all">
            UN Population Division
          </Link>
          <Link href="/data-sources" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all">
            Our World in Data (OWID)
          </Link>
        </div>

        {/* Enterprise Runtimes */}
        <div className="flex flex-col space-y-3.5 text-xs font-mono">
          <span className="text-slate-400 font-black tracking-wider uppercase">ENTERPRISE CLOUD</span>
          <span className="inline-flex items-center space-x-2 text-slate-300">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span>OWASP Multi-Tier Active</span>
          </span>
          <span className="inline-flex items-center space-x-2 text-slate-300">
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            <span>Kubernetes 100k+ Scaling</span>
          </span>
          <span className="inline-flex items-center space-x-2 text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Multi-Model AI Abstraction</span>
          </span>
        </div>
      </div>

      <div className="container mt-16 border-t border-white/5 pt-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0 text-xs font-mono">
        <p className="text-slate-500">
          © 2026 CivitasAI Enterprise SaaS. Built for human civilizational continuity.
        </p>
        <p className="inline-flex items-center space-x-1.5 text-slate-400">
          <span>Engineered with extreme precision on</span>
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          <span>Arena.ai Enterprise Agent Tier.</span>
        </p>
      </div>
    </footer>
  );
};
