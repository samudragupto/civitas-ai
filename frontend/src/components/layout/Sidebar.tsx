"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Sliders,
  Compass,
  ShieldAlert,
  Lightbulb,
  Database,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Layers,
  Activity,
  UserCheck,
  TrendingUp,
  Network,
  FileText,
  Sparkles,
  Zap,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navigation = [
    { name: "Platform Hub", path: "/dashboard", icon: LayoutDashboard },
    { name: "Scenario Builder", path: "/simulations/builder", icon: Sliders },
    { name: "Timeline Explorer", path: "/timeline", icon: Compass },
    { name: "Systemic Risk Matrix", path: "/risks", icon: ShieldAlert },
    { name: "Opportunity Vault", path: "/opportunities", icon: Lightbulb },
    { name: "Data Sources Explorer", path: "/data-sources", icon: Database },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
      className="hidden md:flex flex-col border-r border-white/10 bg-[#070913]/90 backdrop-blur-xl shrink-0 z-40 sticky top-16 h-[calc(100vh-4rem)] select-none"
    >
      {/* Top Controller */}
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        {!collapsed && (
          <div className="flex items-center space-x-2 font-mono text-xs text-slate-400 font-black tracking-wider uppercase overflow-hidden">
            <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 animate-spin" />
            <span className="truncate">WORKSPACE LEDGER</span>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Action Shortcut Button */}
      <div className="p-4">
        <Link href="/simulations/builder">
          <Button
            size="sm"
            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold transition-all shadow-lg shadow-indigo-500/20 rounded-xl ${
              collapsed ? "p-0 justify-center h-10 w-10 mx-auto" : "space-x-2 justify-start px-4 py-5"
            }`}
          >
            <Zap className="h-4 w-4 fill-current shrink-0 text-amber-300" />
            {!collapsed && <span>New Forecast Scenario</span>}
          </Button>
        </Link>
      </div>

      {/* Main Nav items */}
      <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

          return (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.path}>
                    <button
                      className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-mono text-xs font-bold transition-all group ${
                        isActive
                          ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-inner"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                      {!collapsed && <span className="truncate">{item.name}</span>}
                      {!collapsed && isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 ml-auto animate-pulse" />
                      )}
                    </button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" sideOffset={12}>
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>

      {/* Footer Profile Ledger */}
      <div className="p-4 border-t border-white/5 bg-slate-900/40">
        {collapsed ? (
          <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center font-mono font-black text-xs text-indigo-300 mx-auto">
            {user ? user.role[0].toUpperCase() : "G"}
          </div>
        ) : (
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center font-mono font-black text-xs text-indigo-300 shrink-0">
              {user ? user.role[0].toUpperCase() : "G"}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white truncate font-mono">
                {user ? user.username : "Explorer"}
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase truncate">
                {user ? user.role : "Guest Explorer"}
              </span>
            </div>
            <Badge variant="outline" className="ml-auto text-[9px] font-mono border-emerald-500/40 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5">
              100%
            </Badge>
          </div>
        )}
      </div>
    </motion.aside>
  );
};
