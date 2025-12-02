"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Clock, Star, MoreHorizontal, Mail, Phone as PhoneIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FeatureCRM = () => {
  const t = useTranslations("Landing.Features.CRM");

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              {t("badge")}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("description")}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("feature1Title")}</h4>
                <p className="text-sm text-gray-500">{t("feature1Desc")}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("feature2Title")}</h4>
                <p className="text-sm text-gray-500">{t("feature2Desc")}</p>
              </div>
            </div>
          </motion.div>

          {/* Visual Content - CRM Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 max-w-md mx-auto relative">
                
                {/* Profile Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                       {/* Placeholder Avatar */}
                       <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t("Mock.name")}</h3>
                      <p className="text-sm text-gray-500">{t("Mock.company")}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    sarah@techflow.com
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4 text-gray-400" />
                    +1 (555) 123-4567
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">{t("Mock.vip")}</span>
                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">{t("Mock.activeDeal")}</span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">{t("Mock.enterprise")}</span>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{t("Mock.recentActivity")}</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{t("Mock.demoCall")}</p>
                        <p className="text-xs text-gray-500">{t("Mock.tomorrow2pm")}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{t("Mock.invoiceSent")}</p>
                        <p className="text-xs text-gray-500">{t("Mock.twoHoursAgo")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm mx-auto transform translate-x-8 -translate-y-12">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-900">{t("Mock.bookingTitle")}</h4>
                          <p className="text-xs text-gray-500">{t("Mock.bookingDate")}</p>
                      </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                      {["09:00", "10:30", "14:00"].map((time, i) => (
                          <div key={i} className={`text-center py-2 rounded-lg text-sm font-medium cursor-pointer ${i === 1 ? 'bg-purple-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                              {time}
                          </div>
                      ))}
                  </div>
                  <button className="w-full py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                      {t("Mock.confirmBooking")}
                  </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeatureCRM;
