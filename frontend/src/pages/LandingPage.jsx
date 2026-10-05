import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Brain, 
  Dumbbell, 
  Sparkles, 
  Mic, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/10 via-rose-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Mind + Body + AI + Real-Time Voice Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            One Unified Platform for the <br />
            <span className="bg-gradient-to-r from-teal-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Complete Person
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Fitverse harmonizes <strong>Mental Wellness</strong> (mood, stress, sleep, meditation) and <strong>Physical Fitness</strong> (workouts, progressive overload, nutrition, budget planner) with conversational AI, nearby gym discovery, and real-time speech interaction.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2 group transition"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition text-center"
            >
              Sign In with Demo Accounts
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <Brain className="w-5 h-5 text-teal-400 mb-2" />
              <p className="font-semibold text-white text-sm">Mental Wellness</p>
              <p className="text-xs text-slate-400 mt-1">Mood, stress & sleep correlation tracking</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <Dumbbell className="w-5 h-5 text-rose-400 mb-2" />
              <p className="font-semibold text-white text-sm">Physical Fitness</p>
              <p className="text-xs text-slate-400 mt-1">Smart workouts & progressive overload</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <Mic className="w-5 h-5 text-amber-400 mb-2" />
              <p className="font-semibold text-white text-sm">Talk to Fitverse</p>
              <p className="text-xs text-slate-400 mt-1">Real-time voice assistant & intent actions</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <BarChart3 className="w-5 h-5 text-emerald-400 mb-2" />
              <p className="font-semibold text-white text-sm">Fitverse Score</p>
              <p className="text-xs text-slate-400 mt-1">Holistic 0-100 wellness index</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 bg-slate-900/40 border-y border-slate-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Full-Stack Architecture Grounded in Modern Engineering
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              Built on production-grade Spring Boot 3.3, MySQL 8.0, Spring Security JWT, React, and Python Machine Learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mental Fitness Core</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Non-diagnostic wellness evaluations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Daily mood & stress trigger logs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Private reflections journal</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Guided breathwork & recovery timer</li>
              </ul>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Physical Fitness Core</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> BMR & TDEE calorie target engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Structured sets/reps workout logger</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Student-friendly Budget Diet Planner (₹/protein)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Interactive Nearby Gyms & Map Search</li>
              </ul>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Intelligent Voice & ML</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> "Talk to Fitverse" speech interface</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Safe AI Action Layer (no arbitrary SQL)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> ML-driven workout & gym recommendations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Contextual weekly mind-body reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
