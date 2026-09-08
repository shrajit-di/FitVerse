import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { MessageSquare } from 'lucide-react';

export const MessagesPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-blue-400" />
            Direct Messages & Consultations
          </h1>
          <p className="text-xs text-slate-400">Private consultations with certified trainers and counselors.</p>
        </div>

        <div className="fit-card p-8 rounded-3xl text-center text-slate-400 text-xs">
          <p className="font-semibold text-slate-300 mb-1">No unread consultation messages</p>
          <p>Book a trainer or counselor in the Mental / Physical hubs to start a consultation chat thread.</p>
        </div>
      </div>
    </AppLayout>
  );
};
