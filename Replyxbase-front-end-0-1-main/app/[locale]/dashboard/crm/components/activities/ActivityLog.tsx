import React from 'react';
import { Activity } from '../../types';
import { Phone, Mail, FileText, Users, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Props for the ActivityLog component.
 */
interface ActivityLogProps {
  /** List of activities to display */
  activities: Activity[];
}

/**
 * Displays a chronological log of activities (calls, emails, notes, meetings).
 */
export const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  const t = useTranslations("Dashboard.CRM.Activities.Log");
  
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4 text-primary" />;
      case 'email': return <Mail className="w-4 h-4 text-green-500" />;
      case 'meeting': return <Users className="w-4 h-4 text-purple-500" />;
      case 'note': return <FileText className="w-4 h-4 text-yellow-500" />;
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{t("noActivities")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((activity) => (
        <div key={activity.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="mt-1">
            {getIcon(activity.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <span className="font-medium text-sm text-gray-900 capitalize">{activity.type}</span>
              <div className="flex items-center text-xs text-gray-500 gap-1">
                <Clock className="w-3 h-3" />
                <span>{new Date(activity.createdAt).toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{activity.content}</p>
            <div className="mt-2 text-xs text-gray-400">
              {t("loggedBy", { name: activity.createdBy })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
