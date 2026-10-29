import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight, Sparkles, Check } from 'lucide-react';

export default function WishlistPage() {
  const { 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    formatEGP, 
    navigateTo, 
    viewProduct,
    showToast 
  } = useStore();

  const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  // If list is empty, show full-screen editorial empty state
  if (savedProducts.length === 0) {
    return (
      <div className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-[#EFECE6] border border-[#E9E2D5] flex items-center justify-center mx-auto text-wood-500">
          <Heart className="w-9 h-9" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block">
            Curated For You
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal tracking-tight">
            Your Wishlist is Empty
          </h1>
          <p className="text-charcoal-600 font-sans text-sm sm:text-base font-light max-w-md mx-auto leading-relaxed">
            You haven't saved any pieces yet. Explore our handcrafted tables, seating, and custom woodwork to begin curating your space.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-8 py-4 bg-wood-800 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-wood-900 transition-colors shadow-sm"
          >
            Explore Shop Collection
          </button>
          <button
            onClick={() => navigateTo('custom')}
            className="w-full sm:w-auto px-8 py-4 border border-[#E9E2D5] bg-white text-charcoal-800 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#FAF8F5] transition-colors"
          >
            Custom Piece Atelier
          </button>
        </div>
      </div>
    );
  }

  const handleAddAllToBag = () => {
    savedProducts.forEach(item => {
      addToCart(item);
    });
    showToast(`Added all ${savedProducts.length} saved pieces to your bag`, 'success');
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Header */}
      <div className="mb-12 border-b border-[#E9E2D5] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-charcoal-500 mb-3">
            <button 
              onClick={() => navigateTo('shop')} 
              className="hover:text-charcoal-900 transition-colors inline-flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>
            <span>/</span>
            <span className="text-wood-700 font-semibold">Favorites</span>
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-1">
            Personal Atelier Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal tracking-tight">
            Saved Pieces
          </h1>
          <p className="mt-3 text-charcoal-600 font-sans text-sm sm:text-base font-light max-w-xl leading-relaxed">
            Your saved selection of contemporary Egyptian woodwork. Review details, select preferred timber finishes, or move pieces directly into your bag.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-4 shrink-0">
          <span className="text-xs uppercase tracking-widest text-charcoal-500 font-medium">
            {savedProducts.length} {savedProducts.length === 1 ? 'Piece' : 'Pieces'} Saved
          </span>

          <button
            onClick={handleAddAllToBag}
            className="px-6 py-3.5 bg-wood-800 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-wood-900 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add All to Bag</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {savedProducts.map((product) => (
          <div key={product.id} className="flex flex-col h-full bg-[#FAF8F5] border border-[#E9E2D5] overflow-hidden group">
            
            {/* Image Box */}
            <div 
              onClick={() => viewProduct(product.id)}
              className="relative aspect-square overflow-hidden bg-[#F0EDE6] cursor-pointer"
            >
              <img
                src={product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Remove from Wishlist button on Top Right */}
              <div className="absolute top-3 right-3 z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="w-8 h-8 rounded-full bg-[#1d2743] text-white hover:bg-red-800 transition-colors flex items-center justify-center shadow-sm"
                  title="Remove from saved"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Info and Actions */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div onClick={() => viewProduct(product.id)} className="cursor-pointer">
                <span className="text-[10px] uppercase tracking-[0.2em] text-wood-500 font-semibold block mb-1">
                  {product.category}
                </span>
                <h3 className="font-serif text-xl text-charcoal-900 font-normal group-hover:text-wood-800 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm font-sans font-semibold text-charcoal-900 mt-1">
                  {formatEGP(product.price)}
                </p>
                <p className="text-xs text-charcoal-500 font-light line-clamp-2 mt-2 leading-relaxed">
                  {product.tagline || product.description}
                </p>
              </div>

              {/* Buttons */}
              <div className="pt-2 border-t border-[#E9E2D5] flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="flex-1 py-3 bg-wood-800 text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-wood-900 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={() => viewProduct(product.id)}
                  className="py-3 px-3.5 border border-[#E9E2D5] bg-white text-charcoal-700 hover:text-charcoal-950 text-xs uppercase tracking-wider font-medium transition-colors"
                  title="View full piece details"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Architectural Guarantee Footer */}
      <div className="mt-20 p-8 sm:p-10 bg-[#FAF8F5] border border-[#E9E2D5] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="font-serif text-2xl text-charcoal-900 font-normal">
            Need Bespoke Sizing for Your Saved Pieces?
          </h4>
          <p className="text-xs text-charcoal-600 font-light">
            Every dining table, console, and cabinet can be tailored to the exact millimetre for your home in Egypt.
          </p>
        </div>
        <button
          onClick={() => navigateTo('custom')}
          className="px-6 py-3 border border-wood-800 text-wood-900 hover:bg-wood-100 text-xs uppercase tracking-widest font-medium transition-colors shrink-0"
        >
          Consult Custom Atelier
        </button>
      </div>

    </div>
  );
}
