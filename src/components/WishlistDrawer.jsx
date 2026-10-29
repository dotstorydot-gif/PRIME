import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    formatEGP, 
    viewProduct,
    navigateTo 
  } = useStore();

  if (!isWishlistOpen) return null;

  // Filter products in wishlist
  const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const handleMoveToBag = (product) => {
    addToCart(product);
  };

  const handleProductClick = (productId) => {
    setIsWishlistOpen(false);
    viewProduct(productId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF8F5] shadow-2xl flex flex-col z-10 border-l border-[#E9E2D5]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E9E2D5] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Heart className="w-5 h-5 text-wood-700 fill-wood-700" />
            <h2 className="font-serif text-2xl text-charcoal-900 font-medium">Saved Pieces</h2>
            <span className="text-xs text-charcoal-500 font-sans">
              ({savedProducts.length})
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-charcoal-500 hover:text-charcoal-900 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Sub-header */}
        <div className="bg-[#F0EDE6] px-6 py-2.5 text-xs text-charcoal-700 font-sans border-b border-[#E9E2D5] flex items-center justify-between">
          <span>Curated for your space</span>
          <span className="text-[10px] uppercase tracking-widest text-wood-700 font-semibold">
            Handcrafted in Cairo
          </span>
        </div>

        {/* Saved Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E9E2D5]">
          {savedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <div className="w-16 h-16 rounded-full bg-[#EFECE6] flex items-center justify-center text-charcoal-400">
                <Heart className="w-8 h-8 text-wood-400" />
              </div>
              <h3 className="font-serif text-xl text-charcoal-800">Your wishlist is empty</h3>
              <p className="text-xs text-charcoal-500 font-light max-w-xs leading-relaxed">
                Save your favorite dining tables, consoles, and handcrafted timber pieces to review them anytime.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigateTo('shop');
                }}
                className="mt-2 px-6 py-3 bg-wood-800 text-white text-xs uppercase tracking-widest font-medium hover:bg-wood-900 transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            savedProducts.map((item) => (
              <div key={item.id} className="py-5 flex space-x-4">
                {/* Image */}
                <div 
                  onClick={() => handleProductClick(item.id)}
                  className="w-20 h-20 bg-[#EFECE6] shrink-0 border border-[#E9E2D5] overflow-hidden cursor-pointer group"
                >
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details & Actions */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div 
                        onClick={() => handleProductClick(item.id)}
                        className="cursor-pointer group truncate"
                      >
                        <span className="text-[10px] uppercase tracking-wider text-wood-500 font-semibold block">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-base text-charcoal-900 font-medium truncate group-hover:text-wood-800 transition-colors">
                          {item.name}
                        </h4>
                      </div>

                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="text-charcoal-400 hover:text-red-700 transition-colors ml-2 p-1"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-sans text-xs font-semibold text-charcoal-900 mt-1">
                      {formatEGP(item.price, item.priceUnit)}
                    </p>
                  </div>

                  {/* Move to bag button */}
                  <div className="flex items-center space-x-3 mt-3">
                    <button
                      onClick={() => handleMoveToBag(item)}
                      className="flex-1 py-2 px-3 bg-wood-800 text-white hover:bg-wood-900 text-[11px] uppercase tracking-widest font-medium transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={() => handleProductClick(item.id)}
                      className="py-2 px-2.5 border border-[#E9E2D5] text-charcoal-700 hover:text-charcoal-950 text-[11px] transition-colors"
                      title="View details"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedProducts.length > 0 && (
          <div className="p-6 border-t border-[#E9E2D5] bg-[#FAF8F5] space-y-3">
            <button
              onClick={() => {
                savedProducts.forEach(p => addToCart(p));
                setIsWishlistOpen(false);
              }}
              className="w-full py-3.5 bg-wood-800 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-wood-900 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Bag</span>
            </button>

            <button
              onClick={() => {
                setIsWishlistOpen(false);
                navigateTo('shop');
              }}
              className="w-full py-2 text-center text-xs text-charcoal-600 hover:text-wood-800 uppercase tracking-widest transition-colors font-medium"
            >
              Continue Exploring
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
