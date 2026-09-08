import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { 
  Activity, 
  Brain, 
  Dumbbell, 
  Moon, 
  Utensils, 
  Flame, 
  Sparkles, 
  Download, 
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';


export const AnalyticsPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [dashRes, repRes] = await Promise.all([
          api.get('/analytics/dashboard'),
          api.get('/analytics/weekly-report')
        ]);
        if (dashRes.data?.data) setDashboardData(dashRes.data.data);
        if (repRes.data?.data) setWeeklyReport(repRes.data.data);
      } catch (err) {
        console.error('Analytics load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const trends = dashboardData?.weeklyTrends || [];
  const currentScore = dashboardData?.currentScore;

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-800">
                Fitverse Intelligence Engine
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-teal-400" />
              Holistic Analytics & Fitverse Score
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Composite Mind+Body algorithm, cross-domain correlations, trend graphs, and weekly AI narrative summaries.
            </p>
          </div>

          <button
            onClick={() => setReportModalOpen(true)}
            className="px-4 py-2.5 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-rose-500 hover:from-teal-400 hover:to-rose-400 text-slate-950 text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer transition"
          >
            <Sparkles className="w-4 h-4" />
            Generate Weekly AI Report
          </button>
        </div>

        {/* Fitverse Score Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          {/* Main Fitverse Score Dial Card */}
          <div className="glass-card p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl -z-10" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Holistic Equilibrium</span>
                <span className="text-xs font-black text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded border border-teal-800">
                  {currentScore?.statusCategory || 'Optimal'}
                </span>
              </div>
              
              <div className="my-4 text-center">
                <p className="text-6xl font-black tracking-tight text-white">
                  {currentScore?.totalScore || 82}
                  <span className="text-xl text-slate-500 font-bold"> / 100</span>
                </p>
                <p className="text-xs font-semibold text-teal-300 mt-1">
                  Fitverse Signature Composite Index
                </p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed text-center px-2">
                {currentScore?.summaryText}
              </p>
            </div>

            {/* Pillar Component Weights */}
            <div className="space-y-2 mt-6 pt-4 border-t border-slate-900 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5"><Brain className="w-3.5 h-3.5 text-teal-400" /> Mental (20%)</span>
                <span className="font-bold text-white">{currentScore?.mentalSubscore || 80}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5"><Dumbbell className="w-3.5 h-3.5 text-rose-400" /> Physical (25%)</span>
                <span className="font-bold text-white">{currentScore?.physicalSubscore || 85}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5"><Moon className="w-3.5 h-3.5 text-indigo-400" /> Sleep (20%)</span>
                <span className="font-bold text-white">{currentScore?.sleepSubscore || 82}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5 text-amber-400" /> Nutrition (20%)</span>
                <span className="font-bold text-white">{currentScore?.nutritionSubscore || 78}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-emerald-400" /> Consistency (15%)</span>
                <span className="font-bold text-white">{currentScore?.consistencySubscore || 88}/100</span>
              </div>
            </div>
          </div>

          {/* Key Mind-Body Cross Insights */}
          <div className="lg:col-span-2 glass-card p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400" /> Algorithmic Mind-Body Cross Insights
                </h3>
                <span className="text-xs text-slate-500">Live correlations</span>
              </div>

              <div className="space-y-3">
                {dashboardData?.insights?.map((insight, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-200">{insight.title}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        {insight.impactLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {insight.observation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-slate-900 text-center">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[10px] text-slate-500">Active Streak</p>
                <p className="text-base font-black text-amber-400">{dashboardData?.currentStreakDays || 7} Days</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[10px] text-slate-500">Workouts</p>
                <p className="text-base font-black text-rose-400">{dashboardData?.workoutsCompletedThisWeek || 4} Sessions</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[10px] text-slate-500">Meditation</p>
                <p className="text-base font-black text-teal-400">{dashboardData?.meditationMinutesThisWeek || 25} Mins</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[10px] text-slate-500">Avg Sleep</p>
                <p className="text-base font-black text-indigo-400">{dashboardData?.avgSleepHoursThisWeek || 7.8}h</p>
              </div>
            </div>
          </div>

        </div>

        {/* Trend Charts Section with Recharts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
          {/* Chart 1: 7-Day Fitverse Score & Sleep */}
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="text-base font-bold text-white mb-1">7-Day Fitverse Score Trend</h3>
            <p className="text-xs text-slate-400 mb-4">Daily composite wellness trajectory</p>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="dayLabel" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="fitverseScore" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Mood vs Stress Correlation */}
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="text-base font-bold text-white mb-1">Mood Positivity vs Perceived Stress</h3>
            <p className="text-xs text-slate-400 mb-4">Emotional equilibrium balance</p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="dayLabel" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[0, 10]} stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="moodScore" name="Mood (1-10)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="stressScore" name="Stress (1-10)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Weekly Report Modal */}
        {reportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="glass-card max-w-2xl w-full p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  <h3 className="text-lg font-bold text-white">Weekly AI Wellness Summary</h3>
                </div>
                <button
                  onClick={() => setReportModalOpen(false)}
                  className="text-xs text-slate-400 hover:text-white p-1"
                >
                  ✕ Close
                </button>
              </div>

              {weeklyReport ? (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-200 leading-relaxed">
                    {weeklyReport.aiSummaryNarrative}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-slate-500 text-[10px]">Avg Score</p>
                      <p className="font-black text-teal-400 text-sm">{weeklyReport.avgFitverseScore}/100</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-slate-500 text-[10px]">Workouts</p>
                      <p className="font-black text-rose-400 text-sm">{weeklyReport.totalWorkouts} sessions</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-slate-500 text-[10px]">Avg Calories</p>
                      <p className="font-black text-amber-400 text-sm">{weeklyReport.avgDailyCalories} kcal</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-slate-500 text-[10px]">Avg Sleep</p>
                      <p className="font-black text-indigo-400 text-sm">{weeklyReport.avgSleepHours} hrs</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-1.5 flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Key Strengths This Week:
                    </h4>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {weeklyReport.topStrengths?.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-1.5 flex items-center gap-1 text-amber-400">
                      <Award className="w-3.5 h-3.5" /> Growth & Refinement Focus:
                    </h4>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {weeklyReport.areasToImprove?.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-center py-6 text-slate-500">Generating weekly narrative analysis...</p>
              )}
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};
