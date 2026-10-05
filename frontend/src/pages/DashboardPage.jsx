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
  Droplets,
  Scale,
  Ruler,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Play,
  RotateCcw
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
  const [streakDays, setStreakDays] = useState(14);

  // Modals state
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [moodModalOpen, setMoodModalOpen] = useState(false);
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [sleepModalOpen, setSleepModalOpen] = useState(false);

  const displayName = user?.firstName || user?.name || 'Shrajit';

  const vitals = [
    {
      title: 'Current Weight',
      value: '86.5 kg',
      sub: 'Target: 82.0 kg (-4.5 kg)',
      change: '-0.4 kg this week',
      trend: 'down',
      icon: Scale,
      color: 'emerald'
    },
    {
      title: 'Height & Stature',
      value: '6 ft 0 in',
      sub: '183.0 cm',
      change: 'Measured Dec 2025',
      trend: 'neutral',
      icon: Ruler,
      color: 'blue'
    },
    {
      title: 'Body Mass Index (BMI)',
      value: '22.3',
      sub: 'Healthy & Athletic Range',
      change: 'Ideal target: 21.5',
      trend: 'up',
      icon: Activity,
      color: 'teal'
    },
    {
      title: 'Daily Energy Target',
      value: '2,350 Cal',
      sub: '1,820 Cal consumed today',
      change: '530 Cal remaining',
      trend: 'up',
      icon: Flame,
      color: 'amber'
    }
  ];

  const progressCards = [
    {
      title: 'Weekly Workouts',
      current: '4',
      target: '5 Days',
      percent: 80,
      icon: Dumbbell,
      color: 'from-emerald-500 to-teal-600',
      note: 'Push day active today'
    },
    {
      title: 'Nutrition Adherence',
      current: '75%',
      target: '100%',
      percent: 75,
      icon: Utensils,
      color: 'from-amber-500 to-orange-600',
      note: '145g / 175g Protein'
    },
    {
      title: 'Daily Hydration',
      current: '2.5 L',
      target: '4.0 L',
      percent: 62.5,
      icon: Droplets,
      color: 'from-blue-500 to-cyan-600',
      note: '1.5 L left to target'
    },
    {
      title: 'Sleep Duration',
      current: '6.5 hrs',
      target: '8.0 hrs',
      percent: 81,
      icon: Moon,
      color: 'from-purple-500 to-indigo-600',
      note: '82% Deep & REM sleep'
    }
  ];

  return (
    <AppLayout title="FitVerse Dashboard">
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        
        {/* 1. HERO BANNER WITH ATHLETIC BACKDROP matching Collage Screen 1 */}
        <div className={`relative overflow-hidden rounded-3xl border transition-all ${
          isDark 
            ? 'bg-[#0f111a] border-slate-800/80 shadow-2xl' 
            : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-700 shadow-lg'
        }`}>
          {/* Athlete Background Photo */}
          <div 
            className="absolute inset-0 opacity-25 mix-blend-luminosity bg-cover bg-right sm:bg-center pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&auto=format&fit=crop&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

          {/* Banner Inner Content */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Day 14 Streak Active
                </span>
                <span className="text-xs text-slate-400 font-medium">FitVerse AI 2.0</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                Good Evening, {displayName} 👋
              </h1>

              <p className="text-sm sm:text-base text-slate-300 italic font-medium">
                "Discipline today builds the freedom tomorrow. Keep showing up."
              </p>

              {/* Action Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/workout"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Start Push Workout
                </Link>

                <button
                  onClick={() => setFoodModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold backdrop-blur-md transition-all"
                >
                  <Utensils className="w-3.5 h-3.5 text-amber-400" /> Log Meal
                </button>

                <button
                  onClick={() => setVoiceModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold backdrop-blur-md transition-all"
                >
                  <Mic className="w-3.5 h-3.5 text-emerald-400" /> Voice Assistant
                </button>
              </div>
            </div>

            {/* Overall FitVerse Composite Score Radial Badge */}
            <div className={`p-5 rounded-2xl border backdrop-blur-xl shrink-0 flex flex-col items-center text-center ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/10 border-white/20'
            }`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                FitVerse Score
              </div>
              <div className="text-4xl font-black text-white mt-1">
                {fitverseScore}<span className="text-lg text-emerald-400 font-bold">/100</span>
              </div>
              <div className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Top 5% Performance
              </div>
            </div>
          </div>
        </div>

        {/* 2. FOUR CORE VITALS CARDS matching Collage Screen 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-3xl border transition-all ${
                  isDark 
                    ? 'bg-[#0f111a] border-slate-800/80 hover:border-slate-700 shadow-xl' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.title}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    item.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                    item.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                    item.color === 'teal' ? 'bg-teal-500/10 text-teal-400' :
                    'bg-amber-500/10 text-amber-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.value}
                </div>

                <div className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.sub}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/40 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-500 font-semibold">{item.change}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. "YOUR PROGRESS" SECTION matching Collage Screen 1 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Your Weekly Goals & Habit Progress
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Continuous consistency tracking across training, diet, water and recovery.
              </p>
            </div>
            <Link
              to="/analytics"
              className="text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
            >
              View Analytics <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {progressCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl border transition-all ${
                    isDark 
                      ? 'bg-[#0f111a] border-slate-800/80 shadow-xl' 
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {card.title}
                    </span>
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {card.current}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">/ {card.target}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                      <div
                        className={`h-full bg-gradient-to-r ${card.color} rounded-full transition-all duration-500`}
                        style={{ width: `${card.percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-2 font-medium">
                    {card.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. 3D HUMAN ANATOMY & MUSCLE EXPLORER matching Collage Screen 1 */}
        <div className="pt-2">
          <Human3DMuscleVisualizer />
        </div>

      </div>

      {/* Interactive Modals */}
      <TalkToFitverseModal isOpen={voiceModalOpen} onClose={() => setVoiceModalOpen(false)} />
      <LogMoodModal isOpen={moodModalOpen} onClose={() => setMoodModalOpen(false)} />
      <LogWorkoutModal isOpen={workoutModalOpen} onClose={() => setWorkoutModalOpen(false)} />
      <LogFoodModal isOpen={foodModalOpen} onClose={() => setFoodModalOpen(false)} />
      <LogSleepModal isOpen={sleepModalOpen} onClose={() => setSleepModalOpen(false)} />
    </AppLayout>
  );
};
