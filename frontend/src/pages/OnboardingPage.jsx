import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Activity, Brain, Dumbbell, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';

export const OnboardingPage = () => {
  const { user, updateUserState } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    age: 24,
    gender: 'MALE',
    heightCm: 175,
    weightKg: 72,
    fitnessLevel: 'INTERMEDIATE',
    activityLevel: 'MODERATELY_ACTIVE',
    workoutFrequency: 4,
    dietaryPreference: 'VEGETARIAN',
    primaryGoal: 'MUSCLE_GAIN',
    preferredLanguage: 'English',
    communicationStyle: 'Motivational',
  });

  useEffect(() => {
    const fetchExistingProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        if (res.data?.data) {
          const p = res.data.data;
          setFormData((prev) => ({
            ...prev,
            age: p.age || prev.age,
            gender: p.gender || prev.gender,
            heightCm: p.heightCm || prev.heightCm,
            weightKg: p.weightKg || prev.weightKg,
            fitnessLevel: p.fitnessLevel || prev.fitnessLevel,
            activityLevel: p.activityLevel || prev.activityLevel,
            workoutFrequency: p.workoutFrequency || prev.workoutFrequency,
            dietaryPreference: p.dietaryPreference || prev.dietaryPreference,
            primaryGoal: p.primaryGoal || prev.primaryGoal,
            preferredLanguage: p.preferredLanguage || prev.preferredLanguage,
            communicationStyle: p.communicationStyle || prev.communicationStyle,
          }));
        }
      } catch (err) {
        console.log('No prior profile yet, using defaults.');
      }
    };
    fetchExistingProfile();
  }, []);

  const heightM = (formData.heightCm || 170) / 100;
  const bmi = (formData.weightKg / (heightM * heightM)).toFixed(1);

  const calculateEstCalories = () => {
    let bmr = (10 * formData.weightKg) + (6.25 * formData.heightCm) - (5 * formData.age);
    bmr += formData.gender === 'MALE' ? 5 : -161;

    const mults = {
      SEDENTARY: 1.2,
      LIGHTLY_ACTIVE: 1.375,
      MODERATELY_ACTIVE: 1.55,
      VERY_ACTIVE: 1.725,
      EXTREMELY_ACTIVE: 1.9,
    };
    const tdee = bmr * (mults[formData.activityLevel] || 1.55);

    if (formData.primaryGoal === 'WEIGHT_LOSS') return Math.round(tdee - 500);
    if (formData.primaryGoal === 'MUSCLE_GAIN') return Math.round(tdee + 300);
    if (formData.primaryGoal === 'STRENGTH') return Math.round(tdee + 200);
    return Math.round(tdee);
  };

  const handleComplete = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await api.put('/users/profile', {
        ...formData,
        onboardingCompleted: true,
      });

      updateUserState({ onboardingCompleted: true });
      navigate('/dashboard');
    } catch (err) {
      console.error('Onboarding save error:', err);
      setError(err.response?.data?.message || 'Failed to save profile. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12 w-full flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-8 max-w-md mx-auto w-full">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  step === s
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30'
                    : step > s
                    ? 'bg-teal-950 text-teal-400 border border-teal-800'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`text-xs font-semibold ${step === s ? 'text-white' : 'text-slate-500'}`}>
                {s === 1 ? 'Vitals & BMI' : s === 2 ? 'Goals & Nutrition' : 'Preferences'}
              </span>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 rounded-2xl shadow-2xl">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-teal-400" />
                  Your Body Vitals & Assessment
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fitverse uses these measurements to compute your BMR, TDEE, and calorie baseline estimates.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age</label>
                  <input
                    type="number"
                    min={12}
                    max={100}
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:border-teal-500"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Height (cm)</label>
                  <input
                    type="number"
                    min={100}
                    max={250}
                    value={formData.heightCm}
                    onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Weight (kg)</label>
                  <input
                    type="number"
                    min={30}
                    max={250}
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Calculated BMI Estimate</p>
                  <p className="text-2xl font-black text-teal-400">{bmi}</p>
                  <p className="text-[10px] text-slate-500">
                    {bmi < 18.5 ? 'Underweight range' : bmi < 25 ? 'Healthy range' : 'Above standard range'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Target Daily Intake</p>
                  <p className="text-2xl font-black text-rose-400">~{calculateEstCalories()} kcal</p>
                  <p className="text-[10px] text-slate-500">Includes activity & goal adjustment</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Daily Activity Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'SEDENTARY', title: 'Sedentary', sub: 'Desk job, little movement' },
                    { id: 'MODERATELY_ACTIVE', title: 'Moderate', sub: 'Active 3-5 days/week' },
                    { id: 'VERY_ACTIVE', title: 'Very Active', sub: 'Heavy exercise / athletics' },
                  ].map((act) => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, activityLevel: act.id })}
                      className={`p-3 rounded-xl border text-left transition ${
                        formData.activityLevel === act.id
                          ? 'bg-teal-500/10 border-teal-500/60 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <p className="text-xs font-bold">{act.title}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{act.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs flex items-center gap-2 transition"
                >
                  <span>Continue to Goals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-rose-400" />
                  Fitness Goal & Diet Preferences
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tailors your workout splits, student budget meal plans, and nutrient targets.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Goal</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'MUSCLE_GAIN', label: '💪 Muscle Gain' },
                    { id: 'WEIGHT_LOSS', label: '🔥 Fat Loss' },
                    { id: 'STRENGTH', label: '🏋️ Pure Strength' },
                    { id: 'ENDURANCE', label: '🏃 Endurance' },
                    { id: 'GENERAL_FITNESS', label: '🧘 General Health' },
                    { id: 'MAINTENANCE', label: '⚖️ Maintenance' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, primaryGoal: g.id })}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                        formData.primaryGoal === g.id
                          ? 'bg-rose-500/10 border-rose-500/60 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Dietary Preference</label>
                  <select
                    value={formData.dietaryPreference}
                    onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-teal-500"
                  >
                    <option value="VEGETARIAN">Vegetarian</option>
                    <option value="NON_VEGETARIAN">Non-Vegetarian</option>
                    <option value="EGGETARIAN">Eggetarian</option>
                    <option value="VEGAN">Vegan</option>
                    <option value="JAIN">Jain</option>
                    <option value="KETO">Keto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Weekly Workout Frequency</label>
                  <select
                    value={formData.workoutFrequency}
                    onChange={(e) => setFormData({ ...formData, workoutFrequency: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-teal-500"
                  >
                    <option value={3}>3 Days / Week (Full Body Split)</option>
                    <option value={4}>4 Days / Week (Upper / Lower)</option>
                    <option value={5}>5 Days / Week (Push / Pull / Legs)</option>
                    <option value={6}>6 Days / Week (Athletic Split)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl font-bold bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs flex items-center gap-2 transition"
                >
                  <span>Continue to Preferences</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-amber-400" />
                  AI Voice Assistant & Mental Style
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Configure how "Talk to Fitverse" and your personalized daily mind-body insights communicate with you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Language</label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-teal-500"
                  >
                    <option value="English">English</option>
                    <option value="Hinglish">Hinglish (Natural Conversational)</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Voice Coach Style</label>
                  <select
                    value={formData.communicationStyle}
                    onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-teal-500"
                  >
                    <option value="Motivational">🔥 Motivational & Energizing</option>
                    <option value="Friendly">🤝 Friendly & Empathetic</option>
                    <option value="Professional">📊 Analytical & Professional</option>
                    <option value="Simple">🌱 Calm & Simple</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" /> All Set!
                </p>
                <p>
                  Your baseline profile is ready. You can modify your metrics, sleep targets, and goals anytime from the dashboard.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleComplete}
                  disabled={loading}
                  className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-rose-500 hover:from-teal-400 hover:to-rose-400 text-slate-950 text-xs flex items-center gap-2 shadow-xl shadow-teal-500/20 disabled:opacity-50 transition"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Launch My Fitverse Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
