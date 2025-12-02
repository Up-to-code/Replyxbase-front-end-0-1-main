"use client";

import React from "react";
import { Menu } from "lucide-react";
import type { Translator } from "./types";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { UserMenu } from "./UserMenu";
import { Notifications } from "./Notifications";

// Header Actions Component (Notifications + Language)
function HeaderActions({ t }: { t: Translator }) {
  return (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Notifications */}
      <Notifications t={t} />
    </div>
  );
}

// Header Component
export function Header({
  onSidebarToggle,
  t,
}: {
  onSidebarToggle: () => void;
  t: Translator;
}) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center sticky top-0 z-50">
      <div className="w-full">
        <div className="w-full px-4 flex items-center justify-between">
          {/* Left: Menu button only */}
          <div className="flex items-center gap-4 flex-1">
            <button
              type="button"
              onClick={onSidebarToggle}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Organization Switcher + Notifications + Language + User Menu */}
          <div className="flex items-center gap-4">
            {/* Organization Switcher - Now on the right */}
            <OrganizationSwitcher t={t} />
            
            <HeaderActions t={t} />
            
            {/* User Menu */}
            <UserMenu t={t} align="end" />
          </div>
        </div>
      </div>
    </header>
  );
}
