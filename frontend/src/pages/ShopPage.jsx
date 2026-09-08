import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { ShoppingBag, Star, Plus } from 'lucide-react';

export const ShopPage = () => {
  const products = [
    { id: 1, name: 'Fitverse Ergonomic Yoga Mat', priceInr: 1299, rating: 4.9, category: 'Mental Wellness', emoji: '🧘' },
    { id: 2, name: 'Heavy Duty Resistance Band Set', priceInr: 899, rating: 4.8, category: 'Physical Training', emoji: '🏋️' },
    { id: 3, name: 'Smart Stainless Protein Shaker', priceInr: 599, rating: 4.7, category: 'Nutrition', emoji: '🥤' },
    { id: 4, name: 'Noise-Canceling Meditation Sleep Mask', priceInr: 1499, rating: 4.9, category: 'Sleep Recovery', emoji: '🌙' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-purple-400" />
            Fitverse Marketplace
          </h1>
          <p className="text-xs text-slate-400">Curated mental and physical wellness equipment, gear, and nutritional essentials.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p.id} className="fit-card p-5 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="h-28 bg-[#0c0d22] rounded-2xl flex items-center justify-center text-4xl mb-3 border border-[#1f234d]">
                  {p.emoji}
                </div>
                <span className="text-[10px] text-purple-300 font-bold">{p.category}</span>
                <h4 className="text-xs font-bold text-white mt-1">{p.name}</h4>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {p.rating}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1f234d] flex items-center justify-between">
                <span className="text-sm font-black text-white">₹{p.priceInr}</span>
                <button
                  onClick={() => alert(`Added ${p.name} to cart!`)}
                  className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};
