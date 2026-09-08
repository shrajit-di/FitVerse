import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, Brain, Dumbbell, Utensils, TrendingUp, LogOut, Mic, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-teal-500/20 group-hover:scale-105 transition">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                FITVERSE
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
                Mind + Body
              </span>
            </div>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    isActive('/dashboard') ? 'bg-slate-900 text-white border border-slate-800' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-teal-400" />
                  Dashboard
                </Link>

                <Link
                  to="/mental"
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    isActive('/mental')
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-teal-300'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5 text-teal-400" />
                  Mental
                </Link>

                <Link
                  to="/physical"
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    isActive('/physical')
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/40'
                      : 'text-slate-400 hover:text-rose-300'
                  }`}
                >
                  <Dumbbell className="w-3.5 h-3.5 text-rose-400" />
                  Physical
                </Link>

                <Link
                  to="/nutrition"
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    isActive('/nutrition')
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  Nutrition
                </Link>

                <Link
                  to="/analytics"
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    isActive('/analytics')
                      ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-indigo-300'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  Analytics
                </Link>

                <button
                  onClick={() => alert("Talk to Fitverse real-time speech-to-speech voice assistant is connected.")}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-rose-500/20 border border-teal-500/40 text-teal-300 hover:border-teal-400 hover:text-teal-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  Talk to Fitverse
                </button>
              </>
            ) : (
              <>
                <a href="#features" className="text-xs font-semibold text-slate-300 hover:text-teal-400 transition">
                  Mind + Body Ecosystem
                </a>
                <a href="#features" className="text-xs font-semibold text-slate-300 hover:text-rose-400 transition">
                  Physical Conditioning
                </a>
                <a href="#features" className="text-xs font-semibold text-slate-300 hover:text-amber-400 transition">
                  Voice Assistant
                </a>
              </>
            )}
          </div>

          {/* Auth User Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-sm transition cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center text-teal-300 font-semibold text-xs">
                    {user?.firstName ? user.firstName[0].toUpperCase() : 'U'}
                  </div>
                  <span className="font-medium text-xs">{user?.fullName || user?.email}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                        {user?.role?.replace('ROLE_', '')}
                      </span>
                    </div>
                    <Link
                      to="/mental"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-teal-400 transition"
                    >
                      🧠 Mental Wellness Sanctuary
                    </Link>
                    <Link
                      to="/physical"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-rose-400 transition"
                    >
                      💪 Physical Fitness Arena
                    </Link>
                    <Link
                      to="/nutrition"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-amber-400 transition"
                    >
                      🥗 Nutrition & Macros
                    </Link>
                    <Link
                      to="/analytics"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-indigo-400 transition"
                    >
                      📊 Fitverse Score & Analytics
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-slate-800/60 transition flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 transition"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-3">
          {isAuthenticated ? (
            <>
              <div className="px-2 py-1 text-xs text-slate-400">
                Logged in as <strong className="text-white">{user?.fullName}</strong>
              </div>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-900">Dashboard</Link>
              <Link to="/mental" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-teal-300 hover:bg-slate-900">🧠 Mental Wellness</Link>
              <Link to="/physical" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-rose-300 hover:bg-slate-900">💪 Physical Fitness</Link>
              <Link to="/nutrition" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-amber-300 hover:bg-slate-900">🥗 Nutrition</Link>
              <Link to="/analytics" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-indigo-300 hover:bg-slate-900">📊 Analytics</Link>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-slate-900 flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 text-sm text-slate-200 border border-slate-800 rounded-lg">Sign In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 text-sm font-semibold bg-teal-500 text-slate-950 rounded-lg">Create Account</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
