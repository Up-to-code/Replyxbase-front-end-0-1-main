import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Share2, MessageSquare, Globe, MessageCircle, Slack, Plus, ExternalLink, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { WebsiteIntegration } from './integrations/WebsiteIntegration';
import { WhatsAppIntegration } from './integrations/WhatsAppIntegration';

import { Agent } from '@prisma/client';

interface IntegrationsTabProps {
  agent: Agent;
}

export const IntegrationsTab: React.FC<IntegrationsTabProps> = ({ agent }) => {
  const t = useTranslations("Dashboard.Agents.Detail");
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const handleConnect = (integration: string) => {
    if (integration === 'Website Widget' || integration === 'WhatsApp') {
      setSelectedIntegration(integration);
    } else {
      toast.info(`${integration} integration coming soon!`);
    }
  };

  if (selectedIntegration === 'Website Widget') {
    return <WebsiteIntegration agent={agent} onBack={() => setSelectedIntegration(null)} />;
  }

  if (selectedIntegration === 'WhatsApp') {
    return <WhatsAppIntegration agent={agent} onBack={() => setSelectedIntegration(null)} />;
  }

  const integrations = [
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      color: 'bg-green-100 text-green-600', 
      status: 'connected',
      description: 'Connect your business number to automate replies on WhatsApp.'
    },
    { 
      name: 'Website Widget', 
      icon: Globe, 
      color: 'bg-blue-100 text-blue-600', 
      status: 'connected',
      description: 'Embed the AI assistant directly on your website.'
    },
    { 
      name: 'Messenger', 
      icon: MessageSquare, 
      color: 'bg-purple-100 text-purple-600', 
      status: 'available',
      description: 'Automate responses for your Facebook Page messages.'
    },
    { 
      name: 'Slack', 
      icon: Slack, 
      color: 'bg-orange-100 text-orange-600', 
      status: 'available',
      description: 'Add the agent to your Slack workspace for internal support.'
    },
    { 
      name: 'Telegram', 
      icon: Share2, 
      color: 'bg-sky-100 text-sky-600', 
      status: 'available',
      description: 'Create a Telegram bot powered by your AI agent.'
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-gray-900">{t("integrations.title")}</h3>
          <p className="text-sm text-gray-500">{t("integrations.subtitle")}</p>
        </div>
        <button 
          onClick={() => handleConnect("New")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {t("integrations.add")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div key={item.name} className="flex flex-col p-6 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              {item.status === 'connected' ? (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                  <CheckCircle2 className="w-3 h-3" />
                  Active
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                  Available
                </span>
              )}
            </div>
            
            <h4 className="font-bold text-gray-900 mb-2 text-lg">{item.name}</h4>
            <p className="text-sm text-gray-500 mb-6 flex-1 leading-relaxed">{item.description}</p>
            
            <button 
              onClick={() => handleConnect(item.name)}
              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                item.status === 'connected' 
                  ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {item.status === 'connected' ? (
                <>
                  Manage Integration
                  <ExternalLink className="w-3 h-3" />
                </>
              ) : (
                'Connect'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
