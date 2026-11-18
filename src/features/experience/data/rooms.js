// The showroom is ONE connected house (built + baked in tools/blender/build_house.py):
//   Living Room (z  4 … -3)  →  doorway  →  Dining Room (z -3.15 … -10.15)  →  doorway  →  Bedroom (z -10.3 … -17.3)
// Every room is 7.2 m wide (x -3.6 … 3.6); the doorways sit at x -3.3 … -2.1 in the shared walls.
// Product facts (name, price, images, route) always come from src/data/products.js via the id;
// this file only says where each piece stands and how the camera walks through the house.
// Units: metres, three.js world space.

const DINING = -7.15; // z offset of the dining room's frame
const BED = -14.3; // z offset of the bedroom's frame
const z = (local, off) => local + off;

export const HOUSE = {
  glb: '/experience/house.glb',
  rooms: [
    { id: 'living', name: 'Living Room', centre: [0, 0.5] },
    { id: 'dining', name: 'Dining Room', centre: [0, 0.5 + DINING] },
    { id: 'bedroom', name: 'Bedroom', centre: [0, 0.5 + BED] },
  ],
  products: [
    // living room
    { key: 'lattice', id: 'prime-lattice-tv-unit', model: 'LatticeTvUnit', position: [0, 0, -2.79], rotationY: 0, anchor: [0, 0.95, -2.75] },
    { key: 'core', id: 'prime-core-coffee-table', model: 'CoreCoffeeTable', position: [0, 0, 0.1], rotationY: 0, anchor: [0, 0.7, 0.1] },
    { key: 'orbit', id: 'prime-orbit-side-table', model: 'OrbitSideTable', position: [1.6, 0, 1.75], rotationY: 0, anchor: [1.6, 0.85, 1.75] },
    { key: 'shadow', id: 'prime-shadow-sideboard', model: 'ShadowSideboard', position: [-3.34, 0, -0.4], rotationY: Math.PI / 2, anchor: [-3.2, 1.1, -0.4] },
    { key: 'curve', id: 'prime-curve-highboard', model: 'CurveHighboard', position: [2.55, 0, -2.74], rotationY: 0, anchor: [2.55, 1.85, -2.6] },
    // dining room
    { key: 'legacy', id: 'prime-legacy-dining', model: 'LegacyDiningTable', position: [0, 0, z(-0.3, DINING)], rotationY: 0, anchor: [0, 1.05, z(-0.3, DINING)] },
    { key: 'monarch', id: 'prime-monarch-buffet', model: 'MonarchBuffet', position: [0, 0, z(-2.74, DINING)], rotationY: 0, anchor: [0, 1.1, z(-2.7, DINING)] },
    { key: 'pillar', id: 'prime-pillar-display-unit', model: 'PillarDisplayUnit', position: [2.55, 0, z(-2.78, DINING)], rotationY: 0, anchor: [2.55, 2.25, z(-2.7, DINING)] },
    // bedroom
    { key: 'cloud', id: 'prime-cloud-bed', model: 'CloudBed', position: [0, 0, z(-1.8, BED)], rotationY: 0, anchor: [0, 1.45, z(-2.6, BED)] },
    { key: 'motifL', id: 'prime-motif-nightstand', model: 'MotifNightstand', position: [-1.5, 0, z(-2.77, BED)], rotationY: 0, anchor: [-1.5, 1.2, z(-2.7, BED)] },
    { key: 'motifR', id: 'prime-motif-nightstand', model: 'MotifNightstand', position: [1.5, 0, z(-2.77, BED)], rotationY: 0, anchor: [1.5, 1.2, z(-2.7, BED)] },
    { key: 'carve', id: 'prime-carve-dresser', model: 'CarveDresser', position: [-3.34, 0, z(0.5, BED)], rotationY: Math.PI / 2, anchor: [-3.2, 1.2, z(0.5, BED)] },
  ],
  // One continuous camera path. `stop` points are where scrolling settles (one per screen of scroll);
  // the others are waypoints that carry the camera through the doorways.
  path: [
    { room: 'living', stop: true, pos: [-1.25, 1.72, 3.8], target: [0.5, 0.75, -1.4], caption: 'Step inside' },
    { room: 'living', stop: true, pos: [0.25, 1.2, -0.55], target: [0, 0.55, -2.8], focus: 'prime-lattice-tv-unit' },
    { room: 'living', stop: true, pos: [1.15, 1.3, -0.85], target: [2.55, 0.85, -2.74], focus: 'prime-curve-highboard' },
    { room: 'living', stop: true, pos: [-0.7, 1.35, -1.25], target: [0.7, 0.35, 0.9], focus: 'prime-core-coffee-table' },
    { room: 'living', stop: true, pos: [-0.75, 1.3, 0.75], target: [-3.34, 0.55, -0.4], focus: 'prime-shadow-sideboard' },
    { room: 'living', pos: [-2.5, 1.6, -1.9], target: [-2.7, 1.45, -6.5] },
    { room: 'dining', pos: [-2.7, 1.62, -3.1], target: [-2.4, 1.35, -7.5] },
    { room: 'dining', stop: true, pos: [-2.35, 1.7, -3.75], target: [0.6, 0.8, -8.3], caption: 'Into the dining room' },
    { room: 'dining', stop: true, pos: [1.6, 1.55, z(1.6, DINING)], target: [-0.1, 0.6, z(-0.4, DINING)], focus: 'prime-legacy-dining' },
    { room: 'dining', stop: true, pos: [-0.4, 1.3, z(-0.9, DINING)], target: [0, 0.6, z(-2.74, DINING)], focus: 'prime-monarch-buffet' },
    { room: 'dining', stop: true, pos: [0.9, 1.45, z(-0.8, DINING)], target: [2.55, 1.1, z(-2.78, DINING)], focus: 'prime-pillar-display-unit' },
    { room: 'dining', pos: [-2.4, 1.6, -8.9], target: [-2.7, 1.45, -13.6] },
    { room: 'bedroom', pos: [-2.7, 1.62, -10.25], target: [-2.4, 1.35, -14.6] },
    { room: 'bedroom', stop: true, pos: [-2.35, 1.7, -10.9], target: [0.5, 0.7, -15.6], caption: 'Into the bedroom' },
    { room: 'bedroom', stop: true, pos: [1.5, 1.65, z(1.7, BED)], target: [0, 0.5, z(-1.8, BED)], focus: 'prime-cloud-bed' },
    { room: 'bedroom', stop: true, pos: [2.5, 1.15, z(-0.9, BED)], target: [1.5, 0.4, z(-2.77, BED)], focus: 'prime-motif-nightstand' },
    { room: 'bedroom', stop: true, pos: [-0.9, 1.35, z(0.5, BED)], target: [-3.34, 0.6, z(0.5, BED)], focus: 'prime-carve-dresser' },
  ],
};

// derived: the scroll stops and, for each, its index on the camera path
export const STOPS = HOUSE.path.map((p, i) => ({ ...p, pathIndex: i })).filter((p) => p.stop);
export const roomName = (id) => HOUSE.rooms.find((r) => r.id === id)?.name ?? '';
export const firstStopOf = (roomId) => STOPS.findIndex((s) => s.room === roomId);
