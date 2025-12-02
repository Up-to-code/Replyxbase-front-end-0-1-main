import React, { useState } from 'react';
import { Phone, Mail, FileText, Users, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Props for the ActivityForm component.
 */
interface ActivityFormProps {
  /** Callback when the form is submitted */
  onSubmit: (type: 'call' | 'email' | 'note' | 'meeting', content: string) => Promise<void>;
  /** Whether the form is submitting */
  isLoading?: boolean;
}

/**
 * Form to add a new activity (call, email, note, meeting).
 */
export const ActivityForm: React.FC<ActivityFormProps> = ({ onSubmit, isLoading }) => {
  const [type, setType] = useState<'call' | 'email' | 'note' | 'meeting'>('note');
  const [content, setContent] = useState('');
  const t = useTranslations("Dashboard.CRM.Activities.Form");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    await onSubmit(type, content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setType('note')}
          className={`p-2 rounded-md flex-1 flex justify-center items-center gap-2 text-sm transition-colors ${type === 'note' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        >
          <FileText className="w-4 h-4" /> {t("note")}
        </button>
        <button
          type="button"
          onClick={() => setType('call')}
          className={`p-2 rounded-md flex-1 flex justify-center items-center gap-2 text-sm transition-colors ${type === 'call' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        >
          <Phone className="w-4 h-4" /> {t("call")}
        </button>
        <button
          type="button"
          onClick={() => setType('email')}
          className={`p-2 rounded-md flex-1 flex justify-center items-center gap-2 text-sm transition-colors ${type === 'email' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        >
          <Mail className="w-4 h-4" /> {t("email")}
        </button>
        <button
          type="button"
          onClick={() => setType('meeting')}
          className={`p-2 rounded-md flex-1 flex justify-center items-center gap-2 text-sm transition-colors ${type === 'meeting' ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        >
          <Users className="w-4 h-4" /> {t("meeting")}
        </button>
      </div>

      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("placeholder", { type: t(type) })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-none"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3">
          <button
            type="submit"
            disabled={!content.trim() || isLoading}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </form>
  );
};
