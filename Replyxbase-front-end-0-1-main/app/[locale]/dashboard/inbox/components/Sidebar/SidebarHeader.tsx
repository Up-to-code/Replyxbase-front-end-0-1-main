import React from 'react';
import { useRouter } from 'next/navigation';
import { Home, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SidebarHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ searchTerm, setSearchTerm }) => {
  const router = useRouter();
  const t = useTranslations("Dashboard.Inbox");

  return (
    <>
 
      <div className="px-6 pb-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 rtl:left-auto rtl:right-3" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-[#2A4D9A] focus:ring-1 focus:ring-[#2A4D9A] rounded-xl transition-all duration-200 text-base rtl:pl-4 rtl:pr-10"
          />
        </div>
      </div>
    </>
  );
};
