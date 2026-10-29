import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Eye, ArrowRight } from 'lucide-react';

export default function QuickViewModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatEGP, 
    viewProduct 
  } = useStore();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isInWishlist(product.id);

  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes ? product.finishes[0].name : 'Natural White Oak'
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(product, {
      finish: selectedFinish,
      size: selectedSize,
      quantity
    });
    setQuickViewProduct(null);
  };

  const handleFullView = () => {
    const id = product.id;
    setQuickViewProduct(null);
    viewProduct(id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] border border-[#E9E2D5] max-w-3xl w-full shadow-2xl z-10 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-charcoal-500 hover:text-charcoal-900 bg-white/80 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image */}
          <div className="aspect-square bg-[#EFECE6] relative overflow-hidden">
            <img
              src={product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-wood-500 font-semibold block">
                {product.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mt-1">
                {product.name}
              </h3>
              <p className="text-xl font-serif text-charcoal-900 font-medium mt-2">
                {formatEGP(product.price, product.priceUnit)}
              </p>
              <p className="text-xs text-charcoal-600 font-light mt-3 leading-relaxed">
                {product.tagline || product.description}
              </p>

              {/* Finish Options */}
              {product.finishes && (
                <div className="mt-4 space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-charcoal-700 font-semibold block">
                    Finish: <span className="font-normal text-charcoal-500">{selectedFinish}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.finishes.map((f) => (
                      <button
                        key={f.name}
                        onClick={() => setSelectedFinish(f.name)}
                        className={`px-3 py-1.5 text-[11px] border tracking-wider transition-all flex items-center space-x-1.5 ${
                          selectedFinish === f.name 
                            ? 'border-wood-800 bg-wood-100 font-medium' 
                            : 'border-[#E9E2D5] bg-white text-charcoal-600 hover:border-wood-400'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.hex }} />
                        <span>{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#E9E2D5]">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 py-3.5 bg-wood-800 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-wood-900 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 border transition-colors ${
                    wishlisted ? 'border-wood-800 bg-wood-800 text-white' : 'border-[#E9E2D5] hover:border-charcoal-400 text-charcoal-700'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleFullView}
                className="w-full text-center text-xs uppercase tracking-widest text-wood-700 hover:text-wood-900 font-medium py-1"
              >
                View Full Product Details →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
