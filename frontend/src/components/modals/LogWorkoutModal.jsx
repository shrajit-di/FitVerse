import React, { useState } from 'react';
import { X, Dumbbell, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

export const LogWorkoutModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('Upper Body Hypertrophy');
  const [duration, setDuration] = useState(45);
  const [rpe, setRpe] = useState(8);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/physical/workout-logs', {
        title,
        durationMinutes: Number(duration),
        rpeScore: Number(rpe),
        sets: [
          { exerciseId: 1, setNumber: 1, repsCompleted: 10, weightKg: 65.0 },
          { exerciseId: 1, setNumber: 2, repsCompleted: 8, weightKg: 70.0 },
          { exerciseId: 3, setNumber: 1, repsCompleted: 10, weightKg: 80.0 },
        ]
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
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Log Workout Session</h3>
            <p className="text-xs text-slate-400">Save sets and progressive overload</p>
          </div>
        </div>

        {success ? (
          <div className="p-6 text-center text-purple-400 font-bold flex flex-col items-center gap-2">
            <CheckCircle2 className="w-10 h-10" />
            <p>Workout logged successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Workout Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0a0b1c] border border-[#1f234d] rounded-xl px-3 py-2.5 text-xs text-white focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Duration (mins)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-[#0a0b1c] border border-[#1f234d] rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">RPE Exertion (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rpe}
                  onChange={(e) => setRpe(Number(e.target.value))}
                  className="w-full bg-[#0a0b1c] border border-[#1f234d] rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500"
                />
              </div>
            </div>

            <div className="p-3 bg-[#0a0b1c] rounded-xl border border-[#1f234d] text-xs text-slate-400">
              <span className="font-bold text-slate-200">Auto-calculated:</span> 3 sets added with volume tracking.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 text-white text-xs shadow-lg shadow-purple-600/30 transition cursor-pointer"
            >
              {loading ? 'Logging...' : 'Save Workout Log'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
