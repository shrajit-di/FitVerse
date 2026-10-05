import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  TrendingUp, 
  Weight, 
  Activity, 
  Flame, 
  Dumbbell, 
  Footprints, 
  ChevronDown 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('Overview'); // Overview, Workout, Nutrition, Sleep, Mental Wellness

  const stats = [
    { label: 'Weight', val: '86.5 kg', sub: '↓ 2.3 kg', color: 'text-emerald-500' },
    { label: 'Body Fat', val: '18.2%', sub: '↓ 1.1%', color: 'text-emerald-500' },
    { label: 'Calories', val: '2,350', sub: 'avg / day', color: 'text-slate-400' },
    { label: 'Workouts', val: '18', sub: 'sessions', color: 'text-purple-500' },
    { label: 'Steps', val: '7,500', sub: 'avg / day', color: 'text-blue-500' },
  ];

  const weightTrendData = [
    { date: 'Sep 5', weight: 88.8 },
    { date: 'Sep 12', weight: 88.1 },
    { date: 'Sep 19', weight: 87.4 },
    { date: 'Sep 26', weight: 86.9 },
    { date: 'Oct 5', weight: 86.5 },
  ];

  const macroDonutData = [
    { name: 'Protein', value: 30, color: '#3b82f6' },
    { name: 'Carbs', value: 45, color: '#f59e0b' },
    { name: 'Fats', value: 25, color: '#10b981' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 pb-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              Your Progress
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Track your journey and stay consistent.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 bg-[var(--bg-card)] p-1 rounded-2xl border border-[var(--border-main)]">
              {['Overview', 'Workout', 'Nutrition', 'Sleep', 'Mental Wellness'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === t
                      ? 'bg-[#059669] text-white shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button className="px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-primary)] flex items-center gap-1 shadow-2xs">
              Last 30 Days <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5 Stat Cards matching Screen 9 in collage */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {stats.map((s, idx) => (
            <div key={idx} className="fit-card p-4 rounded-3xl text-center">
              <p className="text-xs text-[var(--text-secondary)]">{s.label}</p>
              <p className="text-xl font-black text-[var(--text-primary)] my-0.5">{s.val}</p>
              <p className={`text-[10px] font-bold ${s.color}`}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* 2 Main Charts matching Screen 9 in collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Weight Trend Line Chart (8 COLS) */}
          <div className="lg:col-span-8 fit-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[var(--text-primary)]">Weight Trend (kg)</h3>
              <span className="text-xs text-emerald-500 font-bold">Progress: -2.3 kg</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightTrendData}>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }} />
                  <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Macronutrient Intake Donut Chart (4 COLS) */}
          <div className="lg:col-span-4 fit-card p-6 rounded-3xl flex flex-col justify-between">
            <h3 className="text-sm font-black text-[var(--text-primary)] mb-2">Macronutrient Intake</h3>

            <div className="h-48 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={macroDonutData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                    {macroDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-[var(--border-main)] text-xs">
              <div>
                <p className="text-[10px] text-blue-500 font-bold">Protein</p>
                <p className="font-black text-[var(--text-primary)]">30%</p>
              </div>
              <div>
                <p className="text-[10px] text-amber-500 font-bold">Carbs</p>
                <p className="font-black text-[var(--text-primary)]">45%</p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-500 font-bold">Fats</p>
                <p className="font-black text-[var(--text-primary)]">25%</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};
