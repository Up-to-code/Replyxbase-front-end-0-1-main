"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "@/navigation";
import { ChevronDown, LogOut, Loader2 } from "lucide-react";
import { PROFILE_MENU } from "./constants";
import { ProfileMenuItem, Translator } from "./types";
import { authClient } from "@/lib/auth-client";

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

function MenuItem({ item, onAction, t }: {
  item: ProfileMenuItem;
  onAction: (href?: string, action?: string) => void;
  t: Translator;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onAction(item.href, item.action)}
      className="flex items-start w-full p-3 hover:bg-gray-50 text-start transition-all duration-200 ease-in-out group rounded-xl"
    >
      <div className="p-2 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-blue-50 group-hover:text-[#2A4D9A] transition-colors duration-200 ease-in-out me-3 shadow-sm ring-1 ring-gray-100 group-hover:ring-blue-100">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 block transition-colors">
          {t(`Header.ProfileMenu.${item.label}`)}
        </span>
        {item.description && (
          <span className="text-xs text-gray-400 group-hover:text-gray-500 mt-0.5 block transition-colors">
            {t(`Header.ProfileMenu.${item.description}`)}
          </span>
        )}
      </div>
    </button>
  );
}

export function UserMenu({ 
  t, 
  showName = false,
  align = "end"
}: { 
  t: Translator;
  showName?: boolean;
  align?: "start" | "end";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const ref = useClickOutside(() => setIsOpen(false));

  // Use Better Auth session hook
  const { data: session, isPending: isLoadingSession } = authClient.useSession();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const user = session?.user;

  const handleAction = (href?: string, action?: string) => {
    if (action === "logout") {
      setIsOpen(false);
      setShowLogoutModal(true);
    } else if (href) {
      router.push(href);
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  // Show loading state
  if (isLoadingSession) {
    return (
      <div className="flex items-center gap-2 p-2">
        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
      </div>
    );
  }

  // If no user session, return null
  if (!user) {
    return null;
  }

  // Helper to get user avatar
  const getUserAvatar = () => {
    return user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=2A4D9A&color=fff`;
  };

  return (
    <>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out border border-transparent hover:border-gray-200 ${
            showName ? "w-full" : ""
          }`}
          aria-label="User menu"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden ring-1 ring-gray-200">
            <img 
              src={getUserAvatar()} 
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {showName && (
            <div className="flex-1 min-w-0 text-start">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          )}
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {isOpen && (
          <div
            className={`absolute ${align === "end" ? "end-0" : "start-0"} top-full mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 z-[100] overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100`}
          >
            {/* User Header */}
            <div className="p-5 border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                  <img 
                    src={getUserAvatar()} 
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-lg truncate leading-tight">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-[#2A4D9A] text-[11px] font-bold uppercase tracking-wide rounded-full border border-blue-100">
                      {activeOrganization?.name || "Personal"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2 bg-white max-h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {PROFILE_MENU.map((item, index) => (
                <div key={item.label}>
                  <MenuItem item={item} onAction={handleAction} t={t} />
                  {index === PROFILE_MENU.length - 2 && <div className="my-2 border-t border-gray-100 mx-2" />}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                <span>Last login: Today, 14:30</span>
                <span>v2.4.1</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200 scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("Header.ProfileMenu.LogoutModal.title")}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {t("Header.ProfileMenu.LogoutModal.description")}
              </p>
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {t("Header.ProfileMenu.LogoutModal.cancel")}
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-sm shadow-red-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoggingOut && <Loader2 className="w-4 h-4 animate-spin" />}
                  {t("Header.ProfileMenu.LogoutModal.confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
