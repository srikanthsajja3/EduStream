import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { Users, UserCheck, CreditCard, BookOpen, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 1250,
    teachers: 48,
    attendance: 94.2,
    fees: 4200000
  });

  const feeData = [
    { name: 'Jan', amount: 400000 },
    { name: 'Feb', amount: 300000 },
    { name: 'Mar', amount: 500000 },
    { name: 'Apr', amount: 800000 },
    { name: 'May', amount: 600000 },
    { name: 'Jun', amount: 700000 },
  ];

  const attendanceData = [
    { name: 'LKG', value: 92 },
    { name: 'UKG', value: 95 },
    { name: 'I', value: 94 },
    { name: 'II', value: 91 },
    { name: 'III', value: 96 },
    { name: 'IV', value: 93 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Overview</h1>
          <p className="text-slate-500 text-sm">Real-time metrics for St. George High School</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Live System Status</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: stats.students, icon: Users, color: 'blue', change: '+12%', up: true },
          { label: 'Avg Attendance', value: `${stats.attendance}%`, icon: UserCheck, color: 'green', change: '+2.4%', up: true },
          { label: 'Fees Collected', value: `₹${(stats.fees / 1000000).toFixed(1)}M`, icon: CreditCard, color: 'purple', change: '+8.1%', up: true },
          { label: 'Courses Active', value: stats.teachers, icon: BookOpen, color: 'orange', change: '0%', up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:border-primary/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:bg-primary group-hover:text-white transition-all`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {stat.change}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Fee Collection Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={feeData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  cursor={{stroke: '#3b82f6', strokeWidth: 2}}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Attendance by Grade</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
