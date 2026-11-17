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
    brass: std({ color: '#C8A35A', metalness: 1, roughness: 0.3 }),
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
