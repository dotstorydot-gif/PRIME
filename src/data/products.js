export const PRODUCTS = [
  // === EXPLICIT B2C PRICED COLLECTION (FROM EXCEL COLUMN I & J) ===
  {
    id: 'prime-cloud-bed',
    name: 'Prime Cloud Bed',
    category: 'Beds',
    categoryId: 'beds',
    tag: 'Bed',
    b2bTag: null,
    price: 56000,
    priceUnit: '',
    isFeatured: true,
    isNew: true,
    badge: 'Best Seller',
    tagline: 'Upholstered Bed 180×200 · Plywood & Oak Wood',
    description: 'A modern and cozy design featuring a soft upholstered curved base and split headboard, bringing ultimate comfort and smoothness to your room.',
    dimensions: {
      standard: '180 x 200 cm Mattress Frame',
      large: '200 x 200 cm King Frame (Custom)'
    },
    materials: 'Upholstered Bed 180*200 — Plywood, oak wood',
    leadTime: '3 – 4 Weeks',
    delivery: 'White-glove delivery and bedroom installation across Greater Cairo, Giza, and North Coast.',
    finishes: [
      { name: 'Plywood & Natural Oak', hex: '#D7C4A5' },
      { name: 'Warm Bouclé & Oak', hex: '#E5DDD0' },
      { name: 'Smoked Walnut Trim', hex: '#533C29' }
    ],
    sizes: [
      '180 x 200 cm (Queen/King Standard)',
      '200 x 200 cm (Super King)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image1.jpg',
    secondaryImage: '/images/products/image22.png',
    gallery: [
      '/images/products/image1.jpg',
      '/images/products/image22.png',
      '/images/products/image29.png'
    ]
  },
  {
    id: 'prime-bliss-bed',
    name: 'Prime Bliss Bed',
    category: 'Beds',
    categoryId: 'beds',
    tag: 'Night Stand',
    b2bTag: 'Upholstered Bed',
    price: 54500,
    priceUnit: '',
    isFeatured: true,
    isNew: true,
    badge: 'Featured',
    tagline: 'Upholstered Bed 180×200 · Plywood & Oak Wood',
    description: 'A soft, comforting design that fills your bedroom with an enchanting sense of relaxation and peace.',
    dimensions: {
      standard: '180 x 200 cm Mattress Frame',
      large: '200 x 200 cm King Frame (Custom)'
    },
    materials: 'Upholstered Bed 180*200 — Plywood, oak wood',
    leadTime: '3 – 4 Weeks',
    delivery: 'Full room assembly and headboard mounting included.',
    finishes: [
      { name: 'Plywood & Oak Wood', hex: '#C8A986' },
      { name: 'Warm Cream Upholstery', hex: '#EAE3D5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: [
      '180 x 200 cm (Standard)',
      '200 x 200 cm (King)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image29.png',
    secondaryImage: '/images/products/image24.png',
    gallery: [
      '/images/products/image29.png',
      '/images/products/image24.png',
      '/images/products/image1.jpg'
    ]
  },
  {
    id: 'prime-curve',
    name: 'Prime Curve Highboard',
    category: 'Storage',
    categoryId: 'storage',
    tag: 'Highboard',
    b2bTag: 'Storage',
    price: 68500,
    priceUnit: '',
    isFeatured: true,
    isNew: true,
    badge: 'Limited Series',
    tagline: 'Highboard · Plywood & Oak Veneer',
    description: 'A luxurious curved design offering sleek storage.',
    dimensions: {
      standard: '120 cm (W) x 45 cm (D) x 155 cm (H)',
      large: '140 cm (W) x 48 cm (D) x 165 cm (H)'
    },
    materials: 'Highboard — Plywood, oak veneer',
    leadTime: '3 – 4 Weeks',
    delivery: 'Delivered fully assembled with anti-tip wall anchoring hardware.',
    finishes: [
      { name: 'Natural Oak Veneer', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' },
      { name: 'Blackened Ash Base', hex: '#262423' }
    ],
    sizes: [
      'Standard Highboard',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image13.png',
    secondaryImage: '/images/products/image2.png',
    gallery: [
      '/images/products/image13.png',
      '/images/products/image2.png',
      '/images/products/image27.png'
    ]
  },
  {
    id: 'prime-shadow',
    name: 'Prime Shadow Sideboard',
    category: 'Consoles',
    categoryId: 'consoles',
    tag: 'Sideboard',
    b2bTag: 'Console',
    price: 58000,
    priceUnit: '',
    isFeatured: true,
    isNew: true,
    badge: 'Signature',
    tagline: 'Architectural Sideboard · Plywood & Oak Wood',
    description: 'A sleek dark design that adds a warm and unique touch to your space.',
    dimensions: {
      standard: '200 cm (W) x 48 cm (D) x 80 cm (H)',
      large: '240 cm (W) x 50 cm (D) x 82 cm (H)'
    },
    materials: 'Plywood, oak wood',
    leadTime: '3 – 4 Weeks',
    delivery: 'White-glove room placement and door alignment calibration.',
    finishes: [
      { name: 'Charcoal & Natural Oak', hex: '#262423' },
      { name: 'Natural Oak', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: [
      '200 x 48 x 80 cm (4-Door Standard)',
      '240 x 50 x 82 cm (Large)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image2.png',
    secondaryImage: '/images/products/image10.png',
    gallery: [
      '/images/products/image2.png',
      '/images/products/image10.png',
      '/images/products/image6.png'
    ]
  },
  {
    id: 'prime-carve-dresser',
    name: 'Prime Carve Dresser',
    category: 'Dressers',
    categoryId: 'dressers',
    tag: 'Dresser',
    b2bTag: 'Wood Cabinet',
    price: 42500,
    priceUnit: '',
    isFeatured: true,
    isNew: false,
    badge: 'Master Craft',
    tagline: 'Wood Cabinet · Plywood & Oak Wood',
    description: 'A masterfully carved wooden design bringing timeless elegance to your space.',
    dimensions: {
      standard: '120 cm (W) x 50 cm (D) x 90 cm (H) + Mirror',
      large: '150 cm (W) x 52 cm (D) x 90 cm (H) + Mirror'
    },
    materials: 'Wood Cabinet — Plywood, oak wood',
    leadTime: '3 – 4 Weeks',
    delivery: 'Includes secure wall-mounting for the matching wood-framed mirror.',
    finishes: [
      { name: 'Natural Carved Oak', hex: '#C8A986' },
      { name: 'Smoked Walnut', hex: '#533C29' },
      { name: 'Warm Honey Oak', hex: '#D7C4A5' }
    ],
    sizes: [
      'Standard Cabinet & Mirror',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image21.jpg',
    secondaryImage: '/images/products/image28.png',
    gallery: [
      '/images/products/image21.jpg',
      '/images/products/image28.png'
    ]
  },
  {
    id: 'prime-lattice',
    name: 'Prime Lattice TV Unit',
    category: 'TV Units',
    categoryId: 'tv-units',
    tag: 'TV Unit',
    b2bTag: null,
    price: 33750,
    priceUnit: '',
    isFeatured: true,
    isNew: true,
    badge: 'New Release',
    tagline: 'Floating TV Unit · Plywood & Oak Wood',
    description: 'A floating TV unit with refined geometric details.',
    dimensions: {
      standard: '200 cm (W) x 40 cm (D) x 35 cm (H)',
      large: '240 cm (W) x 42 cm (D) x 35 cm (H)'
    },
    materials: 'Tv unit — Plywood, oak wood',
    leadTime: '2 – 3 Weeks',
    delivery: 'Includes structural wall cleat installation and concealed cable routing.',
    finishes: [
      { name: 'Natural Oak & Carved Front', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' },
      { name: 'Blackened Ash', hex: '#262423' }
    ],
    sizes: [
      '200 cm Floating Unit',
      '240 cm Floating Unit',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image15.png',
    secondaryImage: '/images/products/image36.png',
    gallery: [
      '/images/products/image15.png',
      '/images/products/image36.png'
    ]
  },
  {
    id: 'prime-pillar',
    name: 'Prime Pillar Display Unit',
    category: 'Storage',
    categoryId: 'storage',
    tag: 'Customize',
    b2bTag: 'Display Unit',
    price: 32000,
    priceUnit: 'per unit',
    isFeatured: true,
    isNew: false,
    badge: 'Modular Unit',
    tagline: 'Architectural Shelving · Plywood & Oak Wood',
    description: 'An open wooden display unit featuring spacious shelving and a refined architectural structure.',
    dimensions: {
      standard: '90 cm (W) x 38 cm (D) x 210 cm (H) per unit',
      large: '180 cm (W) Dual Modular Pair'
    },
    materials: 'Material: plywood , oak wood',
    leadTime: '2 – 3 Weeks',
    delivery: 'Delivered assembled with optional wall-securing brackets.',
    finishes: [
      { name: 'Natural White Oak', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: [
      'Single Unit (32,000 EGP / unit)',
      'Custom Modular Wall Configuration'
    ],
    primaryImage: '/images/products/image27.png',
    secondaryImage: '/images/products/image9.png',
    gallery: [
      '/images/products/image27.png',
      '/images/products/image9.png'
    ]
  },
  {
    id: 'prime-groove',
    name: 'Prime Groove Console',
    category: 'Consoles',
    categoryId: 'consoles',
    tag: 'Customize',
    b2bTag: 'Console',
    price: 28500,
    priceUnit: '',
    isFeatured: true,
    isNew: false,
    badge: 'Hand Fluted',
    tagline: 'Textured Console · Plywood & Oak Wood',
    description: 'A warm wooden design with sleek textured lines.',
    dimensions: {
      standard: '140 cm (W) x 40 cm (D) x 80 cm (H)',
      large: '170 cm (W) x 42 cm (D) x 80 cm (H)'
    },
    materials: 'Plywood, oak wood',
    leadTime: '2 – 3 Weeks',
    delivery: 'Delivered assembled ready for entryway or living room placement.',
    finishes: [
      { name: 'Warm Natural Oak', hex: '#C8A986' },
      { name: 'Smoked Walnut', hex: '#533C29' },
      { name: 'Blackened Ash', hex: '#262423' }
    ],
    sizes: [
      '140 x 40 x 80 cm (Standard)',
      '170 x 42 x 80 cm (Large)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image6.png',
    secondaryImage: '/images/products/image17.jpg',
    gallery: [
      '/images/products/image6.png',
      '/images/products/image17.jpg'
    ]
  },
  {
    id: 'prime-vista-dressing',
    name: 'Prime Vista Dressing',
    category: 'Dressers',
    categoryId: 'dressers',
    tag: 'Customize',
    b2bTag: 'Dressing Room',
    price: 24500,
    priceUnit: 'per m²',
    isFeatured: true,
    isNew: true,
    badge: 'Bespoke / m²',
    tagline: 'Dressing Room · Plywood & Veneer',
    description: 'A modern, sleek wardrobe featuring glass doors and smart internal lighting for ultimate organization and style.',
    dimensions: {
      standard: 'Custom Measured to Room (Priced at 24,500 EGP per m²)',
      large: 'Full Walk-In Dressing Suite'
    },
    materials: 'Dressing room — Plywood and veneer',
    leadTime: '4 – 6 Weeks',
    delivery: 'Includes on-site laser measurement, 3D layout, and full Cairo workshop installation.',
    finishes: [
      { name: 'Natural Oak Veneer & Tinted Glass', hex: '#C8A986' },
      { name: 'Smoked Walnut Veneer', hex: '#533C29' },
      { name: 'Charcoal Veneer & Bronze Glass', hex: '#262423' }
    ],
    sizes: [
      'Per Square Meter (24,500 EGP / m²)',
      'Full Dressing Room Commission'
    ],
    primaryImage: '/images/products/image7.png',
    secondaryImage: '/images/products/image38.png',
    gallery: [
      '/images/products/image7.png',
      '/images/products/image38.png'
    ]
  },
  {
    id: 'prime-motif-nightstand',
    name: 'Prime Motif Nightstand',
    category: 'Night Stands',
    categoryId: 'night-stands',
    tag: 'Night Stand',
    b2bTag: null,
    price: 18500,
    priceUnit: '',
    isFeatured: true,
    isNew: true,
    badge: 'Carved Front',
    tagline: 'Textured Pattern Nightstand · Plywood & Oak Wood',
    description: 'A textured pattern design adding depth and warm elegance to your bedside.',
    dimensions: {
      standard: '55 cm (W) x 45 cm (D) x 55 cm (H)'
    },
    materials: 'Materials: plywood , oak wood',
    leadTime: '2 Weeks',
    delivery: 'Delivered fully assembled with soft-close concealed runners.',
    finishes: [
      { name: 'Natural Oak', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: [
      '55 x 45 x 55 cm (Standard)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image19.png',
    secondaryImage: '/images/products/image26.png',
    gallery: [
      '/images/products/image19.png',
      '/images/products/image26.png',
      '/images/products/image4.png'
    ]
  },
  {
    id: 'prime-echo-nightstand',
    name: 'Prime Echo Nightstand',
    category: 'Night Stands',
    categoryId: 'night-stands',
    tag: 'Night Stand',
    b2bTag: null,
    price: 16200,
    priceUnit: '',
    isFeatured: false,
    isNew: true,
    badge: null,
    tagline: 'Modern Bedside Table · Plywood & Oak Wood',
    description: 'A stylish and modern wooden bedside table.',
    dimensions: {
      standard: '55 cm (W) x 42 cm (D) x 52 cm (H)'
    },
    materials: 'Materials: plywood , oak wood',
    leadTime: '2 Weeks',
    delivery: 'Delivered fully assembled.',
    finishes: [
      { name: 'Warm Walnut & Oak', hex: '#7A583B' },
      { name: 'Natural Oak', hex: '#D7C4A5' }
    ],
    sizes: [
      '55 x 42 x 52 cm (Standard)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image26.png',
    secondaryImage: '/images/products/image4.png',
    gallery: [
      '/images/products/image26.png',
      '/images/products/image4.png'
    ]
  },
  {
    id: 'prime-minimal-nightstand',
    name: 'Prime Minimal Nightstand',
    category: 'Night Stands',
    categoryId: 'night-stands',
    tag: 'Night Stand',
    b2bTag: null,
    price: 15750,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: null,
    tagline: 'Night Stand · Plywood & Oak Wood',
    description: 'A simple and functional design suited for any space.',
    dimensions: {
      standard: '50 cm (W) x 42 cm (D) x 52 cm (H)'
    },
    materials: 'Night stand — Materials: plywood , oak wood',
    leadTime: '10 – 14 Days',
    delivery: 'Delivered fully assembled.',
    finishes: [
      { name: 'Natural White Oak', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: [
      '50 x 42 x 52 cm (Standard)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image4.png',
    secondaryImage: '/images/products/image26.png',
    gallery: [
      '/images/products/image4.png',
      '/images/products/image26.png'
    ]
  },
  {
    id: 'prime-bold',
    name: 'Prime Bold Console',
    category: 'Consoles',
    categoryId: 'consoles',
    tag: 'Table',
    b2bTag: 'Console',
    price: 14500,
    priceUnit: '',
    isFeatured: true,
    isNew: true,
    badge: 'Statement Piece',
    tagline: 'Console · Plywood & Beech Wood',
    description: 'A bold and vibrant statement piece that adds a striking modern touch to your space.',
    dimensions: {
      standard: '130 cm (W) x 38 cm (D) x 80 cm (H)'
    },
    materials: 'Console — Plywood , beech wood',
    leadTime: '2 Weeks',
    delivery: 'Delivered fully assembled across Cairo & Giza.',
    finishes: [
      { name: 'Cobalt Blue & Turned Black Beech', hex: '#1E3F7F' },
      { name: 'Natural Oak & Black Beech', hex: '#D7C4A5' },
      { name: 'Blackened Ash', hex: '#262423' }
    ],
    sizes: [
      '130 x 38 x 80 cm (Standard)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image31.png',
    secondaryImage: '/images/products/image17.jpg',
    gallery: [
      '/images/products/image31.png',
      '/images/products/image17.jpg'
    ]
  },
  {
    id: 'prime-core-side-table',
    name: 'Prime Core Side Table',
    category: 'Tables',
    categoryId: 'tables',
    tag: 'Customize',
    b2bTag: 'Side Table',
    price: 14200,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: null,
    tagline: 'Side Table · Plywood & Oak Wood',
    description: 'A classic wooden design with distinct modern touches.',
    dimensions: {
      standard: '50 cm (W) x 45 cm (D) x 55 cm (H)'
    },
    materials: 'Side table — Plywood, oak wood',
    leadTime: '10 – 14 Days',
    delivery: 'Delivered fully assembled.',
    finishes: [
      { name: 'Natural Oak', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: [
      '50 x 45 x 55 cm (Standard)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image23.png',
    secondaryImage: '/images/products/image20.png',
    gallery: [
      '/images/products/image23.png',
      '/images/products/image20.png'
    ]
  },
  {
    id: 'prime-orbit',
    name: 'Prime Orbit Side Table',
    category: 'Tables',
    categoryId: 'tables',
    tag: 'Side Table',
    b2bTag: null,
    price: 9800,
    priceUnit: '',
    isFeatured: true,
    isNew: true,
    badge: 'Best Value',
    tagline: 'Geometric Side Table · Plywood & Beech Wood',
    description: 'A sleek black design with circular geometric motifs and refined legs for a touch of distinct elegance.',
    dimensions: {
      standard: '48 cm (Diameter) x 55 cm (H)'
    },
    materials: 'Plywood , beech wood',
    leadTime: '10 – 14 Days',
    delivery: 'Delivered fully assembled.',
    finishes: [
      { name: 'Blackened Beech & Brass Tips', hex: '#262423' },
      { name: 'Smoked Walnut & Brass', hex: '#533C29' },
      { name: 'Natural Oak', hex: '#D7C4A5' }
    ],
    sizes: [
      '48 cm Diameter x 55 cm H (Standard)',
      'Custom Dimensions'
    ],
    primaryImage: '/images/products/image20.png',
    secondaryImage: '/images/products/image23.png',
    gallery: [
      '/images/products/image20.png',
      '/images/products/image23.png'
    ]
  },

  // === ADDITIONAL CATALOG & CUSTOM E-COMMERCE PIECES FROM EXCEL SHEET ===
  {
    id: 'prime-haven-bed',
    name: 'Prime Haven Bed',
    category: 'Beds',
    categoryId: 'beds',
    tag: 'Bed',
    b2bTag: null,
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Warm Wood & Soft Upholstery Bed Suite',
    description: 'Your cozy retreat blending warm wood and soft upholstery for ultimate comfort.',
    dimensions: {
      standard: '180 x 200 cm Mattress Frame (Custom Wall Cladding Available)'
    },
    materials: 'Solid Oak & Plywood with Upholstered Headboard Panels',
    leadTime: '3 – 5 Weeks',
    delivery: 'White-glove delivery and bedroom installation.',
    finishes: [
      { name: 'Natural Oak & Warm Beige', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: ['180 x 200 cm', '200 x 200 cm', 'Custom Wall-to-Wall Suite'],
    primaryImage: '/images/products/image22.png',
    secondaryImage: '/images/products/image1.jpg',
    gallery: ['/images/products/image22.png', '/images/products/image1.jpg']
  },
  {
    id: 'prime-aura-bed',
    name: 'Prime Aura Bed',
    category: 'Beds',
    categoryId: 'beds',
    tag: 'Customize',
    b2bTag: 'Kitchen',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Elevated Wooden Frame & Split Headboard',
    description: 'Modern elegance and simplicity, featuring an elevated wooden frame with a sleek comfortable headboard.',
    dimensions: {
      standard: '180 x 200 cm Frame with Integrated Nightstands'
    },
    materials: 'Plywood, Natural Oak & Linen Upholstery',
    leadTime: '3 – 4 Weeks',
    delivery: 'White-glove delivery and assembly.',
    finishes: [
      { name: 'Natural Oak', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: ['180 x 200 cm', '200 x 200 cm', 'Custom Dimensions'],
    primaryImage: '/images/products/image24.png',
    secondaryImage: '/images/products/image29.png',
    gallery: ['/images/products/image24.png', '/images/products/image29.png']
  },
  {
    id: 'prime-pearl-bed',
    name: 'Prime Pearl Bed',
    category: 'Beds',
    categoryId: 'beds',
    tag: 'Bed',
    b2bTag: null,
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Classic White Serenity Bedroom Suite',
    description: 'Soft luxury in a classic white design bringing pure serenity to your room.',
    dimensions: {
      standard: '180 x 200 cm Frame'
    },
    materials: 'Solid Beech & Lacquered Wood with Upholstered Headboard',
    leadTime: '3 – 4 Weeks',
    delivery: 'White-glove delivery and bedroom installation.',
    finishes: [
      { name: 'Pearl White & Oak', hex: '#F3EFEA' },
      { name: 'Natural White Oak', hex: '#D7C4A5' }
    ],
    sizes: ['180 x 200 cm', '200 x 200 cm', 'Custom Dimensions'],
    primaryImage: '/images/products/image18.png',
    secondaryImage: '/images/products/image40.jpg',
    gallery: ['/images/products/image18.png', '/images/products/image40.jpg']
  },
  {
    id: 'prime-oasis-bed',
    name: 'Prime Oasis Bed',
    category: 'Beds',
    categoryId: 'beds',
    tag: 'Bed',
    b2bTag: null,
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Upholstered Headboard & Matching Bench',
    description: 'A cozy design with an upholstered headboard and bench for a relaxing room.',
    dimensions: {
      standard: '180 x 200 cm Bed + End-of-Bed Bench'
    },
    materials: 'Plywood, Oak Wood & Soft Textured Upholstery',
    leadTime: '3 – 4 Weeks',
    delivery: 'White-glove delivery and room setup.',
    finishes: [
      { name: 'Natural Oak & Cream Fabric', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: ['180 x 200 cm + Bench', '200 x 200 cm + Bench'],
    primaryImage: '/images/products/image40.jpg',
    secondaryImage: '/images/products/image18.png',
    gallery: ['/images/products/image40.jpg', '/images/products/image18.png']
  },
  {
    id: 'prime-lumina',
    name: 'Prime Lumina TV Unit',
    category: 'TV Units',
    categoryId: 'tv-units',
    tag: 'TV Unit',
    b2bTag: null,
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Floating Media Unit with Warm Ambient Lighting',
    description: 'A floating modern unit with warm ambient lighting and wood accents for a sleek look.',
    dimensions: {
      standard: '240 cm (W) x 42 cm (D) x 260 cm (H) Full Media Wall'
    },
    materials: 'Plywood, Oak Veneer & Integrated Warm LED Lighting',
    leadTime: '3 – 4 Weeks',
    delivery: 'Full on-site wall installation and electrical integration.',
    finishes: [
      { name: 'Natural Oak & Matte Taupe', hex: '#C8A986' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: ['220 cm Width', '260 cm Width', 'Custom Wall Measurement'],
    primaryImage: '/images/products/image36.png',
    secondaryImage: '/images/products/image15.png',
    gallery: ['/images/products/image36.png', '/images/products/image15.png']
  },
  {
    id: 'prime-portal',
    name: 'Prime Portal Door',
    category: 'Doors',
    categoryId: 'doors-millwork',
    tag: 'Door',
    b2bTag: null,
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Architectural',
    tagline: 'Natural Wood Interior Door with Modern Handles',
    description: 'Natural wood interior doors with modern handles for seamless home continuity.',
    dimensions: {
      standard: '90 / 100 cm (W) x 220 / 240 cm (H) Custom Jamb Depth'
    },
    materials: 'Solid Wood Core, Natural Oak Veneer & Concealed Hinges',
    leadTime: '3 – 5 Weeks',
    delivery: 'Includes on-site frame fitting, acoustic seals, and hardware installation.',
    finishes: [
      { name: 'Natural Oak', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' },
      { name: 'Blackened Ash', hex: '#262423' }
    ],
    sizes: ['Standard Interior Door', 'Floor-to-Ceiling Pivot / Flush Door'],
    primaryImage: '/images/products/image25.png',
    secondaryImage: '/images/products/image39.jpg',
    gallery: ['/images/products/image25.png', '/images/products/image39.jpg']
  },
  {
    id: 'prime-halo-unit',
    name: 'Prime Halo Unit Dresser',
    category: 'Dressers',
    categoryId: 'dressers',
    tag: 'Dresser',
    b2bTag: null,
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Circular Mirror & Fine Wooden Detailing',
    description: 'A modern fusion of a circular mirror and fine wooden detailing for complete elegance.',
    dimensions: {
      standard: '130 cm (W) x 48 cm (D) x 85 cm (H) + Circular Mirror'
    },
    materials: 'Plywood, Carved Oak Wood & Optical Mirror',
    leadTime: '3 – 4 Weeks',
    delivery: 'Includes delivery and mirror wall mounting.',
    finishes: [
      { name: 'Natural Oak', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: ['130 cm Standard', 'Custom Dimensions'],
    primaryImage: '/images/products/image28.png',
    secondaryImage: '/images/products/image21.jpg',
    gallery: ['/images/products/image28.png', '/images/products/image21.jpg']
  },
  {
    id: 'prime-echo-console',
    name: 'Prime Echo Console',
    category: 'Consoles',
    categoryId: 'consoles',
    tag: 'Table',
    b2bTag: 'Console',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Textured Carved Doors & Sleek Legs',
    description: 'A warm wooden sideboard combining textured carved doors and sleek legs to add a unique artistic touch to your home.',
    dimensions: {
      standard: '180 cm (W) x 45 cm (D) x 82 cm (H)'
    },
    materials: 'Plywood & Carved Solid Oak Wood',
    leadTime: '3 – 4 Weeks',
    delivery: 'White-glove delivery and placement.',
    finishes: [
      { name: 'Warm Natural Oak', hex: '#C8A986' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: ['180 cm Standard', '210 cm Large', 'Custom Dimensions'],
    primaryImage: '/images/products/image10.png',
    secondaryImage: '/images/products/image2.png',
    gallery: ['/images/products/image10.png', '/images/products/image2.png']
  },
  {
    id: 'prime-axis',
    name: 'Prime Axis Console',
    category: 'Consoles',
    categoryId: 'consoles',
    tag: 'Table',
    b2bTag: 'Console',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Balanced Architectural Entryway Console',
    description: 'A sleek wooden design with balanced lines, adding a striking modern touch to your entryway.',
    dimensions: {
      standard: '150 cm (W) x 40 cm (D) x 80 cm (H)'
    },
    materials: 'Plywood & Natural Oak Wood',
    leadTime: '2 – 3 Weeks',
    delivery: 'Delivered fully assembled.',
    finishes: [
      { name: 'Natural Oak', hex: '#D7C4A5' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: ['150 cm Standard', 'Custom Dimensions'],
    primaryImage: '/images/products/image17.jpg',
    secondaryImage: '/images/products/image6.png',
    gallery: ['/images/products/image17.jpg', '/images/products/image6.png']
  },
  {
    id: 'prime-core-coffee-table',
    name: 'Prime Core Coffee Table',
    category: 'Tables',
    categoryId: 'tables',
    tag: 'Table',
    b2bTag: 'Coffee Table',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Round Wooden Centerpiece Coffee Table',
    description: 'A warm, round wooden centerpiece adding sleek functionality to your living space.',
    dimensions: {
      standard: '95 cm (Diameter) x 40 cm (H)'
    },
    materials: 'Plywood & Solid Oak Wood',
    leadTime: '2 – 3 Weeks',
    delivery: 'Delivered fully assembled.',
    finishes: [
      { name: 'Warm Oak', hex: '#C8A986' },
      { name: 'Smoked Walnut', hex: '#533C29' }
    ],
    sizes: ['95 cm Diameter', '110 cm Diameter', 'Custom Dimensions'],
    primaryImage: '/images/products/image34.png',
    secondaryImage: '/images/products/image35.jpg',
    gallery: ['/images/products/image34.png', '/images/products/image35.jpg']
  },
  {
    id: 'prime-palace-table',
    name: 'Prime Palace Table',
    category: 'Tables',
    categoryId: 'tables',
    tag: 'Table',
    b2bTag: null,
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Order',
    tagline: 'Gold-Framed Nesting Table Set',
    description: 'A luxurious gold-framed nesting set that adds refined grandeur to your living room.',
    dimensions: {
      standard: 'Nesting Set of 2 Tables'
    },
    materials: 'Natural Wood Veneer & Brushed Gold Metal Frame',
    leadTime: '2 – 3 Weeks',
    delivery: 'Delivered fully assembled.',
    finishes: [
      { name: 'Warm Oak & Brushed Gold', hex: '#C8A986' },
      { name: 'Smoked Walnut & Brass', hex: '#533C29' }
    ],
    sizes: ['Standard Nesting Pair', 'Custom Dimensions'],
    primaryImage: '/images/products/image35.jpg',
    secondaryImage: '/images/products/image34.png',
    gallery: ['/images/products/image35.jpg', '/images/products/image34.png']
  },

  // === BESPOKE / B2B ARCHITECTURAL PROJECTS FROM EXCEL SHEET ===
  {
    id: 'prime-essence',
    name: 'Prime Essence Millwork',
    category: 'Customize / B2B',
    categoryId: 'customize',
    tag: 'Customize',
    b2bTag: 'Architectural Woodwork',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Bespoke Millwork',
    tagline: 'Custom Architectural Wood Design',
    description: 'An elegant wood design capturing the pure essence of natural luxury.',
    dimensions: { standard: 'Bespoke Site-Measured Dimensions' },
    materials: 'Solid Oak, Plywood & Natural Wood Veneer',
    leadTime: '4 – 6 Weeks',
    delivery: 'On-site survey, fabrication, and white-glove installation.',
    finishes: [{ name: 'Natural Oak', hex: '#D7C4A5' }, { name: 'Smoked Walnut', hex: '#533C29' }],
    sizes: ['Custom Architectural Fit-Out'],
    primaryImage: '/images/products/image39.jpg',
    secondaryImage: '/images/products/image9.png',
    gallery: ['/images/products/image39.jpg']
  },
  {
    id: 'prime-grand-library',
    name: 'Prime Grand Library',
    category: 'Storage',
    categoryId: 'storage',
    tag: 'Customize',
    b2bTag: 'Book Store / Library',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Bespoke Library',
    tagline: 'All-In-One Illuminated Wall Library',
    description: 'A grand, all-in-one wall library blending spacious shelving with ambient lighting to create an extraordinary architectural statement.',
    dimensions: { standard: 'Custom Wall-to-Wall & Floor-to-Ceiling' },
    materials: 'Plywood, Natural Oak Veneer & Integrated LED Channels',
    leadTime: '4 – 6 Weeks',
    delivery: 'Complete on-site architectural joinery and lighting installation.',
    finishes: [{ name: 'Warm Oak', hex: '#C8A986' }, { name: 'Smoked Walnut', hex: '#533C29' }],
    sizes: ['Bespoke Wall Dimensions'],
    primaryImage: '/images/products/image9.png',
    secondaryImage: '/images/products/image27.png',
    gallery: ['/images/products/image9.png', '/images/products/image27.png']
  },
  {
    id: 'prime-harmony-living',
    name: 'Prime Harmony Living Room',
    category: 'Customize / B2B',
    categoryId: 'customize',
    tag: 'Customize',
    b2bTag: 'Living Room',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Full Living Suite',
    tagline: 'Complete Modern Living Room & Wood Cladding',
    description: 'A complete modern design combining a spacious, elegant sofa and calm decor to deliver a comfortable and sophisticated living space.',
    dimensions: { standard: 'Custom Room Layout' },
    materials: 'Architectural Wood Wall Cladding, Solid Timber & Performance Upholstery',
    leadTime: '4 – 6 Weeks',
    delivery: 'Turnkey interior woodwork and furniture installation.',
    finishes: [{ name: 'Natural Oak', hex: '#D7C4A5' }, { name: 'Smoked Walnut', hex: '#533C29' }],
    sizes: ['Custom Living Suite'],
    primaryImage: '/images/products/image30.png',
    secondaryImage: '/images/products/image32.png',
    gallery: ['/images/products/image30.png']
  },
  {
    id: 'prime-legacy-dining',
    name: 'Prime Legacy Dining',
    category: 'Tables',
    categoryId: 'tables',
    tag: 'Customize',
    b2bTag: 'Dining Table',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Dining Suite',
    tagline: 'Luxurious Dining Table & Upholstered Seating',
    description: 'A luxurious design blending elegance and comfort for unforgettable family moments.',
    dimensions: { standard: '240 x 110 cm Table + Dining Chairs' },
    materials: 'Solid Oak / Beech Wood & Tailored Upholstery',
    leadTime: '4 – 5 Weeks',
    delivery: 'White-glove dining room delivery and setup.',
    finishes: [{ name: 'Warm Walnut', hex: '#533C29' }, { name: 'Natural Oak', hex: '#D7C4A5' }],
    sizes: ['8-Seater Suite', '10-Seater Suite', 'Custom Dimensions'],
    primaryImage: '/images/products/image33.png',
    secondaryImage: '/images/products/image5.jpg',
    gallery: ['/images/products/image33.png', '/images/products/image5.jpg']
  },
  {
    id: 'prime-prestige-dining',
    name: 'Prime Prestige Dining',
    category: 'Tables',
    categoryId: 'tables',
    tag: 'Customize',
    b2bTag: 'Dining Table',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Dining Suite',
    tagline: 'Large Wooden Table & Elegant Upholstered Chairs',
    description: 'A spacious, luxurious design combining a large wooden table and elegant upholstered chairs for prestigious gatherings.',
    dimensions: { standard: '260 x 115 cm Dining Table + Seating' },
    materials: 'Solid Hardwood, Natural Veneer & Bouclé/Velvet Chairs',
    leadTime: '4 – 5 Weeks',
    delivery: 'White-glove delivery and assembly.',
    finishes: [{ name: 'Natural Oak', hex: '#D7C4A5' }, { name: 'Smoked Walnut', hex: '#533C29' }],
    sizes: ['8-Seater', '10-Seater', '12-Seater Custom'],
    primaryImage: '/images/products/image5.jpg',
    secondaryImage: '/images/products/image8.jpg',
    gallery: ['/images/products/image5.jpg', '/images/products/image8.jpg']
  },
  {
    id: 'prime-gathering-dining',
    name: 'Prime Gathering Dining',
    category: 'Tables',
    categoryId: 'tables',
    tag: 'Customize',
    b2bTag: 'Dining Table',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Dining Suite',
    tagline: 'Warm & Spacious Family Dining Design',
    description: 'A warm and spacious design that gives your family gatherings a cozy, elegant touch.',
    dimensions: { standard: '220 x 105 cm Dining Suite' },
    materials: 'Solid Oak & Handcrafted Wooden Chairs',
    leadTime: '4 – 5 Weeks',
    delivery: 'White-glove delivery and room setup.',
    finishes: [{ name: 'Warm Oak', hex: '#C8A986' }, { name: 'Smoked Walnut', hex: '#533C29' }],
    sizes: ['6-Seater', '8-Seater', 'Custom Dimensions'],
    primaryImage: '/images/products/image8.jpg',
    secondaryImage: '/images/products/image33.png',
    gallery: ['/images/products/image8.jpg', '/images/products/image33.png']
  },
  {
    id: 'prime-monarch-buffet',
    name: 'Prime Monarch Buffet',
    category: 'Consoles',
    categoryId: 'consoles',
    tag: 'Customize',
    b2bTag: 'Buffet',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Custom Buffet',
    tagline: 'Warm Wood Craftsmanship with Refined Gold Handles',
    description: 'Warm wood craftsmanship with refined gold handles, bringing understated luxury to your dining area.',
    dimensions: { standard: '210 cm (W) x 48 cm (D) x 85 cm (H)' },
    materials: 'Plywood, Natural Oak Veneer & Brushed Brass Hardware',
    leadTime: '3 – 4 Weeks',
    delivery: 'White-glove delivery and installation.',
    finishes: [{ name: 'Warm Oak & Gold', hex: '#C8A986' }, { name: 'Smoked Walnut & Brass', hex: '#533C29' }],
    sizes: ['210 cm Standard', 'Custom Dimensions'],
    primaryImage: '/images/products/image3.jpg',
    secondaryImage: '/images/products/image2.png',
    gallery: ['/images/products/image3.jpg', '/images/products/image2.png']
  },
  {
    id: 'prime-onyx-kitchen',
    name: 'Prime Onyx Kitchen',
    category: 'Customize / B2B',
    categoryId: 'customize',
    tag: 'Customize',
    b2bTag: 'Kitchen',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Bespoke Kitchen',
    tagline: 'Sleek Dark Cabinets & Smartly Lit Wooden Island',
    description: 'A modern design blending sleek dark cabinets and a smartly lit wooden island to give you a luxurious and functional space.',
    dimensions: { standard: 'Bespoke Kitchen Architecture' },
    materials: 'Moisture-Resistant Plywood, Natural Oak & Matte Charcoal Cabinetry',
    leadTime: '5 – 7 Weeks',
    delivery: 'Full kitchen engineering, fabrication, and Cairo installation.',
    finishes: [{ name: 'Onyx Charcoal & Warm Oak', hex: '#262423' }],
    sizes: ['Custom Kitchen Commission'],
    primaryImage: '/images/products/image37.png',
    secondaryImage: '/images/products/image16.png',
    gallery: ['/images/products/image37.png', '/images/products/image16.png']
  },
  {
    id: 'prime-hearth-kitchen',
    name: 'Prime Hearth Kitchen',
    category: 'Customize / B2B',
    categoryId: 'customize',
    tag: 'Customize',
    b2bTag: 'Kitchen',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Bespoke Kitchen',
    tagline: 'Warm Fusion of Wood & White Kitchen Cabinetry',
    description: 'A warm fusion of wood and white elements with a practical dining area for family warmth.',
    dimensions: { standard: 'Bespoke Kitchen & Breakfast Island' },
    materials: 'Moisture-Resistant Plywood, Natural Oak Veneer & Matte Lacquer',
    leadTime: '5 – 7 Weeks',
    delivery: 'Full on-site measurement and installation.',
    finishes: [{ name: 'Warm Oak & Matte White', hex: '#D7C4A5' }],
    sizes: ['Custom Kitchen Commission'],
    primaryImage: '/images/products/image16.png',
    secondaryImage: '/images/products/image11.png',
    gallery: ['/images/products/image16.png', '/images/products/image11.png']
  },
  {
    id: 'prime-kitchen-partition',
    name: 'Prime Glass & Wood Kitchen Suite',
    category: 'Customize / B2B',
    categoryId: 'customize',
    tag: 'Customize',
    b2bTag: 'Kitchen Suite',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Bespoke Kitchen',
    tagline: 'Architectural Wood & Fluted Glass Kitchen Partition',
    description: 'Bespoke wooden kitchen cabinetry and architectural sliding glass partition crafted to order.',
    dimensions: { standard: 'Custom Site-Measured Dimensions' },
    materials: 'Solid Oak Frames, Plywood Cabinetry & Tempered Glass',
    leadTime: '5 – 7 Weeks',
    delivery: 'Turnkey measurement and installation.',
    finishes: [{ name: 'Natural Oak', hex: '#D7C4A5' }],
    sizes: ['Custom Commission'],
    primaryImage: '/images/products/image11.png',
    secondaryImage: '/images/products/image37.png',
    gallery: ['/images/products/image11.png']
  },
  {
    id: 'prime-suite-wardrobe',
    name: 'Prime Suite Wardrobe',
    category: 'Dressers',
    categoryId: 'dressers',
    tag: 'Customize',
    b2bTag: 'Wardrobe',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Bespoke Wardrobe',
    tagline: 'Integrated Dressing Area & Organizational System',
    description: 'A modern integrated design that gives your dressing area a luxurious, perfectly organized feel.',
    dimensions: { standard: 'Custom Floor-to-Ceiling Wardrobe' },
    materials: 'Plywood, Natural Wood Veneer & Integrated LED Lighting',
    leadTime: '4 – 6 Weeks',
    delivery: 'Full on-site measurement and installation.',
    finishes: [{ name: 'Warm Oak Veneer', hex: '#C8A986' }, { name: 'Smoked Walnut', hex: '#533C29' }],
    sizes: ['Custom Wardrobe Commission'],
    primaryImage: '/images/products/image38.png',
    secondaryImage: '/images/products/image7.png',
    gallery: ['/images/products/image38.png', '/images/products/image7.png']
  },
  {
    id: 'prime-infinity-ceiling',
    name: 'Prime Infinity Ceiling',
    category: 'Doors',
    categoryId: 'doors-millwork',
    tag: 'Customize',
    b2bTag: 'Ceiling Millwork',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Ceiling Millwork',
    tagline: 'Refined Architectural Ceilings & Ambient Lighting',
    description: 'A spacious open design featuring refined architectural ceilings and ambient lighting for endless elegance.',
    dimensions: { standard: 'Custom Architectural Ceiling Grid' },
    materials: 'Acoustic Solid Wood Slats, Veneered Panels & Linear LED Integration',
    leadTime: '4 – 6 Weeks',
    delivery: 'Full engineering and on-site ceiling installation.',
    finishes: [{ name: 'Natural Oak', hex: '#D7C4A5' }, { name: 'Warm Walnut', hex: '#533C29' }],
    sizes: ['Custom Architectural Commission'],
    primaryImage: '/images/products/image32.png',
    secondaryImage: '/images/products/image14.png',
    gallery: ['/images/products/image32.png', '/images/products/image14.png']
  },
  {
    id: 'prime-crown-ceiling',
    name: 'Prime Crown Ceiling',
    category: 'Doors',
    categoryId: 'doors-millwork',
    tag: 'Customize',
    b2bTag: 'Ceiling Millwork',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Ceiling Millwork',
    tagline: 'Luxurious Decorative Ceiling with Ambient Lighting',
    description: 'Luxurious decorative ceiling designs with ambient lighting for royal elegance.',
    dimensions: { standard: 'Custom Architectural Ceiling' },
    materials: 'Plywood, Natural Wood Veneer & Concealed Lighting Channels',
    leadTime: '4 – 6 Weeks',
    delivery: 'On-site structural installation.',
    finishes: [{ name: 'Warm Oak', hex: '#C8A986' }, { name: 'Smoked Walnut', hex: '#533C29' }],
    sizes: ['Custom Architectural Commission'],
    primaryImage: '/images/products/image14.png',
    secondaryImage: '/images/products/image12.png',
    gallery: ['/images/products/image14.png', '/images/products/image12.png']
  },
  {
    id: 'prime-apex-ceiling',
    name: 'Prime Apex Ceiling & Cladding',
    category: 'Doors',
    categoryId: 'doors-millwork',
    tag: 'Customize',
    b2bTag: 'Ceiling Millwork',
    price: null,
    priceUnit: '',
    isFeatured: false,
    isNew: false,
    badge: 'Ceiling Millwork',
    tagline: 'Statement Architectural Wood Ceiling & Wall Millwork',
    description: 'A bold and vibrant statement piece that adds a striking modern touch to your space.',
    dimensions: { standard: 'Custom Architectural Fit-Out' },
    materials: 'Natural Wood Veneer, Solid Timber & Acoustic Backing',
    leadTime: '4 – 6 Weeks',
    delivery: 'On-site architectural installation.',
    finishes: [{ name: 'Natural Oak', hex: '#D7C4A5' }, { name: 'Smoked Walnut', hex: '#533C29' }],
    sizes: ['Custom Architectural Commission'],
    primaryImage: '/images/products/image12.png',
    secondaryImage: '/images/products/image32.png',
    gallery: ['/images/products/image12.png', '/images/products/image32.png']
  }
];

export const PREVIOUS_CUSTOM_WORKS = [
  {
    id: 'custom-vista-dressing',
    title: 'Prime Vista Glass-Door Dressing Room',
    location: 'New Cairo, Egypt',
    material: 'Plywood & Natural Veneer (24,500 EGP / m²)',
    dimensions: 'Full Walk-In Wardrobe with Smart Internal Lighting',
    image: '/images/products/image7.png'
  },
  {
    id: 'custom-onyx-kitchen',
    title: 'Prime Onyx Kitchen & Lit Wooden Island',
    location: 'Sheikh Zayed, Giza',
    material: 'Dark Matte Cabinetry & Solid Oak Island',
    dimensions: 'Bespoke Kitchen Architecture',
    image: '/images/products/image37.png'
  },
  {
    id: 'custom-grand-library',
    title: 'Prime Grand Illuminated Wall Library',
    location: 'Katameya Heights, Cairo',
    material: 'Natural Oak Veneer & Ambient LED Shelving',
    dimensions: 'Floor-to-Ceiling Architectural Library',
    image: '/images/products/image9.png'
  },
  {
    id: 'custom-essence-millwork',
    title: 'Prime Essence Under-Stair & Wall Joinery',
    location: 'Heliopolis, Cairo',
    material: 'Solid European Oak & Custom Millwork',
    dimensions: 'Tailored Architectural Fit-Out',
    image: '/images/products/image39.jpg'
  },
  {
    id: 'custom-hearth-kitchen',
    title: 'Prime Hearth Wood & White Family Kitchen',
    location: 'Maadi, Cairo',
    material: 'Natural Oak & Matte White Cabinetry',
    dimensions: 'Custom Kitchen & Integrated Dining Island',
    image: '/images/products/image16.png'
  },
  {
    id: 'custom-infinity-ceiling',
    title: 'Prime Infinity Architectural Ceiling & Living',
    location: 'Zamalek, Cairo',
    material: 'Acoustic Wood Ceiling Cladding & Ambient Lighting',
    dimensions: 'Open-Plan Reception Millwork',
    image: '/images/products/image32.png'
  }
];

export const CRAFT_STEPS = [
  {
    number: '01',
    title: 'Material Selection',
    description: 'Carefully chosen oak, beech, and premium veneers for strength, grain character, and longevity.',
    detail: 'We source kiln-dried European Oak, Beech wood, and architectural-grade plywood cores to guarantee stability in Egyptian homes.',
    image: '/images/products/image39.jpg'
  },
  {
    number: '02',
    title: 'Precision Craftsmanship',
    description: 'Built by skilled artisans in our Ghamra, Cairo workshop with CNC and hand-carved precision.',
    detail: 'From intricate carved dresser fronts on the Prime Carve and Motif series to seamless curved joinery on the Prime Curve Highboard.',
    image: '/images/products/image21.jpg'
  },
  {
    number: '03',
    title: 'Refined Finishing',
    description: 'Treated for durability, warmth, and a timeless natural touch.',
    detail: 'Every surface is hand-sanded and sealed with protective matte finishes that highlight the natural grain of oak and walnut.',
    image: '/images/products/image2.png'
  },
  {
    number: '04',
    title: 'Made to Live With',
    description: 'Delivered and installed in your home for everyday comfort and lasting beauty.',
    detail: 'Our Cairo white-glove team handles delivery, room placement, wall mounting, and precision alignment.',
    image: '/images/products/image1.jpg'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: '/images/products/image1.jpg',
    caption: 'The Prime Cloud Bed (180×200) in soft bouclé and natural oak — EGP 56,000.',
    tag: 'Prime Cloud Bed'
  },
  {
    id: 'ig-2',
    image: '/images/products/image13.png',
    caption: 'Curved oak veneer elegance: The Prime Curve Highboard — EGP 68,500.',
    tag: 'Prime Curve'
  },
  {
    id: 'ig-3',
    image: '/images/products/image21.jpg',
    caption: 'Masterfully carved solid oak & plywood craftsmanship on the Prime Carve Dresser — EGP 42,500.',
    tag: 'Prime Carve Dresser'
  },
  {
    id: 'ig-4',
    image: '/images/products/image2.png',
    caption: 'Contrast and warmth: The Prime Shadow Sideboard in blackened oak and natural timber — EGP 58,000.',
    tag: 'Prime Shadow'
  },
  {
    id: 'ig-5',
    image: '/images/products/image15.png',
    caption: 'Floating geometric refinement: Prime Lattice TV Unit — EGP 33,750.',
    tag: 'Prime Lattice'
  },
  {
    id: 'ig-6',
    image: '/images/products/image7.png',
    caption: 'Bespoke Prime Vista Dressing Room with glass doors and internal LED lighting — EGP 24,500 / m².',
    tag: 'Prime Vista Dressing'
  }
];
