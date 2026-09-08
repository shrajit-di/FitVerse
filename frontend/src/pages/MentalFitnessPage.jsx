import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { 
  Brain, 
  Smile, 
  Wind, 
  BookOpen, 
  Moon, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  Plus, 
  Play, 
  Pause, 
  RotateCcw,
  Send,
  UserCheck
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';


export const MentalFitnessPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('assessment'); // assessment, breathing, mood, journal, assistance

  // Assessment state
  const [assessmentForm, setAssessmentForm] = useState({
    moodScore: 8,
    stressScore: 3,
    sleepQualityScore: 8,
    energyScore: 7,
    relaxationScore: 8,
  });
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [assessmentLoading, setAssessmentLoading] = useState(false);

  // Box Breathing Timer state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale (4s)'); // Inhale, Hold, Exhale, Hold
  const [breathCounter, setBreathCounter] = useState(4);
  const [completedSeconds, setCompletedSeconds] = useState(0);

  // Mood / Stress logging state
  const [moodScore, setMoodScore] = useState(7);
  const [moodCategory, setMoodCategory] = useState('CALM');
  const [moodNotes, setMoodNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  // Journal state
  const [journals, setJournals] = useState([]);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalMoodTag, setJournalMoodTag] = useState('Calm');

  // AI & Assistance state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your Mental Wellness Companion. I can provide soothing mindfulness exercises, stress decompression techniques, and guided reflections. How are you feeling right now?' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Booking consultation state
  const [assistanceType, setAssistanceType] = useState('MENTAL_COUNSELING');
  const [userNotes, setUserNotes] = useState('');
  const [timeSlot, setTimeSlot] = useState('Tomorrow Evening (6 PM - 8 PM)');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const loadMentalData = async () => {
      try {
        const [assessRes, moodRes, journalRes] = await Promise.all([
          api.get('/mental/assessment/latest').catch(() => null),
          api.get('/mental/mood/history').catch(() => null),
          api.get('/mental/journals').catch(() => null),
        ]);

        if (assessRes?.data?.data) setAssessmentResult(assessRes.data.data);
        if (moodRes?.data?.data) setMoodHistory(moodRes.data.data);
        if (journalRes?.data?.data) setJournals(journalRes.data.data);
      } catch (err) {
        console.error('Error loading mental data:', err);
      }
    };
    loadMentalData();
  }, []);

  // Box Breathing cycle interval
  useEffect(() => {
    let interval = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setCompletedSeconds((prev) => prev + 1);
        setBreathCounter((prev) => {
          if (prev <= 1) {
            setBreathPhase((currentPhase) => {
              if (currentPhase.startsWith('Inhale')) return 'Hold (4s)';
              if (currentPhase.startsWith('Hold (4s)')) return 'Exhale (4s)';
              if (currentPhase.startsWith('Exhale')) return 'Hold / Rest (4s)';
              return 'Inhale (4s)';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setAssessmentLoading(true);
    try {
      const res = await api.post('/mental/assessment', assessmentForm);
      setAssessmentResult(res.data.data);
    } catch (err) {
      console.error('Assessment submit error:', err);
    } finally {
      setAssessmentLoading(false);
    }
  };

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/mental/mood', {
        score: moodScore,
        category: moodCategory,
        notes: moodNotes,
      });
      setMoodHistory((prev) => [{ score: moodScore, category: moodCategory, notes: moodNotes }, ...prev]);
      setMoodNotes('');
      alert('Mood logged successfully!');
    } catch (err) {
      console.error('Mood logging error:', err);
    }
  };

  const handleJournalSubmit = async (e) => {
    e.preventDefault();
    if (!journalTitle.trim() || !journalContent.trim()) return;

    try {
      const res = await api.post('/mental/journals', {
        title: journalTitle,
        content: journalContent,
        moodTag: journalMoodTag,
      });
      setJournals([res.data.data, ...journals]);
      setJournalTitle('');
      setJournalContent('');
      alert('Private reflection saved securely.');
    } catch (err) {
      console.error('Journal save error:', err);
    }
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
        domain: 'MENTAL',
        message: userText,
      });
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: res.data.data.reply, suggestions: res.data.data.suggestions }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'I am here with you. Take a steady deep breath. How can I best assist your mental focus today?' }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/assistance/request', {
        domain: 'MENTAL',
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-800">
                Mental Wellness Sanctuary
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Brain className="w-8 h-8 text-teal-400" />
              Mind Fitness & Emotional Equilibrium
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Structured wellness assessments, guided breathing, private reflections, and dedicated mental assistance.
            </p>
          </div>

          {/* Quick Safety Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 max-w-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-0.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Wellness Safety Notice
            </span>
            Non-diagnostic wellness tracking. If experiencing acute distress, access 24/7 crisis support lines immediately.
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-900 pb-3">
          {[
            { id: 'assessment', label: '📊 Wellness Assessment', icon: Brain },
            { id: 'breathing', label: '🌬️ Box Breathing & Calm', icon: Wind },
            { id: 'mood', label: '😊 Mood & Stress Log', icon: Smile },
            { id: 'journal', label: '📖 Private Journal', icon: BookOpen },
            { id: 'assistance', label: '🤖 Seek Mental Assistance', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: MENTAL WELLNESS ASSESSMENT */}
        {activeTab === 'assessment' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            
            {/* Form */}
            <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Structured Mental Wellness Assessment</h3>
              <p className="text-xs text-slate-400 mb-6">
                Rate each domain from 1 to 10 based on your last 7 days. Your results compute your non-diagnostic emotional equilibrium index.
              </p>

              <form onSubmit={handleAssessmentSubmit} className="space-y-5">
                {[
                  { key: 'moodScore', label: 'General Mood & Positivity', minDesc: '1 (Down/Low)', maxDesc: '10 (Joyful/Optimistic)' },
                  { key: 'stressScore', label: 'Perceived Stress & Pressure', minDesc: '1 (Completely Relaxed)', maxDesc: '10 (Overwhelmed)' },
                  { key: 'sleepQualityScore', label: 'Sleep Restfulness & Ease', minDesc: '1 (Restless/Broken)', maxDesc: '10 (Deep & Refreshing)' },
                  { key: 'energyScore', label: 'Daytime Energy & Vitality', minDesc: '1 (Exhausted)', maxDesc: '10 (Vibrant & Sharp)' },
                  { key: 'relaxationScore', label: 'Ability to Unwind & Relax', minDesc: '1 (Constantly Tense)', maxDesc: '10 (Effortless Peace)' },
                ].map((item) => (
                  <div key={item.key} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-200">{item.label}</span>
                      <span className="text-xs font-black text-teal-400 px-2 py-0.5 bg-teal-950/80 rounded border border-teal-800">
                        {assessmentForm[item.key]} / 10
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={assessmentForm[item.key]}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, [item.key]: Number(e.target.value) })}
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>{item.minDesc}</span>
                      <span>{item.maxDesc}</span>
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={assessmentLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 text-xs flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  {assessmentLoading ? 'Computing Evaluation...' : 'Calculate Wellness Index'}
                </button>
              </form>
            </div>

            {/* Results Sidebar */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" /> Latest Wellness Evaluation
                </h3>
                <p className="text-xs text-slate-400 mb-6">Non-diagnostic assessment profile</p>

                {assessmentResult ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Mental Equilibrium Index</p>
                      <p className="text-4xl font-black text-teal-400 my-1">{assessmentResult.compositeScore} <span className="text-xs text-slate-500">/ 100</span></p>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950 px-2.5 py-0.5 rounded border border-teal-800">
                        {assessmentResult.wellnessLevel}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                      <p className="font-semibold text-slate-200 mb-1">Personalized Guidance:</p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {assessmentResult.recommendationText}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px]">Mood:</span>
                        <p className="font-bold text-white">{assessmentResult.moodScore} / 10</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px]">Stress:</span>
                        <p className="font-bold text-teal-300">{assessmentResult.stressScore} / 10</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    Submit the assessment to view your personalized mental wellness breakdown.
                  </div>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-slate-900">
                <button
                  onClick={() => setActiveTab('assistance')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 text-xs font-semibold text-teal-300 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Seek Assistance for This Profile
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: BOX BREATHING & CALM TIMER */}
        {activeTab === 'breathing' && (
          <div className="max-w-2xl mx-auto glass-card p-8 rounded-3xl text-center mt-6">
            <h3 className="text-2xl font-black text-white">Interactive Box Breathing</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Navy SEAL technique for resetting autonomic nervous system tension: 4s Inhale • 4s Hold • 4s Exhale • 4s Rest.
            </p>

            {/* Expanding/contracting visual circle */}
            <div className="my-12 flex items-center justify-center relative">
              <div
                className={`w-64 h-64 rounded-full flex flex-col items-center justify-center transition-all duration-1000 border-4 ${
                  breathingActive
                    ? breathPhase.startsWith('Inhale')
                      ? 'scale-110 border-teal-400 bg-teal-500/20 shadow-2xl shadow-teal-500/30'
                      : breathPhase.startsWith('Exhale')
                      ? 'scale-90 border-indigo-400 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                      : 'scale-100 border-amber-400 bg-amber-500/15'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <Wind className="w-8 h-8 text-teal-400 mb-2 animate-pulse" />
                <p className="text-xl font-extrabold text-white tracking-wide">{breathPhase}</p>
                <p className="text-3xl font-black text-teal-300 mt-1">{breathCounter}s</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setBreathingActive(!breathingActive)}
                className="px-6 py-3 rounded-2xl font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs flex items-center gap-2 shadow-lg shadow-teal-500/25 transition cursor-pointer"
              >
                {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {breathingActive ? 'Pause Session' : 'Begin 4-4-4-4 Cycle'}
              </button>

              <button
                onClick={() => {
                  setBreathingActive(false);
                  setBreathPhase('Inhale (4s)');
                  setBreathCounter(4);
                  setCompletedSeconds(0);
                }}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-6">
              Total session active time: <strong className="text-teal-400">{completedSeconds} seconds</strong>
            </p>
          </div>
        )}

        {/* TAB 3: MOOD & STRESS LOG */}
        {activeTab === 'mood' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            
            {/* Mood Logger */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Smile className="w-5 h-5 text-teal-400" /> Log Mood & Stress Observation
              </h3>
              <p className="text-xs text-slate-400 mb-6">Track emotional fluctuation and contextual reasons.</p>

              <form onSubmit={handleMoodSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mood Rating: <strong className="text-teal-400">{moodScore} / 10</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={moodScore}
                    onChange={(e) => setMoodScore(Number(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['CALM', 'HAPPY', 'ENERGETIC', 'ANXIOUS', 'TIRED', 'STRESSED'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setMoodCategory(cat)}
                        className={`p-2 rounded-xl border text-[11px] font-bold transition cursor-pointer ${
                          moodCategory === cat
                            ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Context / Reflections</label>
                  <textarea
                    rows={3}
                    value={moodNotes}
                    onChange={(e) => setMoodNotes(e.target.value)}
                    placeholder="E.g. Completed challenging morning project, feeling relaxed after lunch..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs transition cursor-pointer"
                >
                  Save Mood Entry
                </button>
              </form>
            </div>

            {/* History */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Recent Emotional Observations</h3>
              <p className="text-xs text-slate-400 mb-4">Historical observations timeline</p>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {moodHistory.length > 0 ? (
                  moodHistory.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{m.category}</span>
                          <span className="text-[10px] text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800 font-bold">
                            {m.score}/10
                          </span>
                        </div>
                        {m.notes && <p className="text-[11px] text-slate-400 mt-1">{m.notes}</p>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-8">No mood entries recorded yet.</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: PRIVATE JOURNAL */}
        {activeTab === 'journal' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            
            {/* New Entry */}
            <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-400" /> Private Reflections Journal
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Your private thoughts remain strictly confidential and are never shared with trainers or admins.
              </p>

              <form onSubmit={handleJournalSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Entry Title</label>
                  <input
                    type="text"
                    required
                    value={journalTitle}
                    onChange={(e) => setJournalTitle(e.target.value)}
                    placeholder="E.g. Reflections on progress & daily balance"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mood Tag</label>
                  <select
                    value={journalMoodTag}
                    onChange={(e) => setJournalMoodTag(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500"
                  >
                    <option value="Calm">Calm & Centered</option>
                    <option value="Grateful">Grateful</option>
                    <option value="Focused">Focused & Motivated</option>
                    <option value="Reflective">Reflective</option>
                    <option value="Tired">Fatigued / Needs Rest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reflections Content</label>
                  <textarea
                    rows={6}
                    required
                    value={journalContent}
                    onChange={(e) => setJournalContent(e.target.value)}
                    placeholder="Write freely about your thoughts, breakthroughs, and aspirations..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-teal-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs transition cursor-pointer"
                >
                  Save Private Journal
                </button>
              </form>
            </div>

            {/* Existing Entries */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-base font-bold text-white mb-2">Saved Reflections ({journals.length})</h3>
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {journals.length > 0 ? (
                  journals.map((j) => (
                    <div key={j.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-200">{j.title}</span>
                        {j.moodTag && (
                          <span className="text-[10px] text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                            {j.moodTag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">{j.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-10">No journal reflections saved yet.</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: SEEK MENTAL ASSISTANCE (AI COMPANION & CONSULTATION) */}
        {activeTab === 'assistance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            
            {/* AI Wellness Companion Chat */}
            <div className="glass-card p-6 rounded-2xl flex flex-col h-[520px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Mental AI Companion</h3>
                    <p className="text-[10px] text-slate-400">Mindfulness & stress guidance assistant</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                  Online
                </span>
              </div>

              {/* Chat Message Box */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-3">
                {chatMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-teal-500 text-slate-950 font-medium rounded-br-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>

                    {m.suggestions && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {m.suggestions.map((s, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setChatInput(s);
                            }}
                            className="text-[10px] bg-slate-900 border border-teal-500/30 text-teal-300 hover:border-teal-400 px-2 py-0.5 rounded-full transition cursor-pointer"
                          >
                            + {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {chatLoading && (
                  <div className="text-xs text-slate-500 italic">Thinking...</div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-slate-900">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask for guided breathing, sleep advice, or stress decompression..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Book Wellness Consultation */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-teal-400" /> Book Certified Mental Wellness Assistance
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Schedule one-on-one sessions with certified mindfulness coaches and stress management specialists.
                </p>

                {bookingSuccess && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Assistance request registered successfully!
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Assistance Type</label>
                    <select
                      value={assistanceType}
                      onChange={(e) => setAssistanceType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-teal-500"
                    >
                      <option value="MENTAL_COUNSELING">Mental Wellness Counseling</option>
                      <option value="MINDFULNESS_GUIDANCE">Mindfulness & Meditation Coaching</option>
                      <option value="STRESS_MANAGEMENT">De-escalation & Stress Management</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Time Window</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-teal-500"
                    >
                      <option value="Tomorrow Morning (8 AM - 11 AM)">Tomorrow Morning (8 AM - 11 AM)</option>
                      <option value="Tomorrow Afternoon (1 PM - 4 PM)">Tomorrow Afternoon (1 PM - 4 PM)</option>
                      <option value="Tomorrow Evening (6 PM - 8 PM)">Tomorrow Evening (6 PM - 8 PM)</option>
                      <option value="Weekend Special Session">Weekend Morning Session</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Specific Needs / Notes</label>
                    <textarea
                      rows={3}
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      placeholder="Mention any specific stress triggers, meditation goals, or preferences..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 text-xs shadow-lg shadow-teal-500/20 transition cursor-pointer"
                  >
                    Request Wellness Consultation
                  </button>
                </form>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-500">
                * Sessions are scheduled through verified mindfulness practitioners. Confidentiality strictly enforced.
              </div>
            </div>

          </div>
        )}

      </div>
    </AppLayout>
  );
};
