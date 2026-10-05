import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  Utensils, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Plus, 
  Sparkles,
  Leaf
} from 'lucide-react';

export const NutritionPage = () => {
  const [activeTab, setActiveTab] = useState('Daily Plan'); // Daily Plan, Macronutrients, Recipes, Progress
  const [currentDate, setCurrentDate] = useState('Today, Oct 5, 2026');

  const macros = {
    calories: { current: 2350, goal: 2500, color: '#10b981' },
    protein: { current: 175, goal: 180, unit: 'g', color: '#3b82f6' },
    carbs: { current: 240, goal: 260, unit: 'g', color: '#f59e0b' },
    fats: { current: 70, goal: 75, unit: 'g', color: '#eab308' },
  };

  const meals = [
    {
      id: 1,
      title: 'Breakfast',
      time: '8:00 AM',
      name: 'Oats + Milk + Whey',
      desc: '80g oats + 250ml milk + 1 scoop whey',
      cals: '520 cal',
      protein: '35g protein',
      img: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Mid Meal',
      time: '11:00 AM',
      name: '4 Eggs + Banana',
      desc: '4 whole eggs + 1 banana',
      cals: '400 cal',
      protein: '28g protein',
      img: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Lunch',
      time: '2:00 PM',
      name: 'Chicken + Rice + Dal',
      desc: '200g chicken + 1 cup rice + 1 cup dal',
      cals: '650 cal',
      protein: '55g protein',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Evening Snack',
      time: '5:00 PM',
      name: 'Greek Yogurt + Nuts',
      desc: '200g yogurt + 20g nuts',
      cals: '300 cal',
      protein: '22g protein',
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6 pb-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              Diet Plan
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Personalized nutrition plan based on your goals and activity level.
            </p>
          </div>

          <div className="flex gap-2 bg-[var(--bg-card)] p-1 rounded-2xl border border-[var(--border-main)]">
            {['Daily Plan', 'Macronutrients', 'Recipes', 'Progress'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === t
                    ? 'bg-[#059669] text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selector & Change Plan Bar */}
        <div className="fit-card p-4 rounded-3xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-xl hover:bg-[var(--bg-card-nested)] text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black text-[var(--text-primary)]">
              {currentDate}
            </span>
            <button className="p-1.5 rounded-xl hover:bg-[var(--bg-card-nested)] text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button className="px-4 py-1.5 rounded-xl border border-[var(--border-main)] text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-card-nested)] transition cursor-pointer">
            Change Plan
          </button>
        </div>

        {/* 4 Circular Macro Dials matching Screen 5 in collage */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          {/* Calories Ring */}
          <div className="fit-card p-5 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90">
                <circle cx="48" cy="48" r="38" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="8" fill="transparent" />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - 2350 / 2500)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-base font-black text-[var(--text-primary)]">2,350</p>
                <p className="text-[9px] text-[var(--text-secondary)]">Calories</p>
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-2">of 2,500</p>
          </div>

          {/* Protein Ring */}
          <div className="fit-card p-5 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90">
                <circle cx="48" cy="48" r="38" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="8" fill="transparent" />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - 175 / 180)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-base font-black text-[var(--text-primary)]">175g</p>
                <p className="text-[9px] text-[var(--text-secondary)]">Protein</p>
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-2">of 180g</p>
          </div>

          {/* Carbs Ring */}
          <div className="fit-card p-5 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90">
                <circle cx="48" cy="48" r="38" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="8" fill="transparent" />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="#f59e0b"
                  strokeWidth="8"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - 240 / 260)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-base font-black text-[var(--text-primary)]">240g</p>
                <p className="text-[9px] text-[var(--text-secondary)]">Carbs</p>
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-2">of 260g</p>
          </div>

          {/* Fats Ring */}
          <div className="fit-card p-5 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90">
                <circle cx="48" cy="48" r="38" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="8" fill="transparent" />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="#eab308"
                  strokeWidth="8"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - 70 / 75)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-base font-black text-[var(--text-primary)]">70g</p>
                <p className="text-[9px] text-[var(--text-secondary)]">Fats</p>
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-2">of 75g</p>
          </div>

        </div>

        {/* Meal Breakdown List with Food Images matching Screen 5 in collage */}
        <div className="space-y-3">
          {meals.map((m) => (
            <div
              key={m.id}
              className="fit-card p-4 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-emerald-500/40"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Time tag */}
                <div className="w-20 shrink-0">
                  <p className="text-xs font-extrabold text-[var(--text-primary)]">{m.title}</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">{m.time}</p>
                </div>

                {/* Food Image */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>

                {/* Meal Details */}
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-[var(--text-primary)] truncate">{m.name}</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{m.desc}</p>
                </div>
              </div>

              {/* Macro Badges */}
              <div className="flex sm:flex-col items-end justify-between shrink-0">
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{m.cals}</span>
                <span className="text-xs font-bold text-[var(--text-secondary)]">{m.protein}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
};
