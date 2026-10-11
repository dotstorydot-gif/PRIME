import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

export default function FeaturedCollection() {
  const { navigateTo } = useStore();

  const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 6);

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E9E2D5]">
      {/* Section Header matching media_1791714596603.png */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-[#E9E2D5] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
            Our Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal tracking-tight">
            Designed to Live With You
          </h2>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-charcoal-700 hover:text-wood-700 transition-colors inline-flex items-center space-x-1.5 group"
        >
          <span>Shop All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* 6 Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
