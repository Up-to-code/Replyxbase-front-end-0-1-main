/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  MessageSquare,
  Users,
  Bot,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  FileText,
  Phone,
  Globe,
  Send,
  Instagram,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

// ============================================
// ICON MAPPING
// ============================================
const IconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Clock,
  Phone,
  Globe,
  Send,
  Instagram,
  Users,
  FileText,
  Calendar,
  Zap,
};

// ============================================
// MOCK DATA - SAAS SPECIFIC
// ============================================
// Mock data removed - passed via props

// ============================================
// COMPONENTS
// ============================================

const StatCard = ({ stat }: { stat: any }) => {
  const t = useTranslations("Dashboard.Home");
  const Icon = IconMap[stat.icon] || MessageSquare;
  const colors: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    purple: 'text-purple-600 bg-purple-50',
    orange: 'text-orange-600 bg-orange-50',
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colors[stat.color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {stat.change}
        </div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{t(`stats.${stat.id}`)}</h3>
      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
    </div>
  );
};

const PlatformItem = ({ platform }: { platform: any }) => {
  const Icon = IconMap[platform.icon] || Globe;
  return (
    <Link href="/dashboard/inbox" className="block">
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.bg}`}>
            <Icon className="w-5 h-5" style={{ color: platform.color }} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{platform.name}</p>
            <p className="text-sm text-gray-500">{platform.messages.toLocaleString()} msgs</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-sm font-medium">+{platform.growth}%</span>
          <MoreHorizontal className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
};

const AgentRow = ({ agent }: { agent: any }) => {
  const router = useRouter();
  return (
    <tr 
      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer" 
      onClick={() => router.push(`/dashboard/agents/${agent.id}`)}
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">{agent.name}</p>
            <p className="text-xs text-gray-500">{agent.role}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
          ${agent.status === 'active' ? 'bg-green-100 text-green-800' : 
            agent.status === 'training' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-gray-100 text-gray-800'}`}>
          {agent.status}
        </span>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">{agent.conversations}</td>
      <td className="py-4 px-4 text-sm text-gray-600">{agent.conversion}</td>
    </tr>
  );
};

const ActivityItem = ({ item }: { item: any }) => {
  const Icon = IconMap[item.icon] || Zap;
  return (
    <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.bg}`}>
        <Icon className={`w-4 h-4 ${item.color}`} />
      </div>
      <div>
        <p className="text-sm text-gray-900 font-medium">{item.text}</p>
        <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
      </div>
    </div>
  );
};

const BookingItem = ({ booking }: { booking: any }) => (
  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors bg-gray-50/30">
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center justify-center w-10 h-10 bg-white rounded-lg border border-gray-100">
        <span className="text-xs font-bold text-gray-900">{booking.time}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{booking.customer}</p>
        <p className="text-xs text-gray-500">{booking.type}</p>
      </div>
    </div>
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
    }`}>
      {booking.status}
    </span>
  </div>
);

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function DashboardClient({ 
  stats, 
  platforms, 
  agents, 
  bookings, 
  activity, 
  chartData 
}: {
  stats: any[];
  platforms: any[];
  agents: any[];
  bookings: any[];
  activity: any[];
  chartData: any;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'year'>('7d');
  const t = useTranslations("Dashboard.Home");

  useEffect(() => {
    // Simulate a quick data fetch for smooth entry
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReport = () => {
    toast.success("Downloading report...");
  };

  return (
    <div className="min-h-screen bg-white p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
            <p className="text-gray-500 mt-1">{t("subtitle")}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleDownloadReport}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {t("downloadReport")}
            </button>
            <Link 
              href="/dashboard/agents/create"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              {t("createAgent")}
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Charts & Agents) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Analytics Chart */}
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">{t("charts.title")}</h2>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="bg-gray-50 border-none text-sm text-gray-600 rounded-lg px-3 py-1 focus:ring-0 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <option value="7d">{t("charts.last7Days")}</option>
                  <option value="30d">{t("charts.last30Days")}</option>
                  <option value="year">{t("charts.thisYear")}</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                {!isLoaded ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl animate-pulse">
                    <div className="text-gray-400 text-sm">{t("charts.loading")}</div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData[timeRange]}>
                      <defs>
                        <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="messages" 
                        stroke="#000000" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorMessages)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Active Agents Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">{t("agents.title")}</h2>
                <Link href="/dashboard/agents" className="text-sm text-blue-600 font-medium hover:text-blue-700">
                  {t("agents.viewAll")}
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider rtl:text-right">{t("agents.agent")}</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider rtl:text-right">{t("agents.status")}</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider rtl:text-right">{t("agents.conversations")}</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider rtl:text-right">{t("agents.conversion")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent, idx) => (
                      <AgentRow key={idx} agent={agent} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column (Platforms & Activity) */}
          <div className="space-y-6">

             {/* Bookings Card (NEW) */}
             <div className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">{t("bookings.title")}</h2>
                <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{t("bookings.upcoming", {count: 3})}</span>
              </div>
              <div className="space-y-2">
                {bookings.map((booking, idx) => (
                  <BookingItem key={idx} booking={booking} />
                ))}
              </div>
              <Link href="/dashboard/crm" className="block w-full mt-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors text-center">
                {t("bookings.viewCalendar")}
              </Link>
            </div>
            
            {/* Connected Channels */}
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t("channels.title")}</h2>
              <div className="space-y-1">
                {platforms.map((platform, idx) => (
                  <PlatformItem key={idx} platform={platform} />
                ))}
              </div>
              <Link href="/dashboard/settings" className="w-full mt-4 py-2 border border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                {t("channels.connectNew")}
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t("activity.title")}</h2>
              <div className="space-y-2">
                {activity.map((item, idx) => (
                  <ActivityItem key={idx} item={item} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
