import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Plus, Search, Filter, Bot } from 'lucide-react';
import Link from 'next/link';
import { AgentCard } from './components/AgentCard';
import { getAgents } from '@/app/actions/agent';

export default async function AgentsPage() {
  const t = await getTranslations("Dashboard.Agents");
  const agents = await getAgents();

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-2">{t('subtitle')}</p>
        </div>
        <Link 
          href="/dashboard/agents/create"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          {t('createAgent')}
        </Link>
      </div>

      {/* Filters & Search */}
      {agents.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:border-gray-300 focus:ring-0 transition-all outline-none bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors font-medium text-gray-700 bg-white">
            <Filter className="w-5 h-5" />
            {t('filter')}
          </button>
        </div>
      )}

      {/* Grid or Empty State */}
      {agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Bot className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t('noAgentsTitle')}</h3>
          <p className="text-gray-500 max-w-md mb-8">{t('noAgentsSubtitle')}</p>
          <Link 
            href="/dashboard/agents/create"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            {t('createFirstAgent')}
          </Link>
        </div>
      )}
    </div>
  );
}
