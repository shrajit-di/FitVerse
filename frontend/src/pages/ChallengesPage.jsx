import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Award, Flame, Trophy, Users, CheckCircle2 } from 'lucide-react';

export const ChallengesPage = () => {
  const challenges = [
    { title: '7-Day Mindful Breathing Streak', participants: 1420, xp: 500, category: 'Mental', progress: 85, color: 'emerald' },
    { title: '100kg Bench Press Milestone', participants: 850, xp: 800, category: 'Physical', progress: 60, color: 'purple' },
    { title: 'High Protein Budget Challenge', participants: 2100, xp: 600, category: 'Nutrition', progress: 40, color: 'amber' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Award className="w-7 h-7 text-amber-400" />
            Community Challenges & XP
          </h1>
          <p className="text-xs text-slate-400">Compete with friends, maintain consistency streaks, and earn badges.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {challenges.map((c, i) => (
            <div key={i} className="fit-card p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded">
                  +{c.xp} XP
                </span>
                <h3 className="text-sm font-bold text-white mt-2 mb-1">{c.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {c.participants} participants
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1f234d]">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-bold text-white">{c.progress}%</span>
                </div>
                <div className="w-full bg-[#0a0b1c] rounded-full h-2 overflow-hidden border border-[#1f234d]">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};
