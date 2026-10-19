import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.33C9.36 7.33 9.09 7.4 8.86 7.64C8.63 7.89 7.99 8.49 7.99 9.71C7.99 10.93 8.88 12.11 9 12.28C9.13 12.44 10.74 14.94 13.2 16C13.79 16.25 14.24 16.41 14.6 16.52C15.19 16.71 15.73 16.68 16.15 16.62C16.63 16.55 17.62 16.02 17.82 15.44C18.03 14.87 18.03 14.38 17.97 14.27C17.91 14.17 17.74 14.11 17.49 13.99C17.24 13.86 16.02 13.26 15.79 13.18C15.57 13.09 15.4 13.05 15.23 13.3C15.07 13.54 14.58 14.11 14.43 14.28C14.29 14.44 14.14 14.47 13.89 14.34C13.65 14.22 12.87 13.96 11.94 13.13C11.22 12.49 10.72 11.69 10.6 11.45C10.47 11.2 10.59 11.07 10.71 10.95C10.82 10.84 10.96 10.66 11.08 10.51C11.21 10.37 11.25 10.27 11.33 10.1C11.41 9.94 11.37 9.8 11.31 9.68C11.25 9.55 10.76 8.36 10.55 7.87C10.36 7.39 10.16 7.45 10.01 7.44C9.87 7.44 9.7 7.33 9.53 7.33Z"/>
  </svg>
);

export default function ContactPage() {
  const { showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Showroom Visit & Consultation',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our Cairo atelier concierge', 'success');
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center space-x-2">
          <span className="w-8 h-[1px] bg-wood-600" />
          <span className="text-xs uppercase tracking-[0.25em] text-wood-600 font-semibold">
            Cairo Studio & Showroom
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-charcoal-900 font-normal tracking-tight">
          Connect with Prime
        </h1>
        <p className="text-charcoal-600 font-sans text-base sm:text-xl font-light leading-relaxed">
          Visit our historic workshop and raw wood material library in Cairo, schedule an on-site architectural consultation, or discuss a bespoke commission.
        </p>
      </div>

      {/* Aligned 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Factory Information & WhatsApp Button */}
        <div className="lg:col-span-5">
          <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="border-b border-[#E9E2D5] pb-4">
              <span className="text-[10px] uppercase tracking-widest text-wood-600 font-semibold block mb-1">
                Atelier Location
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                Cairo Headquarters
              </h2>
            </div>

            <div className="space-y-5 text-xs text-charcoal-700 leading-relaxed font-light">
              
              {/* Location — Clickable to Google Maps */}
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-4 h-4 text-wood-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium text-charcoal-900 uppercase tracking-wider text-[11px] mb-0.5">
                    Factory & Design Studio
                  </strong>
                  <a
                    href="https://maps.google.com/?q=3+El+Madaress+St+Off+Port+Said+St+Ghamra+Cairo+Egypt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-wood-800 transition-colors inline-flex items-center space-x-1 group"
                  >
                    <span>3 El Madaress St., Off Port Said St., Ghamra, Cairo</span>
                    <ExternalLink className="w-3 h-3 text-wood-600 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Telephone — Clickable tel: */}
              <div className="flex items-start space-x-3.5">
                <Phone className="w-4 h-4 text-wood-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium text-charcoal-900 uppercase tracking-wider text-[11px] mb-0.5">
                    Direct Telephone
                  </strong>
                  <div className="space-y-0.5">
                    <a href="tel:+201222935556" className="hover:text-wood-800 transition-colors block font-mono">
                      (+20) 122 293 5556
                    </a>
                    <a href="tel:+201277488868" className="hover:text-wood-800 transition-colors block font-mono">
                      (+20) 127 748 8868
                    </a>
                  </div>
                </div>
              </div>

              {/* Email — Clickable mailto: */}
              <div className="flex items-start space-x-3.5">
                <Mail className="w-4 h-4 text-wood-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium text-charcoal-900 uppercase tracking-wider text-[11px] mb-0.5">
                    Electronic Mail
                  </strong>
                  <div className="space-y-0.5">
                    <a href="mailto:info@primewoodenworks.com" className="hover:text-wood-800 transition-colors block">
                      info@primewoodenworks.com
                    </a>
                    <a href="mailto:custom@primewoodenworks.com" className="hover:text-wood-800 transition-colors block">
                      custom@primewoodenworks.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-3.5">
                <Clock className="w-4 h-4 text-wood-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium text-charcoal-900 uppercase tracking-wider text-[11px] mb-0.5">
                    Hours of Operation
                  </strong>
                  <p>Saturday – Thursday: 9:00 AM – 7:00 PM</p>
                  <p className="text-wood-700 font-medium">Friday: Showroom Viewings by Appointment</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button matching site buttons with WhatsApp logo */}
            <div className="pt-4 border-t border-[#E9E2D5]">
              <a
                href="https://wa.me/201222935556?text=Hello%20Prime%20Wooden%20Work%2C%20I%20would%20like%20to%20inquire%20about%20a%20woodwork%20piece."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-wood-800 hover:bg-wood-900 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm flex items-center justify-center space-x-2.5 group"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

        {/* Right Column: Message & Consultation Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-6 sm:p-8 lg:p-10 h-full">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-wood-700 mx-auto" />
                <h3 className="font-serif text-3xl text-charcoal-900 font-normal">
                  Thank You for Connecting
                </h3>
                <p className="text-sm text-charcoal-600 font-light max-w-md mx-auto leading-relaxed">
                  Our client relationship team in Ghamra, Cairo will review your inquiry and follow up within one business day.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 border border-charcoal-800 text-charcoal-900 text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-[#E9E2D5] pb-4">
                  <span className="text-[10px] uppercase tracking-widest text-wood-600 font-semibold block mb-1">
                    Direct Inquiry
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                    Send a Message
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Layla Soliman"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                      Phone Number *
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

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="layla@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700 cursor-pointer"
                    >
                      <option value="Showroom Visit & Consultation">Showroom Visit & Consultation</option>
                      <option value="Custom Furniture Quote">Custom Furniture Quote</option>
                      <option value="Corporate / Hospitality Commission">Corporate / Hospitality Commission</option>
                      <option value="Shipping & Delivery Status">Shipping & Delivery Status</option>
                      <option value="Other Inquiries">Other Inquiries</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                      Message / Project Details *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us about your home, project timeline, room dimensions, or specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700 font-light leading-relaxed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 bg-wood-800 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-wood-900 transition-colors shadow-sm"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
