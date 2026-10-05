import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  Brain, 
  Smile, 
  Activity, 
  Moon, 
  Sparkles, 
  BookOpen, 
  Wind, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw,
  Plus
} from 'lucide-react';
import api from '../api/axios';

export const MentalFitnessPage = () => {
  const [activeTab, setActiveTab] = useState('Overview'); // Overview, Journaling, Meditation, Sleep, Resources
  const [boxBreathingOpen, setBoxBreathingOpen] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale');
  const [breathSec, setBreathSec] = useState(4);

  const metrics = [
    { title: 'Mood', value: 'Good', icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Stress Level', value: 'Low', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Sleep', value: '6.5 hrs', icon: Moon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Mindful Days', value: '4 / 7', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const quickActions = [
    { title: 'Start Journaling', desc: 'Write your thoughts', icon: BookOpen, action: () => setActiveTab('Journaling') },
    { title: 'Guided Meditation', desc: '5-15 min sessions', icon: Sparkles, action: () => setActiveTab('Meditation') },
    { title: 'Breathing Exercise', desc: 'Reduce stress', icon: Wind, action: () => setBoxBreathingOpen(true) },
    { title: 'Sleep Tracker', desc: 'Track your sleep', icon: Moon, action: () => setActiveTab('Sleep') },
  ];

  const recommendedArticles = [
    { title: 'Managing Exam Stress', time: '10 min read', tag: 'Guide', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop' },
    { title: '5-Minute Breathing', time: 'Audio • 5 min', tag: 'Audio', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop' },
    { title: 'Better Sleep Habits', time: 'Guide', tag: 'Habits', img: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?q=80&w=400&auto=format&fit=crop' },
    { title: 'Mindfulness Basics', time: 'Video • 8 min', tag: 'Video', img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 pb-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              Mental Wellness
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              A healthy mind builds a stronger you.
            </p>
          </div>

          <div className="flex gap-2 bg-[var(--bg-card)] p-1 rounded-2xl border border-[var(--border-main)]">
            {['Overview', 'Journaling', 'Meditation', 'Sleep', 'Resources'].map((t) => (
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

        {/* 4 Metric Cards matching Screen 8 in collage */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="fit-card p-5 rounded-3xl flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl ${m.bg} ${m.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">{m.title}</p>
                  <p className="text-base font-black text-[var(--text-primary)]">{m.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Row matching Screen 8 in collage */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-secondary)]">
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((qa, i) => {
              const Icon = qa.icon;
              return (
                <div
                  key={i}
                  onClick={qa.action}
                  className="fit-card p-4 rounded-3xl flex items-center gap-3.5 transition hover:border-emerald-500/40 hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[var(--text-primary)]">{qa.title}</h4>
                    <p className="text-[10px] text-[var(--text-secondary)]">{qa.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended For You Grid matching Screen 8 in collage */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-secondary)]">
            Recommended For You
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedArticles.map((art, i) => (
              <div
                key={i}
                className="fit-card rounded-3xl overflow-hidden group cursor-pointer hover:border-emerald-500/40 transition"
              >
                <div className="h-32 bg-slate-900 relative">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-slate-950/80 px-2 py-0.5 rounded text-emerald-400">
                    {art.tag}
                  </span>
                </div>
                <div className="p-4 bg-[var(--bg-card)]">
                  <h4 className="text-xs font-black text-[var(--text-primary)] group-hover:text-emerald-500 transition">{art.title}</h4>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{art.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-4-4-4 Box Breathing Modal */}
        {boxBreathingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="fit-card p-8 rounded-3xl max-w-sm w-full text-center space-y-6">
              <h3 className="text-lg font-black text-[var(--text-primary)]">Box Breathing (4-4-4-4)</h3>
              
              <div className="relative w-40 h-40 mx-auto rounded-full bg-emerald-500/10 border-4 border-emerald-500 flex flex-col items-center justify-center animate-pulse">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Inhale</p>
                <p className="text-3xl font-black text-[var(--text-primary)]">4</p>
              </div>

              <p className="text-xs text-[var(--text-secondary)]">
                Inhale deeply (4s) • Hold (4s) • Exhale slowly (4s) • Hold (4s)
              </p>

              <button
                onClick={() => setBoxBreathingOpen(false)}
                className="w-full py-2.5 rounded-2xl bg-[#059669] text-white text-xs font-bold cursor-pointer"
              >
                Done Session
              </button>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};
