import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  Activity, 
  Brain, 
  Dumbbell, 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  Mic, 
  Smile, 
  Utensils, 
  Moon, 
  Sparkles,
  ChevronDown,
  Rotate3d
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TalkToFitverseModal } from '../components/voice/TalkToFitverseModal';
import { LogMoodModal } from '../components/modals/LogMoodModal';
import { LogWorkoutModal } from '../components/modals/LogWorkoutModal';
import { LogFoodModal } from '../components/modals/LogFoodModal';
import { LogSleepModal } from '../components/modals/LogSleepModal';
import { Human3DMuscleVisualizer } from '../components/anatomy/Human3DMuscleVisualizer';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  
  // Data States
  const [fitverseScore, setFitverseScore] = useState(82);
  const [mentalScore, setMentalScore] = useState(78);
  const [physicalScore, setPhysicalScore] = useState(86);
  const [streakDays, setStreakDays] = useState(14);
  const [activePlanTab, setActivePlanTab] = useState('All');

  // Modals state
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [moodModalOpen, setMoodModalOpen] = useState(false);
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [sleepModalOpen, setSleepModalOpen] = useState(false);

  // Today's Plan Items
  const [planItems, setPlanItems] = useState([
    { id: 1, time: '7:00 AM', title: 'Morning Meditation', duration: '10 min', type: 'Mental', color: 'emerald', completed: true },
    { id: 2, time: '9:00 AM', title: 'Upper Body Workout', duration: '45 min', type: 'Workout', color: 'purple', completed: false },
    { id: 3, time: '1:00 PM', title: 'Lunch', duration: 'High Protein', type: 'Nutrition', color: 'amber', completed: false },
    { id: 4, time: '9:30 PM', title: 'Gratitude Journal', duration: '5 min', type: 'Mental', color: 'blue', completed: false },
  ]);

  const loadDashboardData = async () => {
    try {
      const [scoreRes, mentalRes, physRes] = await Promise.all([
        api.get('/analytics/fitverse-score').catch(() => null),
        api.get('/mental/assessment/latest').catch(() => null),
        api.get('/physical/assessment/latest').catch(() => null),
      ]);

      if (scoreRes?.data?.data?.totalScore) {
        setFitverseScore(scoreRes.data.data.totalScore);
      }
      if (mentalRes?.data?.data?.compositeScore) {
        setMentalScore(mentalRes.data.data.compositeScore);
      }
      if (physRes?.data?.data) {
        setPhysicalScore(86);
      }
    } catch (err) {
      console.warn('Dashboard data sync:', err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const toggleItemComplete = (id) => {
    setPlanItems(planItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const filteredPlanItems = planItems.filter(item => 
    activePlanTab === 'All' || item.type === activePlanTab
  );

  return (
    <AppLayout>
      <div className="space-y-6 pb-12">
        
        {/* 1. GREETING BANNER */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Good Morning, {user?.firstName || 'Ananya'} 🌟
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Let's continue your journey to a better you!
          </p>
        </div>

        {/* 2. TOP METRIC CARDS ROW (4 CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Fitverse Score (Purple Dial) */}
          <div className={`p-5 rounded-3xl flex items-center gap-4 border transition-all ${
            isDark 
              ? 'bg-gradient-to-br from-[#16153a] to-[#12142e] border-[#2b275c]' 
              : 'bg-gradient-to-br from-purple-50/80 to-white border-purple-200 shadow-sm'
          }`}>
            {/* Donut progress */}
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 -rotate-90">
                <circle cx="32" cy="32" r="26" stroke={isDark ? "#252452" : "#e2e8f0"} strokeWidth="6" fill="transparent" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#8b5cf6"
                  strokeWidth="6"
                  strokeDasharray="163.36"
                  strokeDashoffset={163.36 * (1 - fitverseScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute font-black text-sm text-[var(--text-primary)]">{fitverseScore}</span>
            </div>
            <div>
              <p className="text-xs text-purple-500 font-bold">Fitverse Score</p>
              <p className="text-xl font-black text-[var(--text-primary)] my-0.5">{fitverseScore} <span className="text-xs text-slate-400 font-normal">/100</span></p>
              <p className="text-[11px] text-[var(--text-secondary)]">Great progress!</p>
            </div>
          </div>

          {/* Card 2: Mental Wellness (Blue Brain) */}
          <div className={`p-5 rounded-3xl flex items-center gap-4 border transition-all ${
            isDark 
              ? 'bg-gradient-to-br from-[#101b3a] to-[#12142e] border-[#1e2f5c]' 
              : 'bg-gradient-to-br from-blue-50/80 to-white border-blue-200 shadow-sm'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-500">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs text-blue-500 font-bold">Mental Wellness</p>
              <p className="text-xl font-black text-[var(--text-primary)] my-0.5">{mentalScore} <span className="text-xs text-slate-400 font-normal">/100</span></p>
              <p className="text-[11px] text-blue-500 font-semibold">Keep it up!</p>
            </div>
          </div>

          {/* Card 3: Physical Fitness (Green Dumbbell) */}
          <div className={`p-5 rounded-3xl flex items-center gap-4 border transition-all ${
            isDark 
              ? 'bg-gradient-to-br from-[#102a28] to-[#12142e] border-[#1a443b]' 
              : 'bg-gradient-to-br from-emerald-50/80 to-white border-emerald-200 shadow-sm'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-500">
              <Dumbbell className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs text-emerald-500 font-bold">Physical Fitness</p>
              <p className="text-xl font-black text-[var(--text-primary)] my-0.5">{physicalScore} <span className="text-xs text-slate-400 font-normal">/100</span></p>
              <p className="text-[11px] text-emerald-500 font-semibold">Excellent!</p>
            </div>
          </div>

          {/* Card 4: Streak (Orange Fire) */}
          <div className={`p-5 rounded-3xl flex items-center gap-4 border transition-all ${
            isDark 
              ? 'bg-gradient-to-br from-[#2b1b17] to-[#12142e] border-[#4d2d1e]' 
              : 'bg-gradient-to-br from-orange-50/80 to-white border-orange-200 shadow-sm'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0 text-orange-500">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs text-orange-500 font-bold">Streak</p>
              <p className="text-xl font-black text-[var(--text-primary)] my-0.5">{streakDays} <span className="text-xs text-slate-400 font-normal">days</span></p>
              <p className="text-[11px] text-orange-500 font-semibold">You're on fire!</p>
            </div>
          </div>

        </div>

        {/* 3. MAIN DASHBOARD CONTENT GRID (3 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* COLUMN 1: TODAY'S PLAN (4 COLS) */}
          <div className="lg:col-span-4 fit-card p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">Today's Plan</h3>

              {/* Filter Pills */}
              <div className="flex gap-1.5 mb-4">
                {['All', 'Mental', 'Workout', 'Nutrition'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePlanTab(tab)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                      activePlanTab === tab
                        ? 'bg-[#4f46e5] text-white font-bold'
                        : isDark
                        ? 'bg-[#181a3d] text-slate-400 hover:text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Timeline Items */}
              <div className="space-y-3">
                {filteredPlanItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItemComplete(item.id)}
                    className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] hover:border-indigo-400/50 flex items-center justify-between transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                        item.color === 'emerald' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' :
                        item.color === 'purple' ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30' :
                        item.color === 'amber' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                      }`}>
                        {item.time}
                      </span>

                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${
                        item.color === 'emerald' ? 'bg-emerald-600' :
                        item.color === 'purple' ? 'bg-purple-600' :
                        item.color === 'amber' ? 'bg-amber-600' :
                        'bg-blue-600'
                      }`}>
                        {item.color === 'emerald' ? <Brain className="w-4 h-4" /> :
                         item.color === 'purple' ? <Dumbbell className="w-4 h-4" /> :
                         item.color === 'amber' ? <Utensils className="w-4 h-4" /> :
                         <Smile className="w-4 h-4" />}
                      </div>

                      <div>
                        <p className={`text-xs font-bold ${item.completed ? 'line-through text-slate-400' : 'text-[var(--text-primary)]'}`}>
                          {item.title}
                        </p>
                        <p className="text-[10px] text-[var(--text-secondary)]">{item.duration}</p>
                      </div>
                    </div>

                    {item.completed && (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: WEEKLY PROGRESS & MIND & BODY INSIGHTS (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Weekly Progress Card */}
            <div className="fit-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[var(--text-primary)]">Weekly Progress</h3>
                <button className="text-xs text-[var(--text-secondary)] flex items-center gap-1 bg-[var(--bg-card-nested)] px-2.5 py-1 rounded-xl border border-[var(--border-main)]">
                  This Week <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-[var(--text-secondary)]">Workouts</span>
                    <span className="text-purple-500 font-bold">4/5 <span className="text-slate-400 font-normal">80%</span></span>
                  </div>
                  <div className="w-full bg-[var(--bg-card-nested)] rounded-full h-2 overflow-hidden border border-[var(--border-main)]">
                    <div className="bg-purple-500 h-full rounded-full w-[80%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-[var(--text-secondary)]">Nutrition</span>
                    <span className="text-emerald-500 font-bold">6/7 <span className="text-slate-400 font-normal">85%</span></span>
                  </div>
                  <div className="w-full bg-[var(--bg-card-nested)] rounded-full h-2 overflow-hidden border border-[var(--border-main)]">
                    <div className="bg-emerald-500 h-full rounded-full w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-[var(--text-secondary)]">Meditation</span>
                    <span className="text-blue-500 font-bold">4/7 <span className="text-slate-400 font-normal">60%</span></span>
                  </div>
                  <div className="w-full bg-[var(--bg-card-nested)] rounded-full h-2 overflow-hidden border border-[var(--border-main)]">
                    <div className="bg-blue-500 h-full rounded-full w-[60%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-[var(--text-secondary)]">Sleep</span>
                    <span className="text-orange-500 font-bold">6.5 hr <span className="text-slate-400 font-normal">70%</span></span>
                  </div>
                  <div className="w-full bg-[var(--bg-card-nested)] rounded-full h-2 overflow-hidden border border-[var(--border-main)]">
                    <div className="bg-orange-500 h-full rounded-full w-[70%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mind & Body Insights Card */}
            <div className={`fit-card p-5 rounded-3xl flex items-center justify-between gap-3 ${
              isDark 
                ? 'bg-gradient-to-r from-[#12142e] to-[#1a163a]' 
                : 'bg-gradient-to-r from-purple-50/70 to-indigo-50/70'
            }`}>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-[var(--text-primary)] text-sm">Mind & Body Insights</h4>
                <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                  Your sleep quality was better on days you worked out.
                </p>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  You felt less stressed on days you meditated.
                </p>
                <p className="text-purple-600 dark:text-purple-300 text-[11px] font-semibold pt-1">
                  Keep balancing both mind and body!
                </p>
              </div>

              <div className="w-20 h-20 shrink-0 flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-600 dark:text-purple-300 text-xl">
                  🧘‍♀️
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 3: RIGHT PANEL (TALK TO FITVERSE + INSIGHTS + QUICK ACTIONS) (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Talk to Fitverse Card */}
            <div className={`fit-card p-6 rounded-3xl border ${
              isDark 
                ? 'bg-gradient-to-b from-[#18153b] to-[#12142e] border-purple-500/30' 
                : 'bg-gradient-to-b from-purple-50 to-white border-purple-200'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-[var(--text-primary)]">Talk to Fitverse</h3>
                <span className="text-[10px] text-purple-500 uppercase font-bold tracking-wider">AI Voice</span>
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-300 mb-4">Your AI Voice Coach</p>

              <div className="flex items-center justify-center gap-1.5 h-12 my-2">
                {[6, 12, 18, 30, 42, 28, 16, 32, 44, 22, 14, 8].map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1.5 rounded-full bg-gradient-to-t from-purple-600 via-pink-400 to-indigo-400"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>

              <button
                onClick={() => setVoiceModalOpen(true)}
                className="w-full mt-4 py-3 rounded-2xl font-bold bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Mic className="w-4 h-4" /> Tap to Start Speaking
              </button>
            </div>

            {/* Recent Insights Card */}
            <div className="fit-card p-6 rounded-3xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">Recent Insights</h3>

              <div
                onClick={() => setVoiceModalOpen(true)}
                className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] hover:border-emerald-500/40 flex items-center justify-between transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--text-primary)]">Stress levels are higher this week</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">Consider a breathing session</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => setWorkoutModalOpen(true)}
                className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] hover:border-purple-500/40 flex items-center justify-between transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--text-primary)]">Workout consistency improved</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">Great job! Keep going</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => setFoodModalOpen(true)}
                className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] hover:border-orange-500/40 flex items-center justify-between transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--text-primary)]">Protein intake is below goal</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">Try adding more protein-rich foods</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Quick Actions (4 round buttons) */}
            <div className="fit-card p-5 rounded-3xl">
              <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3">Quick Actions</h4>
              
              <div className="grid grid-cols-4 gap-2 text-center">
                <button
                  onClick={() => setMoodModalOpen(true)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition border border-emerald-500/30">
                    <Smile className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-[var(--text-primary)] font-medium">Log Mood</span>
                </button>

                <button
                  onClick={() => setWorkoutModalOpen(true)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center group-hover:scale-110 transition border border-purple-500/30">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-[var(--text-primary)] font-medium">Log Workout</span>
                </button>

                <button
                  onClick={() => setFoodModalOpen(true)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center group-hover:scale-110 transition border border-orange-500/30">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-[var(--text-primary)] font-medium">Log Food</span>
                </button>

                <button
                  onClick={() => setSleepModalOpen(true)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center group-hover:scale-110 transition border border-blue-500/30">
                    <Moon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-[var(--text-primary)] font-medium">Log Sleep</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 4. RECOMMENDED FOR YOU */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[var(--text-primary)]">Recommended for You</h3>
            <button className="w-7 h-7 rounded-full bg-[var(--bg-card-nested)] hover:bg-[var(--border-main)] flex items-center justify-center text-slate-400 transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setVoiceModalOpen(true)}
              className="fit-card rounded-3xl overflow-hidden group cursor-pointer hover:border-teal-500/50 transition relative"
            >
              <div className="h-32 bg-gradient-to-tr from-teal-900 via-emerald-800 to-slate-900 relative flex items-center justify-center p-4">
                <span className="text-4xl">🏔️</span>
                <span className="absolute bottom-2 left-3 text-[10px] font-bold bg-slate-950/80 px-2 py-0.5 rounded text-teal-300">
                  Mindfulness
                </span>
              </div>
              <div className="p-4 bg-[var(--bg-card)]">
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] group-hover:text-teal-500 transition">5 Min Breathing</h4>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Reduce Stress</p>
              </div>
            </div>

            <div
              onClick={() => setWorkoutModalOpen(true)}
              className="fit-card rounded-3xl overflow-hidden group cursor-pointer hover:border-purple-500/50 transition relative"
            >
              <div className="h-32 bg-gradient-to-tr from-purple-950 via-indigo-900 to-slate-900 relative flex items-center justify-center p-4">
                <span className="text-4xl">🏋️</span>
                <span className="absolute bottom-2 left-3 text-[10px] font-bold bg-slate-950/80 px-2 py-0.5 rounded text-purple-300">
                  Strength
                </span>
              </div>
              <div className="p-4 bg-[var(--bg-card)]">
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] group-hover:text-purple-500 transition">Full Body HIIT</h4>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">20 min • Intermediate</p>
              </div>
            </div>

            <div
              onClick={() => setFoodModalOpen(true)}
              className="fit-card rounded-3xl overflow-hidden group cursor-pointer hover:border-amber-500/50 transition relative"
            >
              <div className="h-32 bg-gradient-to-tr from-amber-950 via-orange-900 to-slate-900 relative flex items-center justify-center p-4">
                <span className="text-4xl">🥗</span>
                <span className="absolute bottom-2 left-3 text-[10px] font-bold bg-slate-950/80 px-2 py-0.5 rounded text-amber-300">
                  Nutrition
                </span>
              </div>
              <div className="p-4 bg-[var(--bg-card)]">
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] group-hover:text-amber-500 transition">High Protein Recipes</h4>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Eat Healthy</p>
              </div>
            </div>

            <div
              onClick={() => setSleepModalOpen(true)}
              className="fit-card rounded-3xl overflow-hidden group cursor-pointer hover:border-blue-500/50 transition relative"
            >
              <div className="h-32 bg-gradient-to-tr from-blue-950 via-indigo-950 to-slate-900 relative flex items-center justify-center p-4">
                <span className="text-4xl">🌙</span>
                <span className="absolute bottom-2 left-3 text-[10px] font-bold bg-slate-950/80 px-2 py-0.5 rounded text-blue-300">
                  Recovery
                </span>
              </div>
              <div className="p-4 bg-[var(--bg-card)]">
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] group-hover:text-blue-500 transition">Sleep Better</h4>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Improve Sleep</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. 3D HUMAN MUSCLE ANATOMY SECTION */}
        <div className="pt-6 border-t border-[var(--border-main)]">
          <Human3DMuscleVisualizer
            onSelectMuscleForWorkout={(m) => {
              setWorkoutModalOpen(true);
            }}
          />
        </div>

      </div>

      {/* Voice Assistant Modal */}
      <TalkToFitverseModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />

      {/* Quick Action Modals */}
      <LogMoodModal
        isOpen={moodModalOpen}
        onClose={() => setMoodModalOpen(false)}
        onSuccess={loadDashboardData}
      />
      <LogWorkoutModal
        isOpen={workoutModalOpen}
        onClose={() => setWorkoutModalOpen(false)}
        onSuccess={loadDashboardData}
      />
      <LogFoodModal
        isOpen={foodModalOpen}
        onClose={() => setFoodModalOpen(false)}
        onSuccess={loadDashboardData}
      />
      <LogSleepModal
        isOpen={sleepModalOpen}
        onClose={() => setSleepModalOpen(false)}
        onSuccess={loadDashboardData}
      />

    </AppLayout>
  );
};
