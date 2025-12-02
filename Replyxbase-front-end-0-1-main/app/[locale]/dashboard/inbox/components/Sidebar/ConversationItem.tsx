import React, { useState } from 'react';
import { Conversation } from '../../types';
import { MessageCircle, Smartphone, Globe } from 'lucide-react';
import { ContextMenu } from './ContextMenu';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
  onDelete: (id: string) => void;
  onMarkAsDraft: (id: string) => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ 
  conversation, 
  isSelected, 
  onClick,
  onDelete,
  onMarkAsDraft
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const getPlatformIcon = (platform: Conversation['platform']) => {
    switch (platform) {
      case 'whatsapp': return <MessageCircle className="w-5 h-5 text-green-500" />;
      case 'instagram': return <Smartphone className="w-5 h-5 text-pink-500" />;
      case 'website': return <Globe className="w-5 h-5 text-blue-500" />;
      default: return <Globe className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        onContextMenu={handleContextMenu}
        className={`p-6 cursor-pointer hover:bg-gray-50 transition-all duration-200 border-b border-gray-50 ${
          isSelected 
            ? 'bg-blue-50/50 border-l-4 border-l-[#2A4D9A]' 
            : conversation.unreadCount > 0
            ? 'bg-gray-50/30 border-l-4 border-l-gray-200'
            : 'border-l-4 border-l-transparent'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-colors ${isSelected ? 'bg-[#2A4D9A] text-white' : 'bg-gray-100 text-gray-600'}`}>
                {conversation.customerName.charAt(0)}
              </div>
              <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                conversation.customerStatus === 'online' ? 'bg-green-500' :
                conversation.customerStatus === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
            </div>
            <div>
              <h3 className={`text-base ${isSelected ? 'text-[#2A4D9A]' : 'text-gray-900'} ${conversation.unreadCount > 0 ? 'font-bold' : 'font-semibold'}`}>
                {conversation.customerName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {getPlatformIcon(conversation.platform)}
                <span className="text-xs text-gray-400 capitalize">{conversation.platform}</span>
              </div>
            </div>
          </div>
          <span className="text-sm text-gray-400 whitespace-nowrap">
            {conversation.lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2 pl-16">
          <p className={`text-base truncate max-w-[200px] ${isSelected ? 'text-gray-700' : conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            {conversation.lastMessage}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="w-6 h-6 bg-[#2A4D9A] text-white text-xs font-medium flex items-center justify-center rounded-full shadow-sm">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onDelete={() => onDelete(conversation.id)}
          onMarkAsDraft={() => onMarkAsDraft(conversation.id)}
        />
      )}
    </>
  );
};
