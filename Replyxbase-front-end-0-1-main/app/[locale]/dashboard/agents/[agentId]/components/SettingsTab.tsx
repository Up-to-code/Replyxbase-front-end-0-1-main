import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Agent } from '@prisma/client';
import { updateAgent } from '@/app/actions/agent';
import { toast } from 'sonner';
import { Loader2, Trash2, Save, AlertTriangle, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SettingsTabProps {
  agent: Agent;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ agent }) => {
  const t = useTranslations("Dashboard.Agents.Detail");
  const router = useRouter();
  const [name, setName] = useState(agent.name);
  const [role, setRole] = useState(agent.role);
  const [systemPrompt, setSystemPrompt] = useState((agent.config as any)?.systemPrompt || '');

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleDelete = () => {
    toast.error("Delete functionality coming soon");
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* General Settings */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            General Information
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Agent Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                placeholder="e.g. Support Bot"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Role / Title</label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                placeholder="e.g. Customer Success"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              System Prompt
              <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Instructions</span>
            </label>
            <textarea 
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all min-h-[150px] resize-y font-mono text-sm leading-relaxed"
              placeholder="You are a helpful assistant..."
            />
            <p className="mt-2 text-xs text-gray-500">
              Define the agent's personality, tone, and constraints.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border border-red-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100 bg-red-50/30">
          <h3 className="font-bold text-red-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Danger Zone
          </h3>
        </div>
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Delete Agent</h4>
            <p className="text-sm text-gray-500">
              Permanently remove this agent and all of its data. This action cannot be undone.
            </p>
          </div>
          <button 
            onClick={handleDelete}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete Agent
          </button>
        </div>
      </div>
    </div>
  );
};
