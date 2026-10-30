"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, MoveRight, Swords, Sparkles, GraduationCap } from "lucide-react";

const ArrowScene = dynamic(() => import("@/components/three/ArrowScene"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      
      {/* 1. ATMOSPHERE BACKDROP WITH CINEMATIC LIGHTING */}
      <div className="absolute inset-0">
        <Image
          src="/images/legends_of_treta_parashurama.jpg"
          alt="Legends of Treta - Parashurama"
          fill
          priority
          className="cinematic-img object-cover opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/90 via-obsidian/65 to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(217,164,65,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_70%,rgba(164,19,60,0.1),transparent_60%)]" />
      </div>

      {/* 2. 3D WEBGL ARROW & CELESTIAL RINGS SCENE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ArrowScene />
      </div>

      {/* 3. HERO CONTENT CONTAINER (Kasane signature high-impact typography) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 py-20 text-center flex flex-col items-center">
        
        {/* CAMPUS COLLABORATION PILL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 backdrop-blur-md"
        >
          <GraduationCap className="w-3.5 h-3.5 text-gold" />
          <span className="font-mono text-[10px] md:text-xs font-bold tracking-[0.22em] text-goldbright uppercase">
            CAMPUS RECRUITMENT DRIVE // MRIIRS &amp; MRU
          </span>
        </motion.div>

        {/* SANSKRIT PRELUDE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-sanskrit text-base md:text-xl text-gold/90 tracking-widest mb-3"
        >
          धर्मो रक्षति रक्षितः · त्रेतायुगस्य महाख्यानम्
        </motion.p>

        {/* KASANE-SCALE GIANT HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.92] text-ivory uppercase"
        >
          <span className="block font-mono text-xs sm:text-sm md:text-base font-bold tracking-[0.3em] text-gold/90 mb-3 uppercase">
            HERINOVA GAME STUDIOS presents
          </span>
          <span className="text-gold-gradient">LEGENDS OF TRETA</span>
        </motion.h1>

        {/* CLASSIFIED SPEC BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono tracking-widest text-sand/80"
        >
          <span className="px-3 py-1 rounded bg-gold/15 text-goldbright border border-gold/30">
            CHARACTER 02: PARASHURAMA
          </span>
          <span className="hidden sm:inline text-sand/40">•</span>
          <span className="text-sand/70">UNREAL ENGINE 5 AAA RPG</span>
          <span className="hidden sm:inline text-sand/40">•</span>
          <span className="text-gold">7 ROLES LIVE</span>
        </motion.div>

        {/* LORE STATEMENT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-sand/85 font-light leading-relaxed"
        >
          The ancient Treta Yuga awakened. Its divine spirits stayed.
          Carve your name into India&apos;s premier mythical AAA action RPG — hiring top creative &amp;
          engineering talent from <strong className="text-goldbright font-semibold">MRIIRS</strong> &amp;{" "}
          <strong className="text-goldbright font-semibold">MRU</strong>.
        </motion.p>

        {/* HERO CTA BUTTONS — DEDICATED JOB REGISTRATION & RECRUITMENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#jobs"
            className="btn-gold group inline-flex items-center gap-3 rounded-full px-9 py-4 font-display text-xs font-bold tracking-[0.2em] shadow-[0_0_30px_rgba(217,164,65,0.4)]"
          >
            <Swords className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
            <span>BROWSE 7 JOB OFFERS</span>
            <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-job-apply"));
              const el = document.getElementById("jobs");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-ghost inline-flex items-center gap-3 rounded-full px-8 py-4 font-display text-xs font-bold tracking-[0.2em] border-gold/40 text-gold hover:bg-gold/15 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span>REGISTER / APPLY FOR JOB ↗</span>
          </button>
        </motion.div>

        {/* 7 ROLES LIVE STATUS STRIP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 pt-6 border-t border-sand/15 w-full max-w-4xl flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-sand/60 uppercase tracking-widest"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            <span>C# &amp; GAMEPLAY ENGINE</span>
          </span>
          <span className="text-sand/30">|</span>
          <span>FULLSTACK WEB ARCHITECT</span>
          <span className="text-sand/30">|</span>
          <span>3D CHARACTER &amp; NANITE</span>
          <span className="text-sand/30">|</span>
          <span>VEDIC SCRIPT &amp; LORE</span>
          <span className="text-sand/30">|</span>
          <span>COMBAT ANIMATOR</span>
        </motion.div>


      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <motion.a
        href="#traverse"
        aria-label="Scroll down to begin saga"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gold/70 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] font-mono tracking-widest text-sand/60 uppercase">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold" />
      </motion.a>

    </section>
  );
}
