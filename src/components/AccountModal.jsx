import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, User, Package, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight, LogIn, Clock } from 'lucide-react';

export default function AccountModal() {
  const { isAccountOpen, setIsAccountOpen, showToast, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'track' | 'concierge'

  // Mock logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Karim Mansour',
    email: 'karim.mansour@prime.eg',
    phone: '+20 100 123 4567',
    tier: 'Private Client (Cairo Heritage)',
    recentOrders: [
      { id: 'PWW-EG-829141', date: 'October 2026', item: 'Prime Cloud Bed (180x200)', status: 'In Handcraft Shaping' }
    ]
  });

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackedOrderResult, setTrackedOrderResult] = useState(null);

  if (!isAccountOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail) {
      showToast('Please enter your email', 'error');
      return;
    }
    setIsLoggedIn(true);
    showToast(`Welcome back, ${userProfile.name}`, 'success');
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackOrderId.trim()) {
      showToast('Please enter an order ID or phone number', 'error');
      return;
    }
    // Mock tracking output
    setTrackedOrderResult({
      id: trackOrderId.toUpperCase(),
      status: 'Workshop Joinery Phase',
      step: 2,
      totalSteps: 4,
      estimatedDelivery: '10–14 Business Days',
      destination: 'New Cairo / Katameya, Egypt',
      timeline: [
        { label: '01 Material Selected (European White Oak)', done: true },
        { label: '02 Precision Joinery & Milling', done: true },
        { label: '03 Hand Sanding & Natural Bio-Oil Finish', done: false },
        { label: '04 Cairo White Glove Delivery & Setup', done: false },
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAccountOpen(false)}
      />

      <div className="relative bg-[#FAF8F5] border border-[#E9E2D5] max-w-lg w-full shadow-2xl z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsAccountOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 text-charcoal-500 hover:text-charcoal-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#E9E2D5] bg-[#FAF8F5]">
          <span className="text-[10px] uppercase tracking-[0.25em] text-wood-600 font-semibold block mb-1">
            Prime Wooden Work Atelier
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
            Client Portal & Concierge
          </h2>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#E9E2D5] mt-6 -mb-6 sm:-mb-8 space-x-6 text-xs uppercase tracking-wider font-medium">
            <button
              onClick={() => setActiveTab('login')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'login' 
                  ? 'text-wood-800 font-semibold border-b-2 border-wood-700' 
                  : 'text-charcoal-500 hover:text-charcoal-900'
              }`}
            >
              {isLoggedIn ? 'My Account' : 'Sign In'}
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'track' 
                  ? 'text-wood-800 font-semibold border-b-2 border-wood-700' 
                  : 'text-charcoal-500 hover:text-charcoal-900'
              }`}
            >
              Track Order
            </button>
            <button
              onClick={() => setActiveTab('concierge')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'concierge' 
                  ? 'text-wood-800 font-semibold border-b-2 border-wood-700' 
                  : 'text-charcoal-500 hover:text-charcoal-900'
              }`}
            >
              VIP Concierge
            </button>
          </div>
        </div>

        {/* Tab 1: Account / Sign In */}
        {activeTab === 'login' && (
          <div className="p-6 sm:p-8 space-y-6">
            {isLoggedIn ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 bg-wood-50 p-4 border border-[#E9E2D5]">
                  <div className="w-12 h-12 rounded-full bg-wood-800 text-[#FAF8F5] flex items-center justify-center font-serif text-lg">
                    KM
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-charcoal-900 font-medium">{userProfile.name}</h3>
                    <p className="text-xs text-charcoal-600">{userProfile.email}</p>
                    <span className="text-[10px] uppercase tracking-widest text-wood-700 font-semibold">
                      {userProfile.tier}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal-800">
                    Active Commissions & Orders
                  </h4>
                  {userProfile.recentOrders.map((ord) => (
                    <div key={ord.id} className="p-3.5 bg-white border border-[#E9E2D5] text-xs flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-charcoal-900">{ord.item}</p>
                        <p className="text-[10px] text-charcoal-500">{ord.id} · {ord.date}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-wood-100 text-wood-900 font-medium text-[10px] uppercase tracking-wider">
                        {ord.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setIsAccountOpen(false);
                      navigateTo('custom');
                    }}
                    className="text-xs uppercase tracking-wider text-wood-700 hover:text-wood-900 font-medium underline"
                  >
                    Start a New Custom Request →
                  </button>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      showToast('Signed out of Prime account', 'info');
                    }}
                    className="text-xs text-charcoal-500 hover:text-red-700 uppercase tracking-wider"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  Sign in with your email or phone number to access bespoke woodwork dimensions, order milestones, and VIP private consultations.
                </p>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                    Password / Access Code
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-wood-800 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-wood-900 transition-colors shadow-sm"
                >
                  Sign In to Client Portal
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(true);
                      showToast('Demonstration account signed in', 'success');
                    }}
                    className="text-[11px] text-wood-700 hover:text-wood-900 uppercase tracking-wider underline font-medium"
                  >
                    Instant Preview Mode (Guest / VIP Demo)
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Track Order */}
        {activeTab === 'track' && (
          <div className="p-6 sm:p-8 space-y-6">
            <form onSubmit={handleTrackSubmit} className="space-y-3">
              <label className="block text-xs uppercase tracking-wider text-charcoal-700 font-semibold">
                Enter Order Number or Phone
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="e.g. PWW-EG-829141 or 0100..."
                  value={trackOrderId}
                  onChange={(e) => setTrackOrderId(e.target.value)}
                  className="flex-1 bg-white border border-[#E9E2D5] px-3.5 py-2.5 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-wood-800 text-white text-xs uppercase tracking-widest font-medium hover:bg-wood-900"
                >
                  Track
                </button>
              </div>
            </form>

            {trackedOrderResult ? (
              <div className="bg-white p-5 border border-[#E9E2D5] space-y-4">
                <div className="flex justify-between items-start border-b border-[#E9E2D5] pb-3">
                  <div>
                    <span className="text-[10px] text-wood-600 font-semibold uppercase tracking-wider">
                      Order Reference
                    </span>
                    <h4 className="font-serif text-lg text-charcoal-900">{trackedOrderResult.id}</h4>
                  </div>
                  <span className="text-xs bg-wood-100 text-wood-900 px-2.5 py-1 font-medium">
                    {trackedOrderResult.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-charcoal-600"><strong>Destination:</strong> {trackedOrderResult.destination}</p>
                  <p className="text-charcoal-600"><strong>Estimated Dispatch:</strong> {trackedOrderResult.estimatedDelivery}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E9E2D5]">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-700">Workshop Stages</p>
                  {trackedOrderResult.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs">
                      {step.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-charcoal-300 shrink-0" />
                      )}
                      <span className={step.done ? 'text-charcoal-900 font-medium' : 'text-charcoal-400'}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-charcoal-500 font-light p-4 bg-[#F0EDE6] border border-[#E9E2D5]">
                Enter the reference number received in your order confirmation email or SMS to track material milling, assembly, and white-glove transport in real-time.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: VIP Concierge */}
        {activeTab === 'concierge' && (
          <div className="p-6 sm:p-8 space-y-4 text-xs">
            <p className="text-charcoal-600 leading-relaxed font-light">
              Connect directly with our senior timber architect and workshop directors for custom drawings, residential fit-outs, or Cairo showroom viewings.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/201222935556"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 bg-[#25D366] text-white font-medium hover:bg-[#20ba59] transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="uppercase tracking-wider">Direct WhatsApp Atelier Line</span>
                </div>
                <span>(+20) 122 293 5556</span>
              </a>

              <div className="p-4 bg-white border border-[#E9E2D5] space-y-1">
                <strong className="block text-charcoal-900 uppercase tracking-wider text-[11px]">Showroom & Material Library</strong>
                <p className="text-charcoal-600">3 El Madaress St., Off Port Said St., Ghamra, Cairo</p>
                <p className="text-charcoal-500">Saturday – Thursday: 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
