"use client";

import React, { useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { NOTIFICATIONS, NOTIFICATION_ICONS } from "./constants";
import { Notification, Translator } from "./types";

function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick, true);
    return () =>
      document.removeEventListener("mousedown", handleClick, true);
  }, [callback]);

  return ref;
}

function NotificationItem({ notification, t }: { notification: Notification; t: Translator }) {
  const NotificationIcon = NOTIFICATION_ICONS[notification.type] || NOTIFICATION_ICONS.default;
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-500';
      case 'payment': return 'text-green-500';
      case 'security': return 'text-red-500';
      case 'update': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={`w-full p-3 rounded-xl border transition-all duration-200 ease-in-out group cursor-pointer relative overflow-hidden ${
      !notification.read 
        ? 'bg-white border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200' 
        : 'bg-white border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'
    }`}>
      {!notification.read && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2A4D9A] rounded-l-xl" />
      )}
      <div className="flex items-start gap-3 pl-2">
        <div className={`p-2 rounded-xl ${getNotificationColor(notification.type)} bg-gray-50 group-hover:bg-white group-hover:shadow-sm transition-all duration-200 ring-1 ring-gray-100`}>
          <NotificationIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm font-semibold leading-snug ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
              {t(`Header.Notifications.${notification.label}`)}
            </p>
            <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100">
              {t(`Header.Notifications.${notification.time}`)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Notifications({ t }: { t: Translator }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useClickOutside(() => setIsOpen(false));
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -end-1 w-5 h-5 bg-[#2A4D9A] text-white text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute end-0 top-full mt-2 w-96 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 z-[100] overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100">
          <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between sticky top-0 z-10">
            <div>
              <h3 className="font-bold text-gray-900 text-base">{t("Header.notifications")}</h3>
              <p className="text-gray-500 text-xs mt-0.5 font-medium">
                {t("Header.unreadMessages", { count: unreadCount })}
              </p>
            </div>
            {unreadCount > 0 && (
              <button className="text-xs font-semibold text-[#2A4D9A] hover:text-[#1e3a7a] hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors">
                {t("Header.markAllRead")}
              </button>
            )}
          </div>
          
          <div className="max-h-[28rem] overflow-y-auto bg-gray-50/50 p-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {NOTIFICATIONS.map((item) => (
              <NotificationItem key={item.id} notification={item} t={t} />
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-100 bg-white sticky bottom-0 z-10">
            <button
              className="w-full py-2.5 text-sm text-gray-700 hover:text-gray-900 font-semibold hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 ease-in-out shadow-sm"
              type="button"
            >
              {t("Header.viewAllNotifications")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
