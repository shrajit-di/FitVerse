import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  ShoppingBag, 
  Star, 
  Plus, 
  ShoppingCart, 
  ArrowLeft, 
  Share2, 
  Heart, 
  Check, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';

export const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Supplements', 'Equipment', 'Apparel', 'Books', 'Wellness'];

  const products = [
    {
      id: 1,
      name: 'MuscleBlaze Whey Protein',
      specs: '1 kg | Chocolate Flavor',
      price: 2799,
      origPrice: 3499,
      discount: 'Save 15%',
      rating: 4.5,
      reviews: '2.5k',
      category: 'Supplements',
      img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=600&auto=format&fit=crop',
      features: ['24g protein per serving', 'Faster muscle recovery', 'Great taste with zero added sugar']
    },
    {
      id: 2,
      name: 'Creatine Monohydrate',
      specs: '300g Micronized Powder',
      price: 899,
      origPrice: 1199,
      discount: 'Save 25%',
      rating: 4.4,
      reviews: '880',
      category: 'Supplements',
      img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=600&auto=format&fit=crop',
      features: ['3g pure creatine monohydrate', 'Enhances power & strength output']
    },
    {
      id: 3,
      name: 'Resistance Bands Set',
      specs: '5 pcs with Door Anchor & Handles',
      price: 1299,
      origPrice: 1999,
      discount: 'Save 35%',
      rating: 4.6,
      reviews: '450',
      category: 'Equipment',
      img: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=600&auto=format&fit=crop',
      features: ['Natural latex resistance bands', 'Stackable up to 150 lbs']
    },
    {
      id: 4,
      name: 'Yoga Mat',
      specs: '6mm High Density Anti-Skid',
      price: 599,
      origPrice: 999,
      discount: 'Save 40%',
      rating: 4.5,
      reviews: '1.2k',
      category: 'Equipment',
      img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600&auto=format&fit=crop',
      features: ['Non-slip grip texture', 'Lightweight carrying strap included']
    }
  ];

  const filteredProducts = products.filter(p => activeCategory === 'All' || p.category === activeCategory);

  return (
    <AppLayout>
      <div className="space-y-6 pb-12">
        
        {/* PRODUCT DETAIL VIEW MATCHING COLLAGE SCREEN 12 */}
        {selectedProduct ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Shop
              </button>

              <div className="flex items-center gap-3 text-slate-400">
                <button className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:text-emerald-500">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:text-rose-500">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 fit-card p-6 sm:p-10 rounded-3xl items-start">
              
              {/* Product Image Stage */}
              <div className="md:col-span-6 flex flex-col items-center">
                <div className="w-full aspect-square max-w-sm rounded-3xl overflow-hidden bg-slate-900 border border-[var(--border-main)] p-4 flex items-center justify-center">
                  <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>

              {/* Product Detail Info */}
              <div className="md:col-span-6 space-y-5">
                <div>
                  <span className="text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-2xl font-black text-[var(--text-primary)] mt-1.5">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{selectedProduct.specs}</p>

                  <div className="flex items-center gap-2 text-xs font-bold mt-2">
                    <span className="text-amber-500 flex items-center gap-0.5">
                      <Star className="w-4 h-4 fill-current" /> {selectedProduct.rating}
                    </span>
                    <span className="text-slate-400 font-normal">({selectedProduct.reviews} customer reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    ₹{selectedProduct.price.toLocaleString()}
                  </span>
                  <span className="text-base text-slate-400 line-through">
                    ₹{selectedProduct.origPrice.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {selectedProduct.discount}
                  </span>
                </div>

                {/* Specs bullets */}
                <div className="space-y-2 pt-2 border-t border-[var(--border-main)]">
                  {selectedProduct.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button
                    onClick={() => { setCartCount(cartCount + 1); alert('Added to cart!'); }}
                    className="py-3 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] hover:border-emerald-500 text-xs font-bold text-[var(--text-primary)] transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => alert('Proceeding to Instant Checkout!')}
                    className="py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-extrabold shadow-md shadow-emerald-900/30 transition cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* SHOP CATALOG VIEW MATCHING COLLAGE SCREEN 7 */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                  Fitverse Shop
                </h1>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Supplements, fitness equipment, books and more.
                </p>
              </div>

              {/* Cart Button */}
              <button
                onClick={() => alert(`Cart has ${cartCount} items.`)}
                className="px-4 py-2 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 hover:border-emerald-500 transition cursor-pointer shadow-2xs"
              >
                <ShoppingCart className="w-4 h-4 text-emerald-500" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeCategory === c
                      ? 'bg-[#059669] text-white shadow-sm'
                      : 'bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Product Cards Grid matching collage Screen 7 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="fit-card p-4 rounded-3xl flex flex-col justify-between transition hover:border-emerald-500/40 hover:-translate-y-1"
                >
                  <div>
                    {/* Image */}
                    <div 
                      onClick={() => setSelectedProduct(p)}
                      className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 mb-3 cursor-pointer relative"
                    >
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 text-[10px] font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded shadow">
                        {p.discount}
                      </span>
                    </div>

                    <h4 
                      onClick={() => setSelectedProduct(p)}
                      className="text-xs sm:text-sm font-black text-[var(--text-primary)] hover:text-emerald-500 transition cursor-pointer truncate"
                    >
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{p.specs}</p>

                    <div className="flex items-center gap-1.5 text-xs font-bold mt-1.5">
                      <span className="text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-current" /> {p.rating}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">({p.reviews})</span>
                    </div>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        ₹{p.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{p.origPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => { setCartCount(cartCount + 1); alert(`Added ${p.name} to cart!`); }}
                    className="w-full mt-4 py-2.5 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold shadow-md shadow-emerald-900/20 transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};
