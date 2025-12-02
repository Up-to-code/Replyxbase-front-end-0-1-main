import React from 'react';
import { useTranslations } from 'next-intl';
import { MessageSquare, Users, Clock, ThumbsUp, TrendingUp, TrendingDown, MoreHorizontal, Phone, Mail, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OverviewTab = () => {
  const t = useTranslations("Dashboard.Agents.Detail");

  const stats = [
    { 
      label: "Total Conversations", 
      value: "1,234", 
      change: "+12.5%", 
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      label: "Avg Response Time", 
      value: "1m 30s", 
      change: "-5.2%", 
      trend: "down", // down is good for response time
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    { 
      label: "Satisfaction Rate", 
      value: "98%", 
      change: "+2.1%", 
      trend: "up",
      icon: ThumbsUp,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    { 
      label: "Active Users", 
      value: "856", 
      change: "+8.4%", 
      trend: "up",
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
  ];

  const activityData = [
    { name: 'Mon', value: 40 },
    { name: 'Tue', value: 30 },
    { name: 'Wed', value: 60 },
    { name: 'Thu', value: 45 },
    { name: 'Fri', value: 70 },
    { name: 'Sat', value: 20 },
    { name: 'Sun', value: 35 },
  ];

  const recentActivity = [
    { id: 1, type: 'message', content: 'Replied to customer query', time: '2 min ago', icon: MessageSquare, color: 'bg-blue-100 text-blue-600' },
    { id: 2, type: 'booking', content: 'Booked a demo call', time: '15 min ago', icon: Calendar, color: 'bg-purple-100 text-purple-600' },
    { id: 3, type: 'status', content: 'Agent status changed to Active', time: '1 hour ago', icon:  Clock, color: 'bg-green-100 text-green-600' },
    { id: 4, type: 'call', content: 'Handled incoming call', time: '2 hours ago', icon: Phone, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900">Conversation Volume</h3>
              <p className="text-sm text-gray-500">Weekly activity overview</p>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div key={activity.id} className="relative pl-6 pb-6 last:pb-0 border-l border-gray-100 last:border-0">
                <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${activity.color}`}>
                  <activity.icon className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
