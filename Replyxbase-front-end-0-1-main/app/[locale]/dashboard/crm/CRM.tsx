'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Booking, BookingFormData, CalendarView as CalendarViewType, MainView } from './types';
import { useFilters } from './hooks/useFilters';
import { getBookings, createBooking, updateBooking, deleteBooking } from '@/app/actions/crm';
import { Header } from './components/shared/Header';
import { Filters } from './components/shared/Filters';
import { ViewToggle } from './components/shared/ViewToggle';
import { BookingTable } from './components/bookings/BookingTable';
import { CalendarViewComponent } from './components/calendar/CalendarView';
import { KanbanBoard } from './components/kanban/KanbanBoard';
import { Pagination } from './components/shared/Pagination';
import { BookingDetailsDrawer } from './components/bookings/BookingDetailsDrawer';
import { BookingFormDrawer } from './components/bookings/BookingFormDrawer';
import { DeleteConfirmationModal } from './components/bookings/DeleteConfirmationModal';
import { StatsOverview } from './components/shared/StatsOverview';

import { Customer } from './types';

interface CRMProps {
  initialBookings: Booking[];
  initialPagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  initialCustomers: Customer[];
}

export default function CRM({ initialBookings, initialPagination, initialCustomers }: CRMProps) {
  // i18n
  const t = useTranslations("Dashboard.CRM");

  // State
  const [view, setView] = useState<MainView>('kanban');
  const [calendarView, setCalendarView] = useState<CalendarViewType>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState(initialPagination);

  // Drawer & Modal State
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    serviceFilter,
    setServiceFilter,
    dateRange,
    setDateRange,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    dynamicFilters,
    addDynamicFilter,
    removeDynamicFilter,
    updateDynamicFilter
  } = useFilters();

  // Fetch Data
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getBookings(
        currentPage,
        10, // items per page
        {
          search: searchTerm,
          status: statusFilter,
          service: serviceFilter
        },
        {
          field: sortField,
          direction: sortDirection
        },
        dynamicFilters
      );

      setBookings(result.bookings);
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalItems: result.totalItems
      });
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, serviceFilter, sortField, sortDirection, dynamicFilters]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handlers
  const handleCreateBooking = async (formData: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await createBooking(formData);
      await fetchBookings();
      setIsFormOpen(false);
      showToast('Booking created successfully');
    } catch (error) {
      console.error('Failed to create booking:', error);
      showToast('Failed to create booking', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBooking = async (formData: BookingFormData) => {
    if (!selectedBooking) return;
    setIsSubmitting(true);
    try {
      await updateBooking(selectedBooking.id, formData);
      await fetchBookings();
      setIsFormOpen(false);
      setSelectedBooking(null);
      setIsDetailsOpen(false); 
      showToast('Booking updated successfully');
    } catch (error) {
      console.error('Failed to update booking:', error);
      showToast('Failed to update booking', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;
    try {
      await deleteBooking(bookingToDelete);
      await fetchBookings();
      setIsDeleteModalOpen(false);
      setBookingToDelete(null);
      if (selectedBooking?.id === bookingToDelete) {
        setIsDetailsOpen(false);
        setSelectedBooking(null);
      }
      showToast('Booking deleted successfully');
    } catch (error) {
      console.error('Failed to delete booking:', error);
      showToast('Failed to delete booking', 'error');
    }
  };

  const openEditForm = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(false);
    setIsFormOpen(true);
  };

  const handleKanbanUpdate = async (updatedBooking: Booking) => {
    // Optimistic update
    setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
    try {
      const { updateBooking } = await import('@/app/actions/crm');
      // We need to convert Booking to BookingFormData
      const formData: BookingFormData = {
        customer: {
          fullName: updatedBooking.customer.fullName,
          email: updatedBooking.customer.email || '',
          phone: updatedBooking.customer.phone || '',
          company: updatedBooking.customer.company || '',
          address: updatedBooking.customer.address || '',
          notes: updatedBooking.customer.notes || ''
        },
        booking: {
          ...updatedBooking,
          date: new Date(updatedBooking.date),
          occasion: updatedBooking.occasion || '',
          specialRequests: updatedBooking.specialRequests || '',
          location: updatedBooking.location || '',
          staffAssigned: updatedBooking.staffAssigned || '',
          notes: updatedBooking.notes || '',
          source: updatedBooking.source || 'website',
          tags: updatedBooking.tags || []
        }
      };
      await updateBooking(updatedBooking.id, formData);
      showToast('Booking updated');
    } catch (error) {
      console.error('Failed to update booking', error);
      showToast('Failed to update booking', 'error');
      fetchBookings();
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const updatedBooking = { ...booking, status: newStatus };
    await handleKanbanUpdate(updatedBooking);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white font-medium ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
            } rtl:right-auto rtl:left-4`}
            role="alert"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1600px] mx-auto space-y-6 p-6">
        
        {/* Header & Stats */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">{t("title")}</h1>
              <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
            </div>
            <div className="flex items-center gap-3">
              <ViewToggle mainView={view} setMainView={setView} />
              <button
                onClick={() => {
                  setSelectedBooking(null);
                  setIsFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-200 font-medium shadow-none"
                aria-label={t("Header.newBooking")}
              >
                <Plus className="w-4 h-4" />
                {t("Header.newBooking")}
              </button>
            </div>
          </div>
          
          <StatsOverview 
            bookings={bookings} 
            isLoading={isLoading} 
            currentFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />
        </div>

        {/* Filters */}
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          serviceFilter={serviceFilter}
          setServiceFilter={setServiceFilter}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={(field, direction) => {
            setSortField(field);
            setSortDirection(direction);
          }}
          dateRange={dateRange}
          setDateRange={setDateRange}
          dynamicFilters={dynamicFilters}
          addDynamicFilter={addDynamicFilter}
          removeDynamicFilter={removeDynamicFilter}
          updateDynamicFilter={updateDynamicFilter}
        />

        {/* Content */}
        <AnimatePresence mode="wait">
          {view === 'table' ? (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <BookingTable
                bookings={bookings}
                isLoading={isLoading}
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
                onView={(booking) => {
                  setSelectedBooking(booking);
                  setIsDetailsOpen(true);
                }}
                onDelete={(id) => {
                  setBookingToDelete(id);
                  setIsDeleteModalOpen(true);
                }}
              />
            </motion.div>
          ) : view === 'calendar' ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CalendarViewComponent
                bookings={bookings}
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                view={calendarView}
                onViewChange={setCalendarView}
                onBookingClick={(booking) => {
                  setSelectedBooking(booking);
                  setIsDetailsOpen(true);
                }}
                onDayClick={(date) => {
                  setCurrentDate(date);
                  setCalendarView('day');
                }}
                isLoading={isLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="kanban"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <KanbanBoard
                bookings={bookings}
                onView={(booking) => {
                  setSelectedBooking(booking);
                  setIsDetailsOpen(true);
                }}
                onStatusChange={handleStatusChange}
                onUpdateBooking={handleKanbanUpdate}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drawers & Modals */}
      <BookingDetailsDrawer
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking || undefined}
        onEdit={openEditForm}
        onDelete={(id) => {
          setBookingToDelete(id);
          setIsDeleteModalOpen(true);
        }}
      />

      <BookingFormDrawer
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedBooking(null);
        }}
        onSave={selectedBooking ? handleUpdateBooking : handleCreateBooking}
        isLoading={isSubmitting}
        booking={selectedBooking || undefined}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setBookingToDelete(null);
        }}
        onConfirm={handleDeleteBooking}
        booking={bookings.find(b => b.id === bookingToDelete)}
      />
    </div>
  );
}
