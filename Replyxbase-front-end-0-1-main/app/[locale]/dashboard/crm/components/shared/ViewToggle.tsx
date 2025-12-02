import React from 'react';
import { List, CalendarDays, Layout } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MainView } from '../../types';

/**
 * Props for the ViewToggle component.
 */
interface ViewToggleProps {
  /** Current active view */
  mainView: MainView;
  /** Callback to change the view */
  setMainView: (view: MainView) => void;
}

/**
 * Component to toggle between different views (Table, Calendar, Kanban).
 */
export const ViewToggle: React.FC<ViewToggleProps> = ({ mainView, setMainView }) => {
  const t = useTranslations("Dashboard.CRM.ViewToggle");

  return (
    <div className="flex gap-1 mb-4 px-4">
      <button
        onClick={() => setMainView('table')}
        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
          mainView === 'table' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        <List className="w-4 h-4 rtl:ml-2" />
        {t("table")}
      </button>
      <button
        onClick={() => setMainView('calendar')}
        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
          mainView === 'calendar' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        <CalendarDays className="w-4 h-4 rtl:ml-2" />
        {t("calendar")}
      </button>
      <button
        onClick={() => setMainView('kanban')}
        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
          mainView === 'kanban' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        <Layout className="w-4 h-4 rtl:ml-2" />
        {t("kanban")}
      </button>
    </div>
  );
};