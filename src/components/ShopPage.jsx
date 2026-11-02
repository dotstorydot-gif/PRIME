import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import CustomDropdown from './CustomDropdown';
import { SlidersHorizontal, Check, X, RotateCcw } from 'lucide-react';

export default function ShopPage() {
  const { selectedCategoryFilter, setSelectedCategoryFilter } = useStore();
  
  const [sortBy, setSortBy] = useState('featured');
  const [filterFinish, setFilterFinish] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
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
    { value: 'walnut', label: 'Smoked Walnut', swatch: '#533C29' },
    { value: 'beech', label: 'Beech Wood', swatch: '#C8A986' },
    { value: 'blackened', label: 'Blackened Oak', swatch: '#262423' },
  ];

  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-25k', label: 'Under EGP 25,000' },
    { value: '25k-50k', label: 'EGP 25,000 – 50,000' },
    { value: '50k-75k', label: 'EGP 50,000 – 75,000' },
    { value: 'above-75k', label: 'Above EGP 75,000' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by piece Category: Strict 1-to-1 match
    if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
      result = result.filter(item => item.categoryId === selectedCategoryFilter);
    }

    // Filter by Timber Finish
    if (filterFinish !== 'all') {
      result = result.filter(item => {
        if (item.timber && item.timber.toLowerCase() === filterFinish.toLowerCase()) {
          return true;
        }
        if (item.finishes && item.finishes.some(f => f.name.toLowerCase().includes(filterFinish.toLowerCase()))) {
          return true;
        }
        return false;
      });
    }

    // Filter by Price Range
    if (filterPrice !== 'all') {
      if (filterPrice === 'under-25k') {
        result = result.filter(item => typeof item.price === 'number' && item.price < 25000);
      } else if (filterPrice === '25k-50k') {
        result = result.filter(item => typeof item.price === 'number' && item.price >= 25000 && item.price <= 50000);
      } else if (filterPrice === '50k-75k') {
        result = result.filter(item => typeof item.price === 'number' && item.price > 50000 && item.price <= 75000);
      } else if (filterPrice === 'above-75k') {
        result = result.filter(item => typeof item.price === 'number' && item.price > 75000);
      }
    }

    // Sorting: Realistic, mathematically correct & curated
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => {
        const dateA = new Date(a.releaseDate || '2026-01-01').getTime();
        const dateB = new Date(b.releaseDate || '2026-01-01').getTime();
        return dateB - dateA;
      });
    } else if (sortBy === 'featured') {
      result.sort((a, b) => {
        const rankA = a.isFeatured ? (a.featuredRank || 10) : 999;
        const rankB = b.isFeatured ? (b.featuredRank || 10) : 999;
        return rankA - rankB;
      });
    }

    return result;
  }, [selectedCategoryFilter, sortBy, filterFinish, filterPrice]);

  // Determine which tab is active
  const isTabActive = (catId) => {
    if (catId === 'all') {
      return !selectedCategoryFilter || selectedCategoryFilter === 'all';
    }
    return selectedCategoryFilter === catId;
  };

  const hasActiveFilters = 
    (selectedCategoryFilter && selectedCategoryFilter !== 'all') ||
    filterFinish !== 'all' ||
    filterPrice !== 'all' ||
    sortBy !== 'featured';

  const resetAllFilters = () => {
    setSelectedCategoryFilter('all');
    setFilterFinish('all');
    setFilterPrice('all');
    setSortBy('featured');
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
          <div className="overflow-x-auto no-scrollbar py-1">
            <div className="w-full min-w-full flex items-center justify-between gap-4 lg:gap-0">
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
        </div>

        {/* Secondary Refinement & Filters Toolbar */}
        <div className="border-y border-[#D8D2C2] py-3 mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Item Counter & Active Filter Reset */}
          <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-charcoal-700 font-medium">
            <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'PIECE' : 'PIECES'}</span>
            {hasActiveFilters && (
              <>
                <span className="text-[#D8D2C2]">|</span>
                <button 
                  onClick={resetAllFilters}
                  className="text-[#1D2743] hover:underline lowercase tracking-normal text-xs font-semibold inline-flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>reset all</span>
                </button>
              </>
            )}
          </div>

          {/* Right: Wood Finish, Price Range & Sort Dropdowns */}
          <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#1D2743] font-medium py-1.5 px-2.5 border border-[#D8D2C2] hover:bg-[#FAF8F5]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Desktop Wood Finish Filter */}
            <div className="hidden lg:block">
              <CustomDropdown
                labelPrefix="TIMBER:"
                value={filterFinish}
                onChange={setFilterFinish}
                options={timberOptions}
                align="right"
              />
            </div>

            <div className="h-3.5 w-[1px] bg-[#D8D2C2] hidden lg:block" />

            {/* Desktop Price Range Filter */}
            <div className="hidden lg:block">
              <CustomDropdown
                labelPrefix="PRICE:"
                value={filterPrice}
                onChange={setFilterPrice}
                options={priceOptions}
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

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] uppercase tracking-wider text-charcoal-500 font-medium mr-1">
              Active:
            </span>

            {selectedCategoryFilter && selectedCategoryFilter !== 'all' && (
              <button
                onClick={() => setSelectedCategoryFilter('all')}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-[#1D2743]/5 text-[#1D2743] border border-[#1D2743]/20 text-[11px] uppercase tracking-wider font-medium hover:bg-[#1D2743]/10 transition-colors"
              >
                <span>Category: {categories.find(c => c.id === selectedCategoryFilter)?.label}</span>
                <X className="w-3 h-3 text-[#1D2743]" />
              </button>
            )}

            {filterFinish !== 'all' && (
              <button
                onClick={() => setFilterFinish('all')}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-[#1D2743]/5 text-[#1D2743] border border-[#1D2743]/20 text-[11px] uppercase tracking-wider font-medium hover:bg-[#1D2743]/10 transition-colors"
              >
                <span>Timber: {timberOptions.find(t => t.value === filterFinish)?.label}</span>
                <X className="w-3 h-3 text-[#1D2743]" />
              </button>
            )}

            {filterPrice !== 'all' && (
              <button
                onClick={() => setFilterPrice('all')}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-[#1D2743]/5 text-[#1D2743] border border-[#1D2743]/20 text-[11px] uppercase tracking-wider font-medium hover:bg-[#1D2743]/10 transition-colors"
              >
                <span>Price: {priceOptions.find(p => p.value === filterPrice)?.label}</span>
                <X className="w-3 h-3 text-[#1D2743]" />
              </button>
            )}

            {sortBy !== 'featured' && (
              <button
                onClick={() => setSortBy('featured')}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-[#1D2743]/5 text-[#1D2743] border border-[#1D2743]/20 text-[11px] uppercase tracking-wider font-medium hover:bg-[#1D2743]/10 transition-colors"
              >
                <span>Sort: {sortOptions.find(s => s.value === sortBy)?.label}</span>
                <X className="w-3 h-3 text-[#1D2743]" />
              </button>
            )}

            <button
              onClick={resetAllFilters}
              className="text-[11px] uppercase tracking-wider text-charcoal-500 hover:text-[#1D2743] underline ml-2 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

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
            Try adjusting your timber, price, or category selection.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-6 px-6 py-2.5 bg-[#1D2743] hover:bg-[#141B2E] text-[#F1E7CC] text-xs uppercase tracking-widest font-semibold border border-[#F1E7CC]/30 transition-colors"
          >
            Reset All Filters
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
              <span className="font-serif text-xl text-charcoal-900">Filters & Sorting</span>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-charcoal-600 hover:text-black"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6 flex-1 overflow-y-auto">
              {/* Sort By */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal-800 mb-3">
                  Sort By
                </h4>
                <div className="space-y-1.5">
                  {sortOptions.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSortBy(s.value)}
                      className={`w-full text-left py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between rounded-sm ${
                        sortBy === s.value 
                          ? 'bg-[#1D2743] text-[#F1E7CC] font-semibold' 
                          : 'text-charcoal-600 hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <span>{s.label}</span>
                      {sortBy === s.value && <Check className="w-4 h-4 text-[#F1E7CC]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timber Finish */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal-800 mb-3">
                  Timber Finish
                </h4>
                <div className="space-y-1.5">
                  {timberOptions.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFilterFinish(f.value)}
                      className={`w-full text-left py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between rounded-sm ${
                        filterFinish === f.value 
                          ? 'bg-[#1D2743] text-[#F1E7CC] font-semibold' 
                          : 'text-charcoal-600 hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {f.swatch && (
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-black/20" 
                            style={{ backgroundColor: f.swatch }}
                          />
                        )}
                        <span>{f.label}</span>
                      </div>
                      {filterFinish === f.value && <Check className="w-4 h-4 text-[#F1E7CC]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal-800 mb-3">
                  Price Range
                </h4>
                <div className="space-y-1.5">
                  {priceOptions.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setFilterPrice(p.value)}
                      className={`w-full text-left py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between rounded-sm ${
                        filterPrice === p.value 
                          ? 'bg-[#1D2743] text-[#F1E7CC] font-semibold' 
                          : 'text-charcoal-600 hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <span>{p.label}</span>
                      {filterPrice === p.value && <Check className="w-4 h-4 text-[#F1E7CC]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal-800 mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryFilter(cat.id)}
                      className={`w-full text-left py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between rounded-sm ${
                        (cat.id === 'all' && (!selectedCategoryFilter || selectedCategoryFilter === 'all')) || selectedCategoryFilter === cat.id
                          ? 'bg-[#1D2743] text-[#F1E7CC] font-semibold' 
                          : 'text-charcoal-600 hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {((cat.id === 'all' && (!selectedCategoryFilter || selectedCategoryFilter === 'all')) || selectedCategoryFilter === cat.id) && (
                        <Check className="w-4 h-4 text-[#F1E7CC]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E9E2D5] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#1D2743] text-[#F1E7CC] text-xs uppercase tracking-widest font-semibold hover:bg-[#141B2E] transition-colors"
              >
                View Results ({filteredProducts.length})
              </button>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="w-full py-2 text-xs uppercase tracking-wider text-charcoal-600 hover:text-[#1D2743] font-medium"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
