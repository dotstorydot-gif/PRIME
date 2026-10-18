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

  // Exact categories matching old UI (media_1792326157868_a66b0ff4.png)
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'living-room', label: 'Living Room' },
    { id: 'dining', label: 'Dining' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'tables', label: 'Tables' },
    { id: 'chairs', label: 'Chairs' },
    { id: 'storage', label: 'Storage' },
  ];

  const timberOptions = [
    { value: 'all', label: 'All Woods' },
    { value: 'oak', label: 'Natural Oak', swatch: '#D7C4A5' },
    { value: 'walnut', label: 'Smoked Walnut', swatch: '#533C29' },
    { value: 'ash', label: 'Blackened Ash', swatch: '#262423' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category matching both room categories and piece categories
    if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
      result = result.filter(item => {
        // Direct categoryId or room match
        if (item.categoryId === selectedCategoryFilter) return true;
        if (item.room === selectedCategoryFilter) return true;
        if (item.rooms && item.rooms.includes(selectedCategoryFilter)) return true;

        // Custom mappings for old UI categories
        if (selectedCategoryFilter === 'living-room') {
          return ['tables', 'consoles', 'chairs', 'tv-units', 'storage', 'doors-millwork'].includes(item.categoryId) ||
                 item.category?.toLowerCase().includes('living') ||
                 item.room === 'living-room' ||
                 item.rooms?.includes('living-room');
        }
        if (selectedCategoryFilter === 'dining') {
          return (item.categoryId === 'tables' && item.name.toLowerCase().includes('dining')) ||
                 item.categoryId === 'consoles' ||
                 item.category?.toLowerCase().includes('dining') ||
                 item.room === 'dining' ||
                 item.rooms?.includes('dining');
        }
        if (selectedCategoryFilter === 'bedroom') {
          return item.categoryId === 'beds' ||
                 item.categoryId === 'dressers' ||
                 item.category?.toLowerCase().includes('bed') ||
                 item.room === 'bedroom' ||
                 item.rooms?.includes('bedroom');
        }
        if (selectedCategoryFilter === 'tables') {
          return item.categoryId === 'tables' || item.name.toLowerCase().includes('table');
        }
        if (selectedCategoryFilter === 'chairs') {
          return item.categoryId === 'chairs' || item.name.toLowerCase().includes('chair') || item.name.toLowerCase().includes('armchair');
        }
        if (selectedCategoryFilter === 'storage') {
          return ['storage', 'tv-units', 'dressers', 'consoles'].includes(item.categoryId) ||
                 item.name.toLowerCase().includes('cabinet') ||
                 item.name.toLowerCase().includes('credenza') ||
                 item.name.toLowerCase().includes('sideboard');
        }

        // Direct matching for piece categories if navigated from homepage:
        if (selectedCategoryFilter === 'consoles') {
          return item.categoryId === 'consoles';
        }
        if (selectedCategoryFilter === 'beds') {
          return item.categoryId === 'beds';
        }
        if (selectedCategoryFilter === 'dressers') {
          return item.categoryId === 'dressers';
        }
        if (selectedCategoryFilter === 'tv-units') {
          return item.categoryId === 'tv-units';
        }
        if (selectedCategoryFilter === 'doors-millwork') {
          return item.categoryId === 'doors-millwork';
        }

        return false;
      });
    }

    // Filter by Finish if selected
    if (filterFinish !== 'all') {
      result = result.filter(item => 
        item.finishes && item.finishes.some(f => f.name.toLowerCase().includes(filterFinish.toLowerCase()))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [selectedCategoryFilter, sortBy, filterFinish]);

  // Determine which tab is active (including if a sub-piece was selected from home)
  const isTabActive = (catId) => {
    if (catId === 'all') {
      return !selectedCategoryFilter || selectedCategoryFilter === 'all';
    }
    if (selectedCategoryFilter === catId) return true;
    if (catId === 'tables' && selectedCategoryFilter === 'tables') return true;
    if (catId === 'chairs' && selectedCategoryFilter === 'chairs') return true;
    if (catId === 'storage' && (selectedCategoryFilter === 'storage' || selectedCategoryFilter === 'tv-units')) return true;
    if (catId === 'bedroom' && (selectedCategoryFilter === 'beds' || selectedCategoryFilter === 'dressers')) return true;
    if (catId === 'living-room' && (selectedCategoryFilter === 'consoles' || selectedCategoryFilter === 'doors-millwork')) return true;
    return false;
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Header matching screenshot media_1792326157868_a66b0ff4.png */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
          Top Collection
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-charcoal-900 font-normal tracking-tight">
          Shop Furniture
        </h1>
        <p className="mt-4 text-charcoal-600 font-sans text-base sm:text-lg font-light leading-relaxed">
          Considered pieces for living, dining and resting—made with natural materials and a lasting point of view.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="border-y border-[#E9E2D5] py-4 mb-10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Desktop Category Pills matching old UI */}
        <div className="hidden lg:flex items-center space-x-8 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isSelected = isTabActive(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`text-xs uppercase tracking-[0.18em] transition-all whitespace-nowrap pb-1 relative ${
                  isSelected 
                    ? 'text-charcoal-900 font-semibold border-b-2 border-charcoal-900' 
                    : 'text-charcoal-600 hover:text-charcoal-900 font-medium'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-charcoal-800 font-medium py-2 px-3 border border-[#E9E2D5]"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters ({selectedCategoryFilter !== 'all' ? '1' : '0'})</span>
        </button>

        {/* Right side: Sort Dropdown & Finish selector */}
        <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
          {/* Wood Finish Filter */}
          <div className="hidden sm:block">
            <CustomDropdown
              labelPrefix="TIMBER:"
              value={filterFinish}
              onChange={setFilterFinish}
              options={timberOptions}
              align="right"
            />
          </div>

          <div className="h-4 w-[1px] bg-[#E9E2D5] hidden sm:block" />

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

      {/* Item Counter */}
      <div className="mb-6 flex items-center justify-between text-xs text-charcoal-500 uppercase tracking-widest font-medium">
        <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'PIECE' : 'PIECES'}</span>
        {selectedCategoryFilter !== 'all' && (
          <button 
            onClick={() => setSelectedCategoryFilter('all')}
            className="text-wood-600 hover:text-wood-800 underline lowercase"
          >
            clear category filter
          </button>
        )}
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
              className="w-full py-3 bg-wood-800 text-white text-xs uppercase tracking-widest font-medium"
            >
              View Results ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
