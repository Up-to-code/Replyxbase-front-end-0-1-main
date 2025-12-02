
"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Agent, AppLayoutProps } from "./types";
import { MOCK_AGENTS } from "./constants";

function useResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 1024) setIsOpen(false);
        else setIsOpen(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [isOpen, setIsOpen] as const;
}

export function AppLayout({ children, agents }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useResponsiveSidebar();
  const t = useTranslations("Dashboard");

  const router = useRouter();

  const handleAgentClick = (agentId: string) => {
    router.push(`/dashboard/agent/${agentId}`);
  };

  const handleCreateAgent = () => {
    router.push("/dashboard/agent/new");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        agents={agents}
        onAgentClick={handleAgentClick}
        onCreateAgent={handleCreateAgent}
        t={t}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          t={t}
        />

        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="h-full w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
