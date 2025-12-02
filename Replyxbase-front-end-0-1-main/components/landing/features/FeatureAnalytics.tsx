"use client";
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const data = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
];

const FeatureAnalytics = () => {
  const t = useTranslations("Landing.Features.Analytics");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { 
      labelKey: "responseTime", 
      value: "1m 42s", 
      change: "-12%", 
      trend: "up",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      labelKey: "csatScore", 
      value: "4.9/5.0", 
      change: "+0.2", 
      trend: "up",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    { 
      labelKey: "resolutionRate", 
      value: "94%", 
      change: "+5%", 
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Content - Analytics Dashboard */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{t("Mock.performanceOverview")}</h3>
                  <p className="text-sm text-gray-500">{t("Mock.last7Days")}</p>
                </div>
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-yellow-400" />
                   <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 w-full mb-8" style={{ minHeight: '250px' }}>
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                      <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${stat.bg}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-1">{t(`Mock.${stat.labelKey}`)}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs font-medium text-green-600">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              {t("badge")}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("description")}
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t("feature1Title")}</h4>
                <p className="text-gray-600">{t("feature1Desc")}</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t("feature2Title")}</h4>
                <p className="text-gray-600">{t("feature2Desc")}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeatureAnalytics;
