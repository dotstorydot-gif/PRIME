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
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-3xl tracking-[0.16em] font-medium text-white uppercase block">
                PRIME
              </span>
              <span className="text-[10px] tracking-[0.28em] font-sans text-wood-300 uppercase block -mt-1 font-medium">
                WOODEN WORK
              </span>
            </div>
            <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm pt-2">
              Contemporary furniture, thoughtfully crafted in Egypt from honest materials. Built to bring architectural warmth and lasting presence to your space.
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1.5 font-light">
              <p className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-wood-300 shrink-0" />
                <span>3 El Madaress St., Off Port Said St., Ghamra, Cairo</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-wood-300 shrink-0" />
                <span>(+20) 122 293 5556 / (+20) 127 748 8868</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-wood-300 shrink-0" />
                <span>info@primewoodenworks.com</span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Shop
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('custom')} className="hover:text-white transition-colors">
                  Custom Furniture
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('craft')} className="hover:text-white transition-colors">
                  Our Craft
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Returns & Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Wood Care Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Consultation FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('custom')} className="hover:text-white transition-colors">
                  Bespoke Dimensions
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column matching screenshot */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">
              Get Inspired. Stay Connected.
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Receive private invitations to new timber collection releases, workshop open days in Cairo, and interior architecture stories.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="flex items-center border-b border-white/30 focus-within:border-wood-300 pb-1.5 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full font-light tracking-wide py-1"
                  disabled={subscribed}
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-wood-200 hover:text-white transition-colors ml-2 shrink-0 flex items-center space-x-1"
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

            <div className="pt-3 flex items-center space-x-5 text-xs text-neutral-400">
              <span className="text-[11px] tracking-wider uppercase text-neutral-500">Cairo, Egypt</span>
              <span>·</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Facebook
              </a>
              <a href="https://wa.me/201222935556" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-light tracking-wider space-y-4 sm:space-y-0">
          <p>© 2026 Prime Wooden Work. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Made with pride in Egypt</span>
            <span>·</span>
            <span className="font-serif italic text-neutral-400">Wood Arthouse</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
