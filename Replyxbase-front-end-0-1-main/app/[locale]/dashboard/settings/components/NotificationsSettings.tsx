import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bell, Mail, MessageSquare } from 'lucide-react';

export const NotificationsSettings: React.FC = () => {
  const t = useTranslations("Dashboard.Settings.Notifications");

  const [emailNotifications, setEmailNotifications] = useState({
    marketing: true,
    security: true,
    updates: false,
  });

  const [pushNotifications, setPushNotifications] = useState({
    comments: true,
    mentions: true,
    reminders: true,
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
        <p className="text-base text-gray-500 mt-2">{t("description")}</p>
      </div>

      <div className="space-y-8">
        {/* Email Notifications */}
        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{t("email.title")}</h3>
              <p className="text-sm text-gray-500">{t("email.description")}</p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(emailNotifications).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 capitalize">{key}</span>
                  <span className="block text-xs text-gray-500 mt-0.5">Receive emails about {key}</span>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-gray-200'}`}>
                  <input 
                    type="checkbox" 
                    checked={value}
                    onChange={() => setEmailNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                    className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
                  />
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform ${value ? 'left-[22px]' : 'left-0.5'}`} />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{t("push.title")}</h3>
              <p className="text-sm text-gray-500">{t("push.description")}</p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(pushNotifications).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 capitalize">{key}</span>
                  <span className="block text-xs text-gray-500 mt-0.5">Receive push notifications for {key}</span>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-gray-200'}`}>
                  <input 
                    type="checkbox" 
                    checked={value}
                    onChange={() => setPushNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                    className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
                  />
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform ${value ? 'left-[22px]' : 'left-0.5'}`} />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
