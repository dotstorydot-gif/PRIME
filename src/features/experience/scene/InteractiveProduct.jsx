import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GLOW = new THREE.Color('#E8C48A');

// Wraps a product model so the whole object is one raycast target:
// hover → warm emissive lift on every surface of that piece only; click → select.
export default function InteractiveProduct({ productId, selected, onHover, onSelect, children, ...groupProps }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const level = useRef(0);
  const mats = useRef([]);

  useEffect(() => {
    const list = new Set();
    ref.current.traverse((o) => {
      if (o.isMesh && o.material && 'emissive' in o.material) list.add(o.material);
    });
    mats.current = [...list];
    mats.current.forEach((m) => m.emissive.copy(GLOW));
  }, []);

  useFrame((_, dt) => {
    const target = hovered ? 0.16 : selected ? 0.1 : 0;
    level.current += (target - level.current) * (1 - Math.exp(-dt * 12));
    for (const m of mats.current) m.emissiveIntensity = level.current;
  });

  return (
    <group
      ref={ref}
      {...groupProps}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(productId, e);
        document.body.style.cursor = 'pointer';
      }}
      onPointerMove={(e) => {
        e.stopPropagation();
        onHover(productId, e);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onHover(null, e);
        document.body.style.cursor = '';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(productId, e);
      }}
    >
      {children}
    </group>
  );
}
