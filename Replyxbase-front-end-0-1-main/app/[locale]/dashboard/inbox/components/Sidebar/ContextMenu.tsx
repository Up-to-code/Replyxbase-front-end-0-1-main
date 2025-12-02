import React from 'react';
import { Trash2, FileText } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onMarkAsDraft: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onDelete, onMarkAsDraft }) => {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-100 py-1 w-48 animate-in fade-in zoom-in-95 duration-100"
        style={{ top: y, left: x }}
      >
        <button
          onClick={() => {
            onMarkAsDraft();
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Mark as Draft
        </button>
        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete Conversation
        </button>
      </div>
    </>
  );
};
