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
  ArrowRight
} from 'lucide-react';

export default function CustomFurniturePage() {
  const { customQuotePreFill, setCustomQuotePreFill, showToast, navigateTo } = useStore();

  const [formData, setFormData] = useState({
    pieceType: 'Dining table',
    width: '',
    height: '',
    depth: '',
    material: 'American White Oak',
    finish: 'Natural Matte Clear',
    description: '',
    name: '',
    phone: '',
    email: '',
    city: 'Cairo (New Cairo / Maadi / Zamalek)',
    imagePreview: null
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Handle prefill if directed from product page
  useEffect(() => {
    if (customQuotePreFill) {
      setFormData(prev => ({
        ...prev,
        pieceType: customQuotePreFill.pieceType || 'Dining table',
        description: customQuotePreFill.notes || '',
        material: customQuotePreFill.preferredMaterial || 'American White Oak'
      }));
    }
  }, [customQuotePreFill]);

  const pieceTypes = [
    'Dining table',
    'Coffee table',
    'Console',
    'Cabinet / Credenza',
    'Bed & Nightstands',
    'Armchair / Chair',
    'Dressing Room / Walk-in Closet',
    'Wall Cladding / Architectural Doors',
    'Other Bespoke Commission'
  ];

  const materials = [
    'American White Oak (Kiln-Dried)',
    'European Walnut (Rich Grain)',
    'Blackened Solid Ash',
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
      setFormData(prev => ({ ...prev, imagePreview: url }));
      showToast('Inspiration sketch / photo attached', 'info');
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imagePreview: null }));
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
      pieceType: 'Dining table',
      width: '',
      height: '',
      depth: '',
      material: 'American White Oak',
      finish: 'Natural Matte Clear',
      description: '',
      name: '',
      phone: '',
      email: '',
      city: 'Cairo',
      imagePreview: null
    });
    setCustomQuotePreFill(null);
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Editorial Header matching prompt */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
          Bespoke Atelier · Cairo
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal tracking-tight">
          Create Something Made for You
        </h1>
        <p className="mt-4 text-charcoal-600 font-sans text-base sm:text-lg font-light leading-relaxed">
          “Tell us what you have in mind and our team will help turn your idea into a finished piece.”
        </p>
      </div>

      {isSubmitted ? (
        /* Confirmation State matching user requirements */
        <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm">
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
        <form onSubmit={handleSubmit} className="bg-[#FAF8F5] border border-[#E9E2D5] p-6 sm:p-12 shadow-sm space-y-12">
          
          {/* 1. What are you looking for? */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-wood-800 text-white text-xs flex items-center justify-center font-medium">1</span>
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
                        ? 'border-wood-800 bg-wood-100/60 font-semibold text-charcoal-900' 
                        : 'border-[#E9E2D5] bg-white text-charcoal-600 hover:border-wood-300'
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
              <span className="w-6 h-6 rounded-full bg-wood-800 text-white text-xs flex items-center justify-center font-medium">2</span>
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
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
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
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
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
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>
            </div>
          </div>

          {/* 3 & 4. Preferred Material & Finish */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Preferred Material */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-wood-800 text-white text-xs flex items-center justify-center font-medium">3</span>
                <h3 className="font-serif text-xl text-charcoal-900 font-normal">
                  Preferred material
                </h3>
              </div>
              <select
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                className="w-full bg-white border border-[#E9E2D5] px-4 py-3.5 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700 cursor-pointer"
              >
                {materials.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Preferred finish/color */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-wood-800 text-white text-xs flex items-center justify-center font-medium">4</span>
                <h3 className="font-serif text-xl text-charcoal-900 font-normal">
                  Preferred finish / color
                </h3>
              </div>
              <select
                value={formData.finish}
                onChange={(e) => setFormData(prev => ({ ...prev, finish: e.target.value }))}
                className="w-full bg-white border border-[#E9E2D5] px-4 py-3.5 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700 cursor-pointer"
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
              <span className="w-6 h-6 rounded-full bg-wood-800 text-white text-xs flex items-center justify-center font-medium">5</span>
              <h3 className="font-serif text-xl text-charcoal-900 font-normal">
                Describe your idea
              </h3>
            </div>
            <textarea
              rows={4}
              placeholder="Tell us about the space, desired functionality, special edge radiuses, fluting details, or wood tone preferences..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-white border border-[#E9E2D5] px-4 py-3.5 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700 leading-relaxed font-light"
            />
          </div>

          {/* 6. Upload inspiration image */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-wood-800 text-white text-xs flex items-center justify-center font-medium">6</span>
              <h3 className="font-serif text-xl text-charcoal-900 font-normal">
                Upload inspiration image
              </h3>
            </div>
            
            {formData.imagePreview ? (
              <div className="relative inline-block border border-[#E9E2D5] bg-white p-2">
                <img
                  src={formData.imagePreview}
                  alt="Inspiration Preview"
                  className="w-48 h-36 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-charcoal-900 text-white rounded-full p-1 shadow-md hover:bg-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-[#D5C9B3] hover:border-wood-600 bg-white p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
                <Upload className="w-8 h-8 text-charcoal-400 group-hover:text-wood-700 mb-2 transition-colors" />
                <span className="text-xs uppercase tracking-wider font-medium text-charcoal-800">
                  Click to upload floorplan, sketch or reference photo
                </span>
                <span className="text-[11px] text-charcoal-400 mt-1">
                  Supports PNG, JPG, PDF up to 25MB
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
              <span className="w-6 h-6 rounded-full bg-wood-800 text-white text-xs flex items-center justify-center font-medium">7</span>
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
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
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
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
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
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                  Location / Area
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700 cursor-pointer"
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

          {/* Submit Button matching prompt */}
          <div className="pt-6 border-t border-[#E9E2D5]">
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 bg-wood-800 text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium hover:bg-wood-900 transition-all shadow-sm"
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
  );
}
