import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white animate-fade-in">
      <div 
        ref={modalRef}
        className="w-full h-full flex flex-col bg-white animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-12 py-8 border-b border-gray-100 shrink-0">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 hover:bg-gray-50 p-3 rounded-full transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        
        <div className="flex-1 px-12 py-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </div>

        {footer && (
          <div className="px-12 py-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4 shrink-0">
            <div className="max-w-3xl mx-auto w-full flex justify-end gap-4">
              {footer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
