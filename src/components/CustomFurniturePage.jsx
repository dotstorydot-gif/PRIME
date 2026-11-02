import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Upload, 
  CheckCircle2, 
  Ruler, 
  Sparkles, 
  Layers, 
  Image as ImageIcon, 
  X, 
  PhoneCall, 
  MessageSquare,
  ArrowRight,
  Check,
  ChevronRight
} from 'lucide-react';
import { PREVIOUS_CUSTOM_WORKS } from '../data/products';

export default function CustomFurniturePage() {
  const { customQuotePreFill, setCustomQuotePreFill, showToast, navigateTo } = useStore();

  const [inspirationMode, setInspirationMode] = useState('portfolio'); // 'portfolio' | 'upload'
  const [selectedPreviousWorkId, setSelectedPreviousWorkId] = useState(null);
  const [portfolioCategory, setPortfolioCategory] = useState('customize'); // Default to customize so user sees them first!

  const [formData, setFormData] = useState({
    pieceType: 'Kitchen & Pantry Suite',
    width: '',
    height: '',
    depth: '',
    material: 'American White Oak (Kiln-Dried)',
    finish: 'Natural Matte Clear Bio-Oil',
    description: '',
    name: '',
    phone: '',
    email: '',
    city: 'Cairo (New Cairo / Maadi / Zamalek)',
    imagePreview: null,
    selectedCustomWorkTitle: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Handle prefill if directed from product page
  useEffect(() => {
    if (customQuotePreFill) {
      setFormData(prev => ({
        ...prev,
        pieceType: customQuotePreFill.pieceType || 'Kitchen & Pantry Suite',
        description: customQuotePreFill.notes || '',
        material: customQuotePreFill.preferredMaterial || 'American White Oak (Kiln-Dried)'
      }));
    }
  }, [customQuotePreFill]);

  const pieceTypes = [
    'Kitchen & Pantry Suite',
    'Living Room & Wall Paneling',
    'Under-Stair Joinery & Storage',
    'Bespoke Glass & Wood Partition',
    'Dining table',
    'Coffee table',
    'Console & Sideboard',
    'Cabinet / Credenza',
    'Bed & Nightstands',
    'Dressing Room / Walk-in Closet',
    'Architectural Ceiling & Doors',
    'Other Bespoke Commission'
  ];

  const materials = [
    'American White Oak (Kiln-Dried)',
    'European Walnut (Rich Grain)',
    'Blackened Solid Ash / Oak',
    'Egyptian Beech (Fine Local Hardwood)',
    'Natural Teak (Outdoor / Bathroom)',
    'Exotic Burls & Mixed Inlays'
  ];

  const finishes = [
    'Natural Matte Clear Bio-Oil',
    'Smoked Warm Honey Walnut',
    'Wire-Brushed Tactile Grain',
    'Architectural Fluted / Ribbed Profile',
    'Deep Espresso Charcoal Stain',
    'Bleached Scandinavian Sand'
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imagePreview: url, selectedCustomWorkTitle: file.name }));
      showToast('Inspiration sketch / photo attached', 'info');
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imagePreview: null, selectedCustomWorkTitle: '' }));
    setSelectedPreviousWorkId(null);
  };

  const handleSelectWork = (work) => {
    setSelectedPreviousWorkId(work.id);
    setFormData(prev => ({
      ...prev,
      pieceType: work.pieceType || prev.pieceType || 'Other Bespoke Commission',
      imagePreview: work.image,
      selectedCustomWorkTitle: work.title,
      description: prev.description ? prev.description : `Inspired by Prime piece: ${work.title} (${work.category || work.location}). Requesting tailored measurements and quote.`
    }));
    showToast(`Selected "${work.title}" from custom portfolio`, 'success');
  };

  const handleSelectFromShowcase = (work) => {
    handleSelectWork(work);
    const formEl = document.getElementById('custom-request-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      showToast('Please provide your name, phone, and email', 'error');
      return;
    }

    const randomId = 'PRIME-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomId);
    setIsSubmitted(true);
    showToast('Custom quote request submitted successfully', 'success');
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      pieceType: 'Kitchen & Pantry Suite',
      width: '',
      height: '',
      depth: '',
      material: 'American White Oak (Kiln-Dried)',
      finish: 'Natural Matte Clear Bio-Oil',
      description: '',
      name: '',
      phone: '',
      email: '',
      city: 'Cairo (New Cairo / Maadi / Zamalek)',
      imagePreview: null,
      selectedCustomWorkTitle: ''
    });
    setSelectedPreviousWorkId(null);
    setCustomQuotePreFill(null);
  };

  const customizeB2BItems = PREVIOUS_CUSTOM_WORKS.filter(w => w.isCustomizeCategory);

  const portfolioCategories = [
    { id: 'customize', label: `Customize / B2B (${customizeB2BItems.length})` },
    { id: 'all', label: `All Works (${PREVIOUS_CUSTOM_WORKS.length})` },
    { id: 'kitchens', label: 'Kitchens' },
    { id: 'living', label: 'Living & Storage' },
    { id: 'architectural', label: 'Ceilings & Doors' },
  ];

  const displayedPortfolio = PREVIOUS_CUSTOM_WORKS.filter((work) => {
    if (portfolioCategory === 'all') return true;
    if (portfolioCategory === 'customize') return work.isCustomizeCategory;
    if (portfolioCategory === 'kitchens') return work.category === 'Kitchen';
    if (portfolioCategory === 'living') return ['Living Room', 'Storage & Library', 'Console & Buffet', 'Storage', 'Dining Buffet'].includes(work.category);
    if (portfolioCategory === 'architectural') return ['Ceilings & Millwork', 'Doors & Millwork', 'Bespoke Joinery', 'Under-Stair Joinery', 'Dressing Room'].includes(work.category);
    return true;
  });

  return (
    <div>
      {/* Editorial Luxury Header Banner in Prime Navy */}
      <section className="bg-[#1D2743] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D8D2C2]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F1E7CC_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2.5 mb-3">
            <span className="w-8 h-[1px] bg-[#F1E7CC]" />
            <span className="text-xs uppercase tracking-[0.28em] text-[#F1E7CC] font-semibold">
              BESPOKE ATELIER · CAIRO
            </span>
            <span className="w-8 h-[1px] bg-[#F1E7CC]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F1E7CC] font-normal tracking-tight">
            Create Something Made for You
          </h1>
          <p className="mt-3 text-[#D8D2C2] font-sans text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            “Tell us what you have in mind and our master woodworkers will turn your idea, sketch, or space into a finished heirloom piece.”
          </p>
        </div>
      </section>

      {/* Featured Showcase: The 5 Customize / B2B Pieces */}
      <section className="bg-[#FAF8F5] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D8D2C2]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D8D2C2]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#1D2743] font-bold block mb-1.5">
                ✦ BESPOKE COMMISSIONS & INTERIORS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#111827] font-medium tracking-tight">
                Customize / B2B Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1 font-light max-w-xl">
                Real custom projects crafted by Prime Wood Arthouse. Click any project to use it as inspiration for your bespoke request.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-xs uppercase tracking-widest text-[#1D2743] font-semibold bg-[#F1E7CC]/60 px-3 py-1.5 border border-[#D8D2C2]">
                5 Signature Bespoke Works
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {customizeB2BItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleSelectFromShowcase(item)}
                className="group cursor-pointer bg-white border border-[#D8D2C2] transition-all duration-300 hover:border-[#1D2743] hover:shadow-lg flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFECE6]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1D2743] text-[#F1E7CC] font-semibold shadow">
                      CUSTOMIZE / B2B
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#1D2743] font-medium border border-[#D8D2C2]">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#111827] font-medium group-hover:text-[#1D2743] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-charcoal-600 font-light mt-1 line-clamp-2">
                      {item.dimensions}
                    </p>
                    <p className="text-xs font-semibold text-[#1D2743] mt-2">
                      {item.price}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectFromShowcase(item);
                    }}
                    className="mt-4 w-full py-2 bg-[#FAF8F5] group-hover:bg-[#1D2743] text-[#1D2743] group-hover:text-[#F1E7CC] border border-[#D8D2C2] group-hover:border-[#1D2743] text-[10px] uppercase tracking-widest font-semibold transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Request Similar Custom Piece</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Request Form Container */}
      <div id="custom-request-form" className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">

      {isSubmitted ? (
        /* Confirmation State matching user requirements */
        <div className="bg-[#FAF8F5] border border-[#D8D2C2] p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-wood-100 text-wood-800 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-wood-700" />
          </div>

          <span className="text-xs uppercase tracking-widest text-wood-600 font-semibold block mb-2">
            Reference #{ticketId}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mb-3">
            Your request has been received.
          </h2>
          <p className="text-charcoal-600 font-sans text-sm sm:text-base font-light leading-relaxed mb-8 max-w-md mx-auto">
            Our team will review your requirements, prepare preliminary material and proportion sketches, and contact you shortly.
          </p>

          <div className="bg-[#F0EDE6] p-4 text-xs text-charcoal-700 text-left mb-8 space-y-1">
            <p><strong>Piece Requested:</strong> {formData.pieceType}</p>
            <p><strong>Wood & Finish:</strong> {formData.material} — {formData.finish}</p>
            {formData.width && <p><strong>Dimensions:</strong> {formData.width}W x {formData.height}H x {formData.depth}D cm</p>}
            <p><strong>Contact:</strong> {formData.name} ({formData.phone})</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/201222935556?text=${encodeURIComponent(
                `Hello Prime Wooden Work, I just submitted custom request #${ticketId} for a ${formData.pieceType}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#20ba59] transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Discuss via WhatsApp</span>
            </a>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3.5 border border-charcoal-300 text-charcoal-800 text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        /* The Interactive Custom Furniture Request Form */
        <form onSubmit={handleSubmit} className="bg-[#FAF8F5] border border-[#D8D2C2] p-6 sm:p-12 shadow-sm space-y-12">
          
          {/* Form Header */}
          <div className="border-b border-[#D8D2C2] pb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#1D2743] font-bold block mb-1">
              TAILORED COMMISSION FORM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111827]">
              Submit Your Custom Woodwork Requirements
            </h2>
          </div>

          {/* 1. What are you looking for? */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#1D2743] text-[#F1E7CC] text-xs flex items-center justify-center font-medium">1</span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                What are you looking for?
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pieceTypes.map((type) => {
                const isSelected = formData.pieceType === type;
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setFormData(prev => ({ ...prev, pieceType: type }))}
                    className={`p-3.5 text-xs text-left tracking-wide transition-all border ${
                      isSelected 
                        ? 'border-[#1D2743] bg-[#1D2743] font-semibold text-[#F1E7CC]' 
                        : 'border-[#E9E2D5] bg-white text-charcoal-600 hover:border-[#1D2743]'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Approximate dimensions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#1D2743] text-[#F1E7CC] text-xs flex items-center justify-center font-medium">2</span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                Approximate dimensions (cm)
              </h3>
            </div>
            <p className="text-xs text-charcoal-500 font-light">
              Rough approximations are fine. Our master measurement team can take final on-site laser measurements in Cairo & Giza.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Width (cm)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 240"
                  value={formData.width}
                  onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
                  className="w-full bg-white border border-[#D8D2C2] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 76"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  className="w-full bg-white border border-[#D8D2C2] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Depth (cm)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 105"
                  value={formData.depth}
                  onChange={(e) => setFormData(prev => ({ ...prev, depth: e.target.value }))}
                  className="w-full bg-white border border-[#D8D2C2] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743]"
                />
              </div>
            </div>
          </div>

          {/* 3 & 4. Preferred Material & Finish */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Preferred Material */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#1D2743] text-[#F1E7CC] text-xs flex items-center justify-center font-medium">3</span>
                <h3 className="font-serif text-xl text-charcoal-900 font-normal">
                  Preferred material
                </h3>
              </div>
              <select
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                className="w-full bg-white border border-[#D8D2C2] px-4 py-3.5 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743] cursor-pointer"
              >
                {materials.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Preferred finish/color */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#1D2743] text-[#F1E7CC] text-xs flex items-center justify-center font-medium">4</span>
                <h3 className="font-serif text-xl text-charcoal-900 font-normal">
                  Preferred finish / color
                </h3>
              </div>
              <select
                value={formData.finish}
                onChange={(e) => setFormData(prev => ({ ...prev, finish: e.target.value }))}
                className="w-full bg-white border border-[#D8D2C2] px-4 py-3.5 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743] cursor-pointer"
              >
                {finishes.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Describe your idea */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#1D2743] text-[#F1E7CC] text-xs flex items-center justify-center font-medium">5</span>
              <h3 className="font-serif text-xl text-charcoal-900 font-normal">
                Describe your idea
              </h3>
            </div>
            <textarea
              rows={4}
              placeholder="Tell us about the space, desired functionality, special edge radiuses, fluting details, or wood tone preferences..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-white border border-[#D8D2C2] px-4 py-3.5 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743] leading-relaxed font-light"
            />
          </div>

          {/* 6. Upload inspiration image — Both Possibilities */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#1D2743] text-[#F1E7CC] text-xs flex items-center justify-center font-medium">6</span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                Inspiration Image
              </h3>
            </div>
            <p className="text-xs text-charcoal-500 font-light">
              Choose an example from our previously crafted bespoke woodwork, or upload your own outside photo, floorplan, or sketch.
            </p>

            {/* Dual Possibility Selector Tabs */}
            <div className="flex flex-wrap gap-2 pt-1 border-b border-[#E9E2D5] pb-3">
              <button
                type="button"
                onClick={() => setInspirationMode('portfolio')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                  inspirationMode === 'portfolio'
                    ? 'bg-[#1D2743] text-[#F1E7CC] shadow-sm'
                    : 'bg-[#FAF8F5] border border-[#D8D2C2] text-charcoal-700 hover:bg-white'
                }`}
              >
                ✦ Prime Custom Portfolio ({PREVIOUS_CUSTOM_WORKS.length})
              </button>
              <button
                type="button"
                onClick={() => setInspirationMode('upload')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                  inspirationMode === 'upload'
                    ? 'bg-[#1D2743] text-[#F1E7CC] shadow-sm'
                    : 'bg-[#FAF8F5] border border-[#D8D2C2] text-charcoal-700 hover:bg-white'
                }`}
              >
                ⇪ Upload Outside Photo / Sketch
              </button>
            </div>

            {/* Active Selected Preview if any */}
            {formData.imagePreview && (
              <div className="p-4 bg-wood-50 border border-wood-300 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={formData.imagePreview}
                    alt="Active inspiration"
                    className="w-20 h-16 object-cover border border-wood-200"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-wood-700 font-semibold block">
                      Active Inspiration Reference
                    </span>
                    <p className="font-serif text-sm font-medium text-charcoal-900">
                      {formData.selectedCustomWorkTitle || 'Uploaded Reference Image'}
                    </p>
                    <span className="text-[11px] text-[#1D2743] font-medium">
                      Piece type auto-selected: {formData.pieceType}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3 py-1.5 border border-charcoal-400 text-charcoal-700 hover:text-red-700 hover:border-red-600 text-xs uppercase tracking-wider transition-colors"
                >
                  Change / Remove
                </button>
              </div>
            )}

            {/* Possibility 1: Previous Custom Works Gallery */}
            {inspirationMode === 'portfolio' && (
              <div className="space-y-4 pt-2">
                {/* Filter Sub-Tabs for Custom Portfolio */}
                <div className="flex flex-wrap items-center gap-2 pb-2">
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-500 font-medium mr-1">
                    Filter:
                  </span>
                  {portfolioCategories.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPortfolioCategory(tab.id)}
                      className={`px-3 py-1 text-xs uppercase tracking-wider rounded-sm transition-all ${
                        portfolioCategory === tab.id
                          ? 'bg-[#1D2743] text-[#F1E7CC] font-semibold'
                          : 'bg-white border border-[#D8D2C2] text-charcoal-700 hover:bg-[#F2ECE1]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedPortfolio.map((work) => {
                    const isSelected = selectedPreviousWorkId === work.id;
                    return (
                      <div
                        key={work.id}
                        onClick={() => handleSelectWork(work)}
                        className={`group relative cursor-pointer border p-2.5 transition-all bg-white flex flex-col justify-between ${
                          isSelected 
                            ? 'border-[#1D2743] ring-2 ring-[#1D2743] shadow-md' 
                            : 'border-[#E9E2D5] hover:border-[#1D2743]'
                        }`}
                      >
                        <div>
                          <div className="aspect-[16/11] overflow-hidden bg-[#EFECE6] relative">
                            <img
                              src={work.image}
                              alt={work.title}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-[#1D2743] text-[#F1E7CC] rounded-full p-1 shadow">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}

                            {work.isCustomizeCategory && (
                              <div className="absolute top-2 left-2 bg-[#1D2743] text-[#F1E7CC] text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 shadow">
                                CUSTOMIZE / B2B
                              </div>
                            )}

                            <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-[9px] uppercase tracking-wider text-white px-2 py-0.5">
                              {work.category}
                            </div>
                          </div>

                          <div className="pt-2.5">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-serif text-sm font-medium text-charcoal-900 group-hover:text-[#1D2743] transition-colors">
                                {work.title}
                              </h4>
                              {work.tag && (
                                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-[#FAF8F5] text-[#1D2743] border border-[#D8D2C2] rounded shrink-0">
                                  {work.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-charcoal-500 mt-1 line-clamp-2">{work.dimensions || work.location}</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#F2ECE1] flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#1D2743]">{work.price}</span>
                          <span className="text-wood-700 group-hover:underline text-[10px] uppercase tracking-wider font-medium">
                            Select as reference →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Possibility 2: Upload External Image */}
            {inspirationMode === 'upload' && (
              <label className="border-2 border-dashed border-[#D5C9B3] hover:border-wood-600 bg-white p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
                <Upload className="w-8 h-8 text-charcoal-400 group-hover:text-wood-700 mb-2 transition-colors" />
                <span className="text-xs uppercase tracking-wider font-medium text-charcoal-800">
                  Click to upload your outside inspiration image, floorplan, or sketch
                </span>
                <span className="text-[11px] text-charcoal-400 mt-1">
                  Supports PNG, JPG, WEBP, PDF up to 25MB
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* 7. Contact information */}
          <div className="space-y-4 pt-4 border-t border-[#E9E2D5]">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#1D2743] text-[#F1E7CC] text-xs flex items-center justify-center font-medium">7</span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                Contact information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Youssef Mansour"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white border border-[#D8D2C2] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(+20) 100 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-white border border-[#D8D2C2] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-white border border-[#D8D2C2] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Location / Area
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full bg-white border border-[#D8D2C2] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-[#1D2743] cursor-pointer"
                >
                  <option value="New Cairo / 5th Settlement">New Cairo / 5th Settlement</option>
                  <option value="Sheikh Zayed / 6th October">Sheikh Zayed / 6th October</option>
                  <option value="Maadi / Zamalek / Garden City">Maadi / Zamalek / Garden City</option>
                  <option value="Heliopolis / Nasr City">Heliopolis / Nasr City</option>
                  <option value="Alexandria">Alexandria</option>
                  <option value="North Coast (Sahel) / Gouna">North Coast (Sahel) / El Gouna</option>
                  <option value="Other Egypt Governorate">Other Egypt Governorate</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-[#E9E2D5]">
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 bg-[#1D2743] text-[#F1E7CC] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#141B2E] transition-all shadow-sm"
            >
              Request a Quote
            </button>
            <p className="text-[11px] text-charcoal-500 font-light mt-3">
              Complimentary preliminary estimate and initial timber consultations provided within 24 business hours.
            </p>
          </div>

        </form>
      )}

      </div>
    </div>
  );
}
