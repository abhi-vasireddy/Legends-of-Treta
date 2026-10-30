"use client";

import { useEffect, useState, useRef } from "react";
import { Compass, Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Chapter {
  id: string;
  num: string;
  label: string;
  coords: string;
  epoch: string;
}

const CHAPTERS: Chapter[] = [
  { id: "hero", num: "00", label: "PROLOGUE", coords: "26.7922° N, 82.1998° E", epoch: "TRETA YUGA" },
  { id: "jobs", num: "01", label: "JOB OFFERS", coords: "28.4089° N, 77.3178° E", epoch: "MRIIRS & MRU DRIVE" },
  { id: "traverse", num: "02", label: "THE SAGA", coords: "25.6874° N, 85.2144° E", epoch: "DHANURBHANGA" },
  { id: "character", num: "03", label: "AVATARA", coords: "13.9167° N, 75.5667° E", epoch: "PARASHURAMA" },
  { id: "realms", num: "04", label: "KINGDOMS", coords: "15.3350° N, 76.4600° E", epoch: "KISHKINDHA & LANKA" },
  { id: "astras", num: "05", label: "ASTRAS", coords: "09.2876° N, 79.3129° E", epoch: "BRAHMASHIRA ARSENAL" },
  { id: "recruitment", num: "06", label: "ENLIST", coords: "HERINOVA GAME STUDIOS", epoch: "JOIN THE QUEST" },
];

export default function ScrollHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Deep Sacred Tanpura drone
      const freqs = [108.0, 162.0, 216.0, 324.0];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.07 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });
    }

    if (audioCtxRef.current && gainNodeRef.current) {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (isMuted) {
        gainNodeRef.current.gain.setTargetAtTime(0.18, audioCtxRef.current.currentTime, 1.2);
        setIsMuted(false);
      } else {
        gainNodeRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.5);
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
      setScrollProgress(progress);

      const sections = CHAPTERS.map((ch) => document.getElementById(ch.id));
      const scrollMiddle = window.scrollY + window.innerHeight * 0.4;

      let currentIdx = 0;
      sections.forEach((el, index) => {
        if (el) {
          const top = el.offsetTop;
          if (scrollMiddle >= top) {
            currentIdx = index;
          }
        }
      });
      setActiveChapterIndex(currentIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, options?: { duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.25 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const active = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <>
      {/* 1. TOP PROGRESS BAR (Glowing gold laser line) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-obsidian/40 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-golddeep via-gold to-ember shadow-[0_0_12px_rgba(255,160,30,0.8)]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ ease: "easeOut", duration: 0.1 }}
        />
      </div>

      {/* 2. KASANE-STYLE STORY RAIL NAVIGATION (Minimal vertical dots on right) */}
      <nav
        aria-label="Story Chapters Rail"
        className="kasane-rail hidden sm:flex pointer-events-auto"
      >
        <div className="text-[8px] uppercase tracking-[0.35em] text-sand/40 font-mono rotate-90 origin-right translate-x-3 mb-6">
          CHAPTERS
        </div>

        {CHAPTERS.map((ch, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              className="group flex items-center gap-3 cursor-pointer py-1 text-right focus:outline-none"
              title={`${ch.num} - ${ch.label}`}
            >
              <span
                className={`text-[9px] font-mono tracking-widest transition-all duration-300 ${
                  isActive
                    ? "text-gold font-semibold translate-x-0 opacity-100"
                    : "text-sand/30 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
                }`}
              >
                {ch.num} {ch.label}
              </span>

              <div
                className={`kasane-rail-dot ${isActive ? "active" : ""}`}
              />
            </button>
          );
        })}
      </nav>

      {/* 3. FIXED BOTTOM TELEMETRY HUD (Kasane signature aesthetic) */}
      <aside
        aria-label="Vedic Telemetry HUD"
        className="fixed bottom-0 left-0 right-0 z-40 px-4 md:px-8 py-3 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent pointer-events-none select-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono tracking-wider text-sand/60">
          
          {/* Coordinates & Region */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <span className="flex items-center gap-1.5 text-gold/80">
              <Compass className="w-3.5 h-3.5 text-gold animate-spin-slower" />
              <span className="font-semibold text-ivory/90">{active.coords}</span>
            </span>
            <span className="hidden md:inline text-sand/30">|</span>
            <span className="hidden md:inline text-sand/50 tracking-[0.2em] uppercase text-[10px]">
              SECTOR: <span className="text-sand/80">{active.epoch}</span>
            </span>
          </div>

          {/* Chapter badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-gold/15 bg-obsidian/70 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-glow" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/80 font-display">
              {active.num} ─ {active.label}
            </span>
          </div>

          {/* Audio toggle & scroll percentage */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <button
              onClick={toggleAudio}
              className="flex items-center gap-2 px-2.5 py-1 rounded border border-sand/20 hover:border-gold/40 bg-bark/60 backdrop-blur-sm text-sand/70 hover:text-gold transition-colors cursor-pointer group"
              title={isMuted ? "Unmute Vedic Atmosphere" : "Mute Sound"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-sand/50 group-hover:text-gold" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-gold animate-pulse" />
              )}
              
              <span className="text-[9px] tracking-widest font-mono">
                {isMuted ? "ATMOSPHERE [OFF]" : "ATMOSPHERE [LIVE]"}
              </span>

              {!isMuted && (
                <span className="flex items-end gap-0.5 h-2.5 ml-0.5">
                  <span className="w-[2px] h-full bg-gold animate-[bounce_0.8s_ease-in-out_infinite]" />
                  <span className="w-[2px] h-2/3 bg-gold animate-[bounce_0.6s_ease-in-out_infinite_0.2s]" />
                  <span className="w-[2px] h-4/5 bg-gold animate-[bounce_0.7s_ease-in-out_infinite_0.1s]" />
                </span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-[9px] tracking-widest text-sand/40">TRAVERSE</span>
              <span className="font-bold text-gold tabular-nums text-xs min-w-[34px] text-right">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
