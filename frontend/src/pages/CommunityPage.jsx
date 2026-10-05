import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Users, Award, Flame, MessageSquare, Heart, Share2 } from 'lucide-react';

export const CommunityPage = () => {
  const leaderboards = [
    { rank: 1, name: 'Aarav Mehta', streak: 42, score: 94, avatar: 'A' },
    { rank: 2, name: 'Shrajit Vishwakarma', streak: 14, score: 86, avatar: 'S' },
    { rank: 3, name: 'Neha Sharma', streak: 12, score: 84, avatar: 'N' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 pb-12">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            Fitverse Community
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Connect with like-minded athletes, join monthly challenges, and climb leaderboards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 fit-card p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-black text-[var(--text-primary)]">Community Feed</h3>
            
            <div className="p-4 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-slate-950">
                  A
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">Aarav Mehta</p>
                  <p className="text-[10px] text-slate-400">2 hours ago • Upper Body HIIT</p>
                </div>
              </div>
              <p className="text-xs text-[var(--text-primary)]">
                Hit a new PR on the Barbell Bench Press today: 90kg for 6 reps! Keep crushing your goals everyone! 🔥
              </p>
            </div>
          </div>

          <div className="fit-card p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-black text-[var(--text-primary)]">Weekly Streak Leaderboard</h3>
            <div className="space-y-2">
              {leaderboards.map((l) => (
                <div key={l.rank} className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-emerald-500">#{l.rank}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                      {l.avatar}
                    </div>
                    <span className="text-xs font-bold text-[var(--text-primary)]">{l.name}</span>
                  </div>
                  <span className="text-xs font-black text-rose-500">🔥 {l.streak}d</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
