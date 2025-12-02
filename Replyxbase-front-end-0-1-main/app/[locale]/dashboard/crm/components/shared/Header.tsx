import React from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Props for the Header component.
 */
interface HeaderProps {
  /** Callback to open the new booking drawer */
  onNewBooking: () => void;
  /** Whether data is loading */
  isLoading: boolean;
  /** Callback to refresh data */
  onRefresh: () => void;
}

/**
 * Main header component for the CRM dashboard.
 */
export const Header: React.FC<HeaderProps> = ({ 
  onNewBooking, 
  isLoading, 
  onRefresh
}) => {
  const t = useTranslations("Dashboard.CRM.Header");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 p-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-600 mt-1">
          {t("subtitle")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-50 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {t("refresh")}
        </button>
        <button
          onClick={onNewBooking}
          disabled={isLoading}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          {t("newBooking")}
        </button>
      </div>
    </div>
  );
};