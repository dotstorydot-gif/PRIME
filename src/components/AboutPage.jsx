import React from 'react';
import { useStore } from '../context/StoreContext';
import { CRAFT_STEPS, PARTNERS_AND_CLIENTS } from '../data/products';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
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
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Editorial Prologue & Story Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2">
          <span className="w-8 h-[1px] bg-wood-600" />
          <span className="text-xs uppercase tracking-[0.25em] text-wood-600 font-semibold">
            Our Story & Heritage · Est. 1948
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-charcoal-900 font-normal tracking-tight">
          Built Around Wood.
        </h1>
        <p className="text-charcoal-600 font-sans text-base sm:text-xl font-light leading-relaxed pt-2">
          A story of patience, passion, and four generations of Cairo carpenters turning raw solid timber into heirloom architectural furniture.
        </p>
      </div>

      {/* Story Chapter 1: The Cairo Heritage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/3] bg-[#E2DBD0] border border-[#E9E2D5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
              alt="Prime Wooden Work Cairo Interior Architecture"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-wood-800 text-[#FAF8F5] p-5 hidden sm:block shadow-lg max-w-xs">
            <span className="font-serif text-2xl block">1948</span>
            <span className="text-[10px] uppercase tracking-widest text-wood-200">
              Founded in Ghamra, Cairo
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 text-charcoal-700 font-light text-sm sm:text-base leading-relaxed">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-wood-600 font-semibold block">
              Chapter I
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-900 font-normal">
              Born from Cairo’s Historic Timber District
            </h2>
          </div>
          <p>
            Prime is one of the leading Egyptian companies in the wooden works field. We are proud to have maintained an unbroken presence in the market since 1948, consistently delivering exceptional quality woodwork across Egypt and the Middle East.
          </p>
          <p>
            What began in the historic wood workshops of Port Said Street in Ghamra has evolved into a full-scale architectural and furniture atelier. We combine time-honored joinery—mortise and tenon, hand-turned radii, and steam-bent Zan beech—with state-of-the-art precision German tooling.
          </p>
          <p>
            Every piece that leaves our atelier carries the fingerprint of human hands and an honest respect for the living character of wood.
          </p>
        </div>
      </div>

      {/* Story Chapter 2: The Craftsmanship Lifecycle (Moved from Our Craft page) */}
      <div className="space-y-12 border-t border-[#E9E2D5] pt-16">
        <div className="max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-wood-600 font-semibold block mb-1">
            Chapter II · The Process
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal tracking-tight">
            From Raw Material to Your Home
          </h2>
          <p className="mt-2 text-charcoal-600 font-sans text-sm sm:text-base font-light">
            Every table, bed, and custom console undergoes four deliberate stages of master craftsmanship.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {CRAFT_STEPS.map((step) => (
            <div key={step.number} className="bg-[#FAF8F5] border border-[#E9E2D5] overflow-hidden flex flex-col group">
              <div className="aspect-[16/10] overflow-hidden bg-[#E9E2D5] relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 font-serif text-sm">
                  Stage {step.number}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
                    {step.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-wood-700 font-semibold mt-1">
                    {step.description}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed mt-3">
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Chapter 3: Heritage Quote & Collaborations */}
      <div className="bg-[#382517] text-[#FAF8F5] p-8 sm:p-16 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
        <span className="text-[10px] uppercase tracking-[0.3em] text-wood-300 font-semibold block">
          Chapter III · Ancient Lineage
        </span>
        <blockquote className="font-serif text-xl sm:text-3xl font-light italic leading-relaxed text-[#FAF8F5]">
          “Once fit for pharaohs, the opulent designs of ancient Egypt still find their way into high-end interiors today. Every curve and finish reflects passion and precision.”
        </blockquote>
        <p className="text-xs uppercase tracking-widest text-wood-300 font-medium">
          — Kate Yourde · In Collaboration with Yasmina Makram
        </p>
      </div>

      {/* Landmark Corporate & Architectural Collaborations */}
      <div className="space-y-8">
        <div className="border-b border-[#E9E2D5] pb-4 flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-wood-600 font-semibold block mb-1">
              Chapter IV · Architectural Partnerships
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Trusted by Egypt's Design Leaders
            </h2>
          </div>
          <p className="text-xs text-charcoal-500 font-light mt-2 sm:mt-0">
            Furnishing prestige offices, hospitality landmarks, and private residences.
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

      {/* Story Chapter 5: Brand Values */}
      <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-8 sm:p-14 space-y-10">
        <div className="border-b border-[#E9E2D5] pb-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-wood-600 font-semibold block mb-1">
            Chapter V · Our Guiding Creed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Brand Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Innovative Leadership</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Decades of experience married with contemporary design and European high-precision machinery.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Exceptional Quality</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Meticulous joints, premium imported hardwoods, and long-lasting eco-certified non-toxic finishes.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Customer-Centric Bespoke</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Tailoring dimensions, edge radiuses, and species to unique architectural spaces across Egypt.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Heritage & Expertise</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Preserving Cairo's woodworking mastery since 1948 while continually evolving contemporary forms.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Diverse Offerings</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              From freestanding dining tables to architectural wall claddings, vanity units, and pivot doors.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium">Sustainable Stewardship</h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Responsibly harvested FSC timbers paired with zero-waste workshop practices in Cairo.
            </p>
          </div>
        </div>
      </div>

      {/* Workshop Location & Showroom Call-to-Action */}
      <div className="bg-white border border-[#E9E2D5] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-wood-600 font-semibold block">
            Visit Our Cairo Atelier & Material Library
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
            Experience the Wood in Person
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-xl">
            Touch real European Oak, Smoked Walnut, and tactile wire-brushed samples. Consult directly with our master woodworkers.
          </p>
          <a
            href="https://maps.google.com/?q=3+El+Madaress+St+Off+Port+Said+St+Ghamra+Cairo+Egypt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs text-wood-800 hover:text-wood-950 font-medium pt-2 group"
          >
            <MapPin className="w-3.5 h-3.5 text-wood-600" />
            <span>3 El Madaress St., Off Port Said St., Ghamra, Cairo (Open in Google Maps ↗)</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => navigateTo('custom')}
            className="w-full sm:w-auto px-6 py-3.5 bg-wood-800 text-white text-xs uppercase tracking-widest font-medium hover:bg-wood-900 transition-colors"
          >
            Start Custom Request
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-6 py-3.5 border border-[#E9E2D5] bg-[#FAF8F5] text-charcoal-800 text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors"
          >
            View Furniture Catalog
          </button>
        </div>
      </div>

    </div>
  );
}
