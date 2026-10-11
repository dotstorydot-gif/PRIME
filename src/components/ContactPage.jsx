import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

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
    showToast('Your message has been sent to our concierge', 'success');
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-wood-500 font-semibold block mb-2">
          Cairo Studio & Showroom
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-charcoal-900 font-normal tracking-tight">
          Connect with Prime
        </h1>
        <p className="mt-4 text-charcoal-600 font-sans text-base sm:text-xl font-light leading-relaxed">
          Visit our Cairo workshop and material library, schedule an on-site design consultation, or inquire about custom commissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Contact Details & Direct Channels */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-8 space-y-6">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-[#E9E2D5] pb-3">
              Prime Wooden Work Headquarters
            </h3>

            <div className="space-y-4 text-xs text-charcoal-700 leading-relaxed font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-wood-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium text-charcoal-900 uppercase tracking-wider text-[11px]">Factory & Design Studio</strong>
                  <p>3 El Madaress St., Off Port Said St.</p>
                  <p>Ghamra, Cairo, Egypt</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-wood-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium text-charcoal-900 uppercase tracking-wider text-[11px]">Telephone Inquiries</strong>
                  <p>(+20) 122 293 5556</p>
                  <p>(+20) 127 748 8868</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-wood-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium text-charcoal-900 uppercase tracking-wider text-[11px]">Electronic Mail</strong>
                  <p>info@primewoodenworks.com</p>
                  <p>custom@primewoodenworks.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-wood-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium text-charcoal-900 uppercase tracking-wider text-[11px]">Hours of Operation</strong>
                  <p>Saturday – Thursday: 9:00 AM – 7:00 PM</p>
                  <p>Friday: By Appointment</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/201222935556"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#20ba59] transition-colors"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Instant WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Architectural Advisory Note */}
          <div className="p-6 bg-[#F0EDE6] border border-[#E9E2D5] text-xs text-charcoal-600 font-light space-y-2">
            <h4 className="font-serif text-lg text-charcoal-900 font-medium">For Architects & Interior Designers</h4>
            <p>
              We provide comprehensive material sample kits (Oak, Walnut, Beech, Ash in various natural stains) delivered to your design studio across Cairo.
            </p>
          </div>

        </div>

        {/* Right: Message / Consultation Appointment Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-8 sm:p-12">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-wood-700 mx-auto" />
                <h3 className="font-serif text-3xl text-charcoal-900 font-normal">
                  Thank You for Reaching Out
                </h3>
                <p className="text-sm text-charcoal-600 font-light max-w-md mx-auto">
                  Our client relationship team in Cairo will review your inquiry and follow up within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 border border-charcoal-400 text-charcoal-800 text-xs uppercase tracking-widest font-medium hover:bg-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mb-1">
                    Send a Message
                  </h3>
                  <p className="text-xs text-charcoal-500 font-light">
                    Have a question regarding dimensions, custom requests, or showroom visits?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-600 mb-1">
                      Your Name *
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
                      className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
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
                      placeholder="Tell us about your home, project timeline, or specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-white border border-[#E9E2D5] px-4 py-3 text-xs text-charcoal-800 focus:outline-none focus:border-wood-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 bg-wood-800 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-wood-900 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
