import React from 'react';
import { useTranslations } from 'next-intl';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { User } from '@prisma/client';

interface ProfileSettingsProps {
  user: User;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const t = useTranslations("Dashboard.Settings.Profile");

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
        <p className="text-base text-gray-500 mt-2">{t("description")}</p>
      </div>

      <div className="space-y-8">
        {/* Avatar Section */}
        <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white overflow-hidden">
              {user.image ? (
                <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-medium text-gray-400">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <button className="text-sm font-semibold text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-6 py-3 rounded-lg transition-colors">
              Change Photo
            </button>
            <p className="text-sm text-gray-500 mt-3">JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-8">
          <div className="grid gap-3">
            <label className="text-sm font-semibold text-gray-700">{t("form.fullName")}</label>
            <input 
              type="text" 
              defaultValue={user.name || ""}
              className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl px-5 py-4 text-base text-gray-900 transition-all duration-200"
            />
          </div>

          <div className="grid gap-3">
            <label className="text-sm font-semibold text-gray-700">{t("form.email")}</label>
            <input 
              type="email" 
              defaultValue={user.email || ""}
              disabled
              className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl px-5 py-4 text-base text-gray-900 transition-all duration-200 opacity-60 cursor-not-allowed"
            />
          </div>

          <div className="grid gap-3">
            <label className="text-sm font-semibold text-gray-700">{t("form.bio")}</label>
            <textarea 
              rows={5}
              className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl px-5 py-4 text-base text-gray-900 transition-all duration-200 resize-none"
              defaultValue="Product Designer based in San Francisco."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-8 border-t border-border">
          <Button variant="primary" className="px-8 py-3.5 h-auto text-sm font-semibold">
            {t("form.save")}
          </Button>
          <Button variant="ghost" className="px-6 py-3.5 h-auto text-sm font-medium">
            {t("form.cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
};
