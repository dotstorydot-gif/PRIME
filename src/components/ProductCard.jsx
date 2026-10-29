import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, Plus, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const { 
    viewProduct, 
    toggleWishlist, 
    isInWishlist, 
    formatEGP, 
    addToCart, 
    setQuickViewProduct 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="group cursor-pointer flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => viewProduct(product.id)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#F0EDE6] border border-[#E9E2D5]/70 transition-all duration-300 group-hover:border-wood-300">
        
        {/* Primary and Hover Secondary Images */}
        <img
          src={product.primaryImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.secondaryImage 
              ? 'opacity-0 scale-105' 
              : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered 
                ? 'opacity-100 scale-105' 
                : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Top Badges / Wishlist */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {product.badge ? (
            <span className="bg-[#FAF8F5]/90 backdrop-blur-sm text-[10px] uppercase tracking-widest px-2.5 py-1 text-charcoal-800 font-medium border border-[#E9E2D5]">
              {product.badge}
            </span>
          ) : <span />}

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              wishlisted 
                ? 'bg-[#1d2743] text-[#fae6c3]' 
                : 'bg-[#FAF8F5]/90 backdrop-blur-sm text-charcoal-700 hover:text-[#1d2743] hover:bg-white'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            title={wishlisted ? 'Remove from saved' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Actions Bar */}
        <div 
          className={`absolute inset-x-3 bottom-3 flex items-center space-x-2 transition-all duration-300 z-10 ${
            isHovered 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={handleQuickView}
            className="flex-1 py-2.5 px-3 bg-[#FAF8F5]/95 backdrop-blur-sm text-charcoal-800 text-[11px] uppercase tracking-widest font-medium hover:bg-white transition-colors flex items-center justify-center space-x-1.5 border border-[#E9E2D5]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="py-2.5 px-3 bg-[#1d2743] text-[#fae6c3] hover:bg-[#182032] transition-colors flex items-center justify-center text-[11px] uppercase tracking-widest font-medium border border-[#1d2743]"
            title="Quick add to bag"
          >
            {justAdded ? (
              <Check className="w-3.5 h-3.5 text-green-300" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Product Details matching screenshot layout */}
      <div className="pt-4 flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-wood-500 font-semibold block">
            {product.category}
          </span>
          <h3 className="font-serif text-lg sm:text-xl text-charcoal-900 font-medium group-hover:text-wood-800 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm font-sans text-charcoal-700 font-medium tracking-wide">
            {formatEGP(product.price, product.priceUnit)}
          </p>
        </div>

        {/* Corner Add Icon */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="mt-1 p-2 text-charcoal-600 hover:text-wood-800 transition-colors border border-transparent hover:border-[#E9E2D5]"
          title="Add to bag"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
