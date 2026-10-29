import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Compass, 
  Truck, 
  ShieldCheck, 
  Ruler, 
  Sparkles, 
  ChevronRight, 
  Minus, 
  Plus, 
  Check, 
  Layers
} from 'lucide-react';

export default function ProductDetailPage() {
  const { 
    selectedProductId, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatEGP, 
    navigateTo 
  } = useStore();

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(product.finishes ? product.finishes[0].name : 'Natural White Oak');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('dimensions');

  const wishlisted = isInWishlist(product.id);

  // Gallery items (fallback to primary & secondary if no gallery)
  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.primaryImage, product.secondaryImage].filter(Boolean);

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, {
      finish: selectedFinish,
      size: selectedSize,
      quantity
    });
  };

  const handleCustomize = () => {
    navigateTo('custom', {
      customPreFill: {
        pieceType: product.category,
        dimensions: product.dimensions?.standard || 'Custom Request',
        preferredMaterial: selectedFinish,
        notes: `Inspired by ${product.name}. Requesting tailored measurements and adjustments.`
      }
    });
  };

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-charcoal-500 mb-8 font-medium">
        <button onClick={() => navigateTo('home')} className="hover:text-charcoal-900 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-charcoal-400" />
        <button onClick={() => navigateTo('shop')} className="hover:text-charcoal-900 transition-colors">
          Shop
        </button>
        <ChevronRight className="w-3 h-3 text-charcoal-400" />
        <span className="text-charcoal-900">{product.category}</span>
        <ChevronRight className="w-3 h-3 text-charcoal-400" />
        <span className="text-wood-600 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Product Imagery Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Display Image */}
          <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#F0EDE6] border border-[#E9E2D5]">
            <img
              src={images[activeImageIndex] || product.primaryImage}
              alt={`${product.name} detailed view`}
              className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
            />
            
            {/* Top Right Wishlist Icon */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                wishlisted 
                  ? 'bg-[#1d2743] text-[#fae6c3]' 
                  : 'bg-white/90 backdrop-blur-sm text-charcoal-700 hover:text-[#1d2743]'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square overflow-hidden bg-[#F0EDE6] border-2 transition-all ${
                    activeImageIndex === idx 
                      ? 'border-wood-700 ring-1 ring-wood-700' 
                      : 'border-[#E9E2D5] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Craft Guarantee Box */}
          <div className="bg-[#FAF8F5] p-5 border border-[#E9E2D5] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-700 mt-6">
            <div className="flex items-center space-x-2.5">
              <Truck className="w-4 h-4 text-wood-600 shrink-0" />
              <span>White Glove Cairo Delivery</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-wood-600 shrink-0" />
              <span>10-Year Structural Guarantee</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-wood-600 shrink-0" />
              <span>Handcrafted in Ghamra, Cairo</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details, Options, & Actions */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Header Info */}
          <div className="space-y-3 pb-6 border-b border-[#E9E2D5]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#1d2743] font-bold">
                {product.category}
              </span>
              {product.tag && (
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sand-200/80 text-[#1d2743] font-medium border border-sand-300">
                  {product.tag}
                </span>
              )}
              {product.b2bTag && (
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium border border-neutral-200">
                  {product.b2bTag}
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-serif text-[#1d2743] font-semibold">
              {formatEGP(product.price, product.priceUnit)}
            </p>
            <p className="text-sm text-charcoal-600 font-light leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Option: Wood Finish */}
          {product.finishes && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest font-semibold text-charcoal-800 flex justify-between">
                <span>Timber Finish</span>
                <span className="font-serif italic font-normal text-wood-700">{selectedFinish}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {product.finishes.map((f) => {
                  const isCurrent = selectedFinish === f.name;
                  return (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFinish(f.name)}
                      className={`flex items-center space-x-2 px-3.5 py-2 border text-xs tracking-wider uppercase transition-all ${
                        isCurrent 
                          ? 'border-wood-800 bg-wood-100/60 font-semibold text-wood-950' 
                          : 'border-[#E9E2D5] bg-[#FAF8F5] text-charcoal-600 hover:border-wood-400'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-black/20" 
                        style={{ backgroundColor: f.hex }} 
                      />
                      <span>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Option: Size */}
          {product.sizes && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest font-semibold text-charcoal-800 flex justify-between">
                <span>Select Dimensions</span>
                <span className="text-[11px] text-charcoal-500 font-normal">Standard & Bespoke</span>
              </label>
              <div className="space-y-2">
                {product.sizes.map((s) => {
                  const isCurrent = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-full text-left px-4 py-3 border text-xs tracking-wider flex items-center justify-between transition-all ${
                        isCurrent 
                          ? 'border-wood-800 bg-[#FAF8F5] font-semibold text-charcoal-900' 
                          : 'border-[#E9E2D5] text-charcoal-600 hover:border-charcoal-400'
                      }`}
                    >
                      <span>{s}</span>
                      {isCurrent && <Check className="w-4 h-4 text-wood-700" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-4">
              
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#E9E2D5] bg-[#FAF8F5] px-3 py-3 text-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-charcoal-500 hover:text-charcoal-900"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-semibold text-charcoal-800 w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-charcoal-500 hover:text-charcoal-900"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary: Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#1d2743] text-[#fae6c3] hover:bg-[#182032] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm flex items-center justify-center space-x-2 rounded-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {product.price
                    ? `Add to Bag — ${formatEGP(product.price * quantity, product.priceUnit)}`
                    : 'Request Custom Quote'}
                </span>
              </button>
            </div>

            {/* Secondary: Customize This Piece */}
            <button
              type="button"
              onClick={handleCustomize}
              className="w-full py-3.5 border border-[#1d2743] text-[#1d2743] hover:bg-[#fae6c3]/20 text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center space-x-2 rounded-md"
            >
              <Compass className="w-4 h-4 text-wood-600" />
              <span>Customize This Piece</span>
            </button>
          </div>

          {/* Accordion Specs & Information */}
          <div className="pt-6 border-t border-[#E9E2D5] divide-y divide-[#E9E2D5]">
            
            {/* Dimensions */}
            <div>
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'dimensions' ? null : 'dimensions')}
                className="w-full py-4 text-left flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-charcoal-800"
              >
                <span>Dimensions & Proportions</span>
                <span>{activeAccordion === 'dimensions' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'dimensions' && (
                <div className="pb-4 text-xs text-charcoal-600 space-y-1.5 font-light leading-relaxed">
                  <p><strong>Standard:</strong> {product.dimensions?.standard || '240 cm (W) x 105 cm (D) x 76 cm (H)'}</p>
                  {product.dimensions?.large && <p><strong>Large:</strong> {product.dimensions.large}</p>}
                  <p className="text-wood-600 pt-1 italic">Tailored custom dimensions available upon request.</p>
                </div>
              )}
            </div>

            {/* Materials & Finish */}
            <div>
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'materials' ? null : 'materials')}
                className="w-full py-4 text-left flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-charcoal-800"
              >
                <span>Materials & Finish</span>
                <span>{activeAccordion === 'materials' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'materials' && (
                <div className="pb-4 text-xs text-charcoal-600 font-light leading-relaxed space-y-2">
                  <p>{product.materials}</p>
                  <p>Finished with organic plant-based oils and durable low-VOC protective coats formulated for Mediterranean climates.</p>
                </div>
              )}
            </div>

            {/* Delivery */}
            <div>
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'delivery' ? null : 'delivery')}
                className="w-full py-4 text-left flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-charcoal-800"
              >
                <span>Delivery & White-Glove Assembly</span>
                <span>{activeAccordion === 'delivery' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'delivery' && (
                <div className="pb-4 text-xs text-charcoal-600 font-light leading-relaxed space-y-2">
                  <p><strong>Lead Time:</strong> {product.leadTime}</p>
                  <p>{product.delivery}</p>
                  <button 
                    onClick={() => navigateTo('shipping')}
                    className="text-wood-700 underline underline-offset-2 hover:text-wood-900 block pt-1 font-medium"
                  >
                    View White-Glove Delivery Details & Zones →
                  </button>
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div>
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'care' ? null : 'care')}
                className="w-full py-4 text-left flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-charcoal-800"
              >
                <span>Care Instructions</span>
                <span>{activeAccordion === 'care' ? '−' : '+'}</span>
              </button>
              {activeAccordion === 'care' && (
                <div className="pb-4 text-xs text-charcoal-600 font-light leading-relaxed space-y-1.5">
                  <p>• Wipe clean using a soft, dry cotton cloth.</p>
                  <p>• For spills, blot immediately with a slightly damp cloth and wipe dry.</p>
                  <p>• Avoid harsh chemical detergents and direct prolonged placement over heating radiators.</p>
                  <p>• Re-nourish annually with Prime natural beeswax conditioning paste.</p>
                  <button 
                    onClick={() => navigateTo('care-guide')}
                    className="text-wood-700 underline underline-offset-2 hover:text-wood-900 block pt-1 font-medium"
                  >
                    View Full Solid Wood Care & Preservation Guide →
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* You May Also Like Section */}
      <div className="mt-24 pt-16 border-t border-[#E9E2D5]">
        <div className="mb-10 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
            Curated Pairings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            You May Also Like
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
}
