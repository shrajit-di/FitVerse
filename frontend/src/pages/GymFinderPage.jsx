import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  MapPin, 
  Star, 
  Search, 
  ChevronDown, 
  Navigation, 
  Phone, 
  Plus, 
  ExternalLink 
} from 'lucide-react';

export const GymFinderPage = () => {
  const [locationSearch, setLocationSearch] = useState('Ghaziabad, Uttar Pradesh');
  const [selectedGym, setSelectedGym] = useState(1);

  const gyms = [
    {
      id: 1,
      name: "Gold's Gym",
      location: "Vasundhara, Ghaziabad",
      rating: 4.5,
      reviews: "1.2k",
      price: "₹1,500 / month",
      distance: "2.3 km",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
      lat: 28.6692,
      lng: 77.4538
    },
    {
      id: 2,
      name: "Cult Fit",
      location: "Indirapuram, Ghaziabad",
      rating: 4.3,
      reviews: "890",
      price: "₹1,990 / month",
      distance: "3.1 km",
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop",
      lat: 28.6387,
      lng: 77.3698
    },
    {
      id: 3,
      name: "The Fitness Garage",
      location: "Kaushambi, Ghaziabad",
      rating: 4.6,
      reviews: "540",
      price: "₹1,200 / month",
      distance: "4.2 km",
      img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600&auto=format&fit=crop",
      lat: 28.6432,
      lng: 77.3224
    },
    {
      id: 4,
      name: "Anytime Fitness",
      location: "Shipra Suncity, Ghaziabad",
      rating: 4.4,
      reviews: "510",
      price: "₹2,200 / month",
      distance: "4.8 km",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
      lat: 28.6355,
      lng: 77.3752
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6 pb-12">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            Gym Finder
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Find the best gyms near you.
          </p>
        </div>

        {/* Search & Filter Bar matching Screen 6 in collage */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="relative w-full sm:w-80">
            <MapPin className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="w-full bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl pl-10 pr-4 py-2 text-xs text-[var(--text-primary)] font-semibold focus:border-emerald-500 focus:outline-none shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['Radius ▾', 'Price ▾', 'Amenities ▾', 'More Filters ▾'].map((f, i) => (
              <button
                key={i}
                className="px-3.5 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500 transition cursor-pointer shadow-2xs"
              >
                {f}
              </button>
            ))}
          </div>

        </div>

        {/* 2-Column Split: Gym List on Left, Map on Right matching Screen 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Gym Cards (5 COLS) */}
          <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {gyms.map((g) => {
              const isSelected = selectedGym === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedGym(g.id)}
                  className={`p-3.5 rounded-3xl border transition cursor-pointer flex gap-3.5 items-center ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-md shadow-emerald-900/10'
                      : 'bg-[var(--bg-card)] border-[var(--border-main)] hover:border-emerald-500/40'
                  }`}
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                    <img src={g.img} alt={g.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-black text-[var(--text-primary)] truncate">{g.name}</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] truncate">{g.location}</p>
                    
                    <div className="flex items-center gap-2 text-xs font-bold mt-1">
                      <span className="text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-current" /> {g.rating}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">({g.reviews})</span>
                      <span className="text-[10px] text-slate-400 font-normal">• {g.distance}</span>
                    </div>

                    <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                      {g.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Interactive Vector Map (7 COLS) matching Screen 6 */}
          <div className="lg:col-span-7 fit-card rounded-3xl overflow-hidden h-[580px] relative border border-[var(--border-main)] flex flex-col justify-between">
            
            {/* Vector Map Graphic with road grid & landmarks */}
            <div className="absolute inset-0 bg-[#e8ecef] dark:bg-[#1a202c] p-6">
              <svg viewBox="0 0 500 400" className="w-full h-full opacity-70">
                {/* Roads */}
                <path d="M 0 100 Q 200 120 500 80" stroke="#cbd5e1" strokeWidth="8" fill="none" />
                <path d="M 120 0 L 140 400" stroke="#cbd5e1" strokeWidth="6" fill="none" />
                <path d="M 320 0 L 300 400" stroke="#cbd5e1" strokeWidth="6" fill="none" />
                <path d="M 0 280 L 500 310" stroke="#cbd5e1" strokeWidth="10" fill="none" />

                {/* Region Text */}
                <text x="180" y="160" fill="#94a3b8" fontSize="12" fontWeight="bold">Indirapuram</text>
                <text x="350" y="120" fill="#94a3b8" fontSize="12" fontWeight="bold">Vasundhara</text>
                <text x="240" y="240" fill="#94a3b8" fontSize="12" fontWeight="bold">Kaushambi</text>
              </svg>

              {/* Location Pins matching collage Screen 6 */}
              <div className="absolute top-[35%] left-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/40 animate-bounce">
                  <MapPin className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded shadow mt-1">
                  Gold's Gym
                </span>
              </div>

              <div className="absolute top-[45%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group">
                <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg">
                  <MapPin className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded shadow mt-1">
                  Cult Fit
                </span>
              </div>

              <div className="absolute top-[65%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group">
                <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg">
                  <MapPin className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded shadow mt-1">
                  Fitness Garage
                </span>
              </div>
            </div>

            {/* Selected Gym Card Preview Popup matching Screen 6 */}
            <div className="relative z-10 m-4 p-4 rounded-2xl bg-slate-950/90 text-white backdrop-blur-md border border-slate-700 max-w-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                <img src={gyms[selectedGym - 1].img} alt="Gym" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black truncate">{gyms[selectedGym - 1].name}</p>
                <p className="text-[10px] text-emerald-400 font-bold">{gyms[selectedGym - 1].price}</p>
                <button
                  onClick={() => alert(`Directions opened for ${gyms[selectedGym - 1].name}`)}
                  className="mt-1 text-[10px] font-bold text-white bg-emerald-600 px-2.5 py-0.5 rounded flex items-center gap-1 cursor-pointer"
                >
                  <Navigation className="w-3 h-3" /> Get Directions
                </button>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="relative z-10 m-4 self-end flex flex-col gap-1">
              <button className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)] text-sm font-bold flex items-center justify-center shadow">
                +
              </button>
              <button className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)] text-sm font-bold flex items-center justify-center shadow">
                -
              </button>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
};
