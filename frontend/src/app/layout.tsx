import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { WorkspaceLayoutWrapper } from "@/components/layout/WorkspaceLayoutWrapper";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CivitasAI: Human Civilization Forecasting Engine",
  description:
    "Production web platform that forecasts plausible future civilization scenarios based on current global trends.",
  keywords: [
    "Civilization Forecasting",
    "Foresight Engine",
    "AGI",
    "Fusion Energy",
    "Space Colonization",
    "Scenario Planning",
    "CivitasAI",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col bg-[#070913] text-white">
              <Navbar />
              <main className="flex-1 flex flex-col w-full">
                <WorkspaceLayoutWrapper>{children}</WorkspaceLayoutWrapper>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
