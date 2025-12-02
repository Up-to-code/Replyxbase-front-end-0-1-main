import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, MessageCircle, Key, Webhook, ExternalLink, Save } from 'lucide-react';
import { toast } from 'sonner';

import { Agent } from '@prisma/client';
import { updateAgent } from '@/app/actions/agent';
import { useRouter } from 'next/navigation';

interface WhatsAppIntegrationProps {
  agent: Agent;
  onBack: () => void;
}

export const WhatsAppIntegration: React.FC<WhatsAppIntegrationProps> = ({ agent, onBack }) => {
  const router = useRouter();
  const config = (agent.config as any)?.whatsapp || {};

  const [phoneId, setPhoneId] = useState(config.phoneId || '');
  const [token, setToken] = useState(config.token || '');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const webhookUrl = `https://api.replyxbase.com/webhooks/whatsapp/v1/${agent.id}`;
  const verifyToken = agent.id; // Using agent ID as verify token for simplicity

  const handleCopy = (text: string, type: 'url' | 'token') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
    toast.success("Copied to clipboard!");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const newConfig = {
        ...(agent.config as any || {}),
        whatsapp: {
          phoneId,
          token
        }
      };

      await updateAgent(agent.id, { config: newConfig });
      toast.success("WhatsApp settings saved successfully");
      router.refresh();
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">WhatsApp Integration</h3>
          <p className="text-sm text-gray-500">Connect your agent to WhatsApp Business API.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-green-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Configuration Steps</h3>
              <p className="text-sm text-gray-500">Follow these steps to connect your number.</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-10">
          {/* Step 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">1</div>
              <h4 className="font-bold text-gray-900 text-lg">API Credentials</h4>
            </div>
            <div className="ml-12 space-y-6">
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                Go to the <a href="#" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">Meta Developer Portal <ExternalLink className="w-3 h-3" /></a>, select your app, and copy your Phone Number ID and Access Token.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number ID</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={phoneId}
                      onChange={(e) => setPhoneId(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      placeholder="e.g. 104928..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Permanent Access Token</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input 
                      type="password" 
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      placeholder="EAAG..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Step 2 */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">2</div>
              <h4 className="font-bold text-gray-900 text-lg">Webhook Configuration</h4>
            </div>
            <div className="ml-12 space-y-6">
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                Copy these values to the "Configuration" section in your Meta App settings to receive messages.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-primary/30 transition-colors group">
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Callback URL</label>
                  <div className="flex items-center justify-between gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <code className="text-sm font-mono text-gray-900 truncate flex-1">{webhookUrl}</code>
                    <button onClick={() => handleCopy(webhookUrl, 'url')} className="p-1.5 hover:bg-white rounded-md transition-all text-gray-500 hover:text-primary hover:shadow-sm">
                      {copiedUrl ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-primary/30 transition-colors group">
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Verify Token</label>
                  <div className="flex items-center justify-between gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <code className="text-sm font-mono text-gray-900 truncate flex-1">{verifyToken}</code>
                    <button onClick={() => handleCopy(verifyToken, 'token')} className="p-1.5 hover:bg-white rounded-md transition-all text-gray-500 hover:text-primary hover:shadow-sm">
                      {copiedToken ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
};
