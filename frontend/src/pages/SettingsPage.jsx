import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Ruler, 
  Weight, 
  Activity, 
  Target, 
  Edit3, 
  ShieldCheck, 
  Bell, 
  Smartphone 
} from 'lucide-react';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Personal Info');

  const profile = {
    name: 'Shrajit Vishwakarma',
    email: 'shrajit@gmail.com',
    age: 21,
    height: '183 cm',
    weight: '86.5 kg',
    activityLevel: 'Moderately Active',
    goal: 'Build Muscle',
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        
        {/* Header matching collage Screen 10 */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            My Profile
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Manage your account and preferences.
          </p>
        </div>

        {/* 4 Tabs */}
        <div className="flex border-b border-[var(--border-main)] gap-4 text-xs font-bold pb-2">
          {['Personal Info', 'Goals', 'Preferences', 'Connected Devices'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 transition cursor-pointer relative ${
                activeTab === tab
                  ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Profile Card matching Screen 10 in collage */}
        <div className="fit-card p-6 sm:p-8 rounded-3xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[var(--border-main)]">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-tr from-emerald-500 to-teal-400 p-1">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-600 text-white shadow">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-black text-[var(--text-primary)]">{profile.name}</h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{profile.email}</p>
              
              <button className="mt-3 px-4 py-1.5 rounded-xl border border-[var(--border-main)] text-xs font-bold text-[var(--text-primary)] hover:border-emerald-500 transition cursor-pointer">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Vitals Grid matching Screen 10 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)]">
              <span className="text-[10px] uppercase font-bold text-slate-400">Age</span>
              <p className="text-base font-black text-[var(--text-primary)] mt-0.5">{profile.age}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)]">
              <span className="text-[10px] uppercase font-bold text-slate-400">Height</span>
              <p className="text-base font-black text-[var(--text-primary)] mt-0.5">{profile.height}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)]">
              <span className="text-[10px] uppercase font-bold text-slate-400">Weight</span>
              <p className="text-base font-black text-[var(--text-primary)] mt-0.5">{profile.weight}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)]">
              <span className="text-[10px] uppercase font-bold text-slate-400">Activity Level</span>
              <p className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{profile.activityLevel}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] sm:col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Primary Goal</span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{profile.goal}</p>
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};
