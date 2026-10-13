import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('oslo-dining-table');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

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
      const saved = localStorage.getItem('prime_wooden_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'oslo-dining-table',
          name: 'Oslo Dining Table',
          category: 'Dining',
          price: 42500,
          image: PRODUCTS[0].primaryImage,
          finish: 'Natural White Oak',
          size: '240 x 105 cm (Seats 8)',
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
      const saved = localStorage.getItem('prime_wooden_wishlist');
      return saved ? JSON.parse(saved) : ['arco-side-table'];
    } catch (e) {
      return [];
    }
  });

  // Toast Notifications
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('prime_wooden_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('prime_wooden_wishlist', JSON.stringify(wishlist));
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
  const formatEGP = (amount) => {
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0
    }).format(amount).replace('EGP', 'EGP ');
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryFee = cartSubtotal > 50000 || cartSubtotal === 0 ? 0 : 750; // Free delivery over 50,000 EGP

  // Navigation Helpers
  const navigateTo = (page, params = {}) => {
    if (params.productId) {
      setSelectedProductId(params.productId);
    }
    if (params.category) {
      setSelectedCategoryFilter(params.category);
    }
    if (params.customPreFill) {
      setCustomQuotePreFill(params.customPreFill);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      showToast
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
