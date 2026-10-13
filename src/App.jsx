import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import FeaturedCollection from './components/FeaturedCollection';
import CustomBanner from './components/CustomBanner';
import CraftStory from './components/CraftStory';
import BrandStatement from './components/BrandStatement';
import InstagramGallery from './components/InstagramGallery';
import Footer from './components/Footer';

// Pages
import ShopPage from './components/ShopPage';
import ProductDetailPage from './components/ProductDetailPage';
import CustomFurniturePage from './components/CustomFurniturePage';
import OurCraftPage from './components/OurCraftPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';

// Modals & Drawers
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AccountModal from './components/AccountModal';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';

function MainContent() {
  const { currentPage } = useStore();

  return (
    <main className="min-h-screen">
      {currentPage === 'home' && (
        <>
          <Hero />
          <CategoryGrid />
          <FeaturedCollection />
          <CustomBanner />
          <CraftStory />
          <BrandStatement />
          <InstagramGallery />
        </>
      )}

      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'product-detail' && <ProductDetailPage />}
      {currentPage === 'custom' && <CustomFurniturePage />}
      {currentPage === 'craft' && <OurCraftPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'checkout' && <CheckoutPage />}
    </main>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1A18] selection:bg-wood-200 selection:text-wood-900 font-sans">
        <Navbar />
        <MainContent />
        <Footer />
        
        {/* Overlays */}
        <CartDrawer />
        <WishlistDrawer />
        <AccountModal />
        <SearchModal />
        <QuickViewModal />
        <Toast />
      </div>
    </StoreProvider>
  );
}
