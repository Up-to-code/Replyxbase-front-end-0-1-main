import React from "react";
import { getTranslations } from "next-intl/server";
import { Zap, Linkedin, Instagram, Globe } from "lucide-react";

const Footer = async () => {
  const t = await getTranslations("Landing.Footer");
  const tCommon = await getTranslations("Common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-6 gap-12 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#2A4D9A] rounded-xl flex items-center justify-center shadow-lg shadow-[#2A4D9A]/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-gray-900 tracking-tight">Replyxbase</span>
            </div>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-xs">
              {t("desc")}
            </p>
            <div className="flex gap-4">
              {[Linkedin, Instagram, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#2A4D9A] hover:text-white transition-all hover:-translate-y-1" aria-label="Social Link">
                      <Icon className="w-5 h-5" />
                  </a>
              ))}
            </div>
          </div>
          
          {[
              { title: t("product"), links: ["features", "pricing", "integrations", "changelog"] },
              { title: t("company"), links: ["about", "careers", "blog", "contact"] },
              { title: t("resources"), links: ["docs", "api", "community", "help"] },
              { title: t("legal"), links: ["privacy", "terms", "security", "status"] },
          ].map((col, i) => (
              <div key={i}>
                  <h4 className="font-bold text-gray-900 mb-8 text-lg">{col.title}</h4>
                  <ul className="space-y-4">
                      {col.links.map((linkKey, j) => (
                          <li key={j}>
                              <a href="#" className="text-base text-gray-500 hover:text-[#2A4D9A] transition-colors font-medium">{t(`links.${linkKey}`)}</a>
                          </li>
                      ))}
                  </ul>
              </div>
          ))}
        </div>
        
        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400 font-medium">
          <div>{tCommon("copyright", {year})}</div>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{tCommon("allSystemsOperational")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
