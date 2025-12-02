import React, { useRef } from 'react';
import { Paperclip, Loader2, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSending: boolean;
  isUploading: boolean;
  isAIMode: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  newMessage,
  setNewMessage,
  onSendMessage,
  onFileUpload,
  isSending,
  isUploading,
  isAIMode
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("Dashboard.Inbox");

  return (
    <div className="p-6 bg-white border-t border-gray-100">
      <div className="flex items-center gap-4 max-w-5xl mx-auto">
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          onChange={onFileUpload}
          accept="image/*,.pdf,.doc,.docx"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || isSending}
          className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors disabled:opacity-50"
          title="Attach File or Image"
        >
          <Paperclip className="w-6 h-6 rtl:rotate-180" />
        </button>
        
        <form onSubmit={onSendMessage} className="flex-1 flex items-center gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isAIMode ? t("aiActive") : t("typeMessage")}
            disabled={isSending || isAIMode}
            className="flex-1 py-4 px-6 bg-gray-50 border-transparent focus:bg-white focus:border-[#2A4D9A] focus:ring-1 focus:ring-[#2A4D9A] rounded-2xl transition-all duration-200 outline-none text-base disabled:opacity-70 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending || isAIMode}
            className="p-4 bg-[#2A4D9A] text-white rounded-2xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-900/20"
          >
            {isSending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6 rtl:rotate-180" />}
          </button>
        </form>
      </div>
    </div>
  );
};
