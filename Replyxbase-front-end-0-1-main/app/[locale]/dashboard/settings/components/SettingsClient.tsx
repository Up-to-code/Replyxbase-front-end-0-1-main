'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SettingsSidebar } from './SettingsSidebar';
import { ProfileSettings } from './ProfileSettings';
import { OrganizationSettings } from './OrganizationSettings';
import { TeamSettings } from './TeamSettings';
import { NotificationsSettings } from './NotificationsSettings';
import { AppearanceSettings } from './AppearanceSettings';
import { BillingSettings } from './BillingSettings';

import { User, Organization, Member } from '@prisma/client';

interface SettingsClientProps {
  user: User;
  organization: Organization & {
    members: (Member & { user: User })[];
  };
}

export const SettingsClient: React.FC<SettingsClientProps> = ({ user, organization }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const t = useTranslations("Dashboard.Settings");

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings user={user} />;
      case 'organization':
        return <OrganizationSettings organization={organization} />;
      case 'team':
        return <TeamSettings />;
      case 'notifications':
        return <NotificationsSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'billing':
        return <BillingSettings />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p>Content for {activeTab} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-12 py-10 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-lg text-gray-500 mt-2">{t("subtitle")}</p>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-12 py-12">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Sidebar */}
          <div className="flex-shrink-0 w-72">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Content Area */}
          <div className="flex-1 max-w-4xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
