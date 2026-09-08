import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 mx-auto mb-4">
          <Activity className="w-6 h-6" />
        </div>
        <h1 className="text-5xl font-black text-white">404</h1>
        <p className="text-base text-slate-300 mt-2">Page Not Found</p>
        <p className="text-xs text-slate-500 mt-1 mb-6">The Fitverse route you requested does not exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};
