import React from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    deliveryFee, 
    formatEGP, 
    navigateTo 
  } = useStore();

  const total = cartSubtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-6">
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
          Your Bag is Empty
        </h1>
        <p className="text-charcoal-600 font-light max-w-md mx-auto">
          Explore our handcrafted collections crafted from solid natural timber in Cairo.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center justify-center px-8 py-4 bg-wood-800 text-white text-xs uppercase tracking-widest font-medium hover:bg-wood-900 transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="mb-12 border-b border-[#E9E2D5] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-1">
            Review Bag
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Shopping Cart
          </h1>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="text-xs uppercase tracking-widest font-medium text-charcoal-600 hover:text-wood-800 transition-colors inline-flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Cart Items Table/List */}
        <div className="lg:col-span-8 divide-y divide-[#E9E2D5] border-y border-[#E9E2D5]">
          {cart.map((item) => (
            <div key={item.cartItemId || item.id} className="py-6 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              
              {/* Image */}
              <div className="w-24 h-24 bg-[#EFECE6] border border-[#E9E2D5] shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-wood-500 font-semibold">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl text-charcoal-900 font-normal">
                  {item.name}
                </h3>
                <div className="text-xs text-charcoal-500 mt-1 space-y-0.5">
                  <p>Finish: {item.finish}</p>
                  {item.size && <p>Size: {item.size}</p>}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border border-[#E9E2D5] bg-white text-xs w-fit">
                <button
                  onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                  className="p-2 text-charcoal-600 hover:text-black"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-semibold text-charcoal-800 min-w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                  className="p-2 text-charcoal-600 hover:text-black"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Price & Remove */}
              <div className="flex items-center justify-between sm:justify-end sm:space-x-6">
                <span className="font-sans text-sm sm:text-base font-semibold text-charcoal-900">
                  {formatEGP(item.price * item.quantity)}
                </span>
                <button
                  onClick={() => removeFromCart(item.cartItemId || item.id)}
                  className="text-charcoal-400 hover:text-red-700 transition-colors p-1"
                  title="Remove from bag"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-[#E9E2D5] pb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-charcoal-700">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium">{formatEGP(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Delivery (Egypt)</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? 'Complimentary' : formatEGP(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-charcoal-900 pt-3 border-t border-[#E9E2D5]">
                <span>Total Amount</span>
                <span>{formatEGP(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 bg-wood-800 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-wood-900 transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 border-t border-[#E9E2D5] space-y-2 text-[11px] text-charcoal-500 font-light">
              <p className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-wood-600 shrink-0" />
                <span>10-year craft & joinery guarantee</span>
              </p>
              <p className="flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-wood-600 shrink-0" />
                <span>Direct delivery & room-of-choice placement</span>
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
