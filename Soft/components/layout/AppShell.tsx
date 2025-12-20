"use client";

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useAppStore } from "@/stores/useAppStore";
import { ReactNode } from "react";

export const AppShell = ({ children }: { children: ReactNode }) => {
  const { currentRole } = useAppStore();

  return (
    <div className="min-h-screen dash-grid">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
        <div className="flex gap-6">
          <Sidebar role={currentRole} />
          <main className="flex-1 space-y-6">
            <TopBar />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};


