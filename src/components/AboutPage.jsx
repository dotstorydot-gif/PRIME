import React from 'react';
import { useStore } from '../context/StoreContext';
import { PARTNERS_AND_CLIENTS } from '../data/products';
import { Building2, Compass, ShieldCheck, HeartHandshake, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { navigateTo } = useStore();

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Editorial Hero Header */}
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
          Heritage Since 1948 · Cairo
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-charcoal-900 font-normal tracking-tight">
          Built Around Wood.
        </h1>
        <p className="mt-4 text-charcoal-600 font-sans text-base sm:text-xl font-light leading-relaxed">
          Prime is one of the leading Egyptian pioneers in the wooden works field. We are proud to have maintained an unbroken legacy of excellence since 1948, consistently delivering unmatched craftsmanship across Egypt and the Middle East.
        </p>
      </div>

      {/* Narrative & Visual Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/3] bg-[#E2DBD0] border border-[#E9E2D5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
              alt="Prime Wooden Work Cairo Interior Architecture"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 text-charcoal-700 font-light text-sm sm:text-base leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-900 font-normal">
            A Cairo Hub for Architecture & Wood Design
          </h2>
          <p>
            Headquartered in Cairo, Prime serves as a dynamic hub where architectural visions turn into physical reality. Our expertise and dedication to excellence are reflected in every project we undertake—from bespoke dining tables for private villas to extensive wood panelling, executive suites, and luxury hotel developments.
          </p>
          <p>
            We believe in the power of design to transform spaces, enhance functionality, and impart lasting sensory warmth. Every cut, joint, and hand-rubbed finish is guided by our commitment to pieces that transcend fleeting trends and endure for generations.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-medium text-wood-700 hover:text-wood-900 transition-colors border-b border-wood-700 pb-1"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Brand Values from Company Profile */}
      <div className="space-y-12 bg-[#FAF8F5] border border-[#E9E2D5] p-8 sm:p-14">
        <div className="border-b border-[#E9E2D5] pb-4">
          <span className="text-xs uppercase tracking-widest text-wood-500 font-semibold block mb-1">
            Our Guiding Pillars
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Brand Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Innovative Leadership</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              We lead the Egyptian wood industry by combining decades of experience with forward-thinking contemporary design and European precision machinery.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Exceptional Quality</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Every product reflects meticulous attention to detail, premium imported hardwoods, seamless joints, and long-lasting eco-certified finishes.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Customer-Centric Bespoke</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Whether serving private homeowners, architects, or corporate leaders, we tailor solutions to exact dimensional constraints and stylistic intents.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Heritage & Expertise</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Founded in 1948, we have nurtured generations of Cairo's most skilled carpenters and woodcarvers, keeping Egyptian craft legacy alive.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Diverse Offerings</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              From freestanding tables and chairs to walk-in dressing rooms, kitchen cabinetry, custom doors, and acoustic wall claddings.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Sustainable Stewardship</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              We exclusively procure timber from certified responsibly managed forests, pairing them with non-toxic natural plant oils and zero-waste workshop practices.
            </p>
          </div>
        </div>
      </div>

      {/* Corporate Collaborations & Partnerships from PDF */}
      <div className="space-y-8">
        <div className="border-b border-[#E9E2D5] pb-4 flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-wood-500 font-semibold block mb-1">
              Trusted By Egyptian Architecture Leaders
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Corporate & Bespoke Portfolio
            </h2>
          </div>
          <p className="text-xs text-charcoal-500 font-light mt-2 sm:mt-0">
            Furnishing prestige offices, hospitality landmarks, and private villas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNERS_AND_CLIENTS.map((partner) => (
            <div 
              key={partner.name}
              className="bg-white border border-[#E9E2D5] p-5 text-center flex flex-col items-center justify-center min-h-24 hover:border-wood-400 transition-colors"
            >
              <span className="font-serif text-sm font-semibold text-charcoal-900 block">
                {partner.name}
              </span>
              <span className="text-[10px] text-wood-600 font-sans tracking-tight mt-1">
                {partner.note}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
