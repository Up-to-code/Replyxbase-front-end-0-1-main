"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { Languages } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2"
        aria-label={t("languageSwitchLabel")}
      >
        <Languages className="w-5 h-5" />
        <span className="text-sm font-medium uppercase hidden sm:block">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute end-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            <button
              onClick={() => switchLocale("en")}
              className={`w-full px-4 py-2 text-sm text-start hover:bg-gray-50 transition-colors ${
                locale === "en" ? "text-blue-600 font-medium bg-blue-50" : "text-gray-700"
              }`}
            >
              {t("localeEnglish")}
            </button>
            <button
              onClick={() => switchLocale("ar")}
              className={`w-full px-4 py-2 text-sm text-start hover:bg-gray-50 transition-colors ${
                locale === "ar" ? "text-blue-600 font-medium bg-blue-50" : "text-gray-700"
              }`}
            >
              {t("localeArabic")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
