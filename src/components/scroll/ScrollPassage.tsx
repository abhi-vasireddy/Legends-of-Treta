"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Flame, Compass, ArrowRight, Crosshair } from "lucide-react";

interface PassageChapter {
  phase: string;
  sanskritTitle: string;
  englishTitle: string;
  tagline: string;
  description: string;
  lore: string;
  image: string;
  stats: { label: string; val: string }[];
  accent: string;
}

const CHAPTERS: PassageChapter[] = [
  {
    phase: "01",
    sanskritTitle: "धनुर्भङ्ग",
    englishTitle: "THE SHATTERING OF PINAKA",
    tagline: "JANAKPUR // THE CELESTIAL TRIAL",
    description: "The divine bow of Lord Shiva, heavy as Mount Meru, untouched by mortal hands for millennia until the prince of Ayodhya stepped onto the dais.",
    lore: "When Rama lifted the celestial arc, the three worlds trembled; the string resonated with thunder that echoed through every dimension of creation.",
    image: "/images/realm-ayodhya.jpg",
    accent: "from-gold/30 via-gold to-amber-500",
    stats: [
      { label: "BURDEN", val: "MERU MASS" },
      { label: "ORIGIN", val: "KAILASH" },
      { label: "TRIAL", val: "SVAYAMVARA" },
    ],
  },
  {
    phase: "02",
    sanskritTitle: "दण्डकारण्य",
    englishTitle: "THE SHADOWS OF DANDAKA",
    tagline: "GODAVARI BASIN // FOURTEEN YEARS OF EXILE",
    description: "Deep within uncharted primeval canopies, demonic legions stalk the twilight. A hermitage of ascetics defended solely by two divine archers.",
    lore: "Here the veil between realms grows translucent; nocturnal rakshasas conjure illusions of golden gazelles and thunder clouds that rain obsidian spears.",
    image: "/images/archer.jpg",
    accent: "from-ember/30 via-ember to-flame",
    stats: [
      { label: "BIOME", val: "ANCIENT CANOPY" },
      { label: "ENEMY", val: "14,000 HORDE" },
      { label: "SANCTUM", val: "PANCHAVATI" },
    ],
  },
  {
    phase: "03",
    sanskritTitle: "सेतुबन्धन",
    englishTitle: "THE FLOATING STONE BRIDGE",
    tagline: "RAMESWARAM TO LANKA // THE IMPOSSIBLE SPAN",
    description: "Defying the laws of physics, the Vanara architects inscribed the holy syllable 'RAMA' upon granite boulders, causing volcanic rock to float upon the churning surf.",
    lore: "One hundred yojanas across the tempestuous ocean, constructed stone by stone in five days by monkeys, bears, and the will of the cosmic order.",
    image: "/images/realm-kishkindha.jpg",
    accent: "from-emerald-500/30 via-emerald-400 to-teal-400",
    stats: [
      { label: "SPAN", val: "100 YOJANAS" },
      { label: "ENGINEERS", val: "NALA & NILA" },
      { label: "SPEED", val: "5 CYCLES" },
    ],
  },
  {
    phase: "04",
    sanskritTitle: "ब्रह्मशिरा",
    englishTitle: "THE SOLAR IGNITION",
    tagline: "CITADEL OF RAVANA // THE WAR FOR DHARMA",
    description: "The ten-headed sovereign of the golden city summons cosmic storms, while Rama draws the Brahmashira Astra — an arrow forged with the primordial fire of suns.",
    lore: "The missile carried the feathers of Garuda, the head of Agni, and the inexorable destiny of time itself, piercing the heart that had conquered the three worlds.",
    image: "/images/realm-lanka.jpg",
    accent: "from-crimson via-flame to-goldbright",
    stats: [
      { label: "WEAPON", val: "BRAHMASHIRA" },
      { label: "TARGET", val: "DECACROWN" },
      { label: "RESOLUTION", val: "DHARMA REBORN" },
    ],
  },
];

export default function ScrollPassage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress through this pinned 400vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background camera travel & zoom
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.45]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const portalY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const portalRotateZ = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Opacity curves for 4 sequential chapters
  const op0 = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 1, 0]);
  const op1 = useTransform(scrollYProgress, [0.22, 0.28, 0.45, 0.52], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.48, 0.55, 0.72, 0.78], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.74, 0.82, 1], [0, 1, 1]);

  const y0 = useTransform(scrollYProgress, [0, 0.22], [0, -40]);
  const y1 = useTransform(scrollYProgress, [0.22, 0.32, 0.48], [40, 0, -40]);
  const y2 = useTransform(scrollYProgress, [0.48, 0.58, 0.75], [40, 0, -40]);
  const y3 = useTransform(scrollYProgress, [0.75, 0.85], [40, 0]);

  const opacities = [op0, op1, op2, op3];
  const yTransforms = [y0, y1, y2, y3];

  return (
    <section
      id="traverse"
      ref={containerRef}
      className="relative h-[380vh] bg-obsidian text-ivory"
    >
      {/* PINNED VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* ATMOSPHERIC 3D CANVAS BACKGROUND */}
        <motion.div
          className="absolute inset-0 pointer-events-none origin-center"
          style={{ scale: bgScale, rotate: bgRotate }}
        >
          <Image
            src="/images/hero-atmos.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25 brightness-75 contrast-125"
          />
          {/* Depth gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,164,65,0.12),transparent_70%)]" />
        </motion.div>

        {/* 3D PORTAL RINGS & SANSKRIT RUNES (Kasane-style sacred geometry rotating in space) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div
            className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-gold/15 flex items-center justify-center relative"
            style={{ y: portalY, rotate: portalRotateZ }}
          >
            {/* Outer dotted orbit */}
            <div className="absolute inset-0 rounded-full border border-dashed border-sand/20" />
            
            {/* Inner mandala rings */}
            <div className="w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full border border-gold/25 flex items-center justify-center">
              <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-ember/20" />
            </div>

            {/* Orbiting Sanskrit Glyphs */}
            <div className="absolute top-4 text-xs font-sanskrit text-gold/60 tracking-widest">
              धर्मो रक्षति रक्षितः
            </div>
            <div className="absolute bottom-4 text-xs font-sanskrit text-gold/60 tracking-widest">
              सत्यमेव जयते
            </div>
            <div className="absolute left-4 -rotate-90 text-xs font-sanskrit text-ember/60 tracking-widest">
              यतो धर्मस्ततो जयः
            </div>
            <div className="absolute right-4 rotate-90 text-xs font-sanskrit text-ember/60 tracking-widest">
              अहिंसा परमो धर्मः
            </div>
          </motion.div>
        </div>

        {/* TOP SECTION HEADER INSIDE PINNED CONTAINER */}
        <div className="relative z-20 pt-8 px-6 md:px-14 flex items-center justify-between border-b border-sand/10 pb-4 bg-obsidian/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest bg-gold/15 text-goldbright border border-gold/40 uppercase">
              RAMAYANA REALM ENGINE // TRETA YUGA
            </span>
            <span className="text-xs text-sand/80 font-mono tracking-wider hidden sm:inline">
              THE SACRED CHRONICLES (चार युग — त्रेता साम्राज्यम्)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-sand/50">
            <Crosshair className="w-3.5 h-3.5 text-gold animate-spin-slow" />
            <span className="tracking-widest">SCROLL TO TRAVEL</span>
          </div>
        </div>

        {/* CENTER CONTENT: THE 4 CHAPTER CARDS (Scrubbed smoothly by scroll) */}
        <div className="relative z-20 flex-1 flex items-center justify-center px-6 md:px-14 py-6">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT / CENTER: Dynamic Text Container */}
            <div className="lg:col-span-7 relative min-h-[380px] flex items-center">
              {CHAPTERS.map((chap, idx) => {
                return (
                  <motion.div
                    key={chap.phase}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                    style={{
                      opacity: opacities[idx],
                      y: yTransforms[idx],
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl md:text-5xl font-mono font-bold text-gold/80 tracking-tighter">
                        {chap.phase}
                      </span>
                      <div className="h-[2px] w-12 bg-gradient-to-r from-gold to-transparent" />
                      <span className="text-xs font-mono tracking-[0.25em] text-sand/70 uppercase">
                        {chap.tagline}
                      </span>
                    </div>

                    <div className="mb-2">
                      <div className="text-sm font-sanskrit text-gold/90 tracking-widest mb-1">
                        {chap.sanskritTitle}
                      </div>
                      <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-ivory">
                        {chap.englishTitle}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-sand/90 font-light leading-relaxed max-w-xl mb-4">
                      {chap.description}
                    </p>

                    <blockquote className="border-l-2 border-gold/40 pl-4 py-1 italic text-xs sm:text-sm text-sand/60 max-w-lg mb-6">
                      &ldquo;{chap.lore}&rdquo;
                    </blockquote>

                    {/* Technical / Game Specs pill row */}
                    <div className="flex flex-wrap gap-3">
                      {chap.stats.map((st) => (
                        <div
                          key={st.label}
                          className="px-3 py-1.5 rounded border border-sand/15 bg-bark/60 backdrop-blur-sm text-left"
                        >
                          <div className="text-[9px] font-mono tracking-widest text-sand/50 uppercase">
                            {st.label}
                          </div>
                          <div className="text-xs font-mono font-bold text-gold">
                            {st.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT: 3D Tilting Cinematic Visual Slate with Layered Cutouts */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full aspect-[4/5] max-w-[420px] rounded-2xl overflow-hidden border border-sand/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-bark/80 backdrop-blur-xl group">
                
                {/* Crossfading images for each chapter */}
                {CHAPTERS.map((chap, idx) => (
                  <motion.div
                    key={chap.phase}
                    className="absolute inset-0"
                    style={{ opacity: opacities[idx] }}
                  >
                    <Image
                      src={chap.image}
                      alt={chap.englishTitle}
                      fill
                      sizes="(max-width: 768px) 90vw, 650px"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 to-transparent" />
                  </motion.div>
                ))}

                {/* HUD Overlay inside card frame */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-sand/70 z-10 pointer-events-none">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    LIVE VIEWPORT
                  </span>
                  <span className="border border-sand/20 px-2 py-0.5 rounded bg-obsidian/50">
                    4K REALISTIC
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                  <div className="text-[10px] font-mono tracking-widest text-gold/80 mb-0.5">
                    ARCHIVAL RECORD
                  </div>
                  <div className="text-sm font-display font-semibold text-ivory">
                    VALMIKI CODEX // ARCHIVE 07
                  </div>
                </div>

                {/* Corner reticle marks */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold/60 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold/60 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold/60 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold/60 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM HUD SCRUBBER BAR INSIDE PINNED SECTION */}
        <div className="relative z-20 pb-6 px-6 md:px-14 border-t border-sand/10 pt-4 bg-obsidian/40 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* 4 Interactive Chapter Pills */}
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto w-full sm:w-auto">
              {CHAPTERS.map((c, idx) => (
                <div
                  key={c.phase}
                  className="flex items-center gap-2 px-3 py-1.5 rounded border border-sand/15 bg-bark/40 text-xs font-mono"
                >
                  <span className="text-gold font-bold">{c.phase}</span>
                  <span className="text-sand/70 text-[11px] truncate max-w-[120px]">
                    {c.sanskritTitle}
                  </span>
                </div>
              ))}
            </div>

            {/* Scroll indicator prompt */}
            <div className="flex items-center gap-3 text-xs font-mono text-sand/50">
              <span className="w-2 h-2 rounded-full bg-gold/70 animate-ping" />
              <span>CONTINUE SCROLLING TO ADVANCE SAGA</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
