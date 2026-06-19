"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Globe2,
  Sliders,
  Compass,
  LayoutDashboard,
  Layers,
  ShieldAlert,
  Lightbulb,
  Database,
  LogIn,
  LogOut,
  Sparkles,
  Menu,
  Zap,
  ArrowRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, setGuestMode } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWorkspace = pathname.startsWith("/dashboard") || pathname.startsWith("/simulations");

  const links = [
    { name: "Platform Hub", path: "/dashboard", icon: LayoutDashboard, roles: ["guest", "registered", "researcher", "admin"] },
    { name: "Scenario Builder", path: "/simulations/builder", icon: Sliders, roles: ["registered", "researcher", "admin"] },
    { name: "Future Timeline", path: "/timeline", icon: Compass, roles: ["guest", "registered", "researcher", "admin"] },
    { name: "Risk Matrix", path: "/risks", icon: ShieldAlert, roles: ["guest", "registered", "researcher", "admin"] },
    { name: "Opportunity Vault", path: "/opportunities", icon: Lightbulb, roles: ["guest", "registered", "researcher", "admin"] },
    { name: "Global Adapters", path: "/data-sources", icon: Database, roles: ["guest", "registered", "researcher", "admin"] },
  ];

  const filteredLinks = links.filter((link) =>
    link.roles.includes(user ? user.role : "guest")
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#070913]/80 backdrop-blur-xl transition-all">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Startup Brand Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="h-full w-full bg-[#070913] rounded-[10px] flex items-center justify-center">
                <Globe2 className="h-5 w-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Civitas<span className="gradient-text-primary font-extrabold">AI</span>
            </span>
          </Link>

          {user && (
            <Badge variant="outline" className="hidden sm:inline-flex border-indigo-500/40 bg-indigo-500/10 text-indigo-300 font-mono text-[10px] uppercase font-black px-2.5 py-0.5">
              {user.role} LEDGER
            </Badge>
          )}
        </div>

        {/* Premium Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center space-x-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 shadow-inner">
          {filteredLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.path);
            return (
              <Link key={link.name} href={link.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center space-x-2 font-bold text-xs px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Action Gateways */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center space-x-3">
              <Link href="/simulations/builder">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs space-x-1.5 shadow-md shadow-indigo-500/20 px-4 rounded-xl">
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  <span>Simulate</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-white/10 hover:border-destructive/40 text-slate-400 hover:text-destructive text-xs font-bold rounded-xl space-x-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={setGuestMode}
                className="text-xs font-mono font-bold text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 space-x-1.5 rounded-xl px-3"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Guest Preview</span>
              </Button>
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="text-xs font-bold border-white/10 text-white hover:bg-white/10 rounded-xl px-4">
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs space-x-1.5 shadow-lg shadow-indigo-500/25 px-5 rounded-xl">
                  <span>Get Started</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Navigation Gateway Button */}
          <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-slate-900/80">
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-md p-6 bg-slate-950 border-white/15 rounded-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2 text-xl font-black text-white">
                  <Globe2 className="h-6 w-6 text-indigo-400" />
                  <span>CivitasAI Gateways</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-3 pt-4">
                {filteredLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="ghost" className="w-full justify-start space-x-3 text-base font-bold text-white rounded-xl hover:bg-white/10 p-4">
                        <Icon className="h-5 w-5 text-indigo-400" />
                        <span>{link.name}</span>
                      </Button>
                    </Link>
                  );
                })}
                <hr className="border-white/10 my-2" />
                {isAuthenticated ? (
                  <Button
                    variant="destructive"
                    className="w-full justify-start space-x-2 font-bold rounded-xl p-4"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out Workspace</span>
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-2.5">
                    <Button
                      variant="outline"
                      className="w-full font-mono font-bold text-amber-400 border-amber-400/30 bg-amber-500/10 rounded-xl p-4 space-x-2 justify-center"
                      onClick={() => {
                        setGuestMode();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Explore as Guest Preview</span>
                    </Button>
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full font-bold text-white border-white/10 bg-slate-900 rounded-xl p-4 justify-center">
                        Sign In Existing Account
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full font-bold text-white bg-indigo-600 rounded-xl p-4 justify-center">
                        Provision Enterprise Account
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};
