// Living room layout. Product facts (name, price, images, route) always come
// from src/data/products.js via the id; this file only says where each piece stands.
// Units: metres. Back wall at z = -3, room spans x -3.6…3.6, z -3…4.

export const LIVING_ROOM_PRODUCTS = [
  { id: 'prime-lattice-tv-unit', model: 'LatticeTvUnit', position: [0, 0, -2.79], rotationY: 0, anchor: [0, 0.95, -2.75] },
  { id: 'prime-core-coffee-table', model: 'CoreCoffeeTable', position: [0, 0, 0.1], rotationY: 0, anchor: [0, 0.7, 0.1] },
  { id: 'prime-orbit-side-table', model: 'OrbitSideTable', position: [1.6, 0, 1.75], rotationY: 0, anchor: [1.6, 0.85, 1.75] },
  { id: 'prime-shadow-sideboard', model: 'ShadowSideboard', position: [-3.34, 0, -0.4], rotationY: Math.PI / 2, anchor: [-3.2, 1.1, -0.4] },
  { id: 'prime-curve-highboard', model: 'CurveHighboard', position: [2.55, 0, -2.74], rotationY: 0, anchor: [2.55, 1.85, -2.6] },
];

// Scroll-driven camera path: one stop per scene beat. `focus` names the piece the
// stop frames (used for the on-screen caption), positions/targets are world space.
export const CAMERA_STOPS = [
  { pos: [-1.25, 1.72, 3.8], target: [0.5, 0.75, -1.4], caption: 'Step inside' },
  { pos: [0.25, 1.2, -0.55], target: [0, 0.55, -2.8], focus: 'prime-lattice-tv-unit' },
  { pos: [1.15, 1.3, -0.85], target: [2.55, 0.85, -2.74], focus: 'prime-curve-highboard' },
  { pos: [-0.7, 1.35, -1.25], target: [0.7, 0.35, 0.9], focus: 'prime-core-coffee-table' },
  { pos: [-0.75, 1.3, 0.75], target: [-3.34, 0.55, -0.4], focus: 'prime-shadow-sideboard' },
];
