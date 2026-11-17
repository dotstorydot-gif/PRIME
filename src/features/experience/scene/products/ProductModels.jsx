// 3D reconstructions of real Prime Wooden Works pieces, built from the
// catalogue's published dimensions (metres) and the product photography.
// Origin of every model = centre of its footprint on the floor; front faces +Z.
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { archRelief, carvedPebbles, woodGrain } from '../textures';

const std = (opts) => new THREE.MeshStandardMaterial(opts);

function useMats(factory, deps = []) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}

/* Prime Lattice TV unit · 200 W × 40 D × 38 H cm · wall-floating, walnut frame, hand-carved sage front */
export function LatticeTvUnit({ mountHeight = 0.32 }) {
  const m = useMats(() => {
    const p = carvedPebbles();
    return {
      walnut: std({ map: woodGrain('walnut', '#6B4429', '#3B2414', { seed: 3 }), roughness: 0.5 }),
      front: std({ map: p.map, bumpMap: p.bump, bumpScale: 1.6, roughness: 0.75 }),
    };
  });
  return (
    <group position={[0, mountHeight, 0]}>
      <RoundedBox args={[2.0, 0.38, 0.4]} radius={0.07} smoothness={6} position={[0, 0.19, 0]} material={m.walnut} castShadow receiveShadow />
      <mesh position={[0, 0.19, 0.2015]} material={m.front} receiveShadow>
        <planeGeometry args={[1.88, 0.29]} />
      </mesh>
    </group>
  );
}

/* Prime Core coffee table · Ø90 × 42 H cm · dark smoked oak, flared drum base */
export function CoreCoffeeTable() {
  const m = useMats(() => ({
    oak: std({ map: woodGrain('smoked', '#4A3525', '#24170E', { seed: 9, repeat: [2, 1] }), roughness: 0.38 }),
  }));
  return (
    <group>
      <mesh position={[0, 0.395, 0]} material={m.oak} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.435, 0.05, 72]} />
      </mesh>
      <mesh position={[0, 0.185, 0]} material={m.oak} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.32, 0.37, 72]} />
      </mesh>
    </group>
  );
}

/* Prime Orbit side table · 50 W × 40 D × 55 H cm · matte black beech, arch relief drawer, brass sabots */
export function OrbitSideTable() {
  const m = useMats(() => ({
    black: std({ color: '#1E1C1B', roughness: 0.62 }),
    front: std({ color: '#1E1C1B', roughness: 0.62, bumpMap: archRelief(), bumpScale: 2.5 }),
    brass: std({ color: '#D2B26A', metalness: 0.55, roughness: 0.3 }),
  }));
  const legs = [[-0.2, 0.15], [0.2, 0.15], [-0.2, -0.15], [0.2, -0.15]];
  return (
    <group>
      <mesh position={[0, 0.44, 0]} material={m.black} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.22, 0.4]} />
      </mesh>
      <mesh position={[0, 0.44, 0.2005]} material={m.front}>
        <planeGeometry args={[0.47, 0.19]} />
      </mesh>
      {legs.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.2, 0]} material={m.black} castShadow>
            <cylinderGeometry args={[0.018, 0.012, 0.33, 16]} />
          </mesh>
          <mesh position={[0, 0.02, 0]} material={m.brass} castShadow>
            <cylinderGeometry args={[0.012, 0.011, 0.04, 16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Prime Shadow sideboard · 200 W × 48 D × 80 H cm · blackened oak case in a sculpted natural beech frame, turned round handles */
export function ShadowSideboard() {
  const m = useMats(() => ({
    black: std({ map: woodGrain('blackoak', '#262423', '#0E0D0C', { seed: 21, rings: 110 }), roughness: 0.55 }),
    beech: std({ map: woodGrain('beech', '#CDB08A', '#A3845E', { seed: 4 }), roughness: 0.5 }),
  }));
  const posts = [[-0.9, 0.2], [0.9, 0.2], [-0.9, -0.2], [0.9, -0.2]];
  return (
    <group>
      {/* case */}
      <mesh position={[0, 0.48, 0]} material={m.black} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.54, 0.44]} />
      </mesh>
      {/* door seams */}
      {[-0.425, 0, 0.425].map((x) => (
        <mesh key={x} position={[x, 0.48, 0.2205]}>
          <planeGeometry args={[0.006, 0.52]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
      ))}
      {/* turned handles */}
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, 0.5, 0.232]} rotation={[Math.PI / 2, 0, 0]} material={m.beech} castShadow>
          <cylinderGeometry args={[0.085, 0.09, 0.025, 48]} />
        </mesh>
      ))}
      {/* beech frame: tapered posts rising past the case */}
      {posts.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.4, z]} material={m.beech} castShadow>
          <cylinderGeometry args={[0.02, 0.016, 0.8, 16]} />
        </mesh>
      ))}
      {/* rails under the case */}
      {[0.2, -0.2].map((z) => (
        <mesh key={z} position={[0, 0.2, z]} material={m.beech} castShadow>
          <boxGeometry args={[1.82, 0.035, 0.035]} />
        </mesh>
      ))}
      {[-0.9, 0.9].map((x) => (
        <mesh key={x} position={[x, 0.2, 0]} material={m.beech}>
          <boxGeometry args={[0.035, 0.035, 0.4]} />
        </mesh>
      ))}
    </group>
  );
}

/* Prime Curve highboard · 120 W × 45 D × 155 H cm · steam-bent oak veneer in two rounded tiers on a black steel base */
export function CurveHighboard() {
  const m = useMats(() => ({
    oak: std({ map: woodGrain('whiteoak', '#D9C7A8', '#B39C78', { seed: 13, rings: 90 }), roughness: 0.6 }),
    steel: std({ color: '#151515', metalness: 0.6, roughness: 0.4 }),
  }));
  const tierH = 0.6;
  const base = 0.3;
  return (
    <group>
      {[-0.42, 0.42].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, base / 2, 0.12]} material={m.steel} castShadow>
            <boxGeometry args={[0.035, base, 0.012]} />
          </mesh>
          <mesh position={[0, base / 2, -0.12]} material={m.steel} castShadow>
            <boxGeometry args={[0.035, base, 0.012]} />
          </mesh>
          <mesh position={[0, 0.006, 0]} material={m.steel}>
            <boxGeometry args={[0.035, 0.012, 0.25]} />
          </mesh>
        </group>
      ))}
      {[0, 1].map((i) => (
        <RoundedBox
          key={i}
          args={[1.2, tierH, 0.45]}
          radius={0.17}
          smoothness={8}
          position={[0, base + tierH / 2 + i * (tierH + 0.02), 0]}
          material={m.oak}
          castShadow
          receiveShadow
        />
      ))}
      {/* door split */}
      <mesh position={[0, base + tierH + 0.01, 0.2255]}>
        <planeGeometry args={[0.005, tierH * 2]} />
        <meshBasicMaterial color="#6E5B42" />
      </mesh>
      <RoundedBox args={[1.22, 0.035, 0.47]} radius={0.015} position={[0, base + tierH * 2 + 0.04, 0]} material={m.oak} castShadow />
    </group>
  );
}

/* ---------------------------------------------------------------- dining room */

/* Prime Legacy Dining · 240 L × 110 W × 76 H cm
   From the product photo: dark espresso walnut; thick top with a stepped edge (top slab, bead,
   recessed apron); base = one curved half-drum pedestal at each end on a neck and stepped plinth foot,
   joined low down by a stretcher. */
export function LegacyDiningTable() {
  const m = useMats(() => ({
    walnut: std({ map: woodGrain('legacy', '#3E2A1E', '#20140C', { seed: 31, rings: 90 }), roughness: 0.35 }),
  }));
  const half = useMemo(() => new THREE.CylinderGeometry(0.3, 0.3, 0.74, 48, 1, false, Math.PI / 2, Math.PI), []);
  return (
    <group>
      {/* top: slab + bead + apron = stepped moulded edge */}
      <RoundedBox args={[2.4, 0.035, 1.1]} radius={0.008} smoothness={3} position={[0, 0.7425, 0]} material={m.walnut} castShadow receiveShadow />
      <RoundedBox args={[2.36, 0.022, 1.06]} radius={0.008} smoothness={3} position={[0, 0.714, 0]} material={m.walnut} castShadow />
      <mesh position={[0, 0.66, 0]} material={m.walnut} castShadow>
        <boxGeometry args={[2.16, 0.085, 0.9]} />
      </mesh>
      {[-0.72, 0.72].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {/* curved half-drum under the apron (flat side up, axis across the table) */}
          <mesh geometry={half} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.615, 0]} material={m.walnut} castShadow receiveShadow />
          {/* neck */}
          <mesh position={[0, 0.22, 0]} material={m.walnut} castShadow>
            <boxGeometry args={[0.16, 0.36, 0.42]} />
          </mesh>
          {/* stepped plinth foot */}
          <mesh position={[0, 0.03, 0]} material={m.walnut} castShadow receiveShadow>
            <boxGeometry args={[0.34, 0.06, 0.86]} />
          </mesh>
          <mesh position={[0, 0.075, 0]} material={m.walnut} castShadow>
            <boxGeometry args={[0.26, 0.03, 0.74]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.14, 0]} material={m.walnut} castShadow>
        <boxGeometry args={[1.3, 0.07, 0.1]} />
      </mesh>
    </group>
  );
}

/* Prime Monarch Buffet · 190 W × 48 D × 85 H cm
   From the product photo: medium walnut with horizontal grain; a 69 cm case floating on 16 cm square
   walnut legs placed directly under the two brass plates; four doors in two pairs with a central gap;
   tall satin-brass plates spanning each pair's meeting seam. */
export function MonarchBuffet() {
  const m = useMats(() => ({
    walnut: std({ map: woodGrain('monarch', '#74503A', '#4A2F1D', { seed: 41, rings: 70 }), roughness: 0.42 }),
    brass: std({ color: '#D2B26A', metalness: 0.55, roughness: 0.3, emissive: '#3a2a08', emissiveIntensity: 0.25 }),
  }));
  const legH = 0.16, caseH = 0.665, topT = 0.025, W = 1.9, D = 0.48;
  const pairX = W / 4 + 0.0; // centre of each door pair (seam position)
  return (
    <group>
      <mesh position={[0, legH + caseH / 2, 0]} material={m.walnut} castShadow receiveShadow>
        <boxGeometry args={[W, caseH, D]} />
      </mesh>
      {/* separate top panel with its own seam line */}
      <mesh position={[0, legH + caseH + topT / 2, 0]} material={m.walnut} castShadow receiveShadow>
        <boxGeometry args={[W, topT, D]} />
      </mesh>
      {/* door seams: two per pair + wider central gap */}
      {[-pairX, pairX].map((x) => (
        <mesh key={x} position={[x, legH + caseH / 2, D / 2 + 0.0005]}>
          <planeGeometry args={[0.004, caseH]} />
          <meshBasicMaterial color="#24150b" />
        </mesh>
      ))}
      <mesh position={[0, legH + caseH / 2, D / 2 + 0.0005]}>
        <planeGeometry args={[0.009, caseH]} />
        <meshBasicMaterial color="#24150b" />
      </mesh>
      {/* brass plates across each pair's meeting seam */}
      {[-pairX, pairX].map((x) => (
        <mesh key={x} position={[x, legH + caseH * 0.62, D / 2 + 0.004]} material={m.brass} castShadow>
          <boxGeometry args={[0.105, 0.28, 0.006]} />
        </mesh>
      ))}
      {/* square legs under the brass plates, front and back */}
      {[-pairX, pairX].flatMap((x) => [D / 2 - 0.06, -D / 2 + 0.06].map((z) => (
        <mesh key={`${x}${z}`} position={[x, legH / 2, z]} material={m.walnut} castShadow>
          <boxGeometry args={[0.045, legH, 0.045]} />
        </mesh>
      )))}
    </group>
  );
}

/* Prime Pillar Display Unit · 100 W × 40 D × 210 H cm
   From the product photo: natural oak open case (five compartments) carried by four sculpted posts that
   stand just outside the case, front and back: thickest at the low joint, tapering to the floor, and
   rising past the top into outward-flaring horn tips; a low rail joins each pair of posts. */
function postGeometry() {
  // profile (radius, height) for a lathe: slim foot, swelling joint, long shaft, flared horn tip
  const pts = [
    [0.012, 0], [0.018, 0.08], [0.026, 0.17], [0.03, 0.2], [0.024, 0.32], [0.02, 1.0],
    [0.02, 1.75], [0.024, 1.95], [0.028, 2.02], [0.016, 2.08], [0.004, 2.1],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  return new THREE.LatheGeometry(pts, 20);
}

export function PillarDisplayUnit() {
  const m = useMats(() => ({
    oak: std({ map: woodGrain('pillar', '#E3CFAE', '#C4AA82', { seed: 51, rings: 90 }), roughness: 0.6 }),
  }));
  const post = useMemo(postGeometry, []);
  const W = 0.88, D = 0.36, H = 1.82, base = 0.2, t = 0.03;
  return (
    <group>
      {/* case: thick sides, back, top, bottom + four shelves (five compartments) */}
      {[-W / 2 + t / 2, W / 2 - t / 2].map((x) => (
        <mesh key={x} position={[x, base + H / 2, 0]} material={m.oak} castShadow receiveShadow>
          <boxGeometry args={[t, H, D]} />
        </mesh>
      ))}
      <mesh position={[0, base + H / 2, -D / 2 + 0.006]} material={m.oak} receiveShadow>
        <boxGeometry args={[W, H, 0.012]} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[0, base + t / 2 + (i * (H - t)) / 5, 0.005]} material={m.oak} castShadow receiveShadow>
          <boxGeometry args={[W - 2 * t, i === 0 || i === 5 ? t : 0.022, D - 0.012]} />
        </mesh>
      ))}
      {/* sculpted posts just outside the case, slightly splayed outwards */}
      {[-1, 1].flatMap((sx) => [0.13, -0.13].map((z) => (
        <mesh key={`${sx}${z}`} geometry={post} position={[sx * (W / 2 + 0.035), 0, z]} rotation={[0, 0, -sx * 0.025]} material={m.oak} castShadow />
      )))}
      {/* low rails joining the posts under the case */}
      {[0.13, -0.13].map((z) => (
        <mesh key={z} position={[0, 0.19, z]} material={m.oak} castShadow>
          <boxGeometry args={[W + 0.07, 0.035, 0.03]} />
        </mesh>
      ))}
      {[-1, 1].map((sx) => (
        <mesh key={sx} position={[sx * (W / 2 + 0.035), 0.19, 0]} material={m.oak}>
          <boxGeometry args={[0.03, 0.035, 0.26]} />
        </mesh>
      ))}
    </group>
  );
}
