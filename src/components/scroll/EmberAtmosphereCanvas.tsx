"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
  hue: number;
  glow: number;
}

export default function EmberAtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Generate floating golden sacred embers
    const PARTICLE_COUNT = 48;
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 1.0,
        baseVx: (Math.random() - 0.5) * 0.4,
        baseVy: -(Math.random() * 0.4 + 0.3), // gentle upward float
        vx: 0,
        vy: 0,
        alpha: Math.random() * 0.6 + 0.3,
        phase: Math.random() * Math.PI * 2,
        hue: 38 + Math.random() * 12, // Gold / Warm Amber (38-50)
        glow: Math.random() * 8 + 4,
      });
    }

    let scrollVelocity = 0;
    const onScrollUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ velocity: number; scrollY: number }>;
      if (customEvent.detail) {
        scrollVelocity = customEvent.detail.velocity;
      }
    };
    window.addEventListener("kasane-scroll-update", onScrollUpdate);

    let rafId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(32, time - lastTime) / 1000;
      lastTime = time;

      // Dampen velocity smoothly
      scrollVelocity *= 0.94;

      ctx.clearRect(0, 0, width, height);

      // Render each particle with golden luminescence
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Combine ambient swirl with scroll-induced velocity stream
        p.phase += dt * 1.5;
        const swirlX = Math.sin(p.phase) * 0.6;
        const swirlY = Math.cos(p.phase * 0.8) * 0.3;

        // When scrolling down, embers stream dynamically upward/downward
        const dynamicVy = p.baseVy - scrollVelocity * 8;
        const dynamicVx = p.baseVx + swirlX - scrollVelocity * swirlY * 3;

        p.x += dynamicVx * dt * 60;
        p.y += dynamicVy * dt * 60;

        // Wrap around viewport edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Dynamic pulse glow
        const pulse = 0.75 + Math.sin(p.phase * 2) * 0.25;
        const currentAlpha = Math.min(1, Math.max(0.1, p.alpha * pulse));

        // Draw radial glow for Kasane-style atmospheric lighting
        const rad = p.size * (1 + Math.abs(scrollVelocity) * 0.4);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${currentAlpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 55%, 0.9)`;
        ctx.shadowBlur = p.glow * (1 + Math.min(2, Math.abs(scrollVelocity)));
        ctx.fill();

        // Optional tiny spark streak when scrolling fast
        if (Math.abs(scrollVelocity) > 0.4) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - dynamicVx * 2.5, p.y - dynamicVy * 2.5);
          ctx.strokeStyle = `hsla(${p.hue}, 100%, 75%, ${currentAlpha * 0.5})`;
          ctx.lineWidth = rad * 0.6;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("kasane-scroll-update", onScrollUpdate);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-80"
      aria-hidden="true"
    />
  );
}
