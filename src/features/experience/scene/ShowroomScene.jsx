import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Html, Lightformer, PerformanceMonitor, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import BakedRoom from './BakedRoom';
import InteractiveProduct from './InteractiveProduct';
import * as Models from './products/ProductModels';
import { HOUSE, STOPS } from '../data/rooms';

const curve = (pts) => new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)), false, 'centripetal');

// progressRef.current ∈ [0,1] comes from GSAP ScrollTrigger: 0 = first stop, 1 = last stop.
// Stops are spread evenly over the scroll; between two stops the camera follows every
// waypoint on the path (e.g. through a doorway), so the walk is one continuous move.
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
  const { posCurve, tgtCurve } = useMemo(
    () => ({ posCurve: curve(HOUSE.path.map((s) => s.pos)), tgtCurve: curve(HOUSE.path.map((s) => s.target)) }),
    []
  );
  const look = useRef(new THREE.Vector3(...HOUSE.path[0].target));
  React.useEffect(() => {
    camera.position.set(...HOUSE.path[0].pos);
    camera.lookAt(look.current);
  }, [camera]);

  // scroll progress -> curve parameter (control point k sits at u = k / (n-1))
  const toU = (prog) => {
    const f = Math.min(Math.max(prog, 0), 1) * (STOPS.length - 1);
    const i = Math.min(Math.floor(f), STOPS.length - 2);
    const a = STOPS[i].pathIndex, b = STOPS[i + 1].pathIndex;
    return (a + (f - i) * (b - a)) / (HOUSE.path.length - 1);
  };

  useFrame((_, dt) => {
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 3);
    p.current += (progressRef.current - p.current) * k;
    const u = toU(p.current);
    posCurve.getPoint(u, pos);
    tgtCurve.getPoint(u, tgt);
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
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#1d2743]/70">Preparing the house</p>
        <div className="mx-auto mt-4 h-[2px] w-48 overflow-hidden bg-[#1d2743]/10">
          <div className="h-full bg-[#B88A5A] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function ShowroomScene({ progressRef, reducedMotion, lowPower, products, selectedId, hoveredId, onHover, onSelect, onView }) {
  const [dpr, setDpr] = React.useState(lowPower ? 1 : 1.5);
  // selection / hover are tracked per placed piece (key), so each of a pair of nightstands is its own target
  const selected = HOUSE.products.find((p) => p.key === selectedId);
  const hovered = HOUSE.products.find((p) => p.key === hoveredId);

  return (
    <Canvas
      shadows={{ type: THREE.PCFSoftShadowMap }}
      dpr={dpr}
      camera={{ fov: 50, near: 0.05, far: 40, position: HOUSE.path[0].pos }}
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
        position={[9, 5.5, -4.8]}
        target-position={[0, 0, -6.6]}
        intensity={3.2}
        color="#FFDDB0"
        castShadow
        shadow-mapSize={lowPower ? [1024, 1024] : [4096, 4096]}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
        shadow-radius={6}
        shadow-camera-left={-13}
        shadow-camera-right={13}
        shadow-camera-top={13}
        shadow-camera-bottom={-13}
        shadow-camera-near={1}
        shadow-camera-far={30}
      />
      {/* soft bounce + sky fill */}
      <hemisphereLight args={['#FFF6EA', '#D9C2A3', 0.7]} />
      {HOUSE.rooms.map((r) => (
        <pointLight key={r.id} position={[r.centre[0], 2.6, r.centre[1]]} intensity={4} distance={7} decay={2} color="#FFE2BD" />
      ))}
      <Environment resolution={lowPower ? 64 : 256} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#FFF1DC" position={[6, 1.5, 0]} rotation-y={-Math.PI / 2} scale={[4, 2.4, 1]} />
        <Lightformer form="rect" intensity={0.6} color="#F3E6D3" position={[0, 3.5, 0]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={0.35} color="#E9D9C2" position={[-6, 1.5, 0]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>

      <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} interactive={!lowPower} />
      {/* the whole house: one Blender-baked shell, rooms joined by doorways */}
      <Suspense fallback={null}>
        <BakedRoom url={HOUSE.glb} />
      </Suspense>
      {/* soft contact shadows where the live product models meet the baked floor, one per room */}
      {HOUSE.rooms.map((r) => (
        <ContactShadows key={r.id} position={[0, 0.002, r.centre[1]]} scale={[7.2, 7]} far={1.2} blur={2.4} opacity={0.55} resolution={1024} frames={1} color="#3a2a1a" />
      ))}

      {HOUSE.products.filter((e) => products[e.id]).map((e) => {
        const Model = Models[e.model];
        return (
          <InteractiveProduct
            key={e.key}
            productId={e.key}
            position={e.position}
            rotation={[0, e.rotationY, 0]}
            selected={selectedId === e.key}
            onHover={onHover}
            onSelect={onSelect}
          >
            <Model />
          </InteractiveProduct>
        );
      })}

      {hovered && hovered.key !== selectedId && <HoverTag entry={hovered} name={products[hovered.id].name} />}
      {selected && (
        <FloatingInfo entry={selected} info={products[selected.id]} onView={() => onView(selected.id)} onClose={() => onSelect(null)} />
      )}
    </Canvas>
  );
}
