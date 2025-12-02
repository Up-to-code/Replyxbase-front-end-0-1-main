import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Moon, Sun, Monitor, Check } from 'lucide-react';

export const AppearanceSettings: React.FC = () => {
  const t = useTranslations("Dashboard.Settings.Appearance");
  const [theme, setTheme] = useState('system');

  const themes = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
        <p className="text-base text-gray-500 mt-2">{t("description")}</p>
      </div>

      <div className="space-y-8">
        {/* Theme Selection */}
        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">{t("theme.title")}</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {themes.map((item) => {
              const Icon = item.icon;
              const isSelected = theme === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTheme(item.id)}
                  className={`relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all
                    ${isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-primary' : 'text-gray-400'}`} />
                  <span className={`text-sm font-semibold ${isSelected ? 'text-primary' : 'text-gray-500'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Selection (Placeholder) */}
        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">{t("language.title")}</h3>
          <div className="relative">
            <select 
              className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl px-5 py-4 text-base text-gray-900 appearance-none"
              defaultValue="en"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
