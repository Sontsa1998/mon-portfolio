"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Deterministic pseudo-random in [0, 1), keeps particle generation a pure function of its index.
function hash(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const count = 900;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (hash(i * 3 + 1) - 0.5) * 10;
      arr[i * 3 + 1] = (hash(i * 3 + 2) - 0.5) * 10;
      arr[i * 3 + 2] = (hash(i * 3 + 3) - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      mouse.current.y * 0.15,
      0.03,
    );
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      pointsRef.current.rotation.y + mouse.current.x * 0.02,
      0.03,
    );
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

export function HeroParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ParticleField />
    </Canvas>
  );
}
