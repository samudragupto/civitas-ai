"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export const WorkspaceLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  // We can render Sidebar largely for platform workspace routes or everywhere
  const isLanding = pathname === "/";

  if (isLanding) {
    return <div className="flex-1 w-full">{children}</div>;
  }

  return (
    <div className="flex-1 flex w-full max-w-[100vw] overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full max-w-[100vw] min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};
