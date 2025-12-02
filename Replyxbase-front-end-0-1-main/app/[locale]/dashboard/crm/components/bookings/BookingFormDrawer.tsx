import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Booking, BookingFormData } from '../../types';
import { InputField } from '../ui/Inputs';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { formatDateForInput } from '../../utils';
import { serviceTypes } from '../../constants';

/**
 * Props for the BookingFormDrawer component.
 */
interface BookingFormDrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback to close the drawer */
  onClose: () => void;
  /** Callback to save the booking */
  onSave: (formData: BookingFormData) => void;
  /** Whether data is loading */
  isLoading: boolean;
  /** The booking to edit (optional) */
  booking?: Booking;
}

/**
 * Drawer component for creating or editing a booking.
 */
export const BookingFormDrawer: React.FC<BookingFormDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  isLoading,
  booking
}) => {
  const drawerRef = useOutsideClick(onClose);
  const t = useTranslations("Dashboard.CRM.Form");
  const tCommon = useTranslations("Common");

  const [formData, setFormData] = useState<BookingFormData>({
    customer: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      notes: ''
    },
    booking: {
      date: new Date(),
      startTime: '09:00',
      duration: 60,
      people: 2,
      serviceType: serviceTypes[0],
      occasion: '',
      specialRequests: '',
      location: '',
      status: 'pending',
      priority: 'normal',
      staffAssigned: '',
      notes: '',
      source: 'website',
      tags: []
    }
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        customer: {
          fullName: booking.customer.fullName,
          email: booking.customer.email,
          phone: booking.customer.phone,
          company: booking.customer.company || '',
          address: booking.customer.address || '',
          notes: booking.customer.notes || ''
        },
        booking: {
          date: booking.date,
          startTime: booking.startTime,
          duration: booking.duration,
          people: booking.people,
          serviceType: booking.serviceType,
          occasion: booking.occasion || '',
          specialRequests: booking.specialRequests || '',
          location: booking.location || '',
          status: booking.status,
          priority: booking.priority,
          staffAssigned: booking.staffAssigned || '',
          notes: booking.notes || '',
          source: booking.source || 'website',
          tags: booking.tags || []
        }
      });
    }
  }, [booking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (section: 'customer' | 'booking', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-[101] overflow-y-auto rtl:right-auto rtl:left-0 rtl:transform rtl:-scale-x-100"
          >
            <div className="flex flex-col h-full rtl:transform rtl:-scale-x-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {booking ? t("editTitle") : t("newTitle")}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("customerInfo")}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label={t("fullName")}
                        value={formData.customer.fullName}
                        onChange={(e) => handleInputChange('customer', 'fullName', e.target.value)}
                        required
                      />
                      <InputField
                        label={t("email")}
                        type="email"
                        value={formData.customer.email}
                        onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                        required
                      />
                      <InputField
                        label={t("phone")}
                        value={formData.customer.phone}
                        onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                        required
                      />
                      <InputField
                        label={t("company")}
                        value={formData.customer.company}
                        onChange={(e) => handleInputChange('customer', 'company', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("bookingDetails")}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label={t("date")}
                        type="date"
                        value={formatDateForInput(formData.booking.date)}
                        onChange={(e) => handleInputChange('booking', 'date', new Date(e.target.value))}
                        required
                      />
                      <InputField
                        label={t("startTime")}
                        type="time"
                        value={formData.booking.startTime}
                        onChange={(e) => handleInputChange('booking', 'startTime', e.target.value)}
                        required
                      />
                      <InputField
                        label={t("duration")}
                        type="number"
                        value={formData.booking.duration}
                        onChange={(e) => handleInputChange('booking', 'duration', parseInt(e.target.value))}
                        required
                      />
                      <InputField
                        label={t("people")}
                        type="number"
                        value={formData.booking.people}
                        onChange={(e) => handleInputChange('booking', 'people', parseInt(e.target.value))}
                        required
                      />
                      <InputField
                        label={t("serviceType")}
                        type="select"
                        value={formData.booking.serviceType}
                        onChange={(e) => handleInputChange('booking', 'serviceType', e.target.value)}
                        options={serviceTypes}
                        required
                      />
                      <InputField
                        label={t("status")}
                        type="select"
                        value={formData.booking.status}
                        onChange={(e) => handleInputChange('booking', 'status', e.target.value)}
                        options={['pending', 'confirmed', 'cancelled', 'completed', 'no-show']}
                        required
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("additionalInfo")}</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <InputField
                        label={t("specialRequests")}
                        type="textarea"
                        rows={3}
                        value={formData.booking.specialRequests}
                        onChange={(e) => handleInputChange('booking', 'specialRequests', e.target.value)}
                      />
                      <InputField
                        label={t("internalNotes")}
                        type="textarea"
                        rows={3}
                        value={formData.booking.notes}
                        onChange={(e) => handleInputChange('booking', 'notes', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-t border-gray-100">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {booking ? t("update") : t("create")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};