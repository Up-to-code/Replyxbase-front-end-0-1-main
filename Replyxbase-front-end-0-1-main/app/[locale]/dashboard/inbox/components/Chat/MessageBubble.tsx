import React from 'react';
import { Message } from '../../types';
import { Bot, RefreshCw, Image as ImageIcon, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
  isAI: boolean;
  showAvatar: boolean;
  customerName: string;
  onRetry: (id: string, content: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isUser, 
  isAI, 
  showAvatar, 
  customerName,
  onRetry
}) => {
  const isError = message.status === 'error';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser || isAI ? 'justify-end' : 'justify-start'} items-end gap-4`}
    >
      {(!isUser && !isAI) && (
        <div className="w-10 h-10 flex-shrink-0">
          {showAvatar && (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
              {customerName.charAt(0)}
            </div>
          )}
        </div>
      )}
      
      <div className={`max-w-[70%] group ${isUser || isAI ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`p-5 rounded-2xl text-base shadow-sm ${
            isError
              ? 'bg-red-50 border border-red-100 text-red-800 rounded-br-none'
              : isUser 
              ? 'bg-[#2A4D9A] text-white rounded-br-none' 
              : isAI
              ? 'bg-gradient-to-r from-[#2A4D9A] to-blue-600 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          {message.type === 'image' ? (
            <div className="space-y-2">
              <div className="relative aspect-video w-64 bg-gray-200 rounded-lg overflow-hidden">
                {/* Mock Image - In real app use message.fileUrl */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
              </div>
              <p className="text-sm opacity-90">Image Attachment</p>
            </div>
          ) : message.type === 'file' ? (
            <div className="flex items-center gap-3 p-2 bg-black/10 rounded-lg">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{message.fileName || 'Document'}</p>
                <p className="text-xs opacity-70">{message.fileSize || 'Unknown size'}</p>
              </div>
              <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ) : (
            message.content
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-2 px-1">
          {isAI && <Bot className="w-3 h-3 text-purple-500" />}
          {isError && (
            <button 
              onClick={() => onRetry(message.id, message.content)}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 text-xs font-medium"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          )}
          <span className="text-xs text-gray-400">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {(isUser || isAI) && !isError && (
            <span className="text-gray-400">
              {message.status === 'read' ? 'Read' : 
               message.status === 'delivered' ? 'Delivered' : 
               'Sent'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
