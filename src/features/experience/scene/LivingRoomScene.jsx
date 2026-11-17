import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Html, Lightformer, PerformanceMonitor, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import LivingRoomShell from './LivingRoomShell';
import InteractiveProduct from './InteractiveProduct';
import * as Models from './products/LivingProducts';
import { CAMERA_STOPS, LIVING_ROOM_PRODUCTS } from '../data/livingRoom';

const posCurve = new THREE.CatmullRomCurve3(CAMERA_STOPS.map((s) => new THREE.Vector3(...s.pos)), false, 'centripetal');
const tgtCurve = new THREE.CatmullRomCurve3(CAMERA_STOPS.map((s) => new THREE.Vector3(...s.target)), false, 'centripetal');

// progressRef.current ∈ [0,1] comes from GSAP ScrollTrigger.
function CameraRig({ progressRef, reducedMotion, interactive }) {
  const { camera, pointer, size } = useThree();
  const p = useRef(0);

  // portrait phones get a wider lens so the whole room still reads
  React.useEffect(() => {
    camera.fov = size.width < size.height ? 70 : 50;
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const tgt = useMemo(() => new THREE.Vector3(), []);
  const look = useRef(new THREE.Vector3(...CAMERA_STOPS[0].target));

  useFrame((_, dt) => {
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 3);
    p.current += (progressRef.current - p.current) * k;
    posCurve.getPoint(p.current, pos);
    tgtCurve.getPoint(p.current, tgt);
    if (!reducedMotion && interactive) {
      // gentle head-turn with the mouse
      pos.x += pointer.x * 0.08;
      pos.y += pointer.y * 0.04;
    }
    camera.position.lerp(pos, reducedMotion ? 1 : 1 - Math.exp(-dt * 6));
    look.current.lerp(tgt, reducedMotion ? 1 : 1 - Math.exp(-dt * 6));
    camera.lookAt(look.current);
  });
  return null;
}

function FloatingInfo({ entry, info, onView, onClose }) {
  return (
    <Html position={entry.anchor} center zIndexRange={[40, 0]} style={{ pointerEvents: 'auto' }}>
      <div
        className="w-56 -translate-y-1/2 rounded-xl bg-white/95 p-4 text-left shadow-[0_18px_40px_-12px_rgba(29,39,67,0.35)] backdrop-blur animate-fadeIn"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="font-serif text-lg leading-tight text-[#1d2743]">{info.name}</p>
          <button onClick={onClose} aria-label="Close" className="-mr-1 -mt-1 px-1 text-lg leading-none text-[#1d2743]/50 hover:text-[#1d2743]">
            ×
          </button>
        </div>
        <p className="mt-1 text-sm text-[#1C1A18]/80">{info.price}</p>
        <button
          onClick={onView}
          className="mt-3 w-full bg-[#1d2743] py-2 text-[10px] uppercase tracking-[0.22em] text-white hover:bg-[#2a3760]"
        >
          View Product
        </button>
      </div>
    </Html>
  );
}

function HoverTag({ entry, name }) {
  return (
    <Html position={entry.anchor} center zIndexRange={[30, 0]} style={{ pointerEvents: 'none' }}>
      <div className="whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#1d2743] shadow">
        {name}
      </div>
    </Html>
  );
}

export function LoadingVeil() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[#F4EEE5]">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#1d2743]/70">Preparing the living room</p>
        <div className="mx-auto mt-4 h-[2px] w-48 overflow-hidden bg-[#1d2743]/10">
          <div className="h-full bg-[#B88A5A] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function LivingRoomScene({ progressRef, reducedMotion, lowPower, products, selectedId, hoveredId, onHover, onSelect, onView }) {
  const [dpr, setDpr] = React.useState(lowPower ? 1 : 1.5);
  const selected = LIVING_ROOM_PRODUCTS.find((p) => p.id === selectedId);
  const hovered = LIVING_ROOM_PRODUCTS.find((p) => p.id === hoveredId);

  return (
    <Canvas
      shadows={{ type: THREE.PCFSoftShadowMap }}
      dpr={dpr}
      camera={{ fov: 50, near: 0.05, far: 40, position: CAMERA_STOPS[0].pos }}
      gl={{ antialias: !lowPower, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
      }}
      onPointerMissed={() => onSelect(null)}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <color attach="background" args={['#F4EEE5']} />

      {/* Late-afternoon sun through the window */}
      <directionalLight
        position={[9, 5.5, 1.8]}
        intensity={3.2}
        color="#FFDDB0"
        castShadow
        shadow-mapSize={lowPower ? [1024, 1024] : [2048, 2048]}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
        shadow-radius={6}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={1}
        shadow-camera-far={20}
      />
      {/* soft bounce + sky fill */}
      <hemisphereLight args={['#FFF6EA', '#D9C2A3', 0.7]} />
      <pointLight position={[0, 2.6, 0.5]} intensity={4} distance={7} decay={2} color="#FFE2BD" />
      <Environment resolution={lowPower ? 64 : 256} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#FFF1DC" position={[6, 1.5, 0]} rotation-y={-Math.PI / 2} scale={[4, 2.4, 1]} />
        <Lightformer form="rect" intensity={0.6} color="#F3E6D3" position={[0, 3.5, 0]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={0.35} color="#E9D9C2" position={[-6, 1.5, 0]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>

      <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} interactive={!lowPower} />
      <LivingRoomShell />

      {LIVING_ROOM_PRODUCTS.filter((e) => products[e.id]).map((e) => {
        const Model = Models[e.model];
        return (
          <InteractiveProduct
            key={e.id}
            productId={e.id}
            position={e.position}
            rotation={[0, e.rotationY, 0]}
            selected={selectedId === e.id}
            onHover={onHover}
            onSelect={onSelect}
          >
            <Model />
          </InteractiveProduct>
        );
      })}

      {hovered && hovered.id !== selectedId && <HoverTag entry={hovered} name={products[hovered.id].name} />}
      {selected && (
        <FloatingInfo entry={selected} info={products[selected.id]} onView={() => onView(selected.id)} onClose={() => onSelect(null)} />
      )}
    </Canvas>
  );
}
