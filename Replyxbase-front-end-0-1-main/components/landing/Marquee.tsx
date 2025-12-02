import React from "react";
import { useTranslations } from "next-intl";
import { Building, ShoppingBag, HeartPulse, Cpu, Banknote, MessageCircle, Send, Globe } from "lucide-react";

const Marquee = () => {
    const t = useTranslations("Landing.Marquee");
    
    // Combined list of industries and channels for the infinite loop
    const items = [
        { icon: MessageCircle, label: "whatsapp", color: "text-green-500" },
        { icon: Send, label: "telegram", color: "text-blue-500" },
        { icon: Globe, label: "website", color: "text-indigo-500" },
        { icon: Building, label: "realEstate", color: "text-gray-400" },
        { icon: ShoppingBag, label: "ecommerce", color: "text-gray-400" },
        { icon: HeartPulse, label: "healthcare", color: "text-gray-400" },
        { icon: Cpu, label: "technology", color: "text-gray-400" },
        { icon: Banknote, label: "finance", color: "text-gray-400" },
    ];

    return (
        <div className="w-full py-12 bg-white border-b border-gray-100 overflow-hidden relative" dir="ltr">
            {/* Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            {/* Infinite Loop Container */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center gap-16 mx-8">
                        {items.map((item, index) => (
                            <div key={index} className={`flex items-center gap-3 text-lg font-bold transition-all duration-300 hover:scale-110 cursor-default group ${item.color === 'text-gray-400' ? 'text-gray-400 hover:text-[#2A4D9A]' : item.color}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 group-hover:bg-white group-hover:shadow-md transition-all border border-transparent group-hover:border-gray-100`}>
                                    <item.icon className={`w-6 h-6 ${item.color === 'text-gray-400' ? 'group-hover:text-[#2A4D9A]' : ''}`} />
                                </div>
                                <span>{t(item.label)}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
