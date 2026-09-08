import React, { useState } from 'react';
import { X, Moon, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

export const LogSleepModal = ({ isOpen, onClose, onSuccess }) => {
  const [hours, setHours] = useState(7.5);
  const [quality, setQuality] = useState(8);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/mental/sleep', {
        durationMinutes: Math.round(Number(hours) * 60),
        qualityScore: Number(quality),
        recoveryRating: 4,
      });
      setSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-[#12142e] border border-[#262b5c] w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-[#1b1e42] text-slate-400 hover:text-white cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Log Sleep Duration</h3>
            <p className="text-xs text-slate-400">Record nightly recovery hours</p>
          </div>
        </div>

        {success ? (
          <div className="p-6 text-center text-blue-400 font-bold flex flex-col items-center gap-2">
            <CheckCircle2 className="w-10 h-10" />
            <p>Sleep recorded successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hours Slept: <strong className="text-blue-400">{hours} hrs</strong></label>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-blue-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Sleep Restfulness Quality (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full bg-[#0a0b1c] border border-[#1f234d] rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs shadow-lg shadow-blue-500/20 transition cursor-pointer"
            >
              {loading ? 'Saving...' : 'Save Sleep Record'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
