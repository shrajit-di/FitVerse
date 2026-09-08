import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Settings as SetIcon, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <SetIcon className="w-7 h-7 text-slate-400" />
            Account & Preferences
          </h1>
          <p className="text-xs text-slate-400">Manage your profile, target calories, and privacy options.</p>
        </div>

        <div className="fit-card p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" /> Profile Information
          </h3>
          <div className="text-xs space-y-2 text-slate-300">
            <p><strong>Name:</strong> {user?.fullName || 'Ananya Sharma'}</p>
            <p><strong>Email:</strong> {user?.email || 'user@fitverse.com'}</p>
            <p><strong>Role:</strong> {user?.role || 'ROLE_USER'}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
