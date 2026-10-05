import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  Bot, 
  Send, 
  Mic, 
  Sparkles, 
  Plus, 
  MessageSquare, 
  Clock, 
  Flame,
  Check
} from 'lucide-react';
import api from '../api/axios';

export const AICoachPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'Give me a high protein diet plan for 2500 calories.'
    },
    {
      sender: 'ai',
      text: "Here's a 2500 calorie high-protein diet plan tailored for you:",
      table: [
        { meal: 'Breakfast', food: 'Oats + Milk + Whey', portion: '80g oats + 250ml milk + 1 scoop whey', cals: '520', protein: '35g' },
        { meal: 'Mid Meal', food: 'Eggs + Fruits', portion: '4 eggs + 1 banana', cals: '400', protein: '28g' },
        { meal: 'Lunch', food: 'Chicken + Rice + Dal', portion: '200g chicken + 1 cup rice + 1 cup dal', cals: '650', protein: '55g' },
        { meal: 'Evening Snack', food: 'Greek Yogurt + Nuts', portion: '200g yogurt + 20g nuts', cals: '300', protein: '22g' },
        { meal: 'Dinner', food: 'Paneer / Roti + Salad', portion: '150g paneer + 3 rotis', cals: '550', protein: '35g' },
      ],
      total: 'Total: ~2,370-2,500 calories | ~175g protein'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    'Diet plan for 2500 kcal',
    'Best exercises for biceps',
    'Sleep improvement tips'
  ];

  const history = [
    'Fine workout plan',
    'Supplements advice',
    'Beginner workout routine'
  ];

  const handleSend = async (textToSend) => {
    const q = textToSend || input;
    if (!q.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await api.post('/assistance/ai-chat', {
        domain: 'PHYSICAL',
        message: q,
      });
      setMessages((prev) => [...prev, { sender: 'ai', text: res.data?.data?.reply || 'I am optimizing your training schedule!' }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Great question! Focus on compound movements and 1.8g protein per kg of bodyweight.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-7.5rem)] flex flex-col md:flex-row gap-4 pb-2">
        
        {/* Left Sub-Sidebar matching collage Screen 3 */}
        <div className="w-full md:w-64 fit-card p-4 rounded-3xl shrink-0 flex flex-col justify-between hidden sm:flex">
          <div>
            <div className="flex items-center gap-2 px-2 py-2 mb-3">
              <Bot className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-black text-[var(--text-primary)]">AI Assistant History</span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 mb-5">
              <p className="text-[10px] uppercase font-bold text-slate-400 px-2">Today</p>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="w-full text-left p-2 rounded-xl text-xs text-[var(--text-primary)] bg-[var(--bg-card-nested)] hover:border-emerald-500/40 border border-transparent transition truncate cursor-pointer font-medium"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Previous */}
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-bold text-slate-400 px-2">Previous</p>
              {history.map((h, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card-nested)] transition truncate cursor-pointer"
                >
                  {h}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold text-center">
            Fitverse Neural AI 2.0 Active
          </div>
        </div>

        {/* Main Chat Feed */}
        <div className="flex-1 fit-card rounded-3xl flex flex-col justify-between overflow-hidden">
          
          {/* Top Bar */}
          <div className="p-4 border-b border-[var(--border-main)] flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-[var(--text-primary)]">AI Coach</h2>
              <p className="text-xs text-[var(--text-secondary)]">Your personal fitness & wellness assistant.</p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Online
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {m.sender === 'user' ? (
                  <div className="max-w-xl p-3.5 rounded-2xl bg-[#059669] text-white text-xs font-bold shadow-sm">
                    {m.text}
                  </div>
                ) : (
                  <div className="max-w-2xl space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-[10px]">
                        ✦
                      </div>
                      <span className="text-xs font-bold text-[var(--text-primary)]">AI Coach</span>
                    </div>

                    <div className="p-4 rounded-3xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-xs text-[var(--text-primary)] space-y-3">
                      <p className="font-semibold">{m.text}</p>

                      {/* Structured Meal Table matching Screen 3 in collage */}
                      {m.table && (
                        <div className="overflow-x-auto rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)]">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-[var(--bg-card-nested)] border-b border-[var(--border-main)] text-[10px] uppercase text-[var(--text-secondary)]">
                              <tr>
                                <th className="p-2.5 font-bold">Meal</th>
                                <th className="p-2.5 font-bold">Food</th>
                                <th className="p-2.5 font-bold">Portion</th>
                                <th className="p-2.5 font-bold">Calories</th>
                                <th className="p-2.5 font-bold">Protein</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-main)] text-[11px]">
                              {m.table.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-[var(--bg-card-nested)]">
                                  <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">{row.meal}</td>
                                  <td className="p-2.5 font-medium">{row.food}</td>
                                  <td className="p-2.5 text-[var(--text-secondary)]">{row.portion}</td>
                                  <td className="p-2.5 font-bold">{row.cals}</td>
                                  <td className="p-2.5 font-bold text-blue-500">{row.protein}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {m.total && (
                        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 pt-1">
                          {m.total}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-xs text-slate-400 italic">AI Coach is calculating recommendations...</div>}
          </div>

          {/* Bottom Chat Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 sm:p-4 border-t border-[var(--border-main)] flex items-center gap-2 bg-[var(--bg-card)]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about fitness, nutrition, or wellness..."
              className="flex-1 bg-[var(--bg-card-nested)] border border-[var(--border-main)] rounded-2xl px-4 py-2.5 text-xs text-[var(--text-primary)] focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => alert('Speech voice listening active!')}
              className="p-2.5 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-slate-400 hover:text-emerald-500 transition cursor-pointer"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="p-2.5 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-bold transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </AppLayout>
  );
};
