"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Kasane-calibrated Lenis inertia momentum physics
    // Native coordinate alignment with smooth damping curve
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    // Expose lenis globally for interactive programmatic scrubbing and HUD jumps
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    // Track scroll velocity for atmospheric particles & dynamic HUD
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;

    const onScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max(16, now - lastTime);
      
      const delta = (currentY - lastY) / dt;
      velocity = velocity * 0.72 + Math.min(2.5, Math.max(-2.5, delta)) * 0.28;
      
      lastY = currentY;
      lastTime = now;

      // Broadcast velocity for atmospheric embers and 3D scenes
      window.dispatchEvent(
        new CustomEvent("kasane-scroll-update", {
          detail: {
            scrollY: currentY,
            velocity,
          },
        })
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
