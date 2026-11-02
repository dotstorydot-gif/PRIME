import React from 'react';
import { useStore } from '../context/StoreContext';
import { CRAFT_STEPS } from '../data/products';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  TreePine, 
  Layers, 
  Compass, 
  CheckCircle2 
} from 'lucide-react';

export default function AboutPage() {
  const { navigateTo } = useStore();

  return (
    <div>
      {/* Editorial Luxury Header Banner in Prime Navy */}
      <section className="bg-[#1D2743] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D8D2C2]/20 relative overflow-hidden">
        {/* Subtle texture grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F1E7CC_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2.5 mb-3">
            <span className="w-8 h-[1px] bg-[#F1E7CC]" />
            <span className="text-xs uppercase tracking-[0.28em] text-[#F1E7CC] font-semibold">
              OUR STORY & HERITAGE · EST. 1948
            </span>
            <span className="w-8 h-[1px] bg-[#F1E7CC]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F1E7CC] font-normal tracking-tight">
            Built Around Wood.
          </h1>
          <p className="mt-4 text-[#D8D2C2] font-sans text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            A story of patience, passion, and four generations of Cairo carpenters turning raw solid timber into heirloom architectural furniture.
          </p>
        </div>
      </section>


      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        
        {/* Story Chapter 1: The Cairo Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[16/10] bg-[#FAF8F5] border-[6px] sm:border-[10px] lg:border-[12px] border-[#1D2743] overflow-hidden shadow-lg">
              <img
                src="/images/heritage-1948.jpg"
                alt="Prime Wooden Work 1948 Askar Sons Cairo Workshop Heritage"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-[#111827] font-light text-sm sm:text-base leading-relaxed">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#1D2743] font-bold block">
                Chapter I
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#111827] font-normal">
                Born from Cairo’s Historic Timber District
              </h2>
            </div>
            <p className="text-charcoal-700">
              Prime is one of the leading Egyptian companies in the wooden works field. We are proud to have maintained an unbroken presence in the market since 1948, consistently delivering exceptional quality woodwork across Egypt and the Middle East.
            </p>
            <p className="text-charcoal-700">
              What began in the historic wood workshops of Port Said Street in Ghamra has evolved into a full-scale architectural and furniture atelier. We combine time-honored joinery—mortise and tenon, hand-turned radii, and steam-bent Zan beech—with state-of-the-art precision German tooling.
            </p>
            <p className="text-charcoal-700">
              Every piece that leaves our atelier carries the fingerprint of human hands and an honest respect for the living character of wood.
            </p>
          </div>
        </div>

        {/* Story Chapter 2: The Craftsmanship Lifecycle */}
        <div className="space-y-12 border-t border-[#D8D2C2] pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#1D2743] font-bold block mb-1">
              Chapter II · The Process
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#111827] font-normal tracking-tight">
              From Raw Material to Your Home
            </h2>
            <p className="mt-2 text-charcoal-600 font-sans text-sm sm:text-base font-light mx-auto">
              Every table, bed, and custom console undergoes four deliberate stages of master craftsmanship.
            </p>
          </div>

          {/* 4 Steps: Clean Editorial Horizontal Flow Without Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-4">
            {CRAFT_STEPS.map((step) => (
              <div key={step.number} className="space-y-4 group">
                {/* Step Top Bar with Big Elegant Roman/Serif Numeral */}
                <div className="flex items-baseline justify-between border-b border-[#1D2743]/20 pb-3">
                  <span className="font-serif text-3xl sm:text-4xl text-[#1D2743] font-light tracking-tight">
                    0{step.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
                    Phase {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl text-[#111827] font-normal">
                  {step.title}
                </h3>

                {/* Short Uppercase Subheading */}
                <p className="text-[11px] uppercase tracking-wider text-[#1D2743] font-semibold leading-relaxed">
                  {step.description}
                </p>

                {/* Narrative Detail */}
                <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Workshop Location & Showroom Call-to-Action in Prime Navy */}
        <div className="bg-[#1D2743] text-white p-8 sm:p-14 border border-[#D8D2C2]/20 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F1E7CC_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="space-y-3 relative z-10">
            <span className="text-[10px] uppercase tracking-widest text-[#F1E7CC] font-semibold block">
              VISIT OUR CAIRO ATELIER & MATERIAL LIBRARY
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#F1E7CC] font-normal">
              Experience the Wood in Person
            </h3>
            <p className="text-xs sm:text-sm text-[#D8D2C2] font-light max-w-xl">
              Touch real European Oak, Smoked Walnut, and tactile wire-brushed samples. Consult directly with our master woodworkers.
            </p>
            <a
              href="https://maps.google.com/?q=3+El+Madaress+St+Off+Port+Said+St+Ghamra+Cairo+Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-[#F1E7CC] hover:text-white font-medium pt-2 group"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F1E7CC]" />
              <span>3 El Madaress St., Off Port Said St., Ghamra, Cairo (Open in Google Maps ↗)</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={() => navigateTo('custom')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#F1E7CC] text-[#1D2743] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Start Custom Request
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-6 py-3.5 border border-[#F1E7CC] text-[#F1E7CC] text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors"
            >
              View Furniture Catalog
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
