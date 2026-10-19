import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Truck, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Droplets, 
  Sun, 
  Flame, 
  ShieldAlert, 
  Layers, 
  ArrowRight,
  PackageCheck,
  Compass,
  FileCheck
} from 'lucide-react';

const TABS = [
  { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
  { id: 'returns', label: 'Returns', icon: RotateCcw },
  { id: 'faq', label: 'FAQs', icon: HelpCircle },
  { id: 'care-guide', label: 'Care Guide', icon: Sparkles },
];

export default function CustomerCarePage({ initialTab = 'shipping' }) {
  const { navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [faqCategory, setFaqCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (initialTab && TABS.some(t => t.id === initialTab)) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigateTo(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // FAQ Data
  const faqs = [
    {
      category: 'orders',
      question: 'What payment methods do you accept across Egypt?',
      answer: 'We accept Cash upon Delivery & Inspection, Direct Bank Transfers (CIB, QNB, Banque Misr), all major Visa and MasterCard debit/credit cards, and flexible installment plans for qualified banks. For bespoke commissions, we accept corporate bank wires and certified checks.'
    },
    {
      category: 'orders',
      question: 'What deposit is required for custom and made-to-order pieces?',
      answer: 'Bespoke and made-to-order projects require a 50% deposit upon final approval of technical CAD blueprints and timber selection. The remaining 50% balance is settled only after delivery, assembly, and your complete sign-off in your home.'
    },
    {
      category: 'orders',
      question: 'Can I visit the workshop to see pieces before purchasing?',
      answer: 'Yes, we warmly encourage it. Our heritage atelier at 3 El Madaress St., Ghamra, Cairo welcomes visitors Monday through Saturday from 10:00 AM to 7:00 PM. You can inspect raw timber slabs, see joinery work in progress, and feel our natural hand-rubbed finishes in person.'
    },
    {
      category: 'materials',
      question: 'What solid wood species do you work with?',
      answer: 'We craft almost exclusively with certified hardwoods: European White Oak, American Walnut, European Ash, and Solid Beech. We do not use hollow MDF, chipboard, or low-grade printed paper veneers. Every piece is real, honest hardwood.'
    },
    {
      category: 'materials',
      question: 'How do you prevent solid wood from warping or cracking in Egypt?',
      answer: 'All our timber undergoes rigorous industrial kiln-drying down to an optimal 8–10% moisture equilibrium. In addition, our furniture incorporates centuries-old traditional carpentry techniques—including floating mortise & tenon joinery and slotted apron fasteners—that allow the wood to expand and contract naturally without structural distortion or splitting.'
    },
    {
      category: 'materials',
      question: 'Are your wood finishes eco-friendly and food-safe?',
      answer: 'Yes. We finish our pieces using natural plant-based hardwax oils, cold-pressed linseed oils, and organic beeswax. They are ultra-low VOC, non-toxic, emit no chemical odors, and are completely safe for dining tables and living spaces.'
    },
    {
      category: 'delivery',
      question: 'What happens if a large piece does not fit in my elevator?',
      answer: 'Most of our large dining tables and consoles are engineered with precision knock-down joinery where legs and monolithic tops can be carried separately and reassembled seamlessly inside your room. If your residence has narrow staircases, our logistics concierge can arrange external electric crane hoisting to your balcony or window.'
    },
    {
      category: 'delivery',
      question: 'Do you deliver to the North Coast (Sahel) and Red Sea?',
      answer: 'Yes. We operate scheduled White-Glove delivery trips to the North Coast, Alexandria, El Gouna, Hurghada, and all provincial capitals across Egypt. Our own carpentry crew accompanies every shipment to ensure proper installation on site.'
    },
    {
      category: 'warranty',
      question: 'What does your 10-Year Craftsmanship Guarantee cover?',
      answer: 'Our 10-Year Guarantee covers structural integrity, wood joints (mortise & tenon, dovetails), drawer runners, and hinge anchorings. If any joint loosens or reveals an organic material flaw under normal residential use, our workshop will repair or replace it at no charge.'
    }
  ];

  const filteredFaqs = faqCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === faqCategory);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      
      {/* Editorial Page Header & Breadcrumb */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-wood-600 font-semibold">
          <button onClick={() => navigateTo('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-charcoal-400">Customer Care</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal tracking-tight">
          Customer Care & Atelier Services
        </h1>
        <p className="text-charcoal-600 font-sans text-sm sm:text-base font-light leading-relaxed">
          Comprehensive guidance on our white-glove delivery across Egypt, returns and guarantees, solid wood care, and frequent inquiries.
        </p>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="border-b border-[#E9E2D5] pb-px">
        <div className="flex overflow-x-auto no-scrollbar space-x-2 sm:space-x-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2.5 pb-4 px-1 text-xs uppercase tracking-[0.2em] font-medium transition-all whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-wood-800 text-charcoal-900 font-semibold'
                    : 'border-transparent text-charcoal-400 hover:text-charcoal-700 hover:border-charcoal-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-wood-700' : 'text-charcoal-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT: Shipping & Delivery */}
      {activeTab === 'shipping' && (
        <div className="space-y-16">
          
          {/* Header intro */}
          <div className="bg-[#F4EFEA] border border-[#E9E2D5] p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-wood-700 font-semibold block">
                White-Glove In-Home Experience
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-900 font-normal">
                Carefully Transported. Personally Installed.
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Heirloom furniture deserves extraordinary care. Unlike standard couriers, Prime pieces are handled exclusively by our trained workshop craftsmen. We bring the furniture into your home, assemble every component, position it to your satisfaction, and install protective floor felt pads before departure.
              </p>
            </div>
          </div>

          {/* Delivery Zones & Timelines */}
          <div className="space-y-6">
            <div className="border-b border-[#E9E2D5] pb-3">
              <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal-400 font-semibold block">
                Coverage & Timelines
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal mt-1">
                Delivery Zones Across Egypt
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Cairo & Giza */}
              <div className="border border-[#E9E2D5] bg-white p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-wood-600 font-semibold">Zone 1</span>
                  <span className="text-xs font-serif italic text-charcoal-500">Fastest Dispatch</span>
                </div>
                <h4 className="font-serif text-xl text-charcoal-900">Greater Cairo & Giza</h4>
                <div className="space-y-2 text-xs text-charcoal-600 font-light leading-relaxed">
                  <p><strong>Fee:</strong> Free on orders over 50,000 EGP (Flat 750 EGP for smaller items)</p>
                  <p><strong>In-Stock Timeline:</strong> 3 – 5 business days</p>
                  <p><strong>Made-to-Order:</strong> 3 – 4 weeks</p>
                  <p className="text-neutral-500 pt-2 border-t border-neutral-100">
                    Includes dedicated 2-hour appointment window, direct staircase transport, and full room setup.
                  </p>
                </div>
              </div>

              {/* Alexandria & Delta */}
              <div className="border border-[#E9E2D5] bg-white p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-wood-600 font-semibold">Zone 2</span>
                  <span className="text-xs font-serif italic text-charcoal-500">Weekly Scheduled</span>
                </div>
                <h4 className="font-serif text-xl text-charcoal-900">Alexandria & Delta</h4>
                <div className="space-y-2 text-xs text-charcoal-600 font-light leading-relaxed">
                  <p><strong>Fee:</strong> 1,200 EGP flat rate</p>
                  <p><strong>In-Stock Timeline:</strong> 5 – 7 business days</p>
                  <p><strong>Made-to-Order:</strong> 4 – 5 weeks</p>
                  <p className="text-neutral-500 pt-2 border-t border-neutral-100">
                    Scheduled weekly transport from our Cairo atelier. Fully assembled on-site by our carpentry crew.
                  </p>
                </div>
              </div>

              {/* Coastal & Red Sea */}
              <div className="border border-[#E9E2D5] bg-white p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-wood-600 font-semibold">Zone 3</span>
                  <span className="text-xs font-serif italic text-charcoal-500">Dedicated Transit</span>
                </div>
                <h4 className="font-serif text-xl text-charcoal-900">North Coast & Red Sea</h4>
                <div className="space-y-2 text-xs text-charcoal-600 font-light leading-relaxed">
                  <p><strong>Fee:</strong> 2,400 EGP flat rate (Sahel, El Gouna, Hurghada)</p>
                  <p><strong>In-Stock Timeline:</strong> 7 – 10 business days</p>
                  <p><strong>Made-to-Order:</strong> 4 – 6 weeks</p>
                  <p className="text-neutral-500 pt-2 border-t border-neutral-100">
                    Direct transport in custom shockproof wooden crates to protect against coastal humidity and transit vibration.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* 4-Step White Glove Process */}
          <div className="space-y-6">
            <div className="border-b border-[#E9E2D5] pb-3">
              <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal-400 font-semibold block">
                The Journey
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal mt-1">
                Our 4-Step Delivery Protocol
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="border border-[#E9E2D5] bg-white p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800 font-serif text-lg">
                  1
                </div>
                <h4 className="font-serif text-lg text-charcoal-900">Protective Blanket Wrap</h4>
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  Every edge, leg, and tabletop is shielded with heavy-duty padded architectural moving blankets and reinforced corner protectors.
                </p>
              </div>

              <div className="border border-[#E9E2D5] bg-white p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800 font-serif text-lg">
                  2
                </div>
                <h4 className="font-serif text-lg text-charcoal-900">Pre-Delivery Confirmation</h4>
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  Our logistics team calls 48 hours prior to arrange a precise delivery slot and verify doorway, elevator, and staircase clearances.
                </p>
              </div>

              <div className="border border-[#E9E2D5] bg-white p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800 font-serif text-lg">
                  3
                </div>
                <h4 className="font-serif text-lg text-charcoal-900">In-Room White-Glove Setup</h4>
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  Our carpenters assemble legs, level the piece on your flooring, attach scratch-resistant felt pads, and remove all packaging.
                </p>
              </div>

              <div className="border border-[#E9E2D5] bg-white p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800 font-serif text-lg">
                  4
                </div>
                <h4 className="font-serif text-lg text-charcoal-900">Final Sign-Off & Inspection</h4>
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  You inspect the grain and hand finish alongside our team before signing off. We hand you a complimentary beeswax care kit.
                </p>
              </div>

            </div>
          </div>

          {/* Access & Elevator Advisory */}
          <div className="border border-[#E9E2D5] bg-[#FAF8F5] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2 text-wood-700">
                <Compass className="w-4 h-4 shrink-0" />
                <span className="text-xs uppercase tracking-widest font-semibold">Architectural Access Advisory</span>
              </div>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                For oversized dining tables (240cm+) or heavy consoles, please ensure your entrance doors, building elevators, and stair landings have adequate clearance. If external crane hoisting is needed, our team will coordinate the logistical arrangements.
              </p>
            </div>
            <a 
              href="https://wa.me/201222935556?text=Hello%20Prime%20team,%20I%20have%20a%20question%20regarding%20delivery%20access"
              target="_blank" 
              rel="noopener noreferrer"
              className="shrink-0 bg-wood-800 hover:bg-wood-900 text-white text-xs uppercase tracking-[0.2em] font-medium py-3 px-6 transition-colors"
            >
              Consult On Access
            </a>
          </div>

        </div>
      )}

      {/* TAB CONTENT: Returns & Exchanges */}
      {activeTab === 'returns' && (
        <div className="space-y-16">
          
          {/* Header intro */}
          <div className="bg-[#F4EFEA] border border-[#E9E2D5] p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-wood-700 font-semibold block">
                Peace of Mind Guarantee
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-900 font-normal">
                Returns & Exchange Policy
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                We design and craft every piece with the belief that furniture should bring joy and enduring harmony to your home. If a standard piece does not feel completely right in your living space, we are here to assist with straightforward returns and exchanges.
              </p>
            </div>
          </div>

          {/* Key Return Policies (3 Pillars) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Standard Catalog */}
            <div className="border border-[#E9E2D5] bg-white p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-charcoal-900">14-Day Return Window</h3>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                Standard catalog pieces may be returned or exchanged within 14 days of delivery. The item must remain in brand new condition, free of customer damage, stains, or third-party finish alterations.
              </p>
              <div className="pt-2 border-t border-neutral-100 text-[11px] text-wood-700 font-medium">
                Full refund or store credit available
              </div>
            </div>

            {/* Bespoke & Custom Pieces */}
            <div className="border border-[#E9E2D5] bg-white p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-charcoal-900">Bespoke Commissions</h3>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                Because bespoke commissions are custom-dimensioned and milled specifically for your architectural space, they cannot be returned for change-of-mind. However, they are fully covered under our 10-Year Craft Guarantee.
              </p>
              <div className="pt-2 border-t border-neutral-100 text-[11px] text-wood-700 font-medium">
                Workshop corrections guaranteed
              </div>
            </div>

            {/* Transit Damage & Flaws */}
            <div className="border border-[#E9E2D5] bg-white p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-charcoal-900">Arrival Inspection & Defects</h3>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                In the rare event that a piece arrives with a transit scratch or joint defect, our delivery crew will document it immediately. We will repair it on-site or return it to our atelier for rapid refinishing at zero cost.
              </p>
              <div className="pt-2 border-t border-neutral-100 text-[11px] text-wood-700 font-medium">
                100% covered by Prime Wooden Work
              </div>
            </div>

          </div>

          {/* Return Process Walkthrough */}
          <div className="border border-[#E9E2D5] bg-white p-6 sm:p-10 space-y-8">
            <div className="border-b border-[#E9E2D5] pb-4">
              <span className="text-[11px] uppercase tracking-[0.22em] text-charcoal-400 font-semibold block">
                How It Works
              </span>
              <h3 className="font-serif text-2xl text-charcoal-900 font-normal mt-1">
                Returning a Piece in 3 Simple Steps
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-wood-600 font-semibold block">Step 01</span>
                <h4 className="font-serif text-lg text-charcoal-900">Notify Our Concierge</h4>
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  Send a message to our WhatsApp team at (+20) 122 293 5556 or email info@primewoodenworks.com with your order number and photos of the piece.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-wood-600 font-semibold block">Step 02</span>
                <h4 className="font-serif text-lg text-charcoal-900">White-Glove Pickup</h4>
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  We schedule our dedicated transport crew to inspect and collect the item directly from your living room. A flat 750 EGP return transport fee applies for change of mind.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-wood-600 font-semibold block">Step 03</span>
                <h4 className="font-serif text-lg text-charcoal-900">Prompt Refund</h4>
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  Upon arrival at our Ghamra workshop and physical inspection, your refund is issued within 5 to 7 business days via original payment method (Bank Transfer or Card).
                </p>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="bg-[#FAF8F5] border border-[#E9E2D5] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif text-xl text-charcoal-900">Need to initiate a return or exchange?</h4>
              <p className="text-xs text-charcoal-600 font-light">
                Our Cairo customer care team is available Saturday to Thursday, 9:00 AM – 8:00 PM.
              </p>
            </div>
            <a 
              href="https://wa.me/201222935556?text=Hello%20Prime%20team,%20I%20would%20like%20to%20request%20a%20return%20or%20exchange"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-wood-800 hover:bg-wood-900 text-white text-xs uppercase tracking-[0.2em] font-medium py-3 px-6 transition-colors"
            >
              Start Return on WhatsApp
            </a>
          </div>

        </div>
      )}

      {/* TAB CONTENT: FAQs */}
      {activeTab === 'faq' && (
        <div className="space-y-12">
          
          {/* Header intro */}
          <div className="bg-[#F4EFEA] border border-[#E9E2D5] p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-wood-700 font-semibold block">
                Atelier Knowledge Base
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-900 font-normal">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Everything you need to know about our Cairo heritage, solid timber selection, custom commissions, delivery logistics, and craft guarantee.
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'orders', label: 'Orders & Payments' },
              { id: 'materials', label: 'Timber & Craftsmanship' },
              { id: 'delivery', label: 'Delivery & Hoisting' },
              { id: 'warranty', label: 'Guarantee & Warranty' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFaqCategory(cat.id);
                  setOpenFaqIndex(null);
                }}
                className={`text-xs uppercase tracking-wider py-2 px-4 transition-colors font-medium border ${
                  faqCategory === cat.id
                    ? 'bg-wood-800 border-wood-800 text-white'
                    : 'bg-white border-[#E9E2D5] text-charcoal-600 hover:border-charcoal-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-[#E9E2D5] border-y border-[#E9E2D5] bg-white">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="transition-colors hover:bg-neutral-50/50">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 sm:py-6 px-4 sm:px-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg text-charcoal-900 font-normal">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-wood-700 ml-4">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-6 text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed max-w-4xl">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions banner */}
          <div className="border border-[#E9E2D5] bg-[#FAF8F5] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif text-xl text-charcoal-900">Still have an unanswered question?</h4>
              <p className="text-xs text-charcoal-600 font-light">
                Our master carpenters and design consultants in Cairo are ready to assist you.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigateTo('contact')}
                className="bg-transparent border border-wood-800 text-wood-900 hover:bg-wood-800 hover:text-white text-xs uppercase tracking-[0.2em] font-medium py-3 px-5 transition-colors"
              >
                Contact Us
              </button>
              <a 
                href="https://wa.me/201222935556"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-wood-800 hover:bg-wood-900 text-white text-xs uppercase tracking-[0.2em] font-medium py-3 px-5 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: Care Guide */}
      {activeTab === 'care-guide' && (
        <div className="space-y-16">
          
          {/* Header intro */}
          <div className="bg-[#F4EFEA] border border-[#E9E2D5] p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-wood-700 font-semibold block">
                Preserving Heirloom Timber
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-900 font-normal">
                Solid Wood Care & Maintenance Guide
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Solid timber is a living, breathing material. Unlike artificial composites, natural European Oak and American Walnut adapt to your home over time, acquiring depth, character, and an organic patina that tells your family story for generations.
              </p>
            </div>
          </div>

          {/* 4 Pillars of Wood Care Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="border border-[#E9E2D5] bg-white p-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-charcoal-900">Sunlight & Climate</h3>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                Avoid exposing timber to relentless direct Egyptian sunlight, which can cause uneven surface bleaching. Keep pieces at least one meter away from heating units and air conditioning vents.
              </p>
            </div>

            <div className="border border-[#E9E2D5] bg-white p-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-charcoal-900">Spills & Moisture</h3>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                Blot liquid spills immediately with a soft, absorbent cotton cloth. Never allow standing water, tea, or wine to sit on natural wood surfaces, as it may penetrate through natural oil pores.
              </p>
            </div>

            <div className="border border-[#E9E2D5] bg-white p-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-charcoal-900">Heat & Trivets</h3>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                Always use felt-lined coasters for hot coffee mugs and heat-proof trivets for cookware. Placing sizzling dishes directly onto solid wood can scorch the organic cellulose fibers.
              </p>
            </div>

            <div className="border border-[#E9E2D5] bg-white p-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-800">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-charcoal-900">No Harsh Cleaners</h3>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                Never use ammonia, bleach, abrasive powders, or silicone furniture polish sprays. Clean simply with a clean microfiber cloth slightly dampened with lukewarm water.
              </p>
            </div>

          </div>

          {/* Annual Rejuvenation Routine */}
          <div className="border border-[#E9E2D5] bg-white p-6 sm:p-10 space-y-6">
            <div className="border-b border-[#E9E2D5] pb-4">
              <span className="text-[11px] uppercase tracking-[0.22em] text-wood-600 font-semibold block">
                The Annual Ritual
              </span>
              <h3 className="font-serif text-2xl text-charcoal-900 font-normal mt-1">
                How to Rejuvenate Your Wood with Beeswax
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-charcoal-600 font-light leading-relaxed">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-wood-700 font-semibold block">Step 1 · Cleanse</span>
                <p>
                  Thoroughly wipe down the surface with a barely-damp cotton cloth to remove dust and airborne particles. Ensure the wood is bone dry before proceeding.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-wood-700 font-semibold block">Step 2 · Apply</span>
                <p>
                  Take a small scoop of Prime natural beeswax conditioning balm and rub it along the wood grain using circular motions with a lint-free cloth. Let it absorb for 20 minutes.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-wood-700 font-semibold block">Step 3 · Buff</span>
                <p>
                  Buff briskly along the grain with a clean, dry cloth to reveal a silky architectural glow and enhance water-resistance against everyday dining.
                </p>
              </div>
            </div>
          </div>

          {/* First Aid for Minor Scratches & Water Marks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="border border-[#E9E2D5] bg-[#FAF8F5] p-6 sm:p-8 space-y-3">
              <div className="flex items-center space-x-2 text-wood-700">
                <AlertCircle className="w-4 h-4" />
                <h4 className="font-serif text-lg text-charcoal-900">White Water Marks</h4>
              </div>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                If cold glass condensation leaves a faint white mark, trapped moisture is sitting under the wax coat. Gently buff the spot with a dab of natural mineral oil or beeswax on a soft flannel cloth.
              </p>
            </div>

            <div className="border border-[#E9E2D5] bg-[#FAF8F5] p-6 sm:p-8 space-y-3">
              <div className="flex items-center space-x-2 text-wood-700">
                <Sparkles className="w-4 h-4" />
                <h4 className="font-serif text-lg text-charcoal-900">Light Surface Scratches</h4>
              </div>
              <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                For superficial scratches on oak or walnut, rub a raw walnut kernel directly over the mark. The natural oil blends the exposed fibers with the surrounding patina instantly.
              </p>
            </div>

          </div>

          {/* Workshop Refinishing Support */}
          <div className="bg-[#1C1A18] text-[#FAF8F5] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-wood-300 font-semibold block">
                Lifetime Atelier Service
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal">
                Need Professional In-Home Sanding or Re-Oiling?
              </h3>
              <p className="text-xs text-neutral-400 font-light max-w-xl">
                Our Cairo carpenters provide scheduled residential maintenance visits and deep atelier refinishing for all Prime pieces.
              </p>
            </div>
            <a 
              href="https://wa.me/201222935556?text=Hello%20Prime%20team,%20I%20would%20like%20to%20schedule%20a%20wood%20care%20maintenance%20visit"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-wood-600 hover:bg-wood-500 text-white text-xs uppercase tracking-[0.2em] font-medium py-3.5 px-6 transition-colors shrink-0"
            >
              Book Maintenance Visit
            </a>
          </div>

        </div>
      )}

      {/* Global Atelier Contact Strip */}
      <div className="pt-8 border-t border-[#E9E2D5] flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-wood-600" />
            <span>Atelier: 3 El Madaress St., Ghamra, Cairo</span>
          </span>
          <span>·</span>
          <span className="flex items-center space-x-1.5">
            <Phone className="w-3.5 h-3.5 text-wood-600" />
            <a href="tel:+201222935556" className="hover:text-charcoal-900 transition-colors">(+20) 122 293 5556</a>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => navigateTo('contact')} className="hover:text-charcoal-900 transition-colors underline-offset-4 hover:underline">
            Visit Cairo Workshop
          </button>
          <span>·</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-charcoal-900 transition-colors underline-offset-4 hover:underline">
            Explore All Pieces
          </button>
        </div>
      </div>

    </div>
  );
}
