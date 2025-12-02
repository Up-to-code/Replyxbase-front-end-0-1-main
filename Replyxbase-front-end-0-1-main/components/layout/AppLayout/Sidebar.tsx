"use client";

import React from "react";
import { usePathname, useRouter } from "@/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Plus,
  Sparkles,
  User,
} from "lucide-react";
import { Agent, NavigationItem, Translator } from "./types";
import { NAVIGATION } from "./constants";
import { useRTL } from "@/hooks/useRTL";

// Logo Component
function LogoSection({
  sidebarOpen,
  onToggle,
}: {
  sidebarOpen: boolean;
  onToggle: () => void;
}) {
  const { isRTL } = useRTL();
  
  return (
    <div className="h-16 border-b border-gray-100 flex items-center px-6 bg-white">
      <div className="flex items-center justify-between w-full">
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2A4D9A] rounded-lg flex items-center justify-center shadow-sm shadow-blue-900/20">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 text-lg font-bold">Replyxbase</h1>
              <p className="text-gray-500 text-xs">AI Platform</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out"
          aria-label="Toggle sidebar"
          type="button"
        >
          {sidebarOpen ? (
            isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />
          ) : (
            isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

// Navigation Component
function NavigationButton({
  item,
  isActive,
  sidebarOpen,
  onClick,
  label,
}: {
  item: NavigationItem;
  isActive: boolean;
  sidebarOpen: boolean;
  onClick: () => void;
  label: string;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ease-in-out group ${
        isActive
          ? "bg-[#2A4D9A] text-white shadow-md shadow-blue-900/10"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
      {sidebarOpen && <span className="ms-3 font-medium">{label}</span>}
    </button>
  );
}

// Agent Component
function AgentButton({
  agent,
  isActive,
  onClick,
}: {
  agent: Agent;
  isActive: boolean;
  onClick: () => void;
}) {
  // Default icon for now, can be customized based on role or other data
  const AgentIcon = User;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ease-in-out text-start group ${
        isActive
          ? "bg-blue-50 text-[#2A4D9A] border border-blue-100 shadow-sm"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
               {agent.avatar ? (
                  <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
               ) : (
                  <AgentIcon className={`w-3 h-3 ${isActive ? "text-[#2A4D9A]" : "text-gray-400 group-hover:text-gray-600"}`} />
               )}
            </div>
            <div
              className={`absolute -top-0.5 -end-0.5 w-2 h-2 rounded-full border border-white ${
                  agent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
          </div>
          <span className="truncate text-sm font-medium flex-1">{agent.name}</span>
        </div>
        {isActive && (
          <Sparkles className="w-3 h-3 text-[#2A4D9A] shrink-0" />
        )}
      </div>
    </button>
  );
}



export function Sidebar({
  sidebarOpen,
  onToggle,
  agents,
  onAgentClick,
  onCreateAgent,
  t,
}: {
  sidebarOpen: boolean;
  onToggle: () => void;
  agents: Agent[];
  onAgentClick: (agentId: string) => void;
  onCreateAgent: () => void;
  t: Translator;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActiveRoute = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || (!!pathname && pathname.startsWith(href + "/"));

  return (
    <aside
      className={`bg-white border-e border-gray-200 flex flex-col transition-all duration-300 ease-in-out h-full sticky top-0 z-30 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <LogoSection sidebarOpen={sidebarOpen} onToggle={onToggle} />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {/* Main Navigation */}
        {NAVIGATION.map((item) => (
          <NavigationButton
            key={item.href}
            item={item}
            isActive={isActiveRoute(item.href)}
            sidebarOpen={sidebarOpen}
            onClick={() => router.push(item.href)}
            label={t(`Sidebar.${item.label.toLowerCase()}`)}
          />
        ))}

        {/* Divider */}
        <div className="border-t border-gray-100 my-4" />

        {/* Create Agent */}
        <button
          onClick={onCreateAgent}
          className="flex items-center w-full px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out group"
        >
          <Plus className="w-5 h-5 group-hover:text-[#2A4D9A] transition-colors" />
          {sidebarOpen && (
            <span className="ms-3 font-medium">{t("createAgent")}</span>
          )}
        </button>

        {/* Existing Agents */}
        {sidebarOpen && (
          <div className="mt-6">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
              {t("existingAgents")}
            </h3>
            <div className="space-y-1">
              {agents.map((agent) => (
                <AgentButton
                  key={agent.id}
                  agent={agent}
                  isActive={pathname === `/dashboard/agent/${agent.id}`}
                  onClick={() => onAgentClick(agent.id)}
                />
              ))}
            </div>
          </div>
        )}
      </nav>


    </aside>
  );
}
