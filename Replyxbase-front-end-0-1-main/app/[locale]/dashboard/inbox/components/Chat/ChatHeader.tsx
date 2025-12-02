import React from 'react';
import { useRouter } from 'next/navigation';
import { Conversation } from '../../types';
import { ArrowLeft, Globe, MessageCircle, Smartphone, User, Bot, UserCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ChatHeaderProps {
  conversation: Conversation;
  isAIMode: boolean;
  setIsAIMode: (mode: boolean) => void;
  onBack: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  conversation, 
  isAIMode, 
  setIsAIMode,
  onBack
}) => {
  const router = useRouter();
  const t = useTranslations("Dashboard.Inbox");

  const getPlatformIcon = (platform: Conversation['platform']) => {
    switch (platform) {
      case 'whatsapp': return <MessageCircle className="w-5 h-5 text-green-500" />;
      case 'instagram': return <Smartphone className="w-5 h-5 text-pink-500" />;
      case 'website': return <Globe className="w-5 h-5 text-blue-500" />;
      default: return <Globe className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="md:hidden p-2 hover:bg-gray-50 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600 rtl:rotate-180" />
        </button>
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
          {conversation.customerName.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{conversation.customerName}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className={`w-2 h-2 rounded-full ${
              conversation.customerStatus === 'online' ? 'bg-green-500' :
              conversation.customerStatus === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
            }`} />
            {conversation.customerStatus === 'online' ? t("activeNow") : 
             conversation.customerStatus === 'away' ? t("away") : t("offline")}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* CRM Profile Link */}
        <button
          onClick={() => router.push(`/dashboard/crm?customerId=${conversation.customerId}`)}
          className="p-2 text-gray-400 hover:text-[#2A4D9A] hover:bg-blue-50 rounded-full transition-colors"
          title={t("goToCRM")}
        >
          <UserCheck className="w-5 h-5" />
        </button>

        {/* AI Switcher */}
        <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
          <button
            onClick={() => setIsAIMode(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !isAIMode 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4" />
            {t("humanMode")}
          </button>
          <button
            onClick={() => setIsAIMode(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isAIMode 
                ? 'bg-[#2A4D9A] text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bot className="w-4 h-4" />
            {t("aiMode")}
          </button>
        </div>

        <div className="h-8 w-px bg-gray-200 mx-2" />

        <div className="px-4 py-2 bg-gray-50 rounded-full flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">{t("source")}:</span>
          {getPlatformIcon(conversation.platform)}
          <span className="text-sm font-medium text-gray-900 capitalize">{conversation.platform}</span>
        </div>
      </div>
    </div>
  );
};
