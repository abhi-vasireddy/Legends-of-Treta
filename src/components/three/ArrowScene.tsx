"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─── Sacred geometry rings ─── */
function SacredRing({ radius, speed, axis, color, opacity = 0.6 }: {
  radius: number; speed: number; axis: [number, number, number];
  color: string; opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += axis[0] * speed;
    ref.current.rotation.y += axis[1] * speed;
    ref.current.rotation.z += axis[2] * speed;
    (ref.current.material as THREE.MeshStandardMaterial).opacity = opacity + Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
  });
  return (
    <mesh ref={ref} position={[0, 0, -1.8]}>
      <torusGeometry args={[radius, 0.008, 16, 128]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0.2}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

/* ─── Orbiting ember particles ─── */
function OrbitingEmbers({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) s[i] = 0.02 + Math.random() * 0.04;
    return s;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ff7a2f"
        size={0.045}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Volumetric light cone ─── */
function GodRay() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.04 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, 3, -3]} rotation={[0, 0, -0.2]}>
      <coneGeometry args={[3, 8, 32, 1, true]} />
      <meshBasicMaterial
        color="#ffb347"
        transparent
        opacity={0.05}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/** The divine arrow of Kodanda — gold shaft, burning head, ember fletching. */
function DivineArrow() {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const haloOuter = useRef<THREE.Mesh>(null);
  const headGlow = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const g = group.current;
    if (g) {
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.35, 0.045);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.22, 0.045);
      g.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
    }
    if (halo.current) halo.current.rotation.z += 0.0016;
    if (haloOuter.current) haloOuter.current.rotation.z -= 0.0009;
    if (headGlow.current) {
      headGlow.current.intensity = 26 + Math.sin(state.clock.elapsedTime * 2.5) * 8;
    }
  });

  return (
    <>
      {/* halo rings behind the arrow */}
      <mesh ref={halo} position={[0, 0, -1.4]}>
        <torusGeometry args={[2.15, 0.01, 12, 96]} />
        <meshStandardMaterial
          color="#d9a441"
          emissive="#ff9a1f"
          emissiveIntensity={1.1}
          metalness={1}
          roughness={0.25}
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh ref={haloOuter} position={[0, 0, -1.6]} rotation={[0.2, 0.4, 0]}>
        <torusGeometry args={[2.7, 0.006, 12, 96]} />
        <meshStandardMaterial
          color="#a4133c"
          emissive="#ff4d00"
          emissiveIntensity={0.6}
          transparent
          opacity={0.45}
        />
      </mesh>

      <Float speed={1.4} rotationIntensity={0.22} floatIntensity={0.55}>
        <group ref={group} rotation={[0, 0, -0.38]}>
          {/* shaft */}
          <mesh>
            <cylinderGeometry args={[0.024, 0.024, 3.5, 16]} />
            <meshStandardMaterial
              color="#caa144"
              metalness={0.95}
              roughness={0.28}
              emissive="#ff9a1f"
              emissiveIntensity={0.28}
            />
          </mesh>

          {/* arrowhead */}
          <mesh position={[0, 1.92, 0]}>
            <coneGeometry args={[0.095, 0.46, 24]} />
            <meshStandardMaterial
              color="#ffd97a"
              metalness={1}
              roughness={0.12}
              emissive="#ffb347"
              emissiveIntensity={1.05}
            />
          </mesh>

          {/* collar rings */}
          {[1.58, 1.66].map((y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.05, 0.009, 10, 32]} />
              <meshStandardMaterial
                color="#ffe08f"
                metalness={1}
                roughness={0.2}
                emissive="#ffb347"
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}

          {/* fletching — three ember fins */}
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]} position={[0, -1.42, 0]}>
              <mesh position={[0.11, 0.05, 0]} rotation={[0, 0, -0.16]}>
                <boxGeometry args={[0.02, 0.62, 0.2]} />
                <meshStandardMaterial
                  color="#a4133c"
                  emissive="#ff4d00"
                  emissiveIntensity={0.55}
                  metalness={0.4}
                  roughness={0.4}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          ))}

          {/* nock gem */}
          <mesh position={[0, -1.78, 0]}>
            <octahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial
              color="#ffdf8e"
              emissive="#ff7a2f"
              emissiveIntensity={1.4}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* lights that travel with the arrow */}
          <pointLight ref={headGlow} position={[0, 1.95, 0]} intensity={26} distance={5.5} color="#ffb347" />
          <pointLight position={[0, -1.7, 0]} intensity={12} distance={4} color="#ff4d00" />
        </group>
      </Float>
    </>
  );
}

export default function ArrowScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
    >
      <ambientLight intensity={0.35} color="#5a3a1a" />
      <directionalLight position={[4, 3, 6]} intensity={1.4} color="#ffe0b0" />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} color="#a4133c" />

      {/* Volumetric god ray effect */}
      <GodRay />

      {/* Sacred geometry orbit rings */}
      <SacredRing radius={3.2} speed={0.001} axis={[0.3, 1, 0.1]} color="#d9a441" opacity={0.22} />
      <SacredRing radius={3.8} speed={0.0007} axis={[-0.1, 0.8, 0.3]} color="#ff7a2f" opacity={0.14} />
      <SacredRing radius={4.4} speed={0.0004} axis={[0.15, -0.5, 0.6]} color="#a4133c" opacity={0.08} />

      {/* Stars and sparkles */}
      <Stars radius={42} depth={26} count={1400} factor={2.2} saturation={0.4} fade speed={0.5} />
      <Sparkles count={130} scale={[9, 5.5, 4]} size={2.6} speed={0.32} color="#ffcf6b" opacity={0.65} />
      <Sparkles count={50} scale={[7, 4, 3]} size={5} speed={0.18} color="#ff4d00" opacity={0.4} />
      <Sparkles count={80} scale={[12, 7, 5]} size={1.8} speed={0.12} color="#ffe08f" opacity={0.3} />

      {/* Orbiting ember particles */}
      <OrbitingEmbers count={50} />

      <DivineArrow />
    </Canvas>
  );
}
