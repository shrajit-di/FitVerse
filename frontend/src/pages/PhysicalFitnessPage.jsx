import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { 
  Dumbbell, 
  Flame, 
  Utensils, 
  MapPin, 
  Sparkles, 
  MessageSquare, 
  Plus, 
  Activity, 
  Rotate3d, 
  Send,
  UserCheck
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Human3DMuscleVisualizer } from '../components/anatomy/Human3DMuscleVisualizer';

export const PhysicalFitnessPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('anatomy'); // anatomy, assessment, exercises, workout-log, budget-diet, gyms, assistance

  // Assessment state
  const [assessmentForm, setAssessmentForm] = useState({
    age: 24,
    gender: 'MALE',
    heightCm: 175,
    weightKg: 74,
    fitnessLevel: 'INTERMEDIATE',
    goalType: 'MUSCLE_GAIN',
  });
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [assessmentLoading, setAssessmentLoading] = useState(false);

  // Exercise Library
  const [exercises, setExercises] = useState([]);
  const [exerciseFilter, setExerciseFilter] = useState('ALL');

  // Workout Logger state
  const [workoutTitle, setWorkoutTitle] = useState('Upper Body Hypertrophy');
  const [workoutDuration, setWorkoutDuration] = useState(50);
  const [workoutRpe, setWorkoutRpe] = useState(8);
  const [workoutSets, setWorkoutSets] = useState([
    { exerciseId: 1, exerciseName: 'Barbell Bench Press', setNumber: 1, repsCompleted: 10, weightKg: 70 },
    { exerciseId: 1, exerciseName: 'Barbell Bench Press', setNumber: 2, repsCompleted: 8, weightKg: 75 },
    { exerciseId: 5, exerciseName: 'Lat Pulldown', setNumber: 1, repsCompleted: 12, weightKg: 55 },
  ]);
  const [workoutHistory, setWorkoutHistory] = useState([]);

  // Budget Diet Planner state
  const [budgetInr, setBudgetInr] = useState(150);
  const [budgetPlan, setBudgetPlan] = useState(null);

  // Gyms List
  const [gyms, setGyms] = useState([
    { id: 1, name: 'PowerHouse Fitness & CrossFit', distanceKm: 1.2, rating: 4.8, priceInr: 1800, equipment: 'Free Weights, Cables, Squat Racks, CrossFit Zone' },
    { id: 2, name: 'IronClad Gym & Strength Hub', distanceKm: 2.1, rating: 4.6, priceInr: 1500, equipment: 'Heavy Barbells, Dumbbells to 50kg, Benches, Sauna' },
    { id: 3, name: 'FitLife Wellness & Yoga Club', distanceKm: 2.9, rating: 4.7, priceInr: 2200, equipment: 'Cardio Studio, Machines, Swimming Pool, Yoga Deck' },
  ]);

  // AI & Assistance state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Welcome to the Physical Fitness Arena! I am your AI Fitness & Nutrition Coach. Need a workout split, progressive overload tip, or high-protein budget meal plan?' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [assistanceType, setAssistanceType] = useState('PHYSICAL_TRAINER');
  const [userNotes, setUserNotes] = useState('');
  const [timeSlot, setTimeSlot] = useState('Tomorrow Morning (7 AM - 9 AM)');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const loadPhysicalData = async () => {
      try {
        const [assessRes, exRes, workRes] = await Promise.all([
          api.get('/physical/assessment/latest').catch(() => null),
          api.get('/physical/exercises').catch(() => null),
          api.get('/physical/workout-logs/history').catch(() => null),
        ]);

        if (assessRes?.data?.data) setAssessmentResult(assessRes.data.data);
        if (exRes?.data?.data) setExercises(exRes.data.data);
        if (workRes?.data?.data) setWorkoutHistory(workRes.data.data);
      } catch (err) {
        console.error('Error loading physical data:', err);
      }
    };
    loadPhysicalData();
  }, []);

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setAssessmentLoading(true);
    try {
      const res = await api.post('/physical/assessment', assessmentForm);
      setAssessmentResult(res.data.data);
    } catch (err) {
      console.error('Physical assessment error:', err);
    } finally {
      setAssessmentLoading(false);
    }
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/physical/workout-logs', {
        title: workoutTitle,
        durationMinutes: workoutDuration,
        rpeScore: workoutRpe,
        sets: workoutSets,
      });
      setWorkoutHistory((prev) => [{ title: workoutTitle, durationMinutes: workoutDuration, rpeScore: workoutRpe, sets: workoutSets }, ...prev]);
      alert('Workout logged with volume metrics!');
    } catch (err) {
      console.error('Workout log error:', err);
    }
  };

  const handleGenerateBudgetDiet = () => {
    const items = [
      { food: 'Soya Chunks (100g cooked)', proteinG: 52, costInr: 15, calories: 345 },
      { food: 'Lentils / Dal (1.5 cups cooked)', proteinG: 18, costInr: 20, calories: 230 },
      { food: 'Double Toned Milk / Curd (400ml)', proteinG: 14, costInr: 24, calories: 240 },
      { food: 'Boiled Eggs (4 eggs) / Paneer (100g)', proteinG: 24, costInr: 32, calories: 280 },
      { food: 'Rolled Oats with Banana (80g)', proteinG: 10, costInr: 18, calories: 310 },
      { food: 'Peanut Butter + Whole Wheat Roti (2)', proteinG: 12, costInr: 16, calories: 290 },
    ];

    const totalProtein = items.reduce((a, b) => a + b.proteinG, 0);
    const totalCost = items.reduce((a, b) => a + b.costInr, 0);
    const totalCals = items.reduce((a, b) => a + b.calories, 0);

    setBudgetPlan({
      items,
      totalProtein,
      totalCost,
      totalCals,
      proteinPerRupee: (totalProtein / totalCost).toFixed(2),
    });
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await api.post('/assistance/ai-chat', {
        domain: 'PHYSICAL',
        message: userText,
      });
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: res.data.data.reply, suggestions: res.data.data.suggestions }
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'I am ready to plan your next workout or optimize your protein intake. What goal are you targeting?' }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/assistance/request', {
        domain: 'PHYSICAL',
        assistanceType,
        userNotes,
        preferredTimeSlot: timeSlot,
      });
      setBookingSuccess(true);
      setUserNotes('');
      setTimeout(() => setBookingSuccess(false), 4000);
    } catch (err) {
      console.error('Booking error:', err);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[var(--border-main)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                Physical Fitness Arena
              </span>
            </div>
            <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-3">
              <Dumbbell className="w-8 h-8 text-rose-500" />
              Body Conditioning, 3D Muscles & Workouts
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              3D interactive muscle anatomy, BMR/TDEE calculation, progressive overload tracking, and trainer services.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-[11px] text-[var(--text-secondary)] max-w-xs">
            <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5 mb-0.5">
              <Flame className="w-3.5 h-3.5 text-rose-500" /> Progressive Overload Engine
            </span>
            Log volume and sets consistently to trigger automatic hypertrophy adjustments.
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-2">
          {[
            { id: 'anatomy', label: '🧬 3D Muscle Anatomy', icon: Rotate3d },
            { id: 'assessment', label: '📊 Physical Assessment', icon: Activity },
            { id: 'exercises', label: '🏋️ Exercise Catalog', icon: Dumbbell },
            { id: 'workout-log', label: '📝 Log Workout', icon: Plus },
            { id: 'budget-diet', label: '🥗 Budget Diet Planner', icon: Utensils },
            { id: 'gyms', label: '📍 Nearby Gyms', icon: MapPin },
            { id: 'assistance', label: '🤖 Seek Fitness Assistance', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20 font-extrabold'
                    : 'bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: 3D MUSCLE ANATOMY EXPLORER */}
        {activeTab === 'anatomy' && (
          <Human3DMuscleVisualizer
            onSelectMuscleForWorkout={(m) => {
              setWorkoutTitle(`${m.name} Focus Session`);
              setActiveTab('workout-log');
            }}
          />
        )}

        {/* TAB 2: PHYSICAL ASSESSMENT */}
        {activeTab === 'assessment' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 fit-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Physical Fitness & Body Composition Assessment</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-6">
                Calculates your BMI, Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and macro targets.
              </p>

              <form onSubmit={handleAssessmentSubmit} className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Age</label>
                    <input
                      type="number"
                      value={assessmentForm.age}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, age: Number(e.target.value) })}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Gender</label>
                    <select
                      value={assessmentForm.gender}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, gender: e.target.value })}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Height (cm)</label>
                    <input
                      type="number"
                      value={assessmentForm.heightCm}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, heightCm: Number(e.target.value) })}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Weight (kg)</label>
                    <input
                      type="number"
                      value={assessmentForm.weightKg}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, weightKg: Number(e.target.value) })}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Fitness Level</label>
                    <select
                      value={assessmentForm.fitnessLevel}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, fitnessLevel: e.target.value })}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    >
                      <option value="BEGINNER">Beginner (&lt; 1 year training)</option>
                      <option value="INTERMEDIATE">Intermediate (1 - 3 years training)</option>
                      <option value="ADVANCED">Advanced (3+ years consistent lifting)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Primary Fitness Goal</label>
                    <select
                      value={assessmentForm.goalType}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, goalType: e.target.value })}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    >
                      <option value="MUSCLE_GAIN">Hypertrophy / Muscle Gain (+300 kcal)</option>
                      <option value="WEIGHT_LOSS">Fat Loss / Calorie Deficit (-500 kcal)</option>
                      <option value="STRENGTH">Pure Strength & Power (+200 kcal)</option>
                      <option value="GENERAL_FITNESS">General Health & Conditioning</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={assessmentLoading}
                  className="w-full py-3 rounded-2xl font-bold bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white shadow-lg shadow-rose-500/20 text-xs flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  {assessmentLoading ? 'Calculating...' : 'Run Physical Calculations'}
                </button>
              </form>
            </div>

            {/* Results Sidebar */}
            <div className="fit-card p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-500" /> Physical Assessment Metrics
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mb-4">Mifflin-St Jeor & Deurenberg models</p>

                {assessmentResult ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-center">
                      <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)]">Target Daily Intake</p>
                      <p className="text-3xl font-black text-rose-500 my-1">{assessmentResult.dailyTargetCalories} <span className="text-xs text-slate-400">kcal/day</span></p>
                      <p className="text-[11px] text-[var(--text-secondary)]">Target Protein: <strong className="text-[var(--text-primary)]">{assessmentResult.dailyProteinTargetG}g / day</strong></p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)]">
                        <span className="text-[var(--text-secondary)] text-[10px]">BMI Score:</span>
                        <p className="font-black text-[var(--text-primary)] text-base">{assessmentResult.bmi}</p>
                        <span className="text-[10px] text-rose-400">{assessmentResult.bmiCategory}</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)]">
                        <span className="text-[var(--text-secondary)] text-[10px]">Est. Body Fat:</span>
                        <p className="font-black text-[var(--text-primary)] text-base">~{assessmentResult.bodyFatPctEst}%</p>
                        <span className="text-[10px] text-slate-400">Deurenberg est.</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-[var(--border-main)] rounded-2xl">
                    Submit the form to compute your metabolic baseline metrics.
                  </div>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-[var(--border-main)]">
                <button
                  onClick={() => setActiveTab('assistance')}
                  className="w-full py-2.5 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] hover:border-rose-500/40 text-xs font-semibold text-rose-400 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Consult Certified Trainer for This Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXERCISE CATALOG */}
        {activeTab === 'exercises' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Exercise Database & Muscle Target Index</h3>
                <p className="text-xs text-[var(--text-secondary)]">Form instructions, equipment requirements, and secondary drivers.</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['ALL', 'CHEST', 'BACK', 'LEGS', 'SHOULDERS', 'CORE'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setExerciseFilter(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      exerciseFilter === cat
                        ? 'bg-rose-500 text-white'
                        : 'bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises
                .filter((e) => exerciseFilter === 'ALL' || e.category === exerciseFilter)
                .map((ex) => (
                  <div key={ex.id} className="fit-card p-5 rounded-3xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 uppercase">
                          {ex.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{ex.difficulty}</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-[var(--text-primary)]">{ex.name}</h4>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                        Primary: <strong className="text-rose-400">{ex.muscleGroup}</strong>
                      </p>
                      {ex.secondaryMuscles && (
                        <p className="text-[10px] text-slate-400">Secondary: {ex.secondaryMuscles}</p>
                      )}
                      <p className="text-xs text-[var(--text-secondary)] mt-3 line-clamp-3 leading-relaxed">
                        {ex.instructions}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--border-main)] flex items-center justify-between text-[11px]">
                      <span>Equip: <strong className="text-[var(--text-primary)]">{ex.equipmentNeeded}</strong></span>
                      <button
                        onClick={() => {
                          setWorkoutSets([...workoutSets, { exerciseId: ex.id, exerciseName: ex.name, setNumber: 1, repsCompleted: 10, weightKg: 50 }]);
                          setActiveTab('workout-log');
                        }}
                        className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add to Log
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: WORKOUT LOGGER */}
        {activeTab === 'workout-log' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 fit-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-rose-500" /> Log Workout Session
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-6">Record sets, reps, and weights for progressive overload analysis.</p>

              <form onSubmit={handleWorkoutSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Session Title</label>
                    <input
                      type="text"
                      required
                      value={workoutTitle}
                      onChange={(e) => setWorkoutTitle(e.target.value)}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Duration (mins)</label>
                    <input
                      type="number"
                      value={workoutDuration}
                      onChange={(e) => setWorkoutDuration(Number(e.target.value))}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">RPE Exertion (1-10)</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={workoutRpe}
                      onChange={(e) => setWorkoutRpe(Number(e.target.value))}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Sets */}
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[var(--text-primary)]">Logged Sets ({workoutSets.length})</span>
                    <button
                      type="button"
                      onClick={() => setWorkoutSets([...workoutSets, { exerciseId: 1, exerciseName: 'Barbell Bench Press', setNumber: workoutSets.length + 1, repsCompleted: 10, weightKg: 60 }])}
                      className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Set
                    </button>
                  </div>

                  {workoutSets.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] grid grid-cols-4 gap-2 items-center text-xs">
                      <span className="font-bold text-[var(--text-primary)] truncate">{s.exerciseName}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[var(--text-secondary)] text-[10px]">Reps:</span>
                        <input
                          type="number"
                          value={s.repsCompleted}
                          onChange={(e) => {
                            const newSets = [...workoutSets];
                            newSets[idx].repsCompleted = Number(e.target.value);
                            setWorkoutSets(newSets);
                          }}
                          className="w-14 bg-[var(--bg-card)] border border-[var(--border-main)] rounded px-1.5 py-1 text-center text-[var(--text-primary)]"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[var(--text-secondary)] text-[10px]">Kg:</span>
                        <input
                          type="number"
                          value={s.weightKg}
                          onChange={(e) => {
                            const newSets = [...workoutSets];
                            newSets[idx].weightKg = Number(e.target.value);
                            setWorkoutSets(newSets);
                          }}
                          className="w-14 bg-[var(--bg-card)] border border-[var(--border-main)] rounded px-1.5 py-1 text-center text-[var(--text-primary)]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setWorkoutSets(workoutSets.filter((_, i) => i !== idx))}
                        className="text-[10px] text-rose-500 hover:underline text-right"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-bold bg-rose-500 hover:bg-rose-400 text-white text-xs transition cursor-pointer"
                >
                  Save Workout Log
                </button>
              </form>
            </div>

            {/* History */}
            <div className="fit-card p-6 rounded-3xl">
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">Recent Workout History</h3>
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {workoutHistory.length > 0 ? (
                  workoutHistory.map((w, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-[var(--text-primary)]">{w.title}</span>
                        <span className="text-[10px] text-rose-500 font-bold">
                          {w.durationMinutes} mins
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        {w.sets?.length || 0} sets recorded • RPE: {w.rpeScore || 7}/10
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-8">No workout logs recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BUDGET DIET */}
        {activeTab === 'budget-diet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="fit-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Student Budget Diet Planner</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-6">
                Maximizes protein and nutrient intake per Indian Rupee (₹) using high-yield vegetarian and egg staples.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                    Target Daily Budget: <strong className="text-amber-500">₹{budgetInr} / day</strong>
                  </label>
                  <input
                    type="range"
                    min={80}
                    max={400}
                    step={10}
                    value={budgetInr}
                    onChange={(e) => setBudgetInr(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₹80 (Ultra-Budget)</span>
                    <span>₹200 (Balanced)</span>
                    <span>₹400 (Premium)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateBudgetDiet}
                  className="w-full py-3 rounded-2xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  Generate Optimized Budget Plan
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 fit-card p-6 rounded-3xl">
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Optimized Meal Breakdown</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-4">Calculated high-yield macro breakdown</p>

              {budgetPlan ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-center">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)]">Total Protein</p>
                      <p className="text-2xl font-black text-rose-500">{budgetPlan.totalProtein}g</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)]">Estimated Cost</p>
                      <p className="text-2xl font-black text-amber-500">₹{budgetPlan.totalCost}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)]">Efficiency</p>
                      <p className="text-2xl font-black text-emerald-500">{budgetPlan.proteinPerRupee}g / ₹</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {budgetPlan.items.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-[var(--text-primary)]">{item.food}</p>
                          <p className="text-[10px] text-[var(--text-secondary)]">{item.calories} kcal</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-rose-500">{item.proteinG}g protein</span>
                          <p className="text-[10px] text-amber-500">₹{item.costInr}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center text-xs text-slate-400 border border-dashed border-[var(--border-main)] rounded-2xl">
                  Click 'Generate Optimized Budget Plan' to calculate your recommendations.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: GYMS */}
        {activeTab === 'gyms' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" /> Discover Nearby Gyms & Fitness Centers
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">Filtered by equipment, pricing, trainer availability, and distance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gyms.map((gym) => (
                <div key={gym.id} className="fit-card p-5 rounded-3xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        {gym.distanceKm} km away
                      </span>
                      <span className="text-xs font-bold text-amber-500">★ {gym.rating}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-[var(--text-primary)]">{gym.name}</h4>
                    <p className="text-xs font-bold text-rose-500 mt-1">₹{gym.priceInr} / month</p>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-2">{gym.equipment}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-main)] flex justify-between items-center">
                    <button
                      onClick={() => alert(`Directions requested for ${gym.name}`)}
                      className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                    >
                      View Directions
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('assistance');
                        setUserNotes(`Interested in trial session at ${gym.name}`);
                      }}
                      className="px-3 py-1 rounded-xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-xs text-[var(--text-primary)] hover:border-rose-500 cursor-pointer"
                    >
                      Book Trial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: ASSISTANCE */}
        {activeTab === 'assistance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Coach */}
            <div className="fit-card p-6 rounded-3xl flex flex-col h-[520px]">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)] mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">Physical AI Coach</h3>
                    <p className="text-[10px] text-[var(--text-secondary)]">Workout routines & nutrition modifier</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                  Online
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-3">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-rose-500 text-white font-bold rounded-br-none'
                        : 'bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-[var(--text-primary)] rounded-bl-none'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {chatLoading && <div className="text-xs text-slate-400 italic">Thinking...</div>}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-[var(--border-main)]">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask for workout splits or diet adjustments..."
                  className="flex-1 bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:border-rose-500"
                />
                <button type="submit" className="p-2.5 rounded-xl bg-rose-500 text-white font-bold cursor-pointer">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Book Trainer */}
            <div className="fit-card p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-rose-500" /> Book Certified Personal Trainer
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mb-6">
                  Schedule personal coaching, form correction checks, and tailored weekly workout programming.
                </p>

                {bookingSuccess && (
                  <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                    ✓ Trainer request received! A certified coach will contact you.
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Assistance Type</label>
                    <select
                      value={assistanceType}
                      onChange={(e) => setAssistanceType(e.target.value)}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2.5 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    >
                      <option value="PHYSICAL_TRAINER">One-on-One Personal Training Session</option>
                      <option value="WORKOUT_PLANNING">Custom Split & Hypertrophy Program</option>
                      <option value="DIET_CONSULTATION">Macro Optimization & Nutrition Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Preferred Time Window</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl px-3 py-2.5 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    >
                      <option value="Tomorrow Morning (6 AM - 8 AM)">Tomorrow Morning (6 AM - 8 AM)</option>
                      <option value="Tomorrow Evening (5 PM - 7 PM)">Tomorrow Evening (5 PM - 7 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Specific Focus / Goals</label>
                    <textarea
                      rows={3}
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      placeholder="E.g. Squat depth check, bench press sticking point..."
                      className="w-full bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-xl p-3 text-xs text-[var(--text-primary)] focus:border-rose-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl font-bold bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 text-white text-xs shadow-lg shadow-rose-500/20 transition cursor-pointer"
                  >
                    Request Trainer Consultation
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};
