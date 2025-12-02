'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { createAgent } from '@/app/actions/agent';
import { Bot, Upload, MessageSquare, Smartphone, Check, Brain, Database, Calendar, Users, ChevronDown, Loader2, Sparkles, Zap, ArrowRight, Building, ShoppingBag, HeartPulse, Cpu, Banknote, MoreHorizontal, Globe, MessageCircle } from 'lucide-react';

export const CreateAgentForm: React.FC = () => {
  const t = useTranslations("Dashboard.Agents.Create");
  const [step, setStep] = useState(1);
  const [channels, setChannels] = useState<string[]>([]);
  // Default all capabilities to selected
  const [capabilities, setCapabilities] = useState<string[]>(['crm', 'booking', 'support']);
  const [selectedModel, setSelectedModel] = useState('gpt4');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);

  const industries = [
    { id: 'realEstate', label: 'industries.realEstate', icon: Building },
    { id: 'ecommerce', label: 'industries.ecommerce', icon: ShoppingBag },
    { id: 'healthcare', label: 'industries.healthcare', icon: HeartPulse },
    { id: 'technology', label: 'industries.technology', icon: Cpu },
    { id: 'finance', label: 'industries.finance', icon: Banknote },
    { id: 'other', label: 'industries.other', icon: MoreHorizontal },
  ];

  const toggleChannel = (channel: string) => {
    setChannels(prev => 
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const toggleCapability = (cap: string) => {
    setCapabilities(prev => 
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    );
  };

  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleImprovePrompt = async () => {
    setIsImproving(true);
    // Simulate AI improvement
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsImproving(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (!name.trim()) {
        throw new Error("Name is required");
      }

      // Map channels to boolean flags
      const isWebsiteEnabled = channels.includes('website');
      const isWhatsappEnabled = channels.includes('whatsapp');
      const isDmEnabled = channels.includes('dm');

      // Generate system prompt as CSV if not provided
      let finalSystemPrompt = systemPrompt;
      if (!finalSystemPrompt.trim()) {
        // Helper to get industry label
        const industryObj = industries.find(i => i.id === selectedIndustry);
        const industryLabel = industryObj ? t(industryObj.label) : selectedIndustry;

        // Helper to get capability labels
        const capabilityLabels = capabilities.map(capId => {
          const capObj = [
            { id: 'crm', label: 'capabilitiesList.crm' },
            { id: 'booking', label: 'capabilitiesList.booking' },
            { id: 'support', label: 'capabilitiesList.support' },
          ].find(c => c.id === capId);
          return capObj ? t(capObj.label) : capId;
        });

        const lines = [
          `Name,${name}`,
          `Role,Assistant`,
          `Industry,${industryLabel}`,
          `Capabilities,${capabilityLabels.join('|')}`,
          `Model,${models.find(m => m.id === selectedModel)?.name || selectedModel}`,
          `Language,${t("common.create") === "إنشاء الوكيل" ? "Arabic" : "English"}` // Infer language context
        ];
        finalSystemPrompt = lines.join('\n');
      }

      await createAgent({
        name,
        role: 'assistant', // Default role
        isWebsiteEnabled,
        isWhatsappEnabled,
        isDmEnabled,
        systemPrompt: finalSystemPrompt,
      });

      setIsSuccess(true);
    } catch (error) {
      console.error('Error creating agent:', error);
      setError(error instanceof Error ? error.message : "Failed to create agent");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-fade-in">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <Check className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("successTitle")}</h2>
        <p className="text-gray-500 mb-8">{t("successSubtitle")}</p>
        <button 
          onClick={() => window.location.href = '/dashboard/agents'}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          {t("goToDashboard")}
        </button>
      </div>
    );
  }

  const models = [
    { id: 'gpt4', name: 'GPT-4o', icon: Sparkles, desc: 'Best for complex reasoning' },
    { id: 'claude', name: 'Claude 3.5 Sonnet', icon: Brain, desc: 'Natural & articulate' },
    { id: 'gemini', name: 'Gemini 1.5 Pro', icon: Zap, desc: 'Fast & multimodal' },
  ];

  const selectedModelData = models.find(m => m.id === selectedModel);

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Vertical Steps Sidebar */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="sticky top-8 space-y-1">
          {[1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left
                ${step === s 
                  ? 'bg-primary text-primary-foreground shadow-none' 
                  : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                ${step === s 
                  ? 'bg-white text-primary border-white' 
                  : 'bg-transparent border-gray-200'}`}>
                {s}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${step === s ? 'text-white' : 'text-gray-900'}`}>
                  {s === 1 ? t("steps.1") : t("steps.2")}
                </span>
                <span className={`text-xs ${step === s ? 'text-gray-300' : 'text-gray-500'}`}>
                  {s === 1 ? t("basicInfo.title") : t("knowledge.title")}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white border border-gray-100 rounded-xl p-8 min-h-[600px]">
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t("basicInfo.title")}</h2>
              <p className="text-gray-500 mt-2">{t("basicInfo.subtitle")}</p>
              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium animate-fade-in">
                  {error}
                </div>
              )}
            </div>

            <div className="grid gap-8">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-gray-900">{t("form.name")}</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("form.namePlaceholder")}
                  className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl px-5 py-4 text-base transition-all"
                />
              </div>

              <div className="grid gap-2 relative">
                <label className="text-sm font-semibold text-gray-900">{t("form.model")}</label>
                <button 
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="w-full flex items-center justify-between bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 border-2 rounded-xl px-5 py-4 text-base transition-all"
                >
                  <div className="flex items-center gap-3">
                    {selectedModelData && <selectedModelData.icon className="w-5 h-5 text-gray-900" />}
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{selectedModelData?.name}</div>
                      <div className="text-xs text-gray-500">{selectedModelData?.desc}</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isModelDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isModelDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-10 overflow-hidden">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model.id);
                          setIsModelDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <model.icon className="w-5 h-5 text-gray-700" />
                        <div>
                          <div className="font-semibold text-gray-900">{model.name}</div>
                          <div className="text-xs text-gray-500">{model.desc}</div>
                        </div>
                        {selectedModel === model.id && <Check className="w-4 h-4 text-gray-900 ml-auto" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-gray-900">{t("form.capabilities")}</label>
                <div className="grid gap-3">
                  {[
                    { id: 'crm', icon: Users, label: 'capabilitiesList.crm' },
                    { id: 'booking', icon: Calendar, label: 'capabilitiesList.booking' },
                    { id: 'support', icon: MessageSquare, label: 'capabilitiesList.support' },
                  ].map((cap) => {
                    const Icon = cap.icon;
                    const isSelected = capabilities.includes(cap.id);
                    return (
                      <button
                        key={cap.id}
                        onClick={() => toggleCapability(cap.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left rtl:text-right
                          ${isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-white' : 'bg-gray-100'}`}>
                            <Icon className="w-5 h-5 text-gray-700" />
                          </div>
                          <span className="font-semibold text-gray-900">{t(cap.label)}</span>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-gray-900" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t("knowledge.title")}</h2>
              <p className="text-gray-500 mt-2">{t("knowledge.subtitle")}</p>
            </div>

            <div className="max-w-2xl space-y-8">
              <div className="grid gap-2 relative">
                <label className="text-sm font-semibold text-gray-900">{t("industry")}</label>
                <button 
                  onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
                  className="w-full flex items-center justify-between bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 border-2 rounded-xl px-5 py-4 text-base transition-all"
                >
                  <div className="flex items-center gap-3">
                    {selectedIndustry ? (
                      <>
                        {(() => {
                          const industry = industries.find(i => i.id === selectedIndustry);
                          const Icon = industry?.icon;
                          return Icon ? <Icon className="w-5 h-5 text-gray-900" /> : null;
                        })()}
                        <span className="font-semibold text-gray-900">
                          {industries.find(i => i.id === selectedIndustry) 
                            ? t(industries.find(i => i.id === selectedIndustry)!.label)
                            : ''}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500">{t("industry")}</span>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isIndustryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isIndustryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-10 overflow-hidden max-h-60 overflow-y-auto">
                    {industries.map((industry) => (
                      <button
                        key={industry.id}
                        onClick={() => {
                          setSelectedIndustry(industry.id);
                          setIsIndustryDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <industry.icon className="w-5 h-5 text-gray-700" />
                        <span className="font-semibold text-gray-900">{t(industry.label)}</span>
                        {selectedIndustry === industry.id && <Check className="w-4 h-4 text-gray-900 ml-auto" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-900">{t("knowledge.systemPromptLabel")}</label>
                  <button
                    onClick={handleImprovePrompt}
                    disabled={isImproving}
                    className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isImproving ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    {t("knowledge.improveWithAI")}
                  </button>
                </div>
                <textarea 
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder={t("knowledge.systemPromptPlaceholder")}
                  className="w-full h-32 bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl px-5 py-4 text-base transition-all resize-none"
                />
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t("knowledge.uploadTitle")}</h3>
                <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">{t("knowledge.uploadDesc")}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors
              ${step === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'
              }`}
            disabled={step === 1}
          >
            {t("common.back")}
          </button>

          <button
            onClick={() => step < 2 ? setStep(prev => prev + 1) : handleSubmit()}
            disabled={isSubmitting}
            className={`bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-none disabled:opacity-70 disabled:cursor-not-allowed
              ${isSubmitting ? 'pl-6 pr-8' : ''}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                {step === 2 ? t("common.create") : t("common.next")}
                {step < 2 && <ArrowRight className="w-4 h-4 rtl:rotate-180" />} 
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
