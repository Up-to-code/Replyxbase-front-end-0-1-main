import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Booking } from '../../types';

/**
 * Props for the StatusBadge component.
 */
interface StatusBadgeProps {
  /** The status of the booking */
  status: Booking['status'];
}

/**
 * Props for the PriorityBadge component.
 */
interface PriorityBadgeProps {
  /** The priority of the booking */
  priority: Booking['priority'];
}

/**
 * Displays a badge representing the booking status.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const t = useTranslations("Dashboard.CRM.Status");

  const statusConfig: Record<Booking['status'], { icon: any; color: string }> = {
    pending: { icon: Clock, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    confirmed: { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    completed: { icon: CheckCircle, color: 'bg-gray-900 text-white border-gray-900' },
    cancelled: { icon: XCircle, color: 'bg-rose-100 text-rose-800 border-rose-200' },
    'no-show': { icon: AlertCircle, color: 'bg-gray-100 text-gray-800 border-gray-200' }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <Icon className="w-3 h-3" />
      {t(status)}
    </span>
  );
};

/**
 * Displays a badge representing the booking priority.
 */
export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const t = useTranslations("Dashboard.CRM.Priority");

  const priorityConfig: Record<Booking['priority'], { color: string }> = {
    normal: { color: 'bg-gray-100 text-gray-800 border-gray-200' },
    high: { color: 'bg-orange-100 text-orange-800 border-orange-200' },
    urgent: { color: 'bg-rose-100 text-rose-800 border-rose-200' }
  };

  const config = priorityConfig[priority];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {t(priority)}
    </span>
  );
};