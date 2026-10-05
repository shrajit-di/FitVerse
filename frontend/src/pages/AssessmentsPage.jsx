import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  User, Activity, Target, Utensils, Heart, Award, 
  ChevronRight, CheckCircle2, Sparkles, Scale, Ruler, 
  Flame, HelpCircle, Save, ArrowRight, ShieldCheck, Dumbbell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function AssessmentsPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const [activeTab, setActiveTab] = useState('physical');
  const [activeStep, setActiveStep] = useState(1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    gender: 'male',
    age: 21,
    height: 183,
    weight: 86.5,
    bodyFat: 16.5,
    targetWeight: 82.0,
    neck: 39,
    chest: 104,
    waist: 84,
    hips: 98,
    activityLevel: 'moderate',
    primaryGoal: 'muscle',
    weeklyWorkouts: 5,
    dietType: 'high_protein',
    waterGoal: 4.0,
    targetWeeks: 12
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    setSavedSuccess(false);
  };

  // Calculations
  const heightInM = (formData.height || 180) / 100;
  const bmi = (formData.weight / (heightInM * heightInM)).toFixed(1);
  
  // Mifflin-St Jeor BMR
  const bmr = formData.gender === 'male'
    ? Math.round(10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5)
    : Math.round(10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  const tdee = Math.round(bmr * (activityMultipliers[formData.activityLevel] || 1.55));
  
  const targetCalories = formData.primaryGoal === 'muscle'
    ? tdee + 300
    : formData.primaryGoal === 'fat_loss'
    ? tdee - 500
    : tdee;

  const steps = [
    { id: 1, title: 'Basic Info', desc: 'Age, gender, height & weight' },
    { id: 2, title: 'Body Details', desc: 'Body fat & circumference metrics' },
    { id: 3, title: 'Activity Level', desc: 'Daily lifestyle & energy expenditure' },
    { id: 4, title: 'Fitness Goals', desc: 'Target weight, split & timeline' },
    { id: 5, title: 'Dietary Preferences', desc: 'Macro focus & hydration target' },
  ];

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <AppLayout title="Fitness Assessment & Calibration">
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Top Header & Overview Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Comprehensive Fitness & Biometric Assessment
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Keep your measurements updated to fine-tune AI workout volume and daily caloric targets.
            </p>
          </div>

          {/* Top Category Tabs */}
          <div className={`flex items-center p-1 rounded-2xl border ${
            isDark ? 'bg-[#0f111a] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            {[
              { id: 'physical', label: 'Physical Assessment', icon: Activity },
              { id: 'mental', label: 'Mental Wellness', icon: Heart },
              { id: 'lifestyle', label: 'Lifestyle', icon: Utensils },
              { id: 'goals', label: 'Goals', icon: Target },
            ].map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active 
                      ? 'bg-emerald-600 text-white shadow-md'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid: Left Step Wizard + Right Form Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Stepper Card */}
          <div className="lg:col-span-4 space-y-5">
            <div className={`p-6 rounded-3xl border transition-all ${
              isDark ? 'bg-[#0f111a] border-slate-800/80 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                  Assessment Steps
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                  Step {activeStep} of 5
                </span>
              </div>

              <div className="space-y-2">
                {steps.map(step => {
                  const isActive = activeStep === step.id;
                  const isCompleted = step.id < activeStep;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left transition-all ${
                        isActive
                          ? 'bg-emerald-600/15 border border-emerald-500/40 text-emerald-400'
                          : isDark
                          ? 'hover:bg-slate-800/50 text-slate-300 border border-transparent'
                          : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{step.title}</div>
                        <div className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {step.desc}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'rotate-90 text-emerald-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculated Biometric Intelligence Card */}
            <div className={`p-6 rounded-3xl border ${
              isDark ? 'bg-[#0f111a] border-slate-800/80 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Calculated Metabolic Profile
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] font-medium text-slate-400">Current BMI</div>
                  <div className="text-xl font-bold text-emerald-500 mt-0.5">{bmi}</div>
                  <div className="text-[10px] text-slate-400">Normal Range (18.5 - 24.9)</div>
                </div>

                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] font-medium text-slate-400">Basal BMR</div>
                  <div className="text-xl font-bold text-emerald-500 mt-0.5">{bmr.toLocaleString()} <span className="text-xs font-normal">cal</span></div>
                  <div className="text-[10px] text-slate-400">At pure rest</div>
                </div>

                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] font-medium text-slate-400">Daily TDEE</div>
                  <div className="text-xl font-bold text-emerald-500 mt-0.5">{tdee.toLocaleString()} <span className="text-xs font-normal">cal</span></div>
                  <div className="text-[10px] text-slate-400">With {formData.activityLevel} activity</div>
                </div>

                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] font-medium text-slate-400">Target Intake</div>
                  <div className="text-xl font-bold text-emerald-500 mt-0.5">{targetCalories.toLocaleString()} <span className="text-xs font-normal">cal</span></div>
                  <div className="text-[10px] text-slate-400">For {formData.primaryGoal.replace('_', ' ')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Form Area */}
          <div className="lg:col-span-8">
            <div className={`p-7 rounded-3xl border transition-all ${
              isDark ? 'bg-[#0f111a] border-slate-800/80 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              
              {/* Step 1: Basic Info */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      1. Basic Demographics & Baseline Vitals
                    </h2>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      These metrics establish your foundational metabolic baseline.
                    </p>
                  </div>

                  {/* Gender Selector */}
                  <div>
                    <label className={`block text-xs font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Biological Gender
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['male', 'female', 'other'].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleChange('gender', g)}
                          className={`py-3 px-4 rounded-2xl border text-center capitalize text-sm font-semibold transition-all ${
                            formData.gender === g
                              ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                              : isDark
                              ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age, Height, Weight Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Age (Years)
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={e => handleChange('age', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden transition-all ${
                          isDark 
                            ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={e => handleChange('height', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden transition-all ${
                          isDark 
                            ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.weight}
                        onChange={e => handleChange('weight', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden transition-all ${
                          isDark 
                            ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Body Details */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      2. Body Composition & Tape Circumferences
                    </h2>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Circumference measurements track lean mass vs fat loss progress beyond the scale.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Estimated Body Fat %
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.bodyFat}
                        onChange={e => handleChange('bodyFat', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Chest Circumference (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.chest}
                        onChange={e => handleChange('chest', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Waist at Navel (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.waist}
                        onChange={e => handleChange('waist', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Hips / Glutes (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.hips}
                        onChange={e => handleChange('hips', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Activity Level */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      3. Daily Activity & Energy Expenditure
                    </h2>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Select the tier that best matches your typical non-exercise movement + workouts.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'sedentary', label: 'Sedentary', desc: 'Desk job, little to no intentional exercise', factor: '1.2x' },
                      { id: 'light', label: 'Lightly Active', desc: '1-3 light exercise sessions per week or standing desk', factor: '1.375x' },
                      { id: 'moderate', label: 'Moderately Active', desc: '3-5 moderate resistance or cardio sessions per week', factor: '1.55x' },
                      { id: 'active', label: 'Very Active', desc: '6-7 intense training sessions per week or physical job', factor: '1.725x' },
                      { id: 'very_active', label: 'Extremely Active', desc: 'Competitive athlete or heavy physical labor + double days', factor: '1.9x' },
                    ].map(lvl => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => handleChange('activityLevel', lvl.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                          formData.activityLevel === lvl.id
                            ? 'bg-emerald-600/15 border-emerald-500 text-emerald-400'
                            : isDark
                            ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-semibold">{lvl.label}</div>
                          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{lvl.desc}</div>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                          {lvl.factor} BMR
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Goals */}
              {activeStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      4. Fitness Goal & Target Timeline
                    </h2>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Select your primary target for the upcoming 12-week macro cycle.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'muscle', label: 'Build Muscle', sub: 'Hypertrophy & progressive overload' },
                      { id: 'fat_loss', label: 'Burn Fat', sub: 'Caloric deficit & lean preservation' },
                      { id: 'recomp', label: 'Body Recomposition', sub: 'Simultaneous fat loss & tone' },
                    ].map(goal => (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => handleChange('primaryGoal', goal.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.primaryGoal === goal.id
                            ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                            : isDark
                            ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold text-sm">{goal.label}</div>
                        <div className="text-xs mt-1 opacity-80">{goal.sub}</div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Target Weight (kg)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.targetWeight}
                        onChange={e => handleChange('targetWeight', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Training Frequency (Days / Week)
                      </label>
                      <select
                        value={formData.weeklyWorkouts}
                        onChange={e => handleChange('weeklyWorkouts', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      >
                        {[3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} days per week</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Dietary Preferences */}
              {activeStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      5. Nutrition Structure & Hydration Goals
                    </h2>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Customize macro balance for optimal muscular recovery and satiety.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Dietary Preference
                      </label>
                      <select
                        value={formData.dietType}
                        onChange={e => handleChange('dietType', e.target.value)}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      >
                        <option value="high_protein">High Protein (Balanced Carbs & Fats)</option>
                        <option value="keto">Ketogenic (Low Carb, High Healthy Fat)</option>
                        <option value="vegetarian">Vegetarian High Protein</option>
                        <option value="vegan">100% Plant-Based Vegan</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Daily Water Goal (Liters)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.waterGoal}
                        onChange={e => handleChange('waterGoal', Number(e.target.value))}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-hidden ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons: Next / Back / Save */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800/40">
                <button
                  type="button"
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeStep === 1
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                  }`}
                >
                  Previous Step
                </button>

                <div className="flex items-center gap-3">
                  {savedSuccess && (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Assessment Saved!
                    </span>
                  )}

                  {activeStep < 5 ? (
                    <button
                      type="button"
                      onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
                    >
                      <Save className="w-4 h-4" /> Save & Recalculate Plan
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
