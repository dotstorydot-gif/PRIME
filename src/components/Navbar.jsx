import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, Menu, X, User, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const { 
    currentPage, 
    navigateTo, 
    cartItemCount, 
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsWishlistOpen,
    setIsAccountOpen,
    wishlist 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Custom Furniture', id: 'custom' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Top Heritage Marquee Bar */}
      <div className="bg-[#1C1A18] text-[#FAF8F5] text-[11px] tracking-widest uppercase py-2 px-4 text-center font-medium border-b border-wood-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline text-sand-400">Est. 1948 · Cairo Workshop</span>
          <span className="mx-auto md:mx-0">Handcrafted in Egypt · White-Glove Installation on Orders Over 50,000 EGP</span>
          <a 
            href="https://wa.me/201222935556" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden md:inline text-sand-400 hover:text-white transition-colors"
          >
            Call / WhatsApp: (+20) 122 293 5556
          </a>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E9E2D5] py-3.5 shadow-sm' 
            : 'bg-[#FAF8F5] border-b border-[#E9E2D5]/70 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Mobile Menu Trigger & Desktop Brand Logo */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-charcoal-800 hover:text-wood-600 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand Logo */}
              <button 
                onClick={() => navigateTo('home')}
                className="text-left group focus:outline-none flex flex-col items-start"
              >
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-medium text-[#1C1A18] uppercase">
                    PRIME
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.28em] font-sans text-wood-500 uppercase -mt-1 font-medium">
                  WOODEN WORK
                </span>
              </button>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => navigateTo(link.id)}
                    className={`text-xs uppercase tracking-[0.18em] font-medium transition-all relative py-1 ${
                      isActive 
                        ? 'text-wood-700 font-semibold' 
                        : 'text-charcoal-700 hover:text-wood-600'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-wood-600 animate-fadeIn" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-5">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal-700 hover:text-wood-600 transition-colors focus:outline-none"
                aria-label="Search furniture catalog"
                title="Search catalog"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Button - Full Screen Screen Navigation */}
              <button
                type="button"
                onClick={() => navigateTo('wishlist')}
                className={`p-2 transition-colors relative focus:outline-none ${
                  currentPage === 'wishlist' ? 'text-wood-800' : 'text-charcoal-700 hover:text-wood-600'
                }`}
                aria-label="Wishlist"
                title="Saved pieces"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${currentPage === 'wishlist' ? 'fill-current' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1 w-2 h-2 rounded-full bg-wood-700" />
                )}
              </button>

              {/* Account / Consultation modal trigger */}
              <button
                type="button"
                onClick={() => setIsAccountOpen(true)}
                className="p-2 text-charcoal-700 hover:text-wood-600 transition-colors focus:outline-none"
                aria-label="Account and Bespoke Profile"
                title="Client Account & Orders"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-1.5 p-2 text-charcoal-800 hover:text-wood-600 transition-colors relative focus:outline-none"
                aria-label={`Shopping bag with ${cartItemCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-wood-700 text-[#FAF8F5] text-[10px] font-sans font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F5] shadow-xl flex flex-col z-10 p-6 border-r border-[#E9E2D5]">
            <div className="flex items-center justify-between pb-6 border-b border-[#E9E2D5]">
              <div>
                <span className="font-serif text-2xl tracking-[0.16em] font-medium text-[#1C1A18] uppercase">
                  PRIME
                </span>
                <p className="text-[9px] tracking-[0.24em] font-sans text-wood-500 uppercase">
                  WOODEN WORK · CAIRO
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-charcoal-700 hover:text-charcoal-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-8 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 text-sm uppercase tracking-widest flex items-center justify-between transition-colors ${
                    currentPage === link.id 
                      ? 'text-wood-700 font-semibold' 
                      : 'text-charcoal-700 hover:text-wood-600'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-wood-400" />
                </button>
              ))}

              <div className="pt-4 border-t border-[#E9E2D5] space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('wishlist');
                  }}
                  className="w-full text-left py-2 text-xs uppercase tracking-widest text-charcoal-700 hover:text-wood-800 flex items-center justify-between"
                >
                  <span className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-wood-600" />
                    <span>Saved Pieces ({wishlist.length})</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-wood-400" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAccountOpen(true);
                  }}
                  className="w-full text-left py-2 text-xs uppercase tracking-widest text-charcoal-700 hover:text-wood-800 flex items-center justify-between"
                >
                  <span className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-wood-600" />
                    <span>Client Account & Tracking</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-wood-400" />
                </button>
              </div>
            </nav>

            <div className="pt-6 border-t border-[#E9E2D5] space-y-4 text-xs text-charcoal-600">
              <div>
                <p className="font-semibold text-charcoal-800 uppercase tracking-wider text-[11px] mb-1">Workshop & Showroom</p>
                <a 
                  href="https://maps.google.com/?q=3+El+Madaress+St+Off+Port+Said+St+Ghamra+Cairo+Egypt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-wood-800 transition-colors block"
                >
                  3 El Madaress St., Off Port Said St.<br />Ghamra, Cairo, Egypt ↗
                </a>
              </div>
              <div>
                <p className="font-semibold text-charcoal-800 uppercase tracking-wider text-[11px] mb-1">Direct Contact</p>
                <a href="tel:+201222935556" className="hover:text-wood-800 transition-colors block">(+20) 122 293 5556</a>
                <a href="mailto:info@primewoodenworks.com" className="hover:text-wood-800 transition-colors block">info@primewoodenworks.com</a>
              </div>
              <button
                onClick={() => {
                  navigateTo('custom');
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 py-3 bg-wood-800 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-wood-900 transition-colors"
              >
                Start Custom Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
