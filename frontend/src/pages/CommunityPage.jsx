import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Users, MessageCircle, Heart } from 'lucide-react';

export const CommunityPage = () => {
  const posts = [
    { author: 'Rahul K.', role: 'Fitness Member', text: 'Hit 80kg bench press today after 2 months of progressive overload! Consistent sleep made a huge difference.', likes: 24, replies: 6, tag: 'Progress' },
    { author: 'Dr. Sneha M.', role: 'Mindfulness Coach', text: 'Friendly reminder: 5 minutes of box breathing between study/work blocks reduces cognitive fatigue by up to 35%.', likes: 58, replies: 12, tag: 'Wellness Tip' }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-indigo-400" />
            Fitverse Community
          </h1>
          <p className="text-xs text-slate-400">Share milestones, discuss workouts, and connect with wellness peers.</p>
        </div>

        <div className="space-y-4 max-w-2xl">
          {posts.map((p, i) => (
            <div key={i} className="fit-card p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-xs">
                    {p.author[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{p.author}</h4>
                    <p className="text-[10px] text-slate-400">{p.role}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded">
                  {p.tag}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{p.text}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-[#1f234d]">
                <button className="flex items-center gap-1 hover:text-rose-400 cursor-pointer"><Heart className="w-3.5 h-3.5" /> {p.likes}</button>
                <button className="flex items-center gap-1 hover:text-indigo-400 cursor-pointer"><MessageCircle className="w-3.5 h-3.5" /> {p.replies}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};
