import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  Play, CheckCircle2, Clock, Flame, ChevronRight, X, 
  Dumbbell, Sparkles, Video, Info, Check, RotateCcw, Award,
  ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function WorkoutPage() {
  const { isDark } = useTheme();

  const daysOfWeek = [
    { key: 'mon', day: 'Mon', split: 'Push', focus: 'Chest / Delts / Triceps', active: true },
    { key: 'tue', day: 'Tue', split: 'Pull', focus: 'Back & Biceps', active: false },
    { key: 'wed', day: 'Wed', split: 'Legs', focus: 'Quads & Calves', active: false },
    { key: 'thu', day: 'Thu', split: 'Rest', focus: 'Active Recovery', active: false },
    { key: 'fri', day: 'Fri', split: 'Upper', focus: 'Upper Hypertrophy', active: false },
    { key: 'sat', day: 'Sat', split: 'Lower', focus: 'Hamstrings & Glutes', active: false },
    { key: 'sun', day: 'Sun', split: 'Stretch', focus: 'Mobility & Core', active: false },
  ];

  const [selectedDay, setSelectedDay] = useState('mon');
  const [activeModalExercise, setActiveModalExercise] = useState(null);
  const [completedExercises, setCompletedExercises] = useState({});
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);

  const exercises = [
    {
      id: 'ex1',
      name: 'Incline Barbell Bench Press',
      target: 'Upper Pectorals & Front Deltoid',
      sets: '4 Sets',
      reps: '8 - 10 Reps',
      load: '75 kg',
      rest: '90s rest',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop&q=60',
      cues: [
        'Set bench angle to roughly 30 degrees to minimize anterior deltoid takeover.',
        'Retract scapulae and drive through your heels for a solid base.',
        'Lower bar to upper collarbone area with controlled 2-second eccentric phase.'
      ],
      primaryMuscles: ['Clavicular Pectoralis', 'Anterior Deltoid', 'Triceps Brachii']
    },
    {
      id: 'ex2',
      name: 'Dumbbell Lateral Raises',
      target: 'Lateral Deltoids (Cap & Width)',
      sets: '4 Sets',
      reps: '12 - 15 Reps',
      load: '12.5 kg',
      rest: '60s rest',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60',
      cues: [
        'Lead with the elbows, maintaining a subtle 15-degree forward lean.',
        'Raise to parallel with shoulders; do not use momentum or trap shrug.',
        'Pause for 0.5s at peak contraction for maximum lateral head recruitment.'
      ],
      primaryMuscles: ['Lateral Deltoid', 'Supraspinatus', 'Upper Trapezius']
    },
    {
      id: 'ex3',
      name: 'Overhead Cable Tricep Extension',
      target: 'Triceps Long Head',
      sets: '3 Sets',
      reps: '10 - 12 Reps',
      load: '28 kg',
      rest: '60s rest',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60',
      cues: [
        'Keep elbows pinned overhead and flared slightly outwards.',
        'Allow full deep stretch in the long head behind neck.',
        'Lock out aggressively and squeeze triceps at full extension.'
      ],
      primaryMuscles: ['Triceps Brachii Long Head', 'Lateral Head']
    },
    {
      id: 'ex4',
      name: 'Incline Cable Chest Flyes',
      target: 'Sternal & Clavicular Pecs',
      sets: '3 Sets',
      reps: '12 - 15 Reps',
      load: '20 kg / side',
      rest: '60s rest',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=60',
      cues: [
        'Hug a wide barrel with a slight bend in the elbows.',
        'Focus on bringing the inner bicep heads towards each other at the top.',
        'Squeeze pecs hard for 1 full second at peak contraction.'
      ],
      primaryMuscles: ['Pectoralis Major', 'Anterior Deltoid']
    },
    {
      id: 'ex5',
      name: 'Seated Dumbbell Overhead Shoulder Press',
      target: 'Deltoid Compound Mass',
      sets: '4 Sets',
      reps: '8 - 10 Reps',
      load: '24 kg / side',
      rest: '90s rest',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60',
      cues: [
        'Seat bench at 75-80 degrees for shoulder safety.',
        'Press dumbells up in a gentle arc without clanking weights at top.',
        'Control negative descent until dumbbells reach ear level.'
      ],
      primaryMuscles: ['Anterior Deltoid', 'Lateral Deltoid', 'Triceps']
    }
  ];

  const toggleComplete = (id) => {
    setCompletedExercises(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(completedExercises).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / exercises.length) * 100);

  return (
    <AppLayout title="Workout Plan & Training Routine">
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* 7-Day Split Selector Bar */}
        <div className={`p-4 rounded-3xl border transition-all ${
          isDark ? 'bg-[#0f111a] border-slate-800/80 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {daysOfWeek.map(item => {
              const isSelected = selectedDay === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedDay(item.key)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl text-center transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]'
                      : isDark
                      ? 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800/80'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span className="text-[11px] uppercase font-bold tracking-wider opacity-80">{item.day}</span>
                  <span className="text-sm font-black mt-0.5">{item.split}</span>
                  <span className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {item.focus}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workout Session Hero Card */}
        <div className={`p-6 md:p-8 rounded-3xl border relative overflow-hidden transition-all ${
          isDark ? 'bg-[#0f111a] border-slate-800/80 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Day 1 • Hypertrophy Split
                </span>
                <span className="text-xs text-slate-400">• High Intensity Volume</span>
              </div>
              <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Push Focus: Chest, Front Delts & Triceps
              </h1>
              <p className={`text-sm mt-1.5 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Targeting clavicular fiber recruitment, lateral shoulder cap density, and tricep long-head extension under tension.
              </p>

              {/* Quick Metrics Bar */}
              <div className="flex flex-wrap items-center gap-5 mt-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>45 Minutes</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>380 Calories</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Dumbbell className="w-4 h-4 text-emerald-400" />
                  <span>5 Compound Exercises</span>
                </div>
              </div>
            </div>

            {/* Action Button & Completion Circle */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden sm:block">
                <div className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Completed
                </div>
                <div className="text-lg font-black text-emerald-500">
                  {completedCount} / {exercises.length}
                </div>
              </div>

              <button
                onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold shadow-lg transition-all ${
                  isWorkoutActive
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/25'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                }`}
              >
                {isWorkoutActive ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Workout in Progress</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Push Workout</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800/40">
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Overall Session Progress</span>
              <span className="font-bold text-emerald-400">{progressPercent}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Exercise Routine List matching Collage Screen 4 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Exercise Protocol & Execution
            </h2>
            <span className="text-xs text-slate-400">Click video to inspect form & kinetic cues</span>
          </div>

          <div className="space-y-3.5">
            {exercises.map((exercise, index) => {
              const isDone = !!completedExercises[exercise.id];
              return (
                <div
                  key={exercise.id}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all ${
                    isDone 
                      ? 'border-emerald-500/30 bg-emerald-500/5' 
                      : isDark ? 'bg-[#0f111a] border-slate-800/80 shadow-md' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Thumbnail & Name & Muscle chips */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-800">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setActiveModalExercise(exercise)}
                          className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-center justify-center transition-all group"
                          title="Watch Form Demo"
                        >
                          <div className="w-7 h-7 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                          </div>
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-500">#{index + 1}</span>
                          <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {exercise.name}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400">{exercise.target}</p>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {exercise.primaryMuscles.map(m => (
                            <span
                              key={m}
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-lg border ${
                                isDark 
                                  ? 'bg-slate-900 border-slate-800 text-slate-300' 
                                  : 'bg-slate-100 border-slate-200 text-slate-700'
                              }`}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Sets/Reps Badges & Complete Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/40">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className={`px-2.5 py-1 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                          {exercise.sets}
                        </span>
                        <span className={`px-2.5 py-1 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                          {exercise.reps}
                        </span>
                        <span className={`px-2.5 py-1 rounded-xl font-bold ${isDark ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-400' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'}`}>
                          {exercise.load}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleComplete(exercise.id)}
                        className={`p-2.5 rounded-xl border transition-all ${
                          isDone
                            ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                            : isDark
                            ? 'bg-slate-800/70 border-slate-700 text-slate-400 hover:text-white'
                            : 'bg-slate-100 border-slate-300 text-slate-500 hover:text-slate-900'
                        }`}
                        title={isDone ? 'Mark Incomplete' : 'Mark Completed'}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exercise Demo Video Modal matching Screen 11 */}
        {activeModalExercise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className={`w-full max-w-3xl rounded-3xl border overflow-hidden shadow-2xl transition-all ${
              isDark ? 'bg-[#0f111a] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {activeModalExercise.name}
                    </h3>
                    <p className="text-xs text-slate-400">Exercise Kinetic Form & Anatomy Analysis</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalExercise(null)}
                  className={`p-2 rounded-xl transition-colors ${
                    isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Visual Video Simulation Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center group">
                  <img
                    src={activeModalExercise.image}
                    alt={activeModalExercise.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase">
                        AI Form Verified
                      </span>
                      <span className="text-xs text-white/80">3D Motion Capture Active</span>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      Full Range Dynamic Simulation (Eccentric 2s • Pause 1s • Concentric 1s)
                    </p>
                  </div>
                  <div className="absolute w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl backdrop-blur-xs">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Targeted Muscles Breakdown */}
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Primary & Synergist Muscles Activated
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalExercise.primaryMuscles.map(muscle => (
                      <span
                        key={muscle}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Form Coaching Cues */}
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-emerald-400`}>
                    <Sparkles className="w-4 h-4" /> Form & Kinetic Mastery Checklist
                  </h4>
                  <div className="space-y-2.5">
                    {activeModalExercise.cues.map((cue, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {cue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800/50 flex justify-end gap-3 bg-slate-950/20">
                <button
                  onClick={() => setActiveModalExercise(null)}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold ${
                    isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                  }`}
                >
                  Close Guide
                </button>
                <button
                  onClick={() => {
                    toggleComplete(activeModalExercise.id);
                    setActiveModalExercise(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
                >
                  Mark Exercise Completed
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
