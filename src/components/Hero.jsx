import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const { navigateTo } = useStore();

  return (
    <section className="relative w-full min-h-[88vh] flex items-center justify-start overflow-hidden bg-[#182032]">
      {/* Editorial Background Image with natural warm lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2400&q=85"
          alt="Contemporary handcrafted wooden interior by Prime Wooden Work"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.03] transform scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Soft vignette and editorial gradient overlays in rich deep navy */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#182032]/90 via-[#182032]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#182032]/90 via-transparent to-[#182032]/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          
          {/* Eyebrow badge matching user screenshot */}
          <div className="inline-flex items-center space-x-2.5">
            <span className="w-6 h-[1px] bg-[#fae6c3]" />
            <span className="text-[#fae6c3] text-xs sm:text-sm font-sans tracking-[0.25em] uppercase font-medium">
              Made in Egypt · Made to Last
            </span>
          </div>

          {/* Headline matching user prompt */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#FAF8F5] font-light leading-[1.08] tracking-tight">
            Crafted from Wood. <br />
            <span className="italic font-normal font-serif text-[#fae6c3]">Designed for Your Space.</span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-lg md:text-xl text-[#F4EFE6]/90 font-sans font-light max-w-2xl leading-relaxed">
            Thoughtfully crafted furniture designed to bring warmth, character, and timeless functionality to your home.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-5 pt-4">
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#fae6c3] text-[#1d2743] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase rounded-lg transition-all duration-300 hover:bg-[#f3dbb1] focus:outline-none shadow-sm group"
            >
              <span>Shop Collection</span>
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => navigateTo('custom')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#182032]/50 border border-[#fae6c3]/40 text-[#FAF8F5] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase rounded-lg transition-all duration-300 hover:bg-[#182032]/80 hover:border-[#fae6c3] focus:outline-none backdrop-blur-sm"
            >
              Create Your Custom Piece
            </button>
          </div>

          {/* Heritage Annotation */}
          <div className="pt-8 flex items-center space-x-6 text-[#FAF8F5]/80 text-xs tracking-wider uppercase border-t border-white/15 max-w-lg">
            <div>
              <span className="block font-serif text-lg text-white font-medium">1948</span>
              <span className="text-[10px] text-[#fae6c3]">Heritage Craft</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div>
              <span className="block font-serif text-lg text-white font-medium">100% Solid</span>
              <span className="text-[10px] text-[#fae6c3]">European Oak & Walnut</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div>
              <span className="block font-serif text-lg text-white font-medium">Cairo</span>
              <span className="text-[10px] text-[#fae6c3]">Master Woodworkers</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
