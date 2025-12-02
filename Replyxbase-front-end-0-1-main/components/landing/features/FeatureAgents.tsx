"use client";
import React from "react";
import { motion } from "framer-motion";
import { Bot, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FeatureAgents = () => {
  const t = useTranslations("Landing.Features.Agents");

  const agents = [
    {
      nameKey: "salesBot",
      roleKey: "leadGen",
      statusKey: "active",
      conversations: "1,240",
      conversion: "18%",
      color: "bg-blue-100 text-blue-600"
    },
    {
      nameKey: "supportHelper",
      roleKey: "customerService",
      statusKey: "active",
      conversations: "2,100",
      conversion: "N/A",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Content - Agent Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="relative z-10 space-y-6">
              {agents.map((agent, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:border-blue-200 transition-all hover:translate-x-2 duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${agent.color}`}>
                        <Bot className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{t(`Mock.${agent.nameKey}`)}</h3>
                        <p className="text-sm text-gray-500">{t(`Mock.${agent.roleKey}`)}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">
                      {t(`Mock.${agent.statusKey}`)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">{t("Mock.conversations")}</p>
                      <p className="text-lg font-bold text-gray-900">{agent.conversations}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">{t("Mock.conversion")}</p>
                      <p className="text-lg font-bold text-gray-900">{agent.conversion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full blur-3xl -z-10 opacity-50" />
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              {t("badge")}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("description")}
            </p>
            
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{t(`feature${item}Title`)}</h4>
                    <p className="text-gray-500 text-sm">{t(`feature${item}Desc`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-10 group flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              {t("cta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeatureAgents;
