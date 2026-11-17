import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const DRACO = '/draco/';

// The room is rendered offline in Blender (Cycles path tracing: global illumination,
// soft shadows, cove + downlights + daylight) and the lighting is baked into its
// textures. Here it is shown exactly as baked: unlit materials, no real-time lighting.
export default function BakedRoom({ url }) {
  const { scene } = useGLTF(url, DRACO);

  const room = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((o) => {
      if (!o.isMesh) return;
      const src = o.material;
      const map = src.map || null;
      if (map) {
        map.colorSpace = THREE.SRGBColorSpace;
        map.anisotropy = 8;
      }
      // baked surfaces and light sources (EMIT_*) are both shown exactly as rendered
      o.material = new THREE.MeshBasicMaterial({ map, color: map ? 0xffffff : src.color, toneMapped: false });
      o.raycast = () => null; // the room itself is never a click target
    });
    return root;
  }, [scene]);

  return <primitive object={room} />;
}

export const preloadRoom = (url) => useGLTF.preload(url, DRACO);
