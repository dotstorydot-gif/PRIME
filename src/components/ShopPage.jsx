import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import CustomDropdown from './CustomDropdown';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';

export default function ShopPage() {
  const { selectedCategoryFilter, setSelectedCategoryFilter } = useStore();
  
  const [sortBy, setSortBy] = useState('featured');
  const [filterFinish, setFilterFinish] = useState('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Chosen piece categories (aligned with Prime Excel catalog)
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'beds', label: 'Beds' },
    { id: 'night-stands', label: 'Night Stands' },
    { id: 'dressers', label: 'Dressers' },
    { id: 'tv-units', label: 'TV Units' },
    { id: 'consoles', label: 'Consoles' },
    { id: 'tables', label: 'Tables' },
    { id: 'storage', label: 'Storage' },
    { id: 'doors-millwork', label: 'Doors & Ceilings' },
    { id: 'customize', label: 'Customize / B2B' },
  ];

  const timberOptions = [
    { value: 'all', label: 'All Woods' },
    { value: 'oak', label: 'Natural Oak', swatch: '#D7C4A5' },
    { value: 'beech', label: 'Beech Wood', swatch: '#C8A986' },
    { value: 'walnut', label: 'Smoked Walnut', swatch: '#533C29' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by piece Category: Strict 1-to-1 match (no mix!)
    if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
      result = result.filter(item => item.categoryId === selectedCategoryFilter);
    }

    // Filter by Finish if selected
    if (filterFinish !== 'all') {
      result = result.filter(item => 
        (item.finishes && item.finishes.some(f => f.name.toLowerCase().includes(filterFinish.toLowerCase()))) ||
        (item.materials && item.materials.toLowerCase().includes(filterFinish.toLowerCase()))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => {
        if (!a.price && !b.price) return 0;
        if (!a.price) return 1;
        if (!b.price) return -1;
        return a.price - b.price;
      });
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => {
        if (!a.price && !b.price) return 0;
        if (!a.price) return 1;
        if (!b.price) return -1;
        return b.price - a.price;
      });
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [selectedCategoryFilter, sortBy, filterFinish]);

  // Determine which tab is active
  const isTabActive = (catId) => {
    if (catId === 'all') {
      return !selectedCategoryFilter || selectedCategoryFilter === 'all';
    }
    return selectedCategoryFilter === catId;
  };

  return (
    <div>
      {/* Editorial Luxury Header Banner in Prime Navy */}
      <section className="bg-[#1D2743] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D8D2C2]/20 relative overflow-hidden">
        {/* Subtle texture grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F1E7CC_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2.5 mb-3">
            <span className="w-8 h-[1px] bg-[#F1E7CC]" />
            <span className="text-xs uppercase tracking-[0.28em] text-[#F1E7CC] font-semibold">
              PRIME · WOOD ARTHOUSE
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F1E7CC] font-normal tracking-tight">
            Furniture Collection
          </h1>
          <p className="mt-3 text-[#D8D2C2] font-sans text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Considered pieces for living, dining and resting—handcrafted in Cairo from honest hardwoods with an enduring point of view.
          </p>
        </div>
      </section>

      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Primary Category Navigation Bar */}
        <div className="border-t border-[#D8D2C2] pt-4 pb-3">
          <div className="flex items-center space-x-6 xl:space-x-8 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = isTabActive(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`text-[11px] xl:text-xs uppercase tracking-[0.16em] transition-all whitespace-nowrap pb-1.5 relative shrink-0 ${
                    isSelected 
                      ? 'text-[#1D2743] font-semibold border-b-2 border-[#1D2743]' 
                      : 'text-charcoal-600 hover:text-[#1D2743] font-medium'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Refinement & Filters Toolbar */}
        <div className="border-y border-[#D8D2C2] py-3 mb-10 flex items-center justify-between gap-4">
          {/* Left: Item Counter & Active Filter Reset */}
          <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-charcoal-700 font-medium">
            <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'PIECE' : 'PIECES'}</span>
            {selectedCategoryFilter !== 'all' && (
              <>
                <span className="text-[#D8D2C2]">|</span>
                <button 
                  onClick={() => setSelectedCategoryFilter('all')}
                  className="text-[#1D2743] hover:underline lowercase tracking-normal text-xs font-semibold"
                >
                  view all pieces
                </button>
              </>
            )}
          </div>

          {/* Right: Wood Finish & Sort Dropdowns */}
          <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="sm:hidden inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#1D2743] font-medium py-1.5 px-2.5 border border-[#D8D2C2] hover:bg-[#FAF8F5]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Desktop Wood Finish Filter */}
            <div className="hidden sm:block">
              <CustomDropdown
                labelPrefix="TIMBER:"
                value={filterFinish}
                onChange={setFilterFinish}
                options={timberOptions}
                align="right"
              />
            </div>

            <div className="h-3.5 w-[1px] bg-[#D8D2C2] hidden sm:block" />

            {/* Sort By Dropdown */}
            <div>
              <CustomDropdown
                labelPrefix="SORT:"
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                align="right"
              />
            </div>
          </div>
        </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-[#E9E2D5] bg-[#FAF8F5]">
          <h3 className="font-serif text-2xl text-charcoal-700">No pieces found</h3>
          <p className="text-sm text-charcoal-500 mt-2 font-light">
            Try adjusting your timber or category selection.
          </p>
          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setFilterFinish('all');
            }}
            className="mt-6 px-6 py-2.5 bg-wood-800 text-white text-xs uppercase tracking-widest font-medium hover:bg-wood-900 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF8F5] p-6 shadow-xl flex flex-col z-10 border-l border-[#E9E2D5]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E2D5]">
              <span className="font-serif text-xl text-charcoal-900">Filters</span>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-charcoal-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6 flex-1 overflow-y-auto">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal-800 mb-3">
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryFilter(cat.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between ${
                        selectedCategoryFilter === cat.id 
                          ? 'bg-wood-100 text-wood-900 font-semibold' 
                          : 'text-charcoal-600 hover:bg-wood-50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategoryFilter === cat.id && <Check className="w-4 h-4 text-wood-700" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal-800 mb-3">
                  Timber Finish
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Hardwoods' },
                    { id: 'oak', label: 'Natural White Oak' },
                    { id: 'walnut', label: 'Smoked Walnut' },
                    { id: 'ash', label: 'Blackened Ash' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setFilterFinish(f.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between ${
                        filterFinish === f.id 
                          ? 'bg-wood-100 text-wood-900 font-semibold' 
                          : 'text-charcoal-600 hover:bg-wood-50'
                      }`}
                    >
                      <span>{f.label}</span>
                      {filterFinish === f.id && <Check className="w-4 h-4 text-wood-700" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3.5 bg-[#1D2743] text-[#F1E7CC] text-xs uppercase tracking-widest font-semibold hover:bg-[#141B2E] transition-colors"
            >
              View Results ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
