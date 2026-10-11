export const PRODUCTS = [
  {
    id: 'oslo-dining-table',
    name: 'Oslo Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    price: 42500,
    isFeatured: true,
    isNew: true,
    badge: 'Signature',
    rating: 4.9,
    reviewsCount: 28,
    primaryImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: 'Monumental solid oak dining table with soft pillowed radius edges and monolithic sculpted timber legs.',
    description: 'The Oslo Dining Table balances architectural presence with warm domestic tactility. Handcrafted from sustainably harvested European white oak in our Cairo workshop, its gentle pillowed perimeter softens an otherwise bold, monolithic presence. Designed to host intimate dinners or grand celebratory feasts for generations.',
    dimensions: {
      standard: '240 cm (W) x 105 cm (D) x 76 cm (H)',
      large: '280 cm (W) x 115 cm (D) x 76 cm (H)',
      compact: '200 cm (W) x 95 cm (D) x 76 cm (H)'
    },
    materials: 'Solid White Oak or Smoked Walnut top with mortise-and-tenon undercarriage. Matte bio-polyurethane seal that preserves the raw organic feel while offering superior water and stain resistance.',
    finishes: [
      { name: 'Natural White Oak', hex: '#D7C4A5', colorClass: 'bg-[#D7C4A5]' },
      { name: 'Smoked Walnut', hex: '#533C29', colorClass: 'bg-[#533C29]' },
      { name: 'Blackened Ash', hex: '#262423', colorClass: 'bg-[#262423]' }
    ],
    sizes: ['200 x 95 cm (Seats 6)', '240 x 105 cm (Seats 8)', '280 x 115 cm (Seats 10-12)'],
    inStock: true,
    leadTime: '10 - 14 business days across Egypt',
    delivery: 'Free White Glove assembly & placement in Greater Cairo, Giza, and New Capital. Insured crated dispatch to Alexandria, North Coast, and Red Sea.'
  },
  {
    id: 'arco-side-table',
    name: 'Arco Side Table',
    category: 'Living Room',
    categoryId: 'living-room',
    price: 9800,
    isFeatured: true,
    isNew: false,
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 19,
    primaryImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: 'Sculptural cylindrical accent table turned from solid kiln-dried timber blocks.',
    description: 'The Arco Side Table functions as a sculptural art piece and functional drink resting table. Turned on heavy-duty wood lathes by master carpenters in Cairo, every unit celebrates the continuous end-grain and unique growth rings of natural timber.',
    dimensions: {
      standard: '45 cm (Dia) x 52 cm (H)',
      compact: '38 cm (Dia) x 46 cm (H)'
    },
    materials: 'Solid American Walnut or Natural Ash with soft chamfered edges and concealed felt floor protectors.',
    finishes: [
      { name: 'Natural White Oak', hex: '#D7C4A5', colorClass: 'bg-[#D7C4A5]' },
      { name: 'Smoked Walnut', hex: '#533C29', colorClass: 'bg-[#533C29]' },
      { name: 'Bleached Ash', hex: '#E7DFD3', colorClass: 'bg-[#E7DFD3]' }
    ],
    sizes: ['Compact (38 dia)', 'Standard (45 dia)'],
    inStock: true,
    leadTime: '3 - 5 business days',
    delivery: 'Handled by Prime direct courier fleet. Dispatched fully assembled in protective padded linen wrapping.'
  },
  {
    id: 'noma-console',
    name: 'Noma Console',
    category: 'Storage',
    categoryId: 'storage',
    price: 24750,
    isFeatured: true,
    isNew: true,
    badge: 'Editorial Pick',
    rating: 5.0,
    reviewsCount: 14,
    primaryImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: 'Refined entryway and living console with softly curved pillared legs and concealed touch-latch drawers.',
    description: 'Designed to greet entering guests with understated grandeur, the Noma Console features a floating timber profile anchored by two massive elliptical wooden pillars. Two seamless push-to-open felt-lined drawers keep keys and daily essentials out of sight.',
    dimensions: {
      standard: '160 cm (W) x 40 cm (D) x 84 cm (H)',
      large: '190 cm (W) x 42 cm (D) x 84 cm (H)'
    },
    materials: 'European Oak veneer over high-density marine ply core with solid timber edge banding and solid oak support pillars.',
    finishes: [
      { name: 'Smoked Walnut', hex: '#533C29', colorClass: 'bg-[#533C29]' },
      { name: 'Natural White Oak', hex: '#D7C4A5', colorClass: 'bg-[#D7C4A5]' },
      { name: 'Blackened Ash', hex: '#262423', colorClass: 'bg-[#262423]' }
    ],
    sizes: ['160 x 40 cm', '190 x 42 cm'],
    inStock: true,
    leadTime: '7 - 10 business days',
    delivery: 'Delivered and leveled on-site by Prime technicians with wall-anchor hardware included.'
  },
  {
    id: 'linea-coffee-table',
    name: 'Linea Coffee Table',
    category: 'Tables',
    categoryId: 'tables',
    price: 18900,
    isFeatured: true,
    isNew: false,
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 36,
    primaryImage: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: 'Low-profile circular cocktail table featuring a radial timber grain top and recessed shadow plinth.',
    description: 'The Linea Coffee Table grounds modern living rooms with quiet confidence. Its low 36cm height invites a relaxed lounge atmosphere, while the sunburst radial grain pattern captures natural window light throughout the day.',
    dimensions: {
      standard: '110 cm (Dia) x 36 cm (H)',
      large: '130 cm (Dia) x 36 cm (H)'
    },
    materials: 'Solid core with hand-matched radial oak grain and hand-rubbed organic oil and beeswax finish.',
    finishes: [
      { name: 'Natural White Oak', hex: '#D7C4A5', colorClass: 'bg-[#D7C4A5]' },
      { name: 'Smoked Walnut', hex: '#533C29', colorClass: 'bg-[#533C29]' }
    ],
    sizes: ['110 cm Diameter', '130 cm Diameter'],
    inStock: true,
    leadTime: '5 - 7 business days',
    delivery: 'Carefully wrapped and delivered to your living room. Ready to enjoy immediately.'
  },
  {
    id: 'haven-lounge-chair',
    name: 'Haven Lounge Chair',
    category: 'Chairs',
    categoryId: 'chairs',
    price: 28500,
    isFeatured: true,
    isNew: true,
    badge: 'Crafted Excellence',
    rating: 4.9,
    reviewsCount: 22,
    primaryImage: 'https://images.unsplash.com/photo-1580481077111-9f79cb25a4e7?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580481077111-9f79cb25a4e7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: 'Sculptural solid timber armchair upholstered in heavyweight textured Egyptian bouclé linen.',
    description: 'A study in honest joinery and comfort. The Haven Lounge Chair pairs an exposed solid ash exoskeleton with deep, feather-blend cushions upholstered in breathable linen woven in Egypt. Its reclined pitch cradles the body during hours of conversation or reading.',
    dimensions: {
      standard: '82 cm (W) x 88 cm (D) x 78 cm (H) — Seat Height 40 cm'
    },
    materials: 'Kiln-dried solid Ash framework with exposed brass dowels. Dual-density foam with natural down feather envelope.',
    finishes: [
      { name: 'Natural White Oak / Cream Bouclé', hex: '#D7C4A5', colorClass: 'bg-[#D7C4A5]' },
      { name: 'Smoked Walnut / Oatmeal Wool', hex: '#533C29', colorClass: 'bg-[#533C29]' },
      { name: 'Blackened Ash / Olive Linen', hex: '#262423', colorClass: 'bg-[#262423]' }
    ],
    sizes: ['Standard Lounge'],
    inStock: true,
    leadTime: '10 - 14 business days',
    delivery: 'Hand-inspected before white glove domestic delivery.'
  },
  {
    id: 'frame-storage-cabinet',
    name: 'Frame Storage Cabinet',
    category: 'Storage',
    categoryId: 'storage',
    price: 38500,
    isFeatured: true,
    isNew: false,
    badge: 'Architectural',
    rating: 4.8,
    reviewsCount: 15,
    primaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: 'Subtle fluted door credenza with integrated cable routing and adjustable solid wood shelving.',
    description: 'Hand-carved vertical fluting creates rhythm and texture across the four doors of the Frame Cabinet. Designed for dining room tableware storage, media components, or bedroom wardrobe expansion, with soft-close German hardware throughout.',
    dimensions: {
      standard: '180 cm (W) x 48 cm (D) x 82 cm (H)',
      tall: '140 cm (W) x 45 cm (D) x 120 cm (H)'
    },
    materials: 'Solid oak structural framing with fluted oak panels. Brushed patinated bronze pulls.',
    finishes: [
      { name: 'Smoked Walnut', hex: '#533C29', colorClass: 'bg-[#533C29]' },
      { name: 'Natural White Oak', hex: '#D7C4A5', colorClass: 'bg-[#D7C4A5]' },
      { name: 'Blackened Ash', hex: '#262423', colorClass: 'bg-[#262423]' }
    ],
    sizes: ['Low Credenza (180W)', 'Tall Cabinet (140W)'],
    inStock: true,
    leadTime: '12 - 16 business days',
    delivery: 'Delivered and assembled into place with felt glides on all contact points.'
  },
  {
    id: 'nile-fluted-bed',
    name: 'Nile Fluted Bed Frame',
    category: 'Bedroom',
    categoryId: 'bedroom',
    price: 46000,
    isFeatured: false,
    isNew: true,
    badge: 'Bespoke Bedding',
    rating: 5.0,
    reviewsCount: 11,
    primaryImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: 'Low platform bed with an extended fluted headboard and integrated cantilevered floating nightstands.',
    description: 'Transform your bedroom into a quiet luxury retreat. The Nile Bed features a continuous fluted wooden backdrop that extends past the mattress to anchor floating nightstand surfaces with wireless cable cutouts.',
    dimensions: {
      standard: 'King (180x200 mattress): Headboard 280 cm (W) x 105 cm (H)',
      large: 'Super King (200x200 mattress): Headboard 300 cm (W) x 105 cm (H)'
    },
    materials: 'Solid Oak slats and headboard rails. Sourced from certified sustainable European forests.',
    finishes: [
      { name: 'Natural White Oak', hex: '#D7C4A5', colorClass: 'bg-[#D7C4A5]' },
      { name: 'Smoked Walnut', hex: '#533C29', colorClass: 'bg-[#533C29]' }
    ],
    sizes: ['Queen (160 x 200)', 'King (180 x 200)', 'Super King (200 x 200)'],
    inStock: true,
    leadTime: '14 - 18 business days',
    delivery: 'Professional installation team assembles slats and mounts floating components.'
  },
  {
    id: 'solis-round-table',
    name: 'Solis Round Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    price: 34500,
    isFeatured: false,
    isNew: false,
    badge: 'Timeless',
    rating: 4.8,
    reviewsCount: 17,
    primaryImage: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: 'Circular dining table supported by a conical slatted wood pedestal base.',
    description: 'Ideal for conversational gatherings, the Solis Round Dining Table allows easy interaction without harsh table corners. The fluted conical center pedestal provides complete leg clearance around the entire perimeter.',
    dimensions: {
      standard: '135 cm (Dia) x 76 cm (H) — Seats 5-6',
      large: '160 cm (Dia) x 76 cm (H) — Seats 8'
    },
    materials: 'Solid Oak top with reinforced bevel. Pedestal formed with hand-milled vertical slats.',
    finishes: [
      { name: 'Natural White Oak', hex: '#D7C4A5', colorClass: 'bg-[#D7C4A5]' },
      { name: 'Smoked Walnut', hex: '#533C29', colorClass: 'bg-[#533C29]' },
      { name: 'Blackened Ash', hex: '#262423', colorClass: 'bg-[#262423]' }
    ],
    sizes: ['135 cm (Seats 5-6)', '160 cm (Seats 8)'],
    inStock: true,
    leadTime: '10 - 12 business days',
    delivery: 'Hand delivered and placed by Prime installation experts.'
  },
  {
    id: 'kairo-sculptural-armchair',
    name: 'Kairo Sculptural Armchair',
    category: 'Living Room',
    categoryId: 'living-room',
    price: 21200,
    isFeatured: false,
    isNew: true,
    badge: 'Artisanal',
    rating: 4.9,
    reviewsCount: 16,
    primaryImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1580481077111-9f79cb25a4e7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580481077111-9f79cb25a4e7?auto=format&fit=crop&w=1200&q=80'
    ],
    tagline: 'Curved wooden frame with organic armrests and woven cane or linen accents.',
    description: 'Inspired by modern Egyptian architectural lines and organic mid-century Scandinavian chairs, Kairo combines steam-bent solid beech wood with plush woven upholstery.',
    dimensions: {
      standard: '74 cm (W) x 80 cm (D) x 76 cm (H)'
    },
    materials: 'Steam-bent solid Egyptian Beech and European White Oak with hand-sanded satin finish.',
    finishes: [
      { name: 'Natural White Oak', hex: '#D7C4A5', colorClass: 'bg-[#D7C4A5]' },
      { name: 'Smoked Walnut', hex: '#533C29', colorClass: 'bg-[#533C29]' }
    ],
    sizes: ['Standard'],
    inStock: true,
    leadTime: '7 - 10 business days',
    delivery: 'Dispatched in premium protective packaging.'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    caption: 'The Oslo Dining Table in European Oak installed at a residence in Katameya Dunes, Cairo.',
    likes: '1.4k'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    caption: 'Warm shadows and handcrafted joinery. Detail of the Linea Coffee Table.',
    likes: '980'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1580481077111-9f79cb25a4e7?auto=format&fit=crop&w=800&q=80',
    caption: 'Artisanal curvature — the Haven Lounge Chair in natural oak and raw linen.',
    likes: '2.1k'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    caption: 'Custom dressing sanctuary with fluted walnut claddings crafted at our Ghamra workshops.',
    likes: '1.7k'
  }
];

export const CRAFT_STEPS = [
  {
    number: '01',
    title: 'Select',
    description: 'Carefully selected materials and finishes.',
    detail: 'We personally inspect every timber batch—European White Oak, American Walnut, and premium hardwoods—ensuring ideal moisture levels, grain harmony, and responsible provenance.',
    image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '02',
    title: 'Shape',
    description: 'Precision craftsmanship brings the design to life.',
    detail: 'Combining traditional joinery inherited across four generations of Egyptian wood masters with German precision tooling to carve lasting silhouettes.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '03',
    title: 'Finish',
    description: 'Each piece receives its final texture, color, and finish.',
    detail: 'Hand-sanding through multiple grits, followed by custom non-toxic oils, matte lacquers, and wire-brushing that highlight the natural tactile grain of the wood.',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Your finished piece is prepared for its new home.',
    detail: 'Wrapped in tailored fabric protectors and installed directly by our Cairo white glove team, leveled and calibrated for perfection in your space.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  }
];

export const PARTNERS_AND_CLIENTS = [
  { name: 'Orascom Development', note: 'Luxury Resorts & Coastal Villas' },
  { name: 'Yasmina Makram', note: 'Bespoke Interior Studio Cairo' },
  { name: 'Style Design', note: 'Architectural Interiors' },
  { name: 'EgyStone', note: 'Marble & Fine Woodworks' },
  { name: 'Humania', note: 'Progressing Humanity Healthcare' },
  { name: 'Haven Bespoke', note: 'Turnkey Architectural Solutions' }
];
