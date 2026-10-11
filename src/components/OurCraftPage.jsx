import React from 'react';
import { useStore } from '../context/StoreContext';
import { CRAFT_STEPS, PARTNERS_AND_CLIENTS } from '../data/products';
import { ArrowRight, Sparkles, Shield, Compass, TreePine, Award } from 'lucide-react';

export default function OurCraftPage() {
  const { navigateTo } = useStore();

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
          Wood Arthouse · Est. 1948
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-charcoal-900 font-normal tracking-tight">
          The Art of Solid Timber
        </h1>
        <p className="mt-4 text-charcoal-600 font-sans text-base sm:text-xl font-light leading-relaxed">
          Behind every table, chair, and architectural panel lies more than seven decades of Egyptian woodworking lineage, precision engineering, and genuine passion for raw wood.
        </p>
      </div>

      {/* Hero Showcase Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#E2DBD0] border border-[#E9E2D5]">
        <img
          src="https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=2000&q=85"
          alt="Artisan wood carving in Prime Ghamra workshop"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 text-white max-w-lg">
          <p className="font-serif text-2xl font-light">“Every joint tells a story of patience.”</p>
          <p className="text-xs uppercase tracking-widest text-wood-200 mt-1">Master Joinery Studio · Cairo</p>
        </div>
      </div>

      {/* The 4 Craft Pillars in Depth */}
      <div className="space-y-12">
        <div className="border-b border-[#E9E2D5] pb-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            The Fabrication Lifecycle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {CRAFT_STEPS.map((step) => (
            <div key={step.number} className="bg-[#FAF8F5] border border-[#E9E2D5] overflow-hidden flex flex-col">
              <div className="aspect-[16/10] overflow-hidden bg-[#E9E2D5]">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline space-x-3 mb-2">
                    <span className="font-serif text-2xl text-wood-600 font-light">{step.number}</span>
                    <h3 className="font-serif text-2xl text-charcoal-900 font-medium">{step.title}</h3>
                  </div>
                  <p className="text-sm font-semibold text-charcoal-800 mb-2">{step.description}</p>
                  <p className="text-xs text-charcoal-600 font-light leading-relaxed">{step.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timber Philosophy Quote from PDF */}
      <div className="bg-[#382517] text-[#FAF8F5] p-10 sm:p-16 text-center max-w-4xl mx-auto space-y-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-wood-300 font-semibold block">
          A Legacy Born in Egypt
        </span>
        <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light italic leading-relaxed text-[#FAF8F5]">
          “Once fit for pharaohs, the opulent designs of ancient Egypt still find their way into high-end interiors today. Every curve and finish reflects passion and precision.”
        </blockquote>
        <p className="text-xs uppercase tracking-widest text-wood-300 font-medium">
          — Kate Yourde · In Collaboration with Yasmina Makram
        </p>
      </div>

      {/* Materials We Work With */}
      <div className="space-y-8">
        <div className="border-b border-[#E9E2D5] pb-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Wood Species & Finishes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#E9E2D5] space-y-3">
            <h4 className="font-serif text-xl text-charcoal-900 font-medium">European White Oak</h4>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Renowned for its tight, prominent medullary ray grain and exceptional density. Naturally resistant to warping in diverse Egyptian climates from Alexandria coastlines to Cairo desert heat.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E9E2D5] space-y-3">
            <h4 className="font-serif text-xl text-charcoal-900 font-medium">American & European Walnut</h4>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Offers deep chocolate tones with warm caramel undertones. Its silky smooth surface polishes to an incomparable satin glow that enriches with exposure to natural ambient light.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E9E2D5] space-y-3">
            <h4 className="font-serif text-xl text-charcoal-900 font-medium">Egyptian Beech (Zan)</h4>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Egypt's historic hardwood backbone. Highly workable, exceptionally resilient under structural tension, and ideal for steam-bending organic chair curves and monumental joinery.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-8 border-t border-[#E9E2D5]">
        <h3 className="font-serif text-3xl text-charcoal-900 font-normal mb-3">
          Have an architectural woodwork project?
        </h3>
        <p className="text-sm text-charcoal-600 font-light max-w-md mx-auto mb-6">
          From turnkey residential villas to commercial hospitality claddings, collaborate directly with our Cairo engineering team.
        </p>
        <button
          onClick={() => navigateTo('custom')}
          className="px-8 py-4 bg-wood-800 text-white text-xs uppercase tracking-widest font-medium hover:bg-wood-900 transition-colors"
        >
          Request Custom Consultation
        </button>
      </div>

    </div>
  );
}
