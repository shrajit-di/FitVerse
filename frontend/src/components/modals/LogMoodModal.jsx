import React, { useState } from 'react';
import { X, Smile, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

export const LogMoodModal = ({ isOpen, onClose, onSuccess }) => {
  const [score, setScore] = useState(8);
  const [category, setCategory] = useState('HAPPY');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/mental/mood', { score, category, notes });
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
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Smile className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Log Daily Mood</h3>
            <p className="text-xs text-slate-400">Record how you're feeling right now</p>
          </div>
        </div>

        {success ? (
          <div className="p-6 text-center text-emerald-400 font-bold flex flex-col items-center gap-2">
            <CheckCircle2 className="w-10 h-10" />
            <p>Mood logged successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-300 font-semibold">Mood Score (1-10)</span>
                <span className="font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">{score}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mood Tag</label>
              <div className="grid grid-cols-3 gap-2">
                {['HAPPY', 'CALM', 'ENERGETIC', 'TIRED', 'ANXIOUS', 'STRESSED'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-1.5 rounded-xl border text-[11px] font-bold cursor-pointer transition ${
                      category === cat
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-[#181a3d] border-[#25295c] text-slate-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reflections / Context</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What contributed to your mood today?"
                className="w-full bg-[#0a0b1c] border border-[#1f234d] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs shadow-lg shadow-emerald-500/20 transition cursor-pointer"
            >
              {loading ? 'Saving...' : 'Save Mood'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
