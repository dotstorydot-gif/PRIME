import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const { navigateTo } = useStore();

  return (
    <section className="relative w-full min-h-[88vh] flex items-center justify-start overflow-hidden bg-[#241c16]">
      {/* Editorial Background Image with natural warm lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/products/image32.png"
          alt="Contemporary handcrafted wooden interior by Prime Wooden Work"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.03] transform scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Soft vignette and editorial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          
          {/* Eyebrow badge matching user screenshot */}
          <div className="inline-flex items-center space-x-2.5">
            <span className="w-6 h-[1px] bg-wood-200" />
            <span className="text-wood-200 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase font-medium">
              Made in Egypt · Made to Last
            </span>
          </div>

          {/* Headline matching user prompt */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#FAF8F5] font-light leading-[1.08] tracking-tight">
            Crafted from Wood. <br />
            <span className="italic font-normal font-serif text-wood-100">Designed for Your Space.</span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-lg md:text-xl text-[#F4EFE6]/90 font-sans font-light max-w-2xl leading-relaxed">
            Thoughtfully crafted furniture designed to bring warmth, character, and timeless functionality to your home.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-5 pt-4">
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#FAF8F5] text-charcoal-900 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-wood-200 hover:text-wood-950 focus:outline-none shadow-sm group"
            >
              <span>Shop Collection</span>
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => navigateTo('custom')}
              className="inline-flex items-center justify-center px-8 py-4 border border-[#FAF8F5]/60 text-[#FAF8F5] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#FAF8F5]/10 hover:border-[#FAF8F5] focus:outline-none backdrop-blur-sm"
            >
              Create Your Custom Piece
            </button>
          </div>

          {/* Heritage Annotation */}
          <div className="pt-8 flex items-center space-x-6 text-[#FAF8F5]/70 text-xs tracking-wider uppercase border-t border-white/15 max-w-lg">
            <div>
              <span className="block font-serif text-lg text-white font-medium">1948</span>
              <span className="text-[10px] text-wood-200">Heritage Craft</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div>
              <span className="block font-serif text-lg text-white font-medium">100% Solid</span>
              <span className="text-[10px] text-wood-200">European Oak & Walnut</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div>
              <span className="block font-serif text-lg text-white font-medium">Cairo</span>
              <span className="text-[10px] text-wood-200">Master Woodworkers</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
