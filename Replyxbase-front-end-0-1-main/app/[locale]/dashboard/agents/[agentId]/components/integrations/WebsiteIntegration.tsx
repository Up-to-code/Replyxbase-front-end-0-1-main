import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Globe, MessageSquare, Palette, Calendar, Phone, UserPlus, Code2, Layout, Type, Image as ImageIcon, Settings, Shield, Zap, Monitor, Moon, Sun, HelpCircle, Plus, Trash2, ChevronDown, ChevronRight, Languages, Link as LinkIcon, Edit2, GripVertical, X } from 'lucide-react';
import { toast } from 'sonner';

import { Agent } from '@prisma/client';
import { updateAgent } from '@/app/actions/agent';
import { useRouter } from 'next/navigation';

interface WebsiteIntegrationProps {
  agent: Agent;
  onBack: () => void;
}

interface FAQ {
  question: string;
  answer: string;
}

interface WidgetAction {
  id: string;
  label: string;
  type: 'booking' | 'call' | 'link';
  value: string;
  icon: 'calendar' | 'phone' | 'user' | 'link' | 'message';
}

export const WebsiteIntegration: React.FC<WebsiteIntegrationProps> = ({ agent, onBack }) => {
  const router = useRouter();
  const config = (agent.config as any)?.website || {};

  // Navigation
  const [activeTab, setActiveTab] = useState<'design' | 'content' | 'settings' | 'install'>('design');

  // Design State
  const [color, setColor] = useState(config.color || '#2563eb');
  const [position, setPosition] = useState<'left' | 'right'>(config.position || 'right');
  const [launcherStyle, setLauncherStyle] = useState<'circle' | 'pill'>(config.launcherStyle || 'circle');
  const [launcherText, setLauncherText] = useState(config.launcherText || 'Chat with us');
  const [logo, setLogo] = useState(config.logo || '');
  const [theme, setTheme] = useState<'light' | 'dark'>(config.theme || 'light');

  // Content State (FAQ)
  const [faqs, setFaqs] = useState<FAQ[]>(config.faqs || []);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Settings State
  const [domain, setDomain] = useState(config.domain || 'example.com');
  const [welcomeMessage, setWelcomeMessage] = useState(config.welcomeMessage || 'Hello! How can I help you today?');
  const [allowedDomains, setAllowedDomains] = useState(config.allowedDomains || '');
  const [removeBranding, setRemoveBranding] = useState(config.removeBranding || false);
  const [language, setLanguage] = useState<'en' | 'ar'>(config.language || 'en');
  
  // Actions State
  const [actions, setActions] = useState<WidgetAction[]>(config.actions || [
    { id: '1', label: 'Book a Call', type: 'booking', value: '', icon: 'calendar' }
  ]);
  const [editingAction, setEditingAction] = useState<WidgetAction | null>(null);

  // UI State
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewTab, setPreviewTab] = useState<'chat' | 'help'>('chat');

  const embedCode = `<script>
  window.replyxbaseConfig = {
    agentId: "${agent.id}",
    color: "${color}",
    position: "${position}",
    launcherStyle: "${launcherStyle}",
    launcherText: "${launcherText}",
    logo: "${logo}",
    theme: "${theme}",
    language: "${language}",
    welcomeMessage: "${welcomeMessage}",
    removeBranding: ${removeBranding},
    actions: ${JSON.stringify(actions)},
    faqs: ${JSON.stringify(faqs)}
  };
</script>
<script src="${typeof window !== 'undefined' ? window.location.origin : ''}/widget.js" async></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleAddAction = () => {
    const newAction: WidgetAction = {
      id: Date.now().toString(),
      label: 'New Action',
      type: 'link',
      value: '',
      icon: 'link'
    };
    setActions([...actions, newAction]);
    setEditingAction(newAction);
  };

  const handleUpdateAction = (action: WidgetAction) => {
    setActions(actions.map(a => a.id === action.id ? action : a));
  };

  const handleDeleteAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id));
    if (editingAction?.id === id) setEditingAction(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const newConfig = {
        ...(agent.config as any || {}),
        website: {
          domain,
          color,
          position,
          launcherStyle,
          launcherText,
          logo,
          theme,
          language,
          welcomeMessage,
          allowedDomains,
          removeBranding,
          faqs,
          actions
        }
      };

      await updateAgent(agent.id, { config: newConfig });
      toast.success("Widget settings saved successfully");
      router.refresh();
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar': return <Calendar className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'user': return <UserPlus className="w-4 h-4" />;
      case 'link': return <LinkIcon className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <LinkIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Widget Builder</h3>
            <p className="text-sm text-gray-500">Customize your website chat widget.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('design')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'design' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <Palette className="w-4 h-4" />
              Design
            </button>
            <button 
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'content' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <HelpCircle className="w-4 h-4" />
              Content
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button 
              onClick={() => setActiveTab('install')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'install' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <Code2 className="w-4 h-4" />
              Install
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {activeTab === 'design' && (
              <div className="space-y-8 animate-fade-in">
                {/* Brand Color */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-900">Brand Color</label>
                  <div className="flex gap-3">
                    <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <input 
                        type="color" 
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"
                      />
                    </div>
                    <input 
                      type="text" 
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all uppercase font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Launcher Style */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-900">Launcher Style</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setLauncherStyle('circle')}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${launcherStyle === 'circle' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200 text-gray-500'}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-current opacity-20" />
                      <span className="text-xs font-medium">Circle</span>
                    </button>
                    <button 
                      onClick={() => setLauncherStyle('pill')}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${launcherStyle === 'pill' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200 text-gray-500'}`}
                    >
                      <div className="w-12 h-6 rounded-full bg-current opacity-20" />
                      <span className="text-xs font-medium">Pill</span>
                    </button>
                  </div>
                  {launcherStyle === 'pill' && (
                    <input 
                      type="text" 
                      value={launcherText}
                      onChange={(e) => setLauncherText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                      placeholder="Launcher Text (e.g. Chat with us)"
                    />
                  )}
                </div>

                {/* Position */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-900">Position</label>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setPosition('left')}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${position === 'left' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Bottom Left
                    </button>
                    <button 
                      onClick={() => setPosition('right')}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${position === 'right' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Bottom Right
                    </button>
                  </div>
                </div>

                {/* Logo */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-900">Custom Logo</label>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Paste a URL to your logo image.</p>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-8 animate-fade-in">
                {/* Welcome Message */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-900">Welcome Message</label>
                  <textarea 
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none h-24 text-sm"
                    placeholder="Enter the first message..."
                  />
                </div>

                {/* FAQ Editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-900">FAQs</label>
                    <span className="text-xs text-gray-500">{faqs.length} questions</span>
                  </div>
                  
                  <div className="space-y-3">
                    {faqs.map((faq, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100 group hover:border-gray-200 transition-all">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1 flex-1">
                            <p className="font-semibold text-sm text-gray-900">{faq.question}</p>
                            <p className="text-xs text-gray-500 line-clamp-2">{faq.answer}</p>
                          </div>
                          <button 
                            onClick={() => handleDeleteFaq(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border border-dashed border-gray-200 rounded-xl space-y-3 bg-gray-50/50">
                    <input 
                      type="text" 
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm"
                      placeholder="Question (e.g. What are your hours?)"
                    />
                    <textarea 
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm h-20 resize-none"
                      placeholder="Answer..."
                    />
                    <button 
                      onClick={handleAddFaq}
                      disabled={!newQuestion.trim() || !newAnswer.trim()}
                      className="w-full py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                      Add Question
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8 animate-fade-in">
                {/* Language */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-gray-500" />
                    Language
                  </label>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setLanguage('en')}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      English (LTR)
                    </button>
                    <button 
                      onClick={() => setLanguage('ar')}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${language === 'ar' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Arabic (RTL)
                    </button>
                  </div>
                </div>

                {/* Custom Actions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-900">Actions</label>
                    <button 
                      onClick={handleAddAction}
                      className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Action
                    </button>
                  </div>

                  <div className="space-y-3">
                    {actions.map((action) => (
                      <div key={action.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                          <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                            {getIcon(action.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{action.label}</p>
                            <p className="text-xs text-gray-500 capitalize">{action.type}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => setEditingAction(editingAction?.id === action.id ? null : action)}
                              className={`p-1.5 rounded-lg transition-colors ${editingAction?.id === action.id ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteAction(action.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {editingAction?.id === action.id && (
                          <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3 animate-slide-down">
                            <div>
                              <label className="text-xs font-medium text-gray-700 mb-1 block">Label</label>
                              <input 
                                type="text" 
                                value={action.label}
                                onChange={(e) => handleUpdateAction({ ...action, label: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs font-medium text-gray-700 mb-1 block">Type</label>
                                <select 
                                  value={action.type}
                                  onChange={(e) => handleUpdateAction({ ...action, type: e.target.value as any })}
                                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm"
                                >
                                  <option value="booking">Booking</option>
                                  <option value="call">Call</option>
                                  <option value="link">Link</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs font-medium text-gray-700 mb-1 block">Icon</label>
                                <select 
                                  value={action.icon}
                                  onChange={(e) => handleUpdateAction({ ...action, icon: e.target.value as any })}
                                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm"
                                >
                                  <option value="calendar">Calendar</option>
                                  <option value="phone">Phone</option>
                                  <option value="user">User</option>
                                  <option value="link">Link</option>
                                  <option value="message">Message</option>
                                </select>
                              </div>
                            </div>
                            {action.type !== 'booking' && (
                              <div>
                                <label className="text-xs font-medium text-gray-700 mb-1 block">
                                  {action.type === 'call' ? 'Phone Number' : 'URL'}
                                </label>
                                <input 
                                  type="text" 
                                  value={action.value}
                                  onChange={(e) => handleUpdateAction({ ...action, value: e.target.value })}
                                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm"
                                  placeholder={action.type === 'call' ? '+1 234 567 890' : 'https://example.com'}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    Allowed Domains
                  </label>
                  <textarea 
                    value={allowedDomains}
                    onChange={(e) => setAllowedDomains(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none h-24 text-sm font-mono"
                    placeholder="example.com, myapp.com"
                  />
                  <p className="text-xs text-gray-500">Comma separated list of domains where the widget can be loaded. Leave empty to allow all.</p>
                </div>

                {/* Branding */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">Remove Branding</span>
                    <input type="checkbox" checked={removeBranding} onChange={(e) => setRemoveBranding(e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary" />
                  </label>
                  <p className="text-xs text-gray-500">Hide the "Powered by ReplyXBase" footer.</p>
                </div>
              </div>
            )}

            {activeTab === 'install' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-4 bg-blue-50 text-blue-700 rounded-xl text-sm border border-blue-100">
                  <p className="font-bold mb-1">Installation Instructions</p>
                  <p>Copy the code below and paste it into the <code className="font-mono bg-blue-100 px-1 rounded">&lt;head&gt;</code> tag of your website.</p>
                </div>
                
                <div className="relative group">
                  <pre className="bg-gray-900 text-gray-300 p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed border border-gray-800">
                    {embedCode}
                  </pre>
                  <button 
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors backdrop-blur-sm"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-8 bg-gray-50 rounded-xl border border-gray-200/60 p-8 flex items-end justify-end min-h-[600px] relative overflow-hidden">
          <div className="absolute inset-0 pattern-grid-lg opacity-[0.03]" />
          
          {/* Preview Header */}
          <div className="p-4 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm flex items-center justify-between z-10">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Monitor className="w-4 h-4" />
              Live Preview
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-xs font-medium text-gray-600">Connected</span>
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="flex-1 relative p-8">
            {/* Mock Website Content */}
            <div className="max-w-3xl mx-auto space-y-8 opacity-20 pointer-events-none select-none filter blur-[1px]">
               <div className="h-12 w-48 bg-gray-300 rounded-lg" />
               <div className="h-64 w-full bg-gray-200 rounded-2xl" />
               <div className="space-y-4">
                 <div className="h-4 w-full bg-gray-200 rounded" />
                 <div className="h-4 w-3/4 bg-gray-200 rounded" />
                 <div className="h-4 w-5/6 bg-gray-200 rounded" />
               </div>
            </div>

            {/* Widget Preview */}
            <div className={`absolute bottom-8 ${position === 'left' ? 'left-8' : 'right-8'} flex flex-col items-end gap-4 transition-all duration-500`}>
              
              {/* Chat Window */}
              <div className="w-[380px] bg-white rounded-2xl shadow-none border border-gray-200 flex flex-col max-h-[600px] animate-slide-up origin-bottom-right" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Header */}
                <div className="p-5 flex items-center justify-between text-white transition-colors duration-300" style={{ backgroundColor: color }}>
                  <div className="flex items-center gap-4">
                    {logo ? (
                      <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover bg-white/10" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-base">Support Agent</h4>
                      <div className="flex items-center gap-1.5 opacity-90">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_4px_rgba(74,222,128,0.5)]" />
                        <p className="text-xs font-medium">Online</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Globe className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex bg-white border-b border-gray-100">
                  <button 
                    onClick={() => setPreviewTab('chat')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${previewTab === 'chat' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    style={{ borderColor: previewTab === 'chat' ? color : 'transparent', color: previewTab === 'chat' ? color : undefined }}
                  >
                    {language === 'ar' ? 'محادثة' : 'Chat'}
                  </button>
                  <button 
                    onClick={() => setPreviewTab('help')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${previewTab === 'help' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    style={{ borderColor: previewTab === 'help' ? color : 'transparent', color: previewTab === 'help' ? color : undefined }}
                  >
                    {language === 'ar' ? 'مساعدة' : 'Help'}
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 bg-gray-50 p-5 flex flex-col gap-5 overflow-y-auto min-h-[300px]">
                  {previewTab === 'chat' ? (
                    <>
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 border border-gray-300" />
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 leading-relaxed border border-gray-100">
                          {welcomeMessage}
                          {/* Render Actions */}
                          {actions.length > 0 && (
                            <div className="flex gap-2 flex-wrap mt-3">
                              {actions.map((action) => (
                                <button 
                                  key={action.id}
                                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50 transition-colors"
                                >
                                  {getIcon(action.icon)}
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      {faqs.length > 0 ? (
                        faqs.map((faq, i) => (
                          <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                              <span className="font-medium text-sm text-gray-900">{faq.question}</span>
                              <ChevronRight className={`w-4 h-4 text-gray-400 ${language === 'ar' ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-400 text-sm">
                          {language === 'ar' ? 'لا توجد أسئلة شائعة' : 'No FAQs added yet.'}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {previewTab === 'chat' && (
                  <div className="p-4 border-t border-gray-100 bg-white">
                    <div className="bg-gray-50 rounded-full px-5 py-3 text-sm text-gray-400 border border-gray-100 text-right">
                      {language === 'ar' ? '...اكتب رسالة' : 'Type a message...'}
                    </div>
                    {!removeBranding && (
                      <div className="flex justify-center mt-2">
                         <span className="text-[10px] text-gray-400 font-medium">Powered by ReplyXBase</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Launcher */}
              <div 
                className={`shadow-none border border-gray-200 cursor-pointer hover:scale-105 transition-transform duration-200 flex items-center justify-center text-white ${launcherStyle === 'pill' ? 'rounded-full px-6 py-3 gap-2' : 'w-14 h-14 rounded-full'}`}
                style={{ backgroundColor: color }}
              >
                <MessageSquare className={`${launcherStyle === 'pill' ? 'w-5 h-5' : 'w-7 h-7'}`} />
                {launcherStyle === 'pill' && <span className="font-bold text-sm">{launcherText}</span>}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
