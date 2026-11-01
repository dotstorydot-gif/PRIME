import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export default function BrandStatement() {
  const { navigateTo } = useStore();

  return (
    <section className="bg-[#1D2743] text-[#FAF8F5] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 my-12 text-center relative overflow-hidden border-y border-[#D8D2C2]/20">
      {/* Subtle organic wood texture lines background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F1E7CC_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#F1E7CC] font-semibold block">
          About Prime
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F1E7CC] font-normal tracking-tight">
          Built Around Wood.
        </h2>

        <p className="text-[#D8D2C2] font-sans text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
          We create contemporary furniture with an honest respect for material, proportion, and detail—pieces made to belong in your home and grow more beautiful with time.
        </p>

        <div className="pt-4">
          <button
            onClick={() => navigateTo('about')}
            className="inline-flex items-center text-xs sm:text-sm tracking-[0.25em] uppercase font-medium text-[#F1E7CC] hover:text-white transition-colors border-b border-[#F1E7CC]/60 pb-1.5 group"
          >
            <span>Discover Our Story</span>
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
