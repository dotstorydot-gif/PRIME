import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    deliveryFee, 
    formatEGP, 
    navigateTo 
  } = useStore();

  if (!isCartOpen) return null;

  const total = cartSubtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF8F5] shadow-2xl flex flex-col z-10 border-l border-[#E9E2D5]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E9E2D5] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-wood-700" />
            <h2 className="font-serif text-2xl text-charcoal-900 font-medium">Your Bag</h2>
            <span className="text-xs text-charcoal-500 font-sans">
              ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Banner Progress */}
        <div className="bg-[#F0EDE6] px-6 py-2.5 text-xs text-charcoal-700 font-sans border-b border-[#E9E2D5]">
          {cartSubtotal >= 50000 ? (
            <span className="text-wood-800 font-medium">✓ You qualify for Complimentary Cairo White-Glove Delivery</span>
          ) : (
            <span>
              Add <strong className="text-wood-800">{formatEGP(50000 - cartSubtotal)}</strong> more for free white-glove installation
            </span>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E9E2D5]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <div className="w-16 h-16 rounded-full bg-[#EFECE6] flex items-center justify-center text-charcoal-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl text-charcoal-800">Your bag is empty</h3>
              <p className="text-xs text-charcoal-500 font-light max-w-xs">
                Explore our catalog of handcrafted Egyptian furniture and find the right piece for your space.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="mt-2 px-6 py-3 bg-wood-800 text-white text-xs uppercase tracking-widest font-medium hover:bg-wood-900 transition-colors"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId || item.id} className="py-5 flex space-x-4">
                {/* Image */}
                <div className="w-20 h-20 bg-[#EFECE6] shrink-0 border border-[#E9E2D5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-base text-charcoal-900 font-medium truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId || item.id)}
                        className="text-charcoal-400 hover:text-red-700 transition-colors ml-2"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Selected Options */}
                    <p className="text-[11px] text-charcoal-500 font-light mt-0.5">
                      Finish: {item.finish}
                    </p>
                    {item.size && (
                      <p className="text-[11px] text-charcoal-500 font-light">
                        Size: {item.size}
                      </p>
                    )}
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#E9E2D5] bg-white text-xs">
                      <button
                        onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                        className="p-1 px-2 text-charcoal-600 hover:text-black"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-medium text-charcoal-800 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                        className="p-1 px-2 text-charcoal-600 hover:text-black"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-sans text-xs font-semibold text-charcoal-900">
                      {formatEGP(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E9E2D5] bg-[#FAF8F5] space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal</span>
                <span>{formatEGP(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-600">
                <span>Delivery (Greater Cairo & Giza)</span>
                <span>{deliveryFee === 0 ? 'Complimentary' : formatEGP(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-charcoal-900 pt-2 border-t border-[#E9E2D5]">
                <span>Total</span>
                <span>{formatEGP(total)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full py-4 bg-wood-800 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-wood-900 transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="w-full py-2.5 text-center text-xs text-charcoal-600 hover:text-wood-800 uppercase tracking-widest transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
