import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Home, 
  ClipboardCheck, 
  Dumbbell, 
  Utensils, 
  Bot, 
  MapPin, 
  ShoppingBag, 
  Brain, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Sparkles,
  ChevronDown
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

  const navGroups = [
    {
      title: 'MAIN',
      items: [
        { label: 'Home', path: '/dashboard', icon: Home },
        { label: 'AI Coach', path: '/ai-coach', icon: Bot, badge: 'AI' },
      ]
    },
    {
      title: 'PHYSICAL FITNESS',
      items: [
        { label: 'Overview & Workout', path: '/physical', icon: Dumbbell },
        { label: 'Nutrition & Diet', path: '/nutrition', icon: Utensils },
        { label: 'Gym Finder', path: '/gym-finder', icon: MapPin },
      ]
    },
    {
      title: 'MENTAL FITNESS',
      items: [
        { label: 'Overview & Journal', path: '/mental', icon: Brain },
        { label: 'Assessments', path: '/assessments', icon: ClipboardCheck },
      ]
    },
    {
      title: 'ECOSYSTEM',
      items: [
        { label: 'Shop', path: '/shop', icon: ShoppingBag },
        { label: 'Community', path: '/community', icon: Users },
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user?.firstName || 'Shrajit';

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--bg-page)] text-[var(--text-primary)] flex transition-colors duration-200 font-sans">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 h-screen bg-[var(--bg-sidebar)] border-r border-[var(--border-main)] flex flex-col justify-between p-4 shrink-0 hidden md:flex overflow-y-auto z-30 select-none custom-scrollbar">
        <div>
          {/* Brand Logo with Green Circle */}
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-3 mb-5 group">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition">
              <span className="text-slate-950 font-black text-sm">✦</span>
            </div>
            <span className="text-xl font-black tracking-tight text-[var(--text-primary)] flex items-center gap-1">
              Fitverse
            </span>
          </Link>

          {/* Main Navigation Links */}
          <nav className="space-y-5">
            {navGroups.map((group, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="px-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                  {group.title}
                </h3>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                        isActive
                          ? 'bg-[#059669] text-white shadow-md shadow-emerald-900/40 font-extrabold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-nested)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] uppercase font-bold bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section (Settings & Logout) */}
        <div className="pt-4 border-t border-[var(--border-main)] space-y-1">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              location.pathname === '/settings'
                ? 'bg-[#059669] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-nested)]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[var(--text-secondary)] hover:text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT SCROLLER (INDEPENDENT) */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col min-w-0 bg-[var(--bg-page)]">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-[var(--border-main)] bg-[var(--bg-header)] backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 transition-colors duration-200">
          
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-slate-400 hover:text-[var(--text-primary)]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Box matching collage */}
            <div className="relative w-64 sm:w-80 md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="w-full bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl pl-10 pr-4 py-2 text-xs text-[var(--text-primary)] placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-colors shadow-2xs"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Day / Night Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Day Mode (Light)" : "Switch to Night Mode (Dark)"}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold cursor-pointer transition ${
                isDark 
                  ? 'bg-[#12142e] border-[#1f234d] text-amber-300 hover:bg-[#1a1d3f]' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline text-[11px]">Day Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline text-[11px]">Night Mode</span>
                </>
              )}
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-slate-400 hover:text-[var(--text-primary)] cursor-pointer transition shadow-2xs">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5" />
            </button>

            {/* User Profile matching collage */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-[var(--bg-card-nested)] transition cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500/50 bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-xs text-slate-950">
                  {displayName[0]}
                </div>
                <div className="text-left hidden sm:flex items-center gap-1">
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {displayName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 border-b border-[var(--border-main)] text-[11px] text-slate-400 truncate">
                    {user?.email || 'shrajit@gmail.com'}
                  </div>
                  <Link
                    to="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-3 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-card-nested)]"
                  >
                    My Profile
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

        {/* Page Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />
          <aside className="relative w-64 max-w-[80vw] h-full bg-[var(--bg-sidebar)] border-r border-[var(--border-main)] flex flex-col justify-between p-4 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-5">
                <Link to="/dashboard" onClick={() => setMobileSidebarOpen(false)} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
                    ✦
                  </div>
                  <span className="text-lg font-black text-[var(--text-primary)]">
                    Fitverse
                  </span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg bg-[var(--bg-card-nested)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-5">
                {navGroups.map((group, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h3 className="px-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      {group.title}
                    </h3>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileSidebarOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${
                            isActive
                              ? 'bg-[#059669] text-white font-extrabold'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-nested)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))}
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
