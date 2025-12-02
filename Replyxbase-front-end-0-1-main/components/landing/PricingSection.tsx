"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";

const PricingCard = ({
  name,
  price,
  description,
  features,
  highlight = false,
  isAnnual,
  tCommon
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  isAnnual: boolean;
  tCommon: any;
}) => (
  <div className={`h-full p-10 rounded-[2rem] flex flex-col transition-all duration-300 relative will-change-transform ${highlight ? 'bg-[#2A4D9A] text-white shadow-xl scale-105 z-10' : 'bg-white border border-gray-100 text-gray-900 hover:border-[#2A4D9A]/20'}`}>
        {highlight && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-[#2A4D9A] px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                Most Popular
            </div>
        )}
        <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${highlight ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold tracking-tight">{price}</span>
                <span className={`text-lg ${highlight ? 'text-blue-100' : 'text-gray-500'}`}>{isAnnual ? '/mo' : '/mo'}</span>
            </div>
            <p className={`text-base ${highlight ? 'text-blue-100' : 'text-gray-500'}`}>{description}</p>
        </div>
        <Separator className={`mb-8 ${highlight ? 'bg-blue-400/30' : 'bg-gray-100'}`} />
        <ul className="space-y-5 mb-10 flex-1">
            {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-base">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${highlight ? 'bg-white/20' : 'bg-[#2A4D9A]/10'}`}>
                        <Check className={`w-4 h-4 ${highlight ? 'text-white' : 'text-[#2A4D9A]'}`} />
                    </div>
                    <span className={highlight ? 'text-blue-50' : 'text-gray-700'}>{f}</span>
                </li>
            ))}
        </ul>
        <Button 
            variant={highlight ? 'secondary' : 'outline'} 
            className={`w-full rounded-2xl h-14 text-lg font-semibold transition-all ${highlight ? 'bg-white text-[#2A4D9A] hover:bg-blue-50 border-none' : 'border-2 border-gray-100 hover:border-[#2A4D9A] hover:bg-transparent text-gray-900 hover:text-[#2A4D9A]'}`}
            aria-label={`Get Started with ${name} plan`}
        >
            {tCommon("getStarted")}
        </Button>
  </div>
);

const PricingSection = () => {
    const [isAnnual, setIsAnnual] = useState(true);
    const t = useTranslations("Landing.Pricing");
    const tCommon = useTranslations("Common");

    return (
      <section id="pricing" className="py-24 bg-gray-50/50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">{t("title")}</h2>
            <p className="text-xl text-gray-600 mb-10">{t("subtitle")}</p>
            
            {/* Toggle */}
            <div className="flex items-center justify-center gap-2 p-1.5 bg-white rounded-full w-fit mx-auto border border-gray-200 shadow-sm">
                <button 
                    onClick={() => setIsAnnual(false)}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${!isAnnual ? 'bg-[#2A4D9A] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    {t("monthly")}
                </button>
                <button 
                    onClick={() => setIsAnnual(true)}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isAnnual ? 'bg-[#2A4D9A] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    {t("yearly")} <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide ${isAnnual ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>{t("save")}</span>
                </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
            <PricingCard 
                name={t("starter")}
                price="$0"
                description={t("starterDesc")}
                features={[t("features.1agent"), t("features.100conv"), t("features.community")]}
                isAnnual={isAnnual}
                tCommon={tCommon}
            />
            <PricingCard 
                name={t("pro")}
                price={isAnnual ? "$39" : "$49"}
                description={t("proDesc")}
                features={[t("features.3agents"), t("features.unlimitedConv"), t("features.priority"), t("features.analytics"), t("features.branding")]}
                highlight={true}
                isAnnual={isAnnual}
                tCommon={tCommon}
            />
            <PricingCard 
                name={t("enterprise")}
                price="Custom"
                description={t("enterpriseDesc")}
                features={[t("features.unlimitedAgents"), t("features.successManager"), t("features.sla"), t("features.customIntegrations")]}
                isAnnual={isAnnual}
                tCommon={tCommon}
            />
          </div>
        </div>
      </section>
    );
};

export default PricingSection;
