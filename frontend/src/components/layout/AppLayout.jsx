import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Activity, 
  Brain, 
  Zap, 
  Utensils, 
  TrendingUp, 
  Bot, 
  Award, 
  Users, 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Search, 
  Bell, 
  Mic, 
  Sun, 
  Moon, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { TalkToFitverseModal } from '../voice/TalkToFitverseModal';

export const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Activity },
    { label: 'Mental Fitness', path: '/mental', icon: Brain },
    { label: 'Physical Fitness', path: '/physical', icon: Zap },
    { label: 'Nutrition', path: '/nutrition', icon: Utensils },
    { label: 'Analytics', path: '/analytics', icon: TrendingUp },
    { label: 'AI Coach', path: '/ai-coach', icon: Bot, badge: 'New' },
    { label: 'Challenges', path: '/challenges', icon: Award },
    { label: 'Community', path: '/community', icon: Users },
    { label: 'Shop', path: '/shop', icon: ShoppingBag },
    { label: 'Calendar', path: '/calendar', icon: Calendar },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--bg-page)] text-[var(--text-primary)] flex transition-colors duration-200">
      
      {/* 1. LEFT SIDEBAR (DESKTOP) - FIXED IN PLACE */}
      <aside className="w-64 h-screen bg-[var(--bg-sidebar)] border-r border-[var(--border-main)] flex flex-col justify-between p-4 shrink-0 hidden md:flex overflow-y-auto transition-colors duration-200">
        <div>
          {/* Brand Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 px-3 py-3 mb-4 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-teal-400 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition">
              <span className="text-white font-black text-sm">✦</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-500 bg-clip-text text-transparent">
              Fitverse
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-[#4f46e5] text-white shadow-lg shadow-indigo-600/30 font-extrabold'
                      : isDark
                      ? 'text-slate-400 hover:text-slate-100 hover:bg-[#131530]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold bg-[#6366f1] text-white px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Floating Voice Coach Card at bottom of sidebar */}
        <div className={`mt-6 p-4 rounded-3xl border text-center relative overflow-hidden transition ${
          isDark 
            ? 'bg-gradient-to-b from-[#191538] to-[#121028] border-purple-500/30' 
            : 'bg-gradient-to-b from-purple-50 to-indigo-50 border-purple-200'
        }`}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl -z-10" />
          
          <p className="text-xs font-bold text-[var(--text-primary)]">Talk to Fitverse</p>
          <p className="text-[10px] text-purple-500 font-semibold mb-3">Your AI Voice Coach</p>

          <button
            onClick={() => setVoiceModalOpen(true)}
            className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/40 hover:scale-105 transition cursor-pointer"
          >
            <Mic className="w-6 h-6 animate-pulse" />
          </button>

          <p className="text-[10px] text-slate-400 mt-3">Tap to speak</p>
        </div>
      </aside>

      {/* 2. MAIN CONTENT WRAPPER - SCROLLS INDEPENDENTLY */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-[var(--border-main)] bg-[var(--bg-header)] backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 transition-colors duration-200">
          
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-slate-400 hover:text-[var(--text-primary)]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Box */}
            <div className="relative w-64 sm:w-80 md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Fitverse..."
                className="w-full bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl pl-10 pr-4 py-2 text-xs text-[var(--text-primary)] placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Right Action Icons: Day/Night Mode Switcher + Notification + Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Day / Night Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Day Mode (Light)" : "Switch to Night Mode (Dark)"}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold cursor-pointer transition shadow-sm ${
                isDark 
                  ? 'bg-[#12142e] border-[#1f234d] text-amber-300 hover:bg-[#1a1d3f]' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline text-[11px]">Day Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline text-[11px]">Night Mode</span>
                </>
              )}
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-slate-400 hover:text-[var(--text-primary)] cursor-pointer transition">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-purple-500 absolute top-1.5 right-1.5" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-[var(--bg-card-nested)] transition cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-500/50 bg-gradient-to-tr from-purple-500 to-teal-400 flex items-center justify-center font-bold text-xs text-white">
                  {user?.firstName ? user.firstName[0].toUpperCase() : 'A'}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    Hi, {user?.firstName || 'Ananya'} 👋
                  </span>
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 border-b border-[var(--border-main)] text-[11px] text-slate-400">
                    {user?.email}
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="w-full text-left px-3 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-card-nested)] flex items-center gap-2 cursor-pointer"
                  >
                    {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
                    {isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
                  </button>
                  <Link
                    to="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-3 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-card-nested)]"
                  >
                    Profile & Vitals
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs text-rose-500 hover:bg-[var(--bg-card-nested)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />
          <aside className="relative w-64 max-w-[80vw] h-full bg-[var(--bg-sidebar)] border-r border-[var(--border-main)] flex flex-col justify-between p-4 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Link to="/dashboard" onClick={() => setMobileSidebarOpen(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-teal-400 flex items-center justify-center text-white font-black text-sm">
                    ✦
                  </div>
                  <span className="text-lg font-black bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    Fitverse
                  </span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg bg-[var(--bg-card-nested)] text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${
                        isActive
                          ? 'bg-[#4f46e5] text-white font-extrabold'
                          : 'text-slate-500 hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-nested)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] bg-[#6366f1] text-white px-1.5 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <TalkToFitverseModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />

    </div>
  );
};
