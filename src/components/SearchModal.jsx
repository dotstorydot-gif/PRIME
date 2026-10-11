import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, viewProduct, formatEGP } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      p => p.name.toLowerCase().includes(q) || 
           p.category.toLowerCase().includes(q) ||
           (p.tagline && p.tagline.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelect = (productId) => {
    setIsSearchOpen(false);
    setQuery('');
    viewProduct(productId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative max-w-3xl mx-auto mt-20 sm:mt-24 px-4 z-10">
        <div className="bg-[#FAF8F5] border border-[#E9E2D5] shadow-2xl overflow-hidden">
          
          {/* Search Header Input */}
          <div className="p-4 sm:p-6 border-b border-[#E9E2D5] flex items-center space-x-4">
            <Search className="w-5 h-5 text-wood-700 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dining tables, consoles, armchairs, storage..."
              className="w-full bg-transparent text-charcoal-900 placeholder-charcoal-400 font-sans text-sm sm:text-base focus:outline-none"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="text-xs text-charcoal-400 hover:text-charcoal-800"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 text-charcoal-500 hover:text-charcoal-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Category Searches if query is empty */}
          {!query && (
            <div className="p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-wood-500 font-semibold block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Oslo Dining Table', 'Haven Lounge Chair', 'Noma Console', 'Arco Side Table', 'White Oak', 'Custom Furniture'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-[#EFECE6] hover:bg-wood-100 text-charcoal-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="max-h-96 overflow-y-auto divide-y divide-[#E9E2D5] p-4 sm:p-6">
              {searchResults.length === 0 ? (
                <div className="text-center py-8 text-charcoal-500 text-xs">
                  No matching pieces found for "{query}".
                </div>
              ) : (
                searchResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    className="py-3 flex items-center justify-between cursor-pointer group hover:bg-[#F4EFE6] px-2 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <img src={p.primaryImage} alt={p.name} className="w-12 h-12 object-cover border border-[#E9E2D5]" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-wood-600 font-medium">{p.category}</span>
                        <h4 className="font-serif text-base text-charcoal-900 group-hover:text-wood-800 transition-colors">{p.name}</h4>
                        <span className="text-xs font-semibold text-charcoal-700">{formatEGP(p.price)}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
