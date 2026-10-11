import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function CategoryGrid() {
  const { navigateTo } = useStore();

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header matching media_1791714596603.png */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-[#E9E2D5] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
            Shop by Room
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal tracking-tight">
            Find Your Piece
          </h2>
        </div>
        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-charcoal-700 hover:text-wood-700 transition-colors inline-flex items-center space-x-1.5 group"
        >
          <span>View All Furniture</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Grid Layout matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {CATEGORIES.map((cat, idx) => {
          // Make Living Room & Custom Furniture span elegantly if needed
          const isLarge = idx === 0 || idx === 6;
          return (
            <div
              key={cat.id}
              onClick={() => {
                if (cat.id === 'custom-furniture') {
                  navigateTo('custom');
                } else {
                  navigateTo('shop', { category: cat.id });
                }
              }}
              className={`group relative cursor-pointer overflow-hidden bg-[#EFECE6] ${
                isLarge ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Category Image */}
              <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark gradient overlay for legible white typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
                
                {/* Bottom Overlay Label and Explore Arrow */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between text-white z-10">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-white">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-white/80 font-sans tracking-wider mt-1 line-clamp-1 max-w-xs">
                      {cat.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-xs tracking-widest uppercase font-medium text-white/90 group-hover:text-white transition-colors">
                    <span className="mr-1">Explore</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
