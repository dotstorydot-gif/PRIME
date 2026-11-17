// Showroom rooms. Product facts (name, price, images, route) always come from
// src/data/products.js via the id; this file only says which room each piece is
// in, where it stands, and how the camera walks through the room.
// Units: metres, three.js world space. Every room shell spans x -3.6…3.6, z -3…4.

export const ROOMS = [
  {
    id: 'living',
    name: 'Living Room',
    glb: '/experience/living-room.glb',
    products: [
      { id: 'prime-lattice-tv-unit', model: 'LatticeTvUnit', position: [0, 0, -2.79], rotationY: 0, anchor: [0, 0.95, -2.75] },
      { id: 'prime-core-coffee-table', model: 'CoreCoffeeTable', position: [0, 0, 0.1], rotationY: 0, anchor: [0, 0.7, 0.1] },
      { id: 'prime-orbit-side-table', model: 'OrbitSideTable', position: [1.6, 0, 1.75], rotationY: 0, anchor: [1.6, 0.85, 1.75] },
      { id: 'prime-shadow-sideboard', model: 'ShadowSideboard', position: [-3.34, 0, -0.4], rotationY: Math.PI / 2, anchor: [-3.2, 1.1, -0.4] },
      { id: 'prime-curve-highboard', model: 'CurveHighboard', position: [2.55, 0, -2.74], rotationY: 0, anchor: [2.55, 1.85, -2.6] },
    ],
    stops: [
      { pos: [-1.25, 1.72, 3.8], target: [0.5, 0.75, -1.4], caption: 'Step inside' },
      { pos: [0.25, 1.2, -0.55], target: [0, 0.55, -2.8], focus: 'prime-lattice-tv-unit' },
      { pos: [1.15, 1.3, -0.85], target: [2.55, 0.85, -2.74], focus: 'prime-curve-highboard' },
      { pos: [-0.7, 1.35, -1.25], target: [0.7, 0.35, 0.9], focus: 'prime-core-coffee-table' },
      { pos: [-0.75, 1.3, 0.75], target: [-3.34, 0.55, -0.4], focus: 'prime-shadow-sideboard' },
    ],
  },
  {
    id: 'dining',
    name: 'Dining Room',
    glb: '/experience/dining-room.glb',
    products: [
      { id: 'prime-legacy-dining', model: 'LegacyDiningTable', position: [0, 0, -0.3], rotationY: 0, anchor: [0, 1.05, -0.3] },
      { id: 'prime-monarch-buffet', model: 'MonarchBuffet', position: [0, 0, -2.74], rotationY: 0, anchor: [0, 1.1, -2.7] },
      { id: 'prime-pillar-display-unit', model: 'PillarDisplayUnit', position: [2.55, 0, -2.78], rotationY: 0, anchor: [2.55, 2.25, -2.7] },
    ],
    stops: [
      { pos: [-1.1, 1.7, 3.7], target: [0.4, 0.8, -1.2], caption: 'Step inside' },
      { pos: [1.6, 1.55, 1.6], target: [-0.1, 0.6, -0.4], focus: 'prime-legacy-dining' },
      { pos: [-0.4, 1.3, -0.9], target: [0, 0.6, -2.74], focus: 'prime-monarch-buffet' },
      { pos: [0.9, 1.45, -0.8], target: [2.55, 1.1, -2.78], focus: 'prime-pillar-display-unit' },
    ],
  },
];

export const getRoom = (id) => ROOMS.find((r) => r.id === id) || ROOMS[0];
