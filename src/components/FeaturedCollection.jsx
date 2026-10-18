import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedCollection() {
  const { navigateTo } = useStore();
  const scrollContainerRef = useRef(null);

  const featured = PRODUCTS.filter(p => p.isFeatured);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E9E2D5]">
      {/* Section Header with Left/Right Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-[#E9E2D5] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-wood-600 font-semibold block mb-2">
            Curated Signature Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal tracking-tight">
            Featured Pieces
          </h2>
          <p className="mt-2 text-charcoal-600 font-sans text-sm sm:text-base font-light max-w-xl">
            Explore our most celebrated dining tables, sculptural seating, and handcrafted consoles in one row.
          </p>
        </div>

        {/* Action Buttons: Left/Right arrows + Shop All */}
        <div className="mt-6 md:mt-0 flex items-center space-x-4 shrink-0">
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs uppercase tracking-[0.2em] font-medium text-charcoal-700 hover:text-wood-700 transition-colors inline-flex items-center space-x-1.5 group mr-2"
          >
            <span>Shop All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#E9E2D5] bg-[#FAF8F5] hover:border-wood-600 hover:bg-wood-100/60 text-charcoal-700 hover:text-charcoal-900 transition-all flex items-center justify-center focus:outline-none"
              aria-label="Scroll left"
              title="Previous pieces"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#E9E2D5] bg-[#FAF8F5] hover:border-wood-600 hover:bg-wood-100/60 text-charcoal-700 hover:text-charcoal-900 transition-all flex items-center justify-center focus:outline-none"
              aria-label="Scroll right"
              title="Next pieces"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Single Row Horizontal Scroll Carousel */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 sm:gap-8 pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {featured.map((product) => (
          <div 
            key={product.id} 
            className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Subtle indicator bar for scroll progress */}
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-charcoal-500 mt-4 pt-3 border-t border-[#E9E2D5]/60">
        <span className="font-medium text-wood-700">✦ Scroll horizontally to browse all features</span>
        <span>{featured.length} Signature Pieces</span>
      </div>
    </section>
  );
}
