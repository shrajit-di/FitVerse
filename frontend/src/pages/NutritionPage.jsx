import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Utensils, 
  Flame, 
  Plus, 
  Search, 
  IndianRupee, 
  CheckCircle2, 
  Apple, 
  TrendingUp, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';


export const NutritionPage = () => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Meal logging form
  const [mealType, setMealType] = useState('LUNCH');
  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [servingQuantity, setServingQuantity] = useState(1);
  const [logSuccess, setLogSuccess] = useState(false);

  const loadNutritionData = async () => {
    try {
      setLoading(true);
      const [foodsRes, summaryRes] = await Promise.all([
        api.get('/nutrition/foods'),
        api.get('/nutrition/summary/today')
      ]);

      if (foodsRes.data?.data) {
        setFoods(foodsRes.data.data);
        if (foodsRes.data.data.length > 0 && !selectedFoodId) {
          setSelectedFoodId(foodsRes.data.data[0].id);
        }
      }
      if (summaryRes.data?.data) {
        setSummary(summaryRes.data.data);
      }
    } catch (err) {
      console.error('Error loading nutrition data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNutritionData();
  }, []);

  const handleLogMeal = async (e) => {
    e.preventDefault();
    if (!selectedFoodId) return;

    try {
      await api.post('/nutrition/meals', {
        mealType,
        items: [
          {
            foodId: Number(selectedFoodId),
            quantity: Number(servingQuantity),
          }
        ]
      });

      setLogSuccess(true);
      setTimeout(() => setLogSuccess(false), 3000);
      loadNutritionData();
    } catch (err) {
      console.error('Meal log error:', err);
    }
  };

  const filteredFoods = foods.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedFoodObj = foods.find(f => f.id === Number(selectedFoodId));

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
                Nutritional Fuel & Macros
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Utensils className="w-8 h-8 text-amber-400" />
              Daily Nutrition & Macro Tracking
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Calorie adherence, protein targets, cost efficiency per gram, and multi-meal logging.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center min-w-28">
              <p className="text-[10px] uppercase font-bold text-slate-400">Calories Today</p>
              <p className="text-lg font-black text-amber-400">{summary?.totalCalories || 0} <span className="text-xs text-slate-500">/ {summary?.targetCalories || 2400}</span></p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center min-w-28">
              <p className="text-[10px] uppercase font-bold text-slate-400">Protein Target</p>
              <p className="text-lg font-black text-rose-400">{summary?.totalProteinG || 0}g <span className="text-xs text-slate-500">/ {summary?.targetProteinG || 140}g</span></p>
            </div>
          </div>
        </div>

        {/* Macro Progress Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-400 font-semibold">Calories</span>
              <span className="text-xs font-bold text-amber-400">{summary?.calorieAdherencePct || 0}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden my-2 border border-slate-800">
              <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, summary?.calorieAdherencePct || 0)}%` }} />
            </div>
            <p className="text-[11px] text-slate-500">{summary?.totalCalories || 0} kcal consumed</p>
          </div>

          <div className="glass-card p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-400 font-semibold">Protein</span>
              <span className="text-xs font-bold text-rose-400">{summary?.proteinAdherencePct || 0}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden my-2 border border-slate-800">
              <div className="bg-rose-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, summary?.proteinAdherencePct || 0)}%` }} />
            </div>
            <p className="text-[11px] text-slate-500">{summary?.totalProteinG || 0}g of {summary?.targetProteinG || 140}g target</p>
          </div>

          <div className="glass-card p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-400 font-semibold">Carbohydrates</span>
              <span className="text-xs font-bold text-teal-400">{summary?.totalCarbsG || 0}g</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden my-2 border border-slate-800">
              <div className="bg-teal-400 h-full rounded-full" style={{ width: `${Math.min(100, ((summary?.totalCarbsG || 0) / 280) * 100)}%` }} />
            </div>
            <p className="text-[11px] text-slate-500">Glycogen & daily energy supply</p>
          </div>

          <div className="glass-card p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-400 font-semibold">Healthy Fats</span>
              <span className="text-xs font-bold text-indigo-400">{summary?.totalFatsG || 0}g</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden my-2 border border-slate-800">
              <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${Math.min(100, ((summary?.totalFatsG || 0) / 75) * 100)}%` }} />
            </div>
            <p className="text-[11px] text-slate-500">Hormonal and cellular support</p>
          </div>
        </div>

        {/* Main Grid: Meal Logger & Today's Meals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          {/* Quick Meal Logger */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" /> Log Meal Entry
            </h3>
            <p className="text-xs text-slate-400 mb-6">Select food and serving multiplier</p>

            {logSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Meal logged successfully!
              </div>
            )}

            <form onSubmit={handleLogMeal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Meal Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setMealType(slot)}
                      className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        mealType === slot
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Food Item</label>
                <select
                  value={selectedFoodId}
                  onChange={(e) => setSelectedFoodId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-amber-500"
                >
                  {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.name} ({food.calories} kcal • {food.proteinG}g protein / {food.servingSize}{food.servingUnit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Serving Multiplier</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0.25"
                    max="10"
                    step="0.25"
                    value={servingQuantity}
                    onChange={(e) => setServingQuantity(Number(e.target.value))}
                    className="w-24 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white text-center focus:border-amber-500"
                  />
                  {selectedFoodObj && (
                    <span className="text-xs text-slate-400">
                      = {(selectedFoodObj.servingSize * servingQuantity).toFixed(0)} {selectedFoodObj.servingUnit}
                    </span>
                  )}
                </div>
              </div>

              {selectedFoodObj && (
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Estimated Calories:</span>
                    <strong className="text-amber-400">{Math.round(selectedFoodObj.calories * servingQuantity)} kcal</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Protein Content:</span>
                    <strong className="text-rose-400">{(selectedFoodObj.proteinG * servingQuantity).toFixed(1)}g</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Estimated Cost:</span>
                    <span>₹{(selectedFoodObj.avgCostInr * servingQuantity).toFixed(0)}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                Add Meal to Daily Log
              </button>
            </form>
          </div>

          {/* Today's Meals Timeline */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-base font-bold text-white mb-2">Today's Logged Meals ({summary?.meals?.length || 0})</h3>
            <p className="text-xs text-slate-400 mb-4">Breakdown by meal time</p>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {summary?.meals && summary.meals.length > 0 ? (
                summary.meals.map((meal) => (
                  <div key={meal.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-amber-300">{meal.mealType}</span>
                      <span className="text-[10px] text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 font-bold">
                        {meal.totalCalories} kcal
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 space-y-1 mt-2">
                      {meal.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>• {item.foodName} (x{item.quantity})</span>
                          <span className="text-rose-300">{item.calculatedProteinG}g P</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 text-center py-12">No meals logged for today yet.</p>
              )}
            </div>
          </div>

          {/* Food Catalog Browser */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white">Food Database</h3>
                <span className="text-[10px] text-slate-500">{foods.length} items</span>
              </div>

              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search food by name or type..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500"
                />
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {filteredFoods.map((f) => (
                  <div key={f.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{f.name}</span>
                      <span className="text-[10px] text-rose-400 font-bold">{f.proteinG}g protein</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>{f.servingSize} {f.servingUnit} • {f.calories} kcal</span>
                      <span className="text-amber-400 font-medium">₹{f.avgCostInr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-500 text-center">
              * Database includes estimated average market costs across Indian metro and suburban areas.
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};
