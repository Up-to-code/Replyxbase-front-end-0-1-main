"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, Send, Globe, Mail, ArrowDown, Bot, User, CheckCircle2, Sparkles } from "lucide-react";

const OmnichannelTitle = () => {
    const t = useTranslations("Landing.Features.Omnichannel");
    return (
        <div className="text-center mb-20 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100/50 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A4D9A]/10 text-[#2A4D9A] text-sm font-bold mb-6 border border-[#2A4D9A]/20"
            >
                <Sparkles className="w-4 h-4" />
                <span>Unified Intelligence</span>
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
                {t("title")}
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
                {t("subtitle")}
            </motion.p>
        </div>
    );
};

const OmnichannelFlow = () => {
  const t = useTranslations("Landing.Features.Omnichannel");

  const channels = [
    { icon: MessageCircle, color: "text-green-500", bg: "bg-green-50", label: "WhatsApp" },
    { icon: Send, color: "text-blue-500", bg: "bg-blue-50", label: "Telegram" },
    { icon: Globe, color: "text-indigo-500", bg: "bg-indigo-50", label: "Website" },
    { icon: Mail, color: "text-red-500", bg: "bg-red-50", label: "Email" },
  ];

  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <OmnichannelTitle />

        <div className="relative max-w-5xl mx-auto">
          {/* Channels Row */}
          <div className="flex justify-between items-center mb-16 px-4 lg:px-16">
            {channels.map((channel, index) => (
              <div key={index} className="flex flex-col items-center gap-4 relative group">
                <motion.div 
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`w-20 h-20 rounded-3xl ${channel.bg} flex items-center justify-center shadow-sm border border-gray-100 z-10 relative will-change-transform`}
                >
                  <channel.icon className={`w-10 h-10 ${channel.color}`} />
                  {/* Pulse behind icon */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className={`absolute inset-0 rounded-3xl ${channel.bg} -z-10`}
                  />
                </motion.div>
                <span className="text-sm font-bold text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">{channel.label}</span>
                
                {/* Flow Line - Optimized with scaleY */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gray-100 overflow-hidden">
                    <motion.div 
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                        className="w-full h-full bg-gradient-to-b from-transparent via-[#2A4D9A] to-transparent opacity-50 will-change-transform"
                    />
                </div>
                
                {/* Particle Dot */}
                <motion.div 
                    animate={{ y: [0, 80], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2A4D9A] shadow-lg shadow-[#2A4D9A]/50 z-0 will-change-transform"
                />
              </div>
            ))}
          </div>

          {/* Central AI Processor */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-20 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white/50 p-10 mb-16 mx-auto max-w-3xl will-change-transform"
          >
            {/* Glowing Border */}
            <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-[2.5rem] border-2 border-[#2A4D9A]/10 pointer-events-none"
            />

            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#2A4D9A] rounded-2xl flex items-center justify-center shadow-xl shadow-[#2A4D9A]/30 ring-8 ring-white transform rotate-3">
                <Bot className="w-8 h-8 text-white" />
            </div>
            
            <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">
                    <span className="font-semibold uppercase tracking-wider text-xs">Processing Stream</span>
                    <span className="text-green-600 font-bold flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full text-xs">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        SYSTEM ACTIVE
                    </span>
                </div>
                
                {/* Mock Processing Items - Animated Cycle */}
                {[1, 2, 3].map((i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0.5, x: 0 }}
                        animate={{ 
                            opacity: [0.5, 1, 0.5],
                            scale: [0.98, 1, 0.98],
                            backgroundColor: ["rgba(249, 250, 251, 0.8)", "rgba(239, 246, 255, 0.8)", "rgba(249, 250, 251, 0.8)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                        className="flex items-center gap-5 p-4 rounded-2xl border border-gray-100 transition-colors will-change-transform"
                    >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 text-sm font-bold text-gray-400 shadow-sm">
                            0{i}
                        </div>
                        <div className="flex-1 space-y-2">
                            {/* Optimized Bar Animation using scaleX */}
                            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden origin-left">
                                <motion.div 
                                    animate={{ scaleX: [0.6, 0.8, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                    className="h-full w-full bg-gray-300 origin-left will-change-transform"
                                />
                            </div>
                            <div className="h-2.5 bg-gray-100 rounded-full w-1/2" />
                        </div>
                        <div className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#2A4D9A]/10 text-[#2A4D9A]">
                            Analyzing...
                        </div>
                    </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Output: Unified Inbox Preview */}
          <div className="text-center relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-16 w-0.5 bg-gradient-to-b from-[#2A4D9A] to-gray-200 -z-10 overflow-hidden">
                 <motion.div 
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-gradient-to-b from-transparent via-[#2A4D9A] to-transparent opacity-50 will-change-transform"
                />
            </div>
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 inline-flex items-center gap-4 px-8 py-4 cursor-default will-change-transform"
            >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                    <div className="font-bold text-gray-900">Unified Profile Created</div>
                    <div className="text-xs text-gray-500">Data synced to CRM</div>
                </div>
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    <CheckCircle2 className="w-6 h-6 text-green-500 ml-2" />
                </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OmnichannelFlow;
