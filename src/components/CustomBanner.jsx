import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

export default function CustomBanner() {
  const { navigateTo } = useStore();

  return (
    <section className="bg-[#EFECE6]/70 py-20 lg:py-28 my-12 border-y border-[#E9E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Elegant Custom Architectural Furniture Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/12] overflow-hidden bg-[#E2DBD0] border border-[#E9E2D5]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                alt="Custom built-in architectural woodwork and dressing room by Prime"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge */}
              <div className="absolute bottom-4 left-4 bg-[#FAF8F5]/95 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-widest font-medium text-charcoal-800 border border-[#E9E2D5]">
                Bespoke Joinery & Millwork
              </div>
            </div>
          </div>

          {/* Right: Content matching mockup */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block">
                Custom Furniture
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal tracking-tight">
                Made for Your Space
              </h2>
            </div>

            <p className="text-charcoal-600 font-sans text-base sm:text-lg leading-relaxed font-light">
              Have something specific in mind? Work with our team to create a piece tailored to your space, dimensions, materials, and style.
            </p>

            <div className="pt-2 pb-4 grid grid-cols-2 gap-4 text-xs tracking-wider uppercase text-charcoal-700">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-wood-600" />
                <span>Exact Dimensions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-wood-600" />
                <span>Hand-Selected Hardwoods</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-wood-600" />
                <span>3D CAD & Finishes Sampling</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-wood-600" />
                <span>On-Site Measuring & Fitting</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => navigateTo('custom')}
                className="inline-flex items-center justify-center px-8 py-4 bg-wood-800 text-[#FAF8F5] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-wood-900 focus:outline-none shadow-sm group"
              >
                <span>Start a Custom Request</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
