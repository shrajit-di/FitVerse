import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Calendar as CalIcon, Clock } from 'lucide-react';

export const CalendarPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CalIcon className="w-7 h-7 text-teal-400" />
            Schedule & Planner
          </h1>
          <p className="text-xs text-slate-400">Weekly workout schedule, meditation reminders, and booked trainer sessions.</p>
        </div>

        <div className="fit-card p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white">Upcoming Events This Week</h3>
          <div className="space-y-3">
            {[
              { time: 'Today • 6:00 PM', event: 'Upper Body Hypertrophy Session', type: 'Workout' },
              { time: 'Tomorrow • 7:30 AM', event: '1-on-1 Mindfulness Coaching with Dr. Sneha', type: 'Mental' },
              { time: 'Friday • 7:00 PM', event: 'Community HIIT Live Challenge', type: 'Event' },
            ].map((ev, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#0a0b1c] border border-[#1f234d] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{ev.event}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {ev.time}</p>
                </div>
                <span className="text-[10px] font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded">{ev.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
