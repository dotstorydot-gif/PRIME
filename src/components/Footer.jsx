import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Check, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const { navigateTo, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to Prime Wooden Work', 'success');
  };

  return (
    <footer className="bg-[#1C1A18] text-[#FAF8F5] pt-20 pb-12 border-t border-wood-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid: 4 Balanced Columns with Harmonious Top Baselines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16 border-b border-white/10 items-start">
          
          {/* Column 1: Brand & Atelier */}
          <div className="space-y-4">
            <div className="h-12 flex flex-col justify-start">
              <span className="font-serif text-2xl tracking-[0.16em] font-medium text-white uppercase block leading-none">
                PRIME
              </span>
              <span className="text-[9px] tracking-[0.28em] font-sans text-wood-300 uppercase block mt-1.5 font-medium">
                WOODEN WORK · CAIRO
              </span>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Contemporary furniture, thoughtfully crafted in Egypt from honest hardwoods since 1948. Built to bring architectural warmth and lasting presence to your space.
            </p>

            <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs text-neutral-400 font-light">
              <a 
                href="https://maps.google.com/?q=3+El+Madaress+St+Off+Port+Said+St+Ghamra+Cairo+Egypt" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-wood-200 transition-colors flex items-start space-x-2.5 group"
                title="Open workshop location in Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-wood-300 shrink-0 mt-0.5 group-hover:text-wood-200" />
                <span className="underline-offset-4 group-hover:underline">
                  3 El Madaress St., Ghamra, Cairo ↗
                </span>
              </a>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-wood-300 shrink-0" />
                <div className="flex items-center space-x-2">
                  <a href="tel:+201222935556" className="hover:text-wood-200 transition-colors">
                    (+20) 122 293 5556
                  </a>
                  <span>/</span>
                  <a href="tel:+201277488868" className="hover:text-wood-200 transition-colors">
                    (+20) 127 748 8868
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-wood-300 shrink-0" />
                <a href="mailto:info@primewoodenworks.com" className="hover:text-wood-200 transition-colors">
                  info@primewoodenworks.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="space-y-4">
            <div className="h-12 flex items-start pt-1">
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">
                Explore
              </h4>
            </div>

            <ul className="space-y-3 text-xs text-neutral-400 font-light">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors text-left">
                  Shop Pieces
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('custom')} className="hover:text-white transition-colors text-left">
                  Custom Furniture
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors text-left">
                  About Us & Craft
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors text-left">
                  Contact & Atelier
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-white transition-colors text-left">
                  Saved Pieces
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-4">
            <div className="h-12 flex items-start pt-1">
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">
                Customer Care
              </h4>
            </div>

            <ul className="space-y-3 text-xs text-neutral-400 font-light">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors text-left">
                  Delivery Across Egypt
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors text-left">
                  10-Year Craft Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors text-left">
                  Solid Wood Care Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('custom')} className="hover:text-white transition-colors text-left">
                  Bespoke Dimensions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors text-left">
                  Architectural Consultation
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors text-left">
                  Showroom Appointments
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Community */}
          <div className="space-y-4">
            <div className="h-12 flex items-start pt-1">
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">
                Stay Connected
              </h4>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Receive private invitations to new timber collection releases, workshop open days in Cairo, and interior architecture stories.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="flex items-center border-b border-white/20 focus-within:border-wood-300 pb-2 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full font-light tracking-wide py-0.5"
                  disabled={subscribed}
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-wood-200 hover:text-white transition-colors ml-3 shrink-0 flex items-center space-x-1"
                >
                  {subscribed ? (
                    <span className="flex items-center space-x-1 text-green-300">
                      <Check className="w-3.5 h-3.5" />
                      <span>Subscribed</span>
                    </span>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </div>
            </form>

            <div className="pt-2 flex items-center space-x-4 text-xs text-neutral-400">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <span>·</span>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
              <span>·</span>
              <a 
                href="https://wa.me/201222935556" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-emerald-400 transition-colors flex items-center space-x-1"
                title="Chat with Prime on WhatsApp"
              >
                <span>WhatsApp</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-light tracking-wider space-y-4 sm:space-y-0">
          <p>© 2026 Prime Wooden Work. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Made with pride in Cairo, Egypt</span>
            <span>·</span>
            <span className="font-serif italic text-neutral-400">Honest Timber Arthouse</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
