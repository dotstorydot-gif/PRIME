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
      <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#FAF8F5] border border-[#D8D2C2] transition-all duration-300 group-hover:border-[#1D2743]/50 group-hover:shadow-md">
        
        {/* Product Image */}
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Wishlist Button on Top Right (no title/badge on image) */}
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              wishlisted 
                ? 'bg-[#1D2743] text-[#F1E7CC]' 
                : 'bg-white/95 backdrop-blur-sm text-charcoal-700 hover:text-[#1D2743] hover:bg-white shadow-sm'
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
            className="flex-1 py-2.5 px-3 bg-[#FAF8F5]/95 backdrop-blur-sm text-[#111827] text-[11px] uppercase tracking-widest font-medium hover:bg-white transition-colors flex items-center justify-center space-x-1.5 border border-[#D8D2C2]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="py-2.5 px-3 bg-[#1D2743] text-[#F1E7CC] hover:bg-[#141B2E] transition-colors flex items-center justify-center text-[11px] uppercase tracking-widest font-medium border border-[#1D2743]"
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
        <div className="space-y-1.5 flex-1 min-w-0 pr-2">
          {/* Tags from Excel */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#1D2743] font-bold">
              {product.category}
            </span>
            {product.tag && product.tag.toLowerCase() !== product.category.toLowerCase() && (
              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F1E7CC]/60 text-[#1D2743] font-medium border border-[#D8D2C2]">
                {product.tag}
              </span>
            )}
            {product.b2bTag && (
              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D8D2C2]/30 text-charcoal-700 font-medium border border-[#D8D2C2]">
                {product.b2bTag}
              </span>
            )}
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-[#111827] font-medium group-hover:text-[#1D2743] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm font-sans text-[#1D2743] font-semibold tracking-wide">
            {formatEGP(product.price, product.priceUnit)}
          </p>
        </div>

        {/* Corner Add Icon */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="mt-1 p-2 text-[#1D2743] hover:bg-[#1D2743] hover:text-[#F1E7CC] transition-colors border border-transparent hover:border-[#D8D2C2] rounded-md"
          title={product.price ? "Add to bag" : "Request Custom Quote"}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
