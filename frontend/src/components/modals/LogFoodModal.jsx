import React, { useState } from 'react';
import { X, Utensils, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

export const LogFoodModal = ({ isOpen, onClose, onSuccess }) => {
  const [mealType, setMealType] = useState('LUNCH');
  const [foodId, setFoodId] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/nutrition/meals', {
        mealType,
        items: [{ foodId: Number(foodId), quantity: Number(quantity) }]
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
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Log Meal</h3>
            <p className="text-xs text-slate-400">Track calorie and macro intake</p>
          </div>
        </div>

        {success ? (
          <div className="p-6 text-center text-orange-400 font-bold flex flex-col items-center gap-2">
            <CheckCircle2 className="w-10 h-10" />
            <p>Meal logged successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Meal Slot</label>
              <div className="grid grid-cols-4 gap-1.5">
                {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setMealType(s)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold cursor-pointer border ${
                      mealType === s
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                        : 'bg-[#181a3d] border-[#25295c] text-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Food Item</label>
              <select
                value={foodId}
                onChange={(e) => setFoodId(e.target.value)}
                className="w-full bg-[#0a0b1c] border border-[#1f234d] rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500"
              >
                <option value={1}>Soya Chunks (345 kcal, 52g protein)</option>
                <option value={2}>Paneer (265 kcal, 18g protein)</option>
                <option value={3}>Boiled Eggs 2x (140 kcal, 12g protein)</option>
                <option value={4}>Rolled Oats (305 kcal, 11g protein)</option>
                <option value={5}>Greek Yogurt (120 kcal, 15g protein)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Servings</label>
              <input
                type="number"
                min="0.5"
                max="5"
                step="0.5"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-[#0a0b1c] border border-[#1f234d] rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs shadow-lg shadow-orange-500/20 transition cursor-pointer"
            >
              {loading ? 'Saving...' : 'Add to Food Log'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
