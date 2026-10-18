import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function CategoryGrid() {
  const { navigateTo } = useStore();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header: "Shop by Piece" */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 border-b border-[#E9E2D5] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-wood-600 font-semibold block mb-2">
            Categorized Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal tracking-tight">
            Shop by Piece
          </h2>
          <p className="mt-2 text-charcoal-600 font-sans text-sm sm:text-base font-light max-w-xl">
            Thoughtfully engineered solid timber pieces categorized by architectural function for your home.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-charcoal-700 hover:text-wood-700 transition-colors inline-flex items-center space-x-1.5 group shrink-0"
        >
          <span>View All Pieces</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Grid of Piece Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigateTo('shop', { category: cat.id })}
            className="group relative cursor-pointer overflow-hidden bg-[#EFECE6] border border-[#E9E2D5] hover:border-wood-400 transition-all duration-300 flex flex-col"
          >
            {/* Category Image */}
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              
              {/* Overlay Badge */}
              <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium text-charcoal-800 border border-[#E9E2D5]/70">
                {cat.pieceType}
              </div>

              {/* Bottom Label and Explore Arrow */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between text-white z-10">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light tracking-wide text-white">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-white/80 font-sans tracking-wide mt-1 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
                <div className="inline-flex items-center text-xs tracking-widest uppercase font-medium text-white/90 group-hover:text-white transition-colors shrink-0 ml-2">
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
