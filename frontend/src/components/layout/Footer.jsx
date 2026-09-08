import React from 'react';
import { Activity, Heart, Shield, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">FITVERSE</span>
              <p className="text-xs text-slate-500">Integrated Mental & Physical Wellness Ecosystem</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" /> AI & Speech-to-Speech Ready
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-rose-400" /> Secure JWT & Spring Security
            </span>
          </div>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Fitverse. All rights reserved. Personal wellness observation platform.
          </p>
        </div>
      </div>
    </footer>
  );
};
