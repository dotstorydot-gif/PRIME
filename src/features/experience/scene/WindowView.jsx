import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const rad = THREE.MathUtils.degToRad;

// What the windows (all on the +x side) look out on: a city skyline panorama, far enough away
// that it stays still as you walk, behind a balcony parapet that runs along the whole house.
// Source: tools/blender/make_window_view.py. Change the view by replacing the JPG; no re-bake.
const VIEW = { left: 0.683, right: 1.017, bottom: 0.46, height: 0.293 }; // crop of the panorama (0…1)

export default function WindowView() {
  const src = useTexture('/experience/window-view.jpg');
  const ref = useRef();
  const map = useMemo(() => {
    const t = src.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(-(VIEW.right - VIEW.left), VIEW.height); // mirrored: seen from inside the sphere
    t.offset.set(VIEW.right, VIEW.bottom);
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  }, [src]);
  useFrame(({ camera }) => ref.current.position.copy(camera.position));

  return (
    <>
      <mesh ref={ref} raycast={() => null} frustumCulled={false}>
        <sphereGeometry args={[35, 64, 32, Math.PI - rad(75), rad(150), rad(40), rad(66)]} />
        <meshBasicMaterial map={map} side={THREE.BackSide} toneMapped={false} />
      </mesh>
      <group position={[0, 0, -10.2]}>
        <mesh position={[5.0, 0.31, 0]} raycast={() => null}>
          <boxGeometry args={[0.15, 0.62, 40]} />
          <meshBasicMaterial color="#D8CEBF" toneMapped={false} />
        </mesh>
        <mesh position={[4.98, 0.64, 0]} raycast={() => null}>
          <boxGeometry args={[0.26, 0.05, 40]} />
          <meshBasicMaterial color="#EFE8DC" toneMapped={false} />
        </mesh>
        <mesh position={[4.4, -0.02, 0]} raycast={() => null}>
          <boxGeometry args={[1.3, 0.04, 40]} />
          <meshBasicMaterial color="#C2B5A2" toneMapped={false} />
        </mesh>
      </group>
    </>
  );
}
