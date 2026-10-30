"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/** Rotating concentric celestial rings with glowing golden runes */
function ConcentricRings() {
  const outerRing = useRef<THREE.Mesh>(null);
  const midRing = useRef<THREE.Mesh>(null);
  const innerRing = useRef<THREE.Mesh>(null);
  const coreLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRing.current) {
      outerRing.current.rotation.z = t * 0.15;
      outerRing.current.rotation.x = Math.sin(t * 0.2) * 0.12;
    }
    if (midRing.current) {
      midRing.current.rotation.z = -t * 0.22;
      midRing.current.rotation.y = Math.cos(t * 0.18) * 0.15;
    }
    if (innerRing.current) {
      innerRing.current.rotation.z = t * 0.35;
    }
    if (coreLight.current) {
      coreLight.current.intensity = 18 + Math.sin(t * 3) * 6;
    }
  });

  return (
    <group>
      {/* Outer Golden Yantra Ring */}
      <mesh ref={outerRing}>
        <torusGeometry args={[2.4, 0.02, 16, 96]} />
        <meshStandardMaterial
          color="#d9a441"
          emissive="#ffe08f"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* 12 Radiating Spokes of the Dharma Chakra */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI) / 6]}>
          <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 2.3, 8]} />
            <meshStandardMaterial
              color="#ffe08f"
              emissive="#d9a441"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[2.4, 0, 0]}>
            <octahedronGeometry args={[0.06, 0]} />
            <meshStandardMaterial
              color="#ff7a2f"
              emissive="#ff4d00"
              emissiveIntensity={1.2}
            />
          </mesh>
        </group>
      ))}

      {/* Middle Concentric Ring */}
      <mesh ref={midRing}>
        <torusGeometry args={[1.5, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#ff7a2f"
          emissive="#ff4d00"
          emissiveIntensity={0.7}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Inner Solar Core Ring */}
      <mesh ref={innerRing}>
        <torusGeometry args={[0.75, 0.03, 16, 48]} />
        <meshStandardMaterial
          color="#ffe08f"
          emissive="#d9a441"
          emissiveIntensity={1.2}
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Center Sacred Surya Gem */}
      <mesh>
        <octahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial
          color="#ffd97a"
          emissive="#ff7a2f"
          emissiveIntensity={1.8}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Center Golden Point Light */}
      <pointLight ref={coreLight} position={[0, 0, 0.5]} distance={8} color="#ffe08f" />
    </group>
  );
}

/** The Full 3D Ramayana Dharma Chakra Seal Canvas */
export default function Ramayana3DSeal() {
  return (
    <div className="relative w-full h-[280px] sm:h-[340px] flex items-center justify-center overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        className="!absolute !inset-0 pointer-events-none"
      >
        <ambientLight intensity={0.5} color="#5a3a1a" />
        <directionalLight position={[3, 4, 5]} intensity={1.5} color="#ffe08f" />
        <directionalLight position={[-3, -2, 3]} intensity={0.8} color="#ff7a2f" />

        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
          <ConcentricRings />
        </Float>

        <Sparkles count={55} scale={[6, 4, 3]} size={2.8} speed={0.4} color="#ffd97a" opacity={0.7} />
        <Sparkles count={30} scale={[5, 3, 2]} size={4} speed={0.25} color="#ff7a2f" opacity={0.5} />
      </Canvas>
    </div>
  );
}