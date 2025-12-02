import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Booking } from '../../types';
import { useOutsideClick } from '../../hooks/useOutsideClick';

/**
 * Props for the DeleteConfirmationModal component.
 */
interface DeleteConfirmationModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Callback to confirm deletion */
  onConfirm: () => void;
  /** The booking being deleted (optional, for display) */
  booking?: Booking;
}

/**
 * Modal component to confirm booking deletion.
 */
export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  booking
}) => {
  const modalRef = useOutsideClick(onClose);
  const t = useTranslations("Dashboard.CRM.Bookings.DeleteModal");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t("title")}</h3>
                  <p className="text-sm text-gray-600">{t("subtitle")}</p>
                </div>
              </div>
              
              {booking && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="font-medium text-gray-900">{booking.customer.fullName}</p>
                  <p className="text-sm text-gray-600">
                    {booking.date.toLocaleDateString()} • {booking.startTime} - {booking.endTime}
                  </p>
                  <p className="text-sm text-gray-600">{booking.serviceType}</p>
                </div>
              )}
              
              <p className="text-gray-700 mb-6">
                {t("confirmation")}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-all duration-200"
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};