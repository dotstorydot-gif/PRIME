// Architecture and non-interactive styling (sofa, TV, rug, art, ceramics).
// Prime does not sell these items; they are staging only and are never clickable
// or presented as products.
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { noise, plankFloor } from './textures';

const X0 = -3.6, X1 = 3.6, Z0 = -3, Z1 = 4, H = 2.9;
const W = X1 - X0, D = Z1 - Z0;
// window opening on the right wall
const WIN = { z0: -1.7, z1: 1.5, y0: 0.3, y1: 2.6 };

function Sofa() {
  const m = useMemo(
    () => ({
      fabric: new THREE.MeshStandardMaterial({ color: '#E9E1D3', roughness: 1, bumpMap: noise('boucle', { size: 128, lo: 120, hi: 255, repeat: [6, 6] }), bumpScale: 3 }),
      leg: new THREE.MeshStandardMaterial({ color: '#2A211A', roughness: 0.5 }),
    }),
    []
  );
  return (
    <group position={[0, 0, 1.78]}>
      <RoundedBox args={[2.5, 0.3, 0.98]} radius={0.08} position={[0, 0.25, 0]} material={m.fabric} castShadow receiveShadow />
      <RoundedBox args={[1.18, 0.16, 0.8]} radius={0.07} position={[-0.6, 0.47, -0.05]} material={m.fabric} castShadow receiveShadow />
      <RoundedBox args={[1.18, 0.16, 0.8]} radius={0.07} position={[0.6, 0.47, -0.05]} material={m.fabric} castShadow receiveShadow />
      <RoundedBox args={[2.5, 0.48, 0.24]} radius={0.1} position={[0, 0.62, 0.37]} material={m.fabric} castShadow receiveShadow />
      <RoundedBox args={[0.22, 0.38, 0.98]} radius={0.1} position={[-1.2, 0.5, 0]} material={m.fabric} castShadow />
      <RoundedBox args={[0.22, 0.38, 0.98]} radius={0.1} position={[1.2, 0.5, 0]} material={m.fabric} castShadow />
      {[[-1.1, -0.38], [1.1, -0.38], [-1.1, 0.38], [1.1, 0.38]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.05, z]} material={m.leg}>
          <boxGeometry args={[0.05, 0.1, 0.05]} />
        </mesh>
      ))}
      {/* throw cushions */}
      <RoundedBox args={[0.5, 0.42, 0.14]} radius={0.06} position={[-0.85, 0.72, 0.18]} rotation={[-0.2, 0.15, 0.05]} castShadow>
        <meshStandardMaterial color="#B9A27F" roughness={1} />
      </RoundedBox>
      <RoundedBox args={[0.48, 0.4, 0.14]} radius={0.06} position={[0.9, 0.72, 0.18]} rotation={[-0.2, -0.2, -0.04]} castShadow>
        <meshStandardMaterial color="#8E9472" roughness={1} />
      </RoundedBox>
    </group>
  );
}

function Vase({ position, scale = 1, color = '#E4DCCD' }) {
  const geo = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      pts.push(new THREE.Vector2(0.02 + Math.sin(t * Math.PI) * 0.07 + (t > 0.85 ? -0.02 : 0), t * 0.24));
    }
    return new THREE.LatheGeometry(pts, 40);
  }, []);
  return (
    <mesh geometry={geo} position={position} scale={scale} castShadow>
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}

function Artwork({ position, rotationY }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 640;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#EFE7DA';
    ctx.fillRect(0, 0, 512, 640);
    const blobs = [['#C9B08B', 180, 260, 150], ['#8E9472', 320, 380, 120], ['#D8C3A3', 240, 470, 110], ['#6B4F37', 300, 220, 60]];
    blobs.forEach(([col, x, y, r]) => {
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * 0.8, 0.4, 0, Math.PI * 2);
      ctx.fill();
    });
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.95, 1.18, 0.04]} />
        <meshStandardMaterial color="#C8A986" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.021]}>
        <planeGeometry args={[0.85, 1.08]} />
        <meshStandardMaterial map={tex} roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function LivingRoomShell() {
  const m = useMemo(() => {
    const plaster = noise('plaster', { lo: 225, hi: 255, repeat: [3, 2] });
    return {
      floor: new THREE.MeshStandardMaterial({ map: plankFloor(), roughness: 0.45, color: '#F0E2CC' }),
      wall: new THREE.MeshStandardMaterial({ color: '#F1EADF', roughness: 0.95, bumpMap: plaster, bumpScale: 0.6 }),
      ceiling: new THREE.MeshStandardMaterial({ color: '#F7F3EC', roughness: 1, emissive: '#D9CFC0', emissiveIntensity: 0.55 }),
      skirting: new THREE.MeshStandardMaterial({ color: '#EDE5D8', roughness: 0.6 }),
      rug: new THREE.MeshStandardMaterial({ color: '#E3D6C1', roughness: 1, bumpMap: noise('jute', { size: 256, lo: 90, hi: 255, repeat: [10, 8], weave: true }), bumpScale: 4 }),
      steel: new THREE.MeshStandardMaterial({ color: '#2B2B2B', metalness: 0.5, roughness: 0.45 }),
      tv: new THREE.MeshStandardMaterial({ color: '#0B0B0C', metalness: 0.2, roughness: 0.12 }),
    };
  }, []);

  return (
    <group>
      {/* floor & ceiling */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, (Z0 + Z1) / 2]} material={m.floor} receiveShadow>
        <planeGeometry args={[W, D]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, (Z0 + Z1) / 2]} material={m.ceiling}>
        <planeGeometry args={[W, D]} />
      </mesh>

      {/* back, front, left walls */}
      <mesh position={[0, H / 2, Z0]} material={m.wall} receiveShadow>
        <planeGeometry args={[W, H]} />
      </mesh>
      <mesh position={[0, H / 2, Z1]} rotation={[0, Math.PI, 0]} material={m.wall} receiveShadow>
        <planeGeometry args={[W, H]} />
      </mesh>
      <mesh position={[X0, H / 2, (Z0 + Z1) / 2]} rotation={[0, Math.PI / 2, 0]} material={m.wall} receiveShadow>
        <planeGeometry args={[D, H]} />
      </mesh>

      {/* right wall built around a floor-to-ceiling steel window */}
      {[
        [Z0, WIN.z0, 0, H],
        [WIN.z1, Z1, 0, H],
        [WIN.z0, WIN.z1, 0, WIN.y0],
        [WIN.z0, WIN.z1, WIN.y1, H],
      ].map(([a, b, y0, y1], i) => (
        <mesh key={i} position={[X1, (y0 + y1) / 2, (a + b) / 2]} rotation={[0, -Math.PI / 2, 0]} material={m.wall} receiveShadow castShadow>
          <planeGeometry args={[b - a, y1 - y0]} />
        </mesh>
      ))}
      {[WIN.z0, (WIN.z0 + WIN.z1) / 2, WIN.z1].map((z) => (
        <mesh key={z} position={[X1, (WIN.y0 + WIN.y1) / 2, z]} material={m.steel} castShadow>
          <boxGeometry args={[0.06, WIN.y1 - WIN.y0, 0.04]} />
        </mesh>
      ))}
      {[WIN.y0, 1.75, WIN.y1].map((y) => (
        <mesh key={y} position={[X1, y, (WIN.z0 + WIN.z1) / 2]} material={m.steel} castShadow>
          <boxGeometry args={[0.06, 0.04, WIN.z1 - WIN.z0]} />
        </mesh>
      ))}
      {/* daylight beyond the glass */}
      <mesh position={[X1 + 2.5, 1.5, -0.1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[9, 6]} />
        <meshBasicMaterial color="#FFF4DF" toneMapped={false} />
      </mesh>
      {/* sheer curtain */}
      <mesh position={[X1 - 0.08, 1.45, WIN.z1 + 0.25]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.6, 2.75]} />
        <meshStandardMaterial color="#F8F3EA" roughness={1} transparent opacity={0.92} side={THREE.DoubleSide} />
      </mesh>

      {/* skirting */}
      <mesh position={[0, 0.05, Z0 + 0.01]} material={m.skirting}>
        <boxGeometry args={[W, 0.1, 0.02]} />
      </mesh>
      <mesh position={[X0 + 0.01, 0.05, (Z0 + Z1) / 2]} material={m.skirting}>
        <boxGeometry args={[0.02, 0.1, D]} />
      </mesh>

      {/* jute rug */}
      <mesh position={[0, 0.006, 0.55]} material={m.rug} receiveShadow>
        <boxGeometry args={[3.3, 0.012, 2.6]} />
      </mesh>

      {/* wall-mounted TV above the Lattice unit */}
      <mesh position={[0, 1.5, Z0 + 0.03]} material={m.tv} castShadow>
        <boxGeometry args={[1.6, 0.92, 0.035]} />
      </mesh>

      <Sofa />
      <Artwork position={[X0 + 0.03, 1.65, -0.4]} rotationY={Math.PI / 2} />

      {/* ceramics styled on the furniture */}
      <Vase position={[-0.72, 0.7, -2.82]} />
      <Vase position={[-0.15, 0.42, 0.15]} scale={0.6} color="#C9B79C" />
      <Vase position={[-3.32, 0.75, -0.95]} scale={0.9} color="#D9CEBC" />
      <mesh position={[0.18, 0.44, 0.0]} castShadow>
        <boxGeometry args={[0.3, 0.04, 0.22]} />
        <meshStandardMaterial color="#E8E1D5" roughness={0.8} />
      </mesh>
    </group>
  );
}
