import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CRAFT_STEPS } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function CraftStory() {
  const { navigateTo } = useStore();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: Section Header & Artisan Photography */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
              Our Process
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl text-charcoal-900 font-normal tracking-tight leading-tight">
              From Raw Material <br />
              to Your Home
            </h2>
          </div>

          {/* Large Craftsman Workshop Image */}
          <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-[#E5DFC5] border border-[#E9E2D5]">
            <img
              src="https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=80"
              alt="Egyptian artisan woodworker hand-carving solid timber in Cairo"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 text-white text-[10px] tracking-widest uppercase bg-black/50 backdrop-blur-sm px-3 py-1">
              Prime Cairo Woodcarving Studio
            </div>
          </div>

          <p className="text-sm text-charcoal-600 leading-relaxed font-light">
            Every curve and joint reflects decades of inherited Egyptian woodworking mastery. We marry ancient techniques with modern architectural engineering.
          </p>

          <button
            onClick={() => navigateTo('craft')}
            className="text-xs uppercase tracking-[0.2em] font-medium text-wood-700 hover:text-wood-900 transition-colors inline-flex items-center space-x-1.5 group"
          >
            <span>Learn More About Our Heritage</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right: The 4 Editorial Steps matching screenshot */}
        <div className="lg:col-span-7 divide-y divide-[#E9E2D5] border-y border-[#E9E2D5]">
          {CRAFT_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div 
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`py-8 cursor-pointer transition-all duration-300 group ${
                  isSelected ? 'bg-[#FAF8F5]' : 'hover:bg-[#FAF8F5]/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-baseline space-x-6">
                    <span className="font-serif text-xl sm:text-2xl text-wood-400 font-light group-hover:text-wood-600 transition-colors">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                        {step.title}
                      </h3>
                      <p className="text-sm text-charcoal-700 mt-2 font-medium">
                        {step.description}
                      </p>
                      {/* Expanded detail */}
                      <p className="text-xs sm:text-sm text-charcoal-500 mt-2 max-w-xl font-light leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
