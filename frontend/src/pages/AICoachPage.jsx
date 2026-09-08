import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Bot, Sparkles, Send, Mic, Dumbbell, Brain, Utensils } from 'lucide-react';
import api from '../api/axios';
import { TalkToFitverseModal } from '../components/voice/TalkToFitverseModal';

export const AICoachPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your 24/7 Fitverse AI Coach. I can modify your workouts, suggest macro plans, or guide you through stress reduction. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const isMental = userText.toLowerCase().includes('stress') || userText.toLowerCase().includes('sleep') || userText.toLowerCase().includes('anxious');
      const res = await api.post('/assistance/ai-chat', {
        domain: isMental ? 'MENTAL' : 'PHYSICAL',
        message: userText
      });
      setMessages(prev => [...prev, { sender: 'ai', text: res.data.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'I am here with you. What fitness or wellness milestone should we target next?' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#1f234d]">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Bot className="w-7 h-7 text-purple-400" />
              Fitverse AI Coach
            </h1>
            <p className="text-xs text-slate-400">Contextual guidance across training, nutrition, and mindfulness.</p>
          </div>
          <button
            onClick={() => setVoiceOpen(true)}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer transition"
          >
            <Mic className="w-4 h-4" /> Start Voice Mode
          </button>
        </div>

        <div className="fit-card p-6 rounded-3xl h-[520px] flex flex-col justify-between">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#4f46e5] text-white font-semibold rounded-br-none'
                    : 'bg-[#0c0d22] border border-[#1f234d] text-slate-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-slate-500 italic">Fitverse AI is thinking...</div>}
          </div>

          <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-[#1f234d]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about workouts, muscle recovery, budget diets, or breathing..."
              className="flex-1 bg-[#0a0b1c] border border-[#1f234d] rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500"
            />
            <button
              type="submit"
              className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <TalkToFitverseModal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </AppLayout>
  );
};
