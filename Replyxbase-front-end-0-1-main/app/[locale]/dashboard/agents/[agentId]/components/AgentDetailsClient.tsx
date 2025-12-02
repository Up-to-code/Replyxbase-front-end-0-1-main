'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Power, PlayCircle, Database, Share2, Settings, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { OverviewTab } from './OverviewTab';
import { KnowledgeTab } from './KnowledgeTab';
import { IntegrationsTab } from './IntegrationsTab';
import { SettingsTab } from './SettingsTab';
import { StatsSkeleton, CardSkeleton } from '../../components/skeletons';

import { Agent } from '@prisma/client';

interface AgentDetailsClientProps {
  agent: Agent & {
    lastActive?: string;
    conversations?: number;
    conversion?: string;
    stats?: {
        conversations: number;
        users: number;
        satisfaction: number;
    }
  };
}

export default function AgentDetailsClient({ agent }: AgentDetailsClientProps) {
  const t = useTranslations("Dashboard.Agents.Detail");
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: t('tabs.overview'), icon: PlayCircle },
    { id: 'knowledge', label: t('tabs.knowledge'), icon: Database },
    { id: 'integrations', label: t('tabs.integrations'), icon: Share2 },
    { id: 'settings', label: t('tabs.settings'), icon: Settings },
  ];

  const handleTabChange = (tabId: string) => {
    setIsLoading(true);
    setError(null);
    setActiveTab(tabId);
    
    // Simulate loading delay for tab switch
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white animate-fade-in">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 flex-shrink-0">
        <div className="mb-4">
          <Link 
            href="/dashboard/agents" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:hidden" />
            <ArrowRight className="w-4 h-4 ltr:hidden" />
            {t("backToAgents")}
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 font-bold text-2xl shadow-sm">
              {agent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  agent.status === 'active' ? 'bg-green-50 text-green-700 border-green-100' : 
                  agent.status === 'training' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                  'bg-gray-50 text-gray-700 border-gray-100'
                }`}>
                  {agent.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">{agent.role} • {t("lastActive", { time: agent.lastActive || 'Just now' })}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors text-sm">
              <Power className="w-4 h-4" />
              {t("status.pause")}
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-1 mt-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50 p-8">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-700 animate-fade-in">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
              <button 
                onClick={() => handleTabChange(activeTab)}
                className="ml-auto text-sm font-bold hover:underline"
              >
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="animate-fade-in">
              {activeTab === 'overview' && <StatsSkeleton />}
              {(activeTab === 'integrations' || activeTab === 'knowledge') && <CardSkeleton />}
              {activeTab === 'settings' && <div className="space-y-4 animate-pulse">
                <div className="h-32 bg-white rounded-xl border border-gray-100" />
                <div className="h-64 bg-white rounded-xl border border-gray-100" />
              </div>}
            </div>
          ) : (
            <div className="animate-slide-up">
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'knowledge' && <KnowledgeTab />}
              {activeTab === 'integrations' && <IntegrationsTab agent={agent} />}
              {activeTab === 'settings' && <SettingsTab agent={agent} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
