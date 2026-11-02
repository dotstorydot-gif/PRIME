import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Navigation State: Always start fresh on the Home page on refresh / first visit
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('prime-cloud-bed');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [previousPage, setPreviousPage] = useState('home');

  // Listen for Browser Back & Forward Buttons (popstate event) while keeping refresh always starting at Home
  useEffect(() => {
    try {
      // Clear URL query parameters on load so browser refresh always loads Home cleanly
      window.history.replaceState({
        page: 'home',
        productId: 'prime-cloud-bed',
        category: 'all'
      }, '', window.location.pathname);

      window.scrollTo(0, 0);

      const handlePopState = (event) => {
        if (event.state && event.state.page) {
          const { page, productId, category } = event.state;
          setCurrentPage(page);
          if (productId) setSelectedProductId(productId);
          if (category !== undefined) setSelectedCategoryFilter(category);
        } else {
          setCurrentPage('home');
          setSelectedCategoryFilter('all');
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    } catch (e) {}
  }, []);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [customQuotePreFill, setCustomQuotePreFill] = useState(null);

  // Cart State (persisted to localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('prime_wooden_cart_v2');
      return saved ? JSON.parse(saved) : [
        {
          id: 'prime-cloud-bed',
          name: 'Prime Cloud Bed',
          category: 'Beds',
          price: 56000,
          image: PRODUCTS[0].primaryImage,
          finish: 'Plywood & Natural Oak',
          size: '180 x 200 cm (Queen/King Standard)',
          quantity: 1
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Wishlist State (persisted to localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('prime_wooden_wishlist_v2');
      return saved ? JSON.parse(saved) : ['prime-carve-dresser'];
    } catch (e) {
      return [];
    }
  });

  // Toast Notifications
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('prime_wooden_cart_v2', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('prime_wooden_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Show Toast
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Cart Operations
  const addToCart = (product, options = {}) => {
    if (!product.price) {
      setCustomQuotePreFill({
        pieceType: product.category,
        dimensions: product.dimensions?.standard || 'Custom Dimensions',
        preferredMaterial: (product.finishes && product.finishes[0]?.name) || 'Natural Oak',
        notes: `Requesting a custom quote for ${product.name}.`
      });
      setCurrentPage('custom');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(`Opened custom quote request for "${product.name}"`, 'info');
      return;
    }
    const finish = options.finish || (product.finishes && product.finishes[0]?.name) || 'Natural Oak';
    const size = options.size || (product.sizes && product.sizes[0]) || 'Standard';
    const quantity = options.quantity || 1;
    const cartItemId = `${product.id}-${finish}-${size}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId || (item.id === product.id && item.finish === finish && item.size === size));
      if (existing) {
        return prev.map(item => 
          (item.cartItemId === cartItemId || (item.id === product.id && item.finish === finish && item.size === size))
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.primaryImage,
            finish,
            size,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name}" to your bag`, 'success');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      const match = item.cartItemId === cartItemId || item.id === cartItemId;
      return match ? { ...item, quantity: newQty } : item;
    }));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => !(item.cartItemId === cartItemId || item.id === cartItemId)));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    const isWishlisted = wishlist.includes(productId);
    const prod = PRODUCTS.find(p => p.id === productId);
    const name = prod ? prod.name : 'Piece';

    if (isWishlisted) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(`Removed "${name}" from saved list`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(`Saved "${name}" to your wishlist`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Currency Formatter
  const formatEGP = (amount, unit = '') => {
    if (amount === null || amount === undefined || amount === 0) {
      return 'Price Upon Request';
    }
    const formatted = new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0
    }).format(amount).replace('EGP', 'EGP ');
    return unit ? `${formatted} ${unit}` : formatted;
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryFee = cartSubtotal > 50000 || cartSubtotal === 0 ? 0 : 750; // Free delivery over 50,000 EGP

  // Navigation Helpers: History-aware (Back / Forward) while keeping clean URL so Refresh opens Home
  const navigateTo = (page, params = {}, replace = false) => {
    if (params.productId) {
      setSelectedProductId(params.productId);
    }
    if (params.category) {
      setSelectedCategoryFilter(params.category);
    }
    if (params.customPreFill) {
      setCustomQuotePreFill(params.customPreFill);
    }

    setPreviousPage(currentPage);
    setCurrentPage(page);

    try {
      const catToUse = params.category || selectedCategoryFilter;
      const historyState = {
        page,
        productId: params.productId || selectedProductId,
        category: catToUse,
        previousPage: currentPage
      };

      // Keep URL clean as window.location.pathname so hitting refresh always reloads Home from the start
      if (replace) {
        window.history.replaceState(historyState, '', window.location.pathname);
      } else {
        window.history.pushState(historyState, '', window.location.pathname);
      }
    } catch (e) {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProduct = (productId) => {
    setPreviousPage(currentPage);
    setSelectedProductId(productId);
    setCurrentPage('product-detail');

    try {
      // Push history state so the back icon returns to previous view, but keep URL clean so refresh reloads Home
      window.history.pushState({
        page: 'product-detail',
        productId,
        category: selectedCategoryFilter,
        previousPage: currentPage
      }, '', window.location.pathname);
    } catch (e) {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    try {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigateTo(previousPage || 'shop');
      }
    } catch (e) {
      navigateTo(previousPage || 'shop');
    }
  };

  return (
    <StoreContext.Provider value={{
      currentPage,
      setCurrentPage,
      navigateTo,
      selectedProductId,
      setSelectedProductId,
      selectedCategoryFilter,
      setSelectedCategoryFilter,
      viewProduct,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isAccountOpen,
      setIsAccountOpen,
      quickViewProduct,
      setQuickViewProduct,
      customQuotePreFill,
      setCustomQuotePreFill,
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartSubtotal,
      cartItemCount,
      deliveryFee,
      wishlist,
      toggleWishlist,
      isInWishlist,
      formatEGP,
      toast,
      showToast,
      goBack
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
