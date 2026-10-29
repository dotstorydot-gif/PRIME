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
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Main Sticky Navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#fae6c3]/95 backdrop-blur-md border-b border-[#ebd2a9] py-3.5 shadow-sm' 
            : 'bg-[#fae6c3] border-b border-[#ebd2a9]/80 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Mobile Menu Trigger & Desktop Brand Logo */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#1d2743] hover:text-[#182032] transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand Logo */}
              <button 
                onClick={() => navigateTo('home')}
                className="text-left group focus:outline-none flex items-center space-x-2.5"
              >
                <svg className="w-8 h-8 shrink-0" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" fill="#1d2743" />
                  <path d="M30 50 Q50 20 70 50 T30 50" stroke="#fae6c3" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M25 60 Q50 30 75 60" stroke="#fae6c3" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-medium text-[#1d2743] uppercase">
                  PRIME
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
                        ? 'text-[#1d2743] font-semibold' 
                        : 'text-[#1d2743]/85 hover:text-[#1d2743]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1d2743] animate-fadeIn" />
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
                className="p-2 text-[#1d2743] hover:text-[#182032] transition-colors focus:outline-none"
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
                  currentPage === 'wishlist' ? 'text-[#1d2743]' : 'text-[#1d2743] hover:text-[#182032]'
                }`}
                aria-label="Wishlist"
                title="Saved pieces"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${currentPage === 'wishlist' ? 'fill-current' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1 w-2 h-2 rounded-full bg-[#1d2743]" />
                )}
              </button>

              {/* Account / Consultation modal trigger */}
              <button
                type="button"
                onClick={() => setIsAccountOpen(true)}
                className="p-2 text-[#1d2743] hover:text-[#182032] transition-colors focus:outline-none"
                aria-label="Account and Bespoke Profile"
                title="Client Account & Orders"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-1.5 p-2 text-[#1d2743] hover:text-[#182032] transition-colors relative focus:outline-none"
                aria-label={`Shopping bag with ${cartItemCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#1d2743] text-[#fae6c3] text-[10px] font-sans font-semibold w-4 h-4 rounded-full flex items-center justify-center">
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
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#fae6c3] shadow-xl flex flex-col z-10 p-6 border-r border-[#ebd2a9]">
            <div className="flex items-center justify-between pb-6 border-b border-[#ebd2a9]">
              <div className="flex items-center space-x-2">
                <svg className="w-7 h-7 shrink-0" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" fill="#1d2743" />
                  <path d="M30 50 Q50 20 70 50 T30 50" stroke="#fae6c3" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M25 60 Q50 30 75 60" stroke="#fae6c3" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
                <span className="font-serif text-2xl tracking-[0.16em] font-medium text-[#1d2743] uppercase">
                  PRIME
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#1d2743] hover:text-[#182032]"
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
                      ? 'text-[#1d2743] font-bold' 
                      : 'text-[#1d2743]/80 hover:text-[#1d2743]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#1d2743]/50" />
                </button>
              ))}

              <div className="pt-4 border-t border-[#ebd2a9] space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('wishlist');
                  }}
                  className="w-full text-left py-2 text-xs uppercase tracking-widest text-[#1d2743]/85 hover:text-[#1d2743] flex items-center justify-between"
                >
                  <span className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-[#1d2743]" />
                    <span>Saved Pieces ({wishlist.length})</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1d2743]/50" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAccountOpen(true);
                  }}
                  className="w-full text-left py-2 text-xs uppercase tracking-widest text-[#1d2743]/85 hover:text-[#1d2743] flex items-center justify-between"
                >
                  <span className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-[#1d2743]" />
                    <span>Client Account & Tracking</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1d2743]/50" />
                </button>
              </div>
            </nav>

            <div className="pt-6 border-t border-[#ebd2a9] space-y-4 text-xs text-[#1d2743]/80">
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
