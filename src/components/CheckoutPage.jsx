import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  Truck, 
  ShieldCheck, 
  Lock, 
  ArrowLeft,
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartSubtotal, deliveryFee, formatEGP, clearCart, navigateTo, showToast } = useStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    governorate: 'Cairo',
    district: '',
    streetAddress: '',
    buildingVilla: '',
    apartmentFloor: '',
    notes: '',
    deliveryMethod: 'white-glove',
    paymentMethod: 'cod',
    cardName: '',
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
    installmentPlan: '6-months'
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const total = cartSubtotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.streetAddress) {
      showToast('Please fill in your name, contact phone and delivery address', 'error');
      return;
    }

    const randomOrder = 'PWW-EG-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrder);
    setIsOrdered(true);
    clearCart();
    showToast(`Order #${randomOrder} placed successfully!`, 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isOrdered) {
    return (
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-8 sm:p-14 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-wood-100 text-wood-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-wood-700" />
          </div>

          <span className="text-xs uppercase tracking-widest text-wood-600 font-semibold block">
            Order Confirmed · Thank You
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Order #{orderNumber}
          </h1>

          <p className="text-charcoal-600 font-sans text-sm sm:text-base font-light max-w-md mx-auto leading-relaxed">
            Your handcrafted order has been scheduled with our Cairo workshop. Our customer concierge will contact you within 24 hours to coordinate fabrication and your delivery appointment.
          </p>

          <div className="bg-[#F0EDE6] p-6 text-xs text-charcoal-700 text-left space-y-2 border border-[#E9E2D5]">
            <div className="flex justify-between">
              <span>Customer:</span>
              <strong>{formData.firstName} {formData.lastName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Contact Phone:</span>
              <strong>{formData.phone}</strong>
            </div>
            <div className="flex justify-between">
              <span>Delivery Location:</span>
              <strong>{formData.governorate}, {formData.district}</strong>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <strong>{formData.paymentMethod === 'cod' ? 'Cash on Delivery (White Glove Handover)' : 'Prepaid Electronic'}</strong>
            </div>
            <div className="flex justify-between border-t border-[#E9E2D5] pt-2 text-sm font-semibold text-charcoal-900">
              <span>Total Payable:</span>
              <span>{formatEGP(total)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/201222935556?text=${encodeURIComponent(
                `Hello Prime Wooden Work, I am following up on Order #${orderNumber}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#20ba59] transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Connect on WhatsApp</span>
            </a>

            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-6 py-3.5 border border-[#1C1A18] text-[#1C1A18] text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="mb-10 flex items-center justify-between border-b border-[#E9E2D5] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-1">
            Secure Handshake
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Checkout
          </h1>
        </div>
        <button
          onClick={() => navigateTo('cart')}
          className="text-xs uppercase tracking-widest font-medium text-charcoal-600 hover:text-wood-800 transition-colors inline-flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Review Bag</span>
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Form: Contact, Address, Payment */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* 1. Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E9E2D5] pb-3">
              <span className="w-5 h-5 rounded-full bg-wood-800 text-white text-[10px] flex items-center justify-center font-medium">1</span>
              <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karim"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sabry"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="karim@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(+20) 100 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Address */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E9E2D5] pb-3">
              <span className="w-5 h-5 rounded-full bg-wood-800 text-white text-[10px] flex items-center justify-center font-medium">2</span>
              <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                Delivery Address in Egypt
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Governorate *
                </label>
                <select
                  value={formData.governorate}
                  onChange={(e) => setFormData(prev => ({ ...prev, governorate: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                >
                  <option value="Cairo">Cairo (New Cairo, Maadi, Zamalek, Heliopolis)</option>
                  <option value="Giza">Giza (Sheikh Zayed, 6th of October, Dokki)</option>
                  <option value="Alexandria">Alexandria</option>
                  <option value="Red Sea">Red Sea (El Gouna / Hurghada)</option>
                  <option value="Matrouh">North Coast (Sahel / Almaza)</option>
                  <option value="Other">Other Governorate</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  District / Compound Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Katameya Heights / Allegria"
                  value={formData.district}
                  onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street name, landmark"
                  value={formData.streetAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, streetAddress: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Villa / Building Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. Villa 42"
                  value={formData.buildingVilla}
                  onChange={(e) => setFormData(prev => ({ ...prev, buildingVilla: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Floor / Elevator access
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ground Floor or Service Elevator available"
                  value={formData.apartmentFloor}
                  onChange={(e) => setFormData(prev => ({ ...prev, apartmentFloor: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>
            </div>
          </div>

          {/* 3. Delivery Method */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E9E2D5] pb-3">
              <span className="w-5 h-5 rounded-full bg-wood-800 text-white text-[10px] flex items-center justify-center font-medium">3</span>
              <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                Delivery Method
              </h2>
            </div>

            <div className="space-y-3">
              <label 
                className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                  formData.deliveryMethod === 'white-glove' 
                    ? 'border-wood-800 bg-[#FAF8F5]' 
                    : 'border-[#E9E2D5] bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="white-glove"
                    checked={formData.deliveryMethod === 'white-glove'}
                    onChange={() => setFormData(prev => ({ ...prev, deliveryMethod: 'white-glove' }))}
                    className="accent-wood-800"
                  />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 block">
                      Prime White-Glove Installation & Assembly
                    </span>
                    <span className="text-[11px] text-charcoal-500 font-light">
                      Uncrating, assembly in room of choice, protective felt application, packaging removal.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-charcoal-900">
                  {deliveryFee === 0 ? 'Free' : formatEGP(deliveryFee)}
                </span>
              </label>
            </div>
          </div>

          {/* 4. Payment Method */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E9E2D5] pb-3">
              <span className="w-5 h-5 rounded-full bg-wood-800 text-white text-[10px] flex items-center justify-center font-medium">4</span>
              <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {/* Option: Cash on Delivery */}
              <label 
                className={`p-4 border block cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod' 
                    ? 'border-wood-800 bg-[#FAF8F5]' 
                    : 'border-[#E9E2D5] bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                    className="accent-wood-800"
                  />
                  <div className="flex items-center space-x-2">
                    <Banknote className="w-4 h-4 text-wood-700" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-900">
                      Cash on Delivery / White-Glove Inspection Handover
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-charcoal-500 font-light mt-2 ml-6">
                  Inspect your wooden pieces in person upon room assembly before finalizing payment to our bonded transport master.
                </p>
              </label>

              {/* Option: Credit Card */}
              <label 
                className={`p-4 border block cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' 
                    ? 'border-wood-800 bg-[#FAF8F5]' 
                    : 'border-[#E9E2D5] bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className="accent-wood-800"
                  />
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-wood-700" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-900">
                      Credit / Debit Card (Visa, Mastercard, Meeza)
                    </span>
                  </div>
                </div>
                {formData.paymentMethod === 'card' && (
                  <div className="mt-4 ml-6 pt-3 border-t border-[#E9E2D5] grid grid-cols-2 gap-3 text-xs">
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal-600 mb-1">Name on Card</label>
                      <input type="text" placeholder="As printed on card" className="w-full bg-white border border-[#E9E2D5] p-2.5 text-xs focus:outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal-600 mb-1">Card Number</label>
                      <input type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-white border border-[#E9E2D5] p-2.5 text-xs focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal-600 mb-1">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-white border border-[#E9E2D5] p-2.5 text-xs focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal-600 mb-1">CVC</label>
                      <input type="text" placeholder="•••" className="w-full bg-white border border-[#E9E2D5] p-2.5 text-xs focus:outline-none" />
                    </div>
                  </div>
                )}
              </label>

              {/* Option: ValU Installments */}
              <label 
                className={`p-4 border block cursor-pointer transition-all ${
                  formData.paymentMethod === 'valu' 
                    ? 'border-wood-800 bg-[#FAF8F5]' 
                    : 'border-[#E9E2D5] bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="valu"
                    checked={formData.paymentMethod === 'valu'}
                    onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'valu' }))}
                    className="accent-wood-800"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-900">
                    ValU / Sympl Installments (Up to 24 Months)
                  </span>
                </div>
                {formData.paymentMethod === 'valu' && (
                  <p className="text-[11px] text-wood-700 font-light mt-2 ml-6">
                    Estimated monthly installment from {formatEGP(Math.round(total / 12))} / month over 12 months with 0% downpayment.
                  </p>
                )}
              </label>
            </div>
          </div>

        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-6 sm:p-8 space-y-6 sticky top-28">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-[#E9E2D5] pb-4">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Compact items list */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#E9E2D5] pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId || item.id} className="py-3 flex items-center space-x-3 text-xs">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover border border-[#E9E2D5]" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-medium text-charcoal-900 truncate">{item.name}</p>
                    <p className="text-[10px] text-charcoal-500 font-light">{item.finish} · Qty {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-charcoal-900 shrink-0">
                    {formatEGP(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs border-t border-[#E9E2D5] pt-4">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal</span>
                <span>{formatEGP(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-600">
                <span>Delivery (Greater Cairo & Giza)</span>
                <span>{deliveryFee === 0 ? 'Complimentary' : formatEGP(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-charcoal-900 pt-3 border-t border-[#E9E2D5]">
                <span>Total Amount</span>
                <span>{formatEGP(total)}</span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              className="w-full py-4 bg-wood-800 text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-wood-900 transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Place Order — {formatEGP(total)}</span>
            </button>

            <p className="text-[10px] text-charcoal-500 text-center font-light leading-relaxed">
              By placing your order, you agree to Prime Wooden Work terms of craftsmanship and white-glove delivery protocols.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
}
