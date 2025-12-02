"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Send, Globe, Check, CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FeatureInbox = () => {
  const t = useTranslations("Landing.Features.Inbox");

  const messages = [
    {
      id: 1,
      platform: "whatsapp",
      icon: Phone,
      color: "text-green-500",
      bg: "bg-green-50",
      sender: t("messages.msg1.sender"),
      text: t("messages.msg1.text"),
      time: "10:42 AM",
      unread: true
    },
    {
      id: 2,
      platform: "telegram",
      icon: Send,
      color: "text-blue-500",
      bg: "bg-blue-50",
      sender: t("messages.msg2.sender"),
      text: t("messages.msg2.text"),
      time: "10:30 AM",
      unread: false
    },
    {
      id: 3,
      platform: "website",
      icon: Globe,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      sender: t("messages.msg3.sender"),
      text: t("messages.msg3.text"),
      time: "09:15 AM",
      unread: false
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              {t("badge")}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("description")}
            </p>
            
            <ul className="space-y-4">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{t(`benefit${item}`)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visual Content - Mock Interface */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden max-w-md mx-auto lg:ml-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Mock Header */}
              <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-xs font-medium text-gray-400">{t("Mock.headerTitle")}</div>
              </div>

              {/* Message List */}
              <div className="divide-y divide-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.bg}`}>
                        <msg.icon className={`w-5 h-5 ${msg.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-sm font-semibold ${msg.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                            {msg.sender}
                          </h4>
                          <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                        <p className={`text-sm truncate ${msg.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {msg.text}
                        </p>
                      </div>
                      {msg.unread && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                      )}
                    </div>
                  </div>
                ))}
                
                {/* AI Form (WhatsApp-like) */}
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <Phone className="w-3 h-3 text-white" />
                        </div>
                        <input 
                            type="text" 
                            placeholder={t("Mock.aiFormPlaceholder")} 
                            className="flex-1 bg-transparent border-none text-sm focus:ring-0 outline-none"
                            disabled
                        />
                        <Send className="w-4 h-4 text-blue-500" />
                    </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce-slow">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{t("Mock.statusTitle")}</p>
                <p className="text-sm font-bold text-gray-900">{t("Mock.statusOnline")}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 ltr:right-0 rtl:left-0 -translate-y-1/2 ltr:translate-x-1/2 rtl:-translate-x-1/2 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 ltr:left-0 rtl:right-0 translate-y-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
};

export default FeatureInbox;
