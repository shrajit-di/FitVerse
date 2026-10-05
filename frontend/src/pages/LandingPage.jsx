import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Brain, 
  Dumbbell, 
  Sparkles, 
  Mic, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2,
  Shield,
  MapPin,
  Utensils,
  ShoppingBag,
  Zap,
  Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleDemoAccess = async () => {
    try {
      await login('user@fitverse.com', 'User@12345');
      navigate('/dashboard');
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070817] text-white selection:bg-emerald-500 selection:text-white">
      
      {/* Top Floating Glass Navigation */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">FITVERSE</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Mind + Body + AI
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDemoAccess}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Instant Demo Access
            </button>
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Integrated Mind + Body + AI + Real-Time Voice Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            One Unified Platform for the <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Complete Person
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            FitVerse harmonizes <strong>Mental Wellness</strong> (mood, stress, sleep, breathwork) and <strong>Physical Fitness</strong> (hypertrophy routines, 3D body anatomy, macro planner, nearby gym finder) with conversational AI coaching.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleDemoAccess}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2.5 transition transform hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch FitVerse App (Demo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition text-center"
            >
              Sign In with Custom Account
            </Link>
          </div>

          {/* Quick Pillars Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-10">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <Brain className="w-5 h-5 text-emerald-400 mb-2" />
              <p className="font-bold text-white text-sm">Mental Wellness</p>
              <p className="text-xs text-slate-400 mt-1">Mood, stress & sleep 4-4-4-4 breathing</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <Dumbbell className="w-5 h-5 text-teal-400 mb-2" />
              <p className="font-bold text-white text-sm">Physical Training</p>
              <p className="text-xs text-slate-400 mt-1">7-day splits & 3D muscle explorer</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <Sparkles className="w-5 h-5 text-amber-400 mb-2" />
              <p className="font-bold text-white text-sm">AI Coach</p>
              <p className="text-xs text-slate-400 mt-1">Personalized nutrition & routine builder</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <MapPin className="w-5 h-5 text-cyan-400 mb-2" />
              <p className="font-bold text-white text-sm">Gym Finder</p>
              <p className="text-xs text-slate-400 mt-1">Nearby facilities with interactive map</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0d1117] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-bold">FitVerse</span> &copy; {new Date().getFullYear()} All rights reserved.
          </div>
          <div>
            Built with Spring Boot 3.3, MySQL 8.0, Three.js 3D, and React
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
