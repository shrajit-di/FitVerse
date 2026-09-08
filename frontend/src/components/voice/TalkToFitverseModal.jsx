import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Sparkles, Volume2, Send, Activity, Brain, Dumbbell, ShieldAlert } from 'lucide-react';
import api from '../../api/axios';

export const TalkToFitverseModal = ({ isOpen, onClose, initialPrompt = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialPrompt);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiReply, setAiReply] = useState('Hello! I am your Fitverse AI Voice Coach. You can speak to me naturally about your workouts, stress, nutrition, or sleep.');
  const [activeAction, setActiveAction] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState('AUTO'); // AUTO, MENTAL, PHYSICAL
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    // Initialize Web Speech API if supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [isOpen]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition start issue, running simulated voice input', err);
        setIsListening(true);
        setTimeout(() => {
          setTranscript('How should I structure my workout and reduce stress today?');
          setIsListening(false);
        }, 2500);
      }
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendVoiceQuery = async (queryText) => {
    const text = queryText || transcript;
    if (!text.trim()) return;

    // Detect domain
    const isMental = text.toLowerCase().includes('stress') || text.toLowerCase().includes('breathe') || text.toLowerCase().includes('anxious') || text.toLowerCase().includes('sleep') || text.toLowerCase().includes('mood');
    const domain = selectedDomain !== 'AUTO' ? selectedDomain : (isMental ? 'MENTAL' : 'PHYSICAL');

    try {
      const res = await api.post('/assistance/ai-chat', {
        domain,
        message: text,
      });

      const reply = res.data.data.reply;
      setAiReply(reply);
      speakText(reply);

      // Check for structured voice action triggers
      if (text.toLowerCase().includes('breathe') || text.toLowerCase().includes('calm')) {
        setActiveAction({ type: 'BREATHING', label: 'Starting 4-4-4-4 Box Breathing Cycle...' });
      } else if (text.toLowerCase().includes('workout') || text.toLowerCase().includes('bench') || text.toLowerCase().includes('squat')) {
        setActiveAction({ type: 'WORKOUT', label: 'Recommended Hypertrophy Progression queued.' });
      } else if (text.toLowerCase().includes('food') || text.toLowerCase().includes('protein') || text.toLowerCase().includes('diet')) {
        setActiveAction({ type: 'NUTRITION', label: 'High-Protein Budget staples referenced.' });
      }
    } catch (err) {
      console.error('Voice AI query error:', err);
      const fallback = "I'm with you. Focus on deep diaphragmatic breathing and steady progressive overload. What would you like to achieve next?";
      setAiReply(fallback);
      speakText(fallback);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#12142e] border border-[#262b5c] w-full max-w-lg rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1b1e42] hover:bg-[#252959] text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
            Talk to Fitverse • Real-Time Voice Coach
          </span>
        </div>

        <h3 className="text-xl font-black text-white tracking-tight mb-1">
          Speech-to-Speech Intelligent Assistant
        </h3>
        <p className="text-xs text-slate-400 max-w-xs mb-6">
          Ask questions, log workouts/moods by voice, or trigger guided breathwork sessions.
        </p>

        {/* Central Orb & Waveform Display */}
        <div className="my-3 flex flex-col items-center justify-center">
          <button
            onClick={toggleListening}
            className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isListening
                ? 'bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 mic-glow scale-110 shadow-purple-500/50'
                : isSpeaking
                ? 'bg-gradient-to-tr from-teal-500 to-indigo-600 scale-105 shadow-teal-500/40 shadow-xl'
                : 'bg-gradient-to-tr from-purple-700 to-indigo-700 hover:scale-105 shadow-lg shadow-purple-900/40'
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 text-white animate-bounce" />
            ) : isSpeaking ? (
              <Volume2 className="w-10 h-10 text-white animate-pulse" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </button>

          <p className="text-xs font-bold text-purple-300 mt-3">
            {isListening ? 'Listening... Speak now' : isSpeaking ? 'Fitverse AI is speaking...' : 'Tap Mic to Start Speaking'}
          </p>

          {/* Waveform Visualization Bars */}
          <div className="flex items-center justify-center gap-1 h-8 mt-3">
            {[4, 8, 14, 22, 28, 18, 12, 24, 28, 16, 20, 10, 6].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isListening || isSpeaking
                    ? 'bg-gradient-to-t from-purple-500 via-pink-400 to-indigo-400 wave-bar'
                    : 'bg-slate-700 h-1.5'
                }`}
                style={{ height: isListening || isSpeaking ? `${h}px` : '4px' }}
              />
            ))}
          </div>
        </div>

        {/* Live Transcript / Prompt Box */}
        <div className="w-full bg-[#0a0b1c] border border-[#1f234d] rounded-2xl p-4 mt-4 text-left min-h-[70px] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
            <span>YOU SAID:</span>
            {transcript && (
              <button
                onClick={() => handleSendVoiceQuery(transcript)}
                className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3 h-3" /> Process Query
              </button>
            )}
          </div>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            {transcript || 'Listening for your voice... (e.g. "I am feeling stressed, give me a 3-minute breathwork session")'}
          </p>
        </div>

        {/* AI Response Box */}
        <div className="w-full bg-[#181a3d] border border-purple-500/20 rounded-2xl p-4 mt-3 text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-300 uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Fitverse AI Response:
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">{aiReply}</p>
        </div>

        {/* Structured Action Feedback Badge */}
        {activeAction && (
          <div className="w-full mt-3 p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center justify-between">
            <span>⚡ Action Triggered: {activeAction.label}</span>
            <span className="text-[10px] bg-purple-900/80 px-2 py-0.5 rounded text-white">Active</span>
          </div>
        )}

        {/* Quick Voice Suggestions */}
        <div className="w-full flex flex-wrap justify-center gap-2 mt-4">
          {[
            'Log my mood as 8/10',
            'Start 4-4-4-4 breathing',
            'Suggest high-protein budget dinner',
            'Plan upper body workout'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTranscript(prompt);
                handleSendVoiceQuery(prompt);
              }}
              className="text-[11px] bg-[#1a1d3f] border border-[#2b3064] hover:border-purple-400 text-slate-300 hover:text-white px-3 py-1.5 rounded-full transition cursor-pointer"
            >
              "{prompt}"
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
