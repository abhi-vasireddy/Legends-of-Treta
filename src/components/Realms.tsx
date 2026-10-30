"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Hammer, Telescope, Flame, ChevronRight, X, Sparkles, MapPin, Layers } from "lucide-react";

interface Realm {
  id: string;
  num: string;
  name: string;
  sanskrit: string;
  epoch: string;
  density: string;
  micro: string;
  image: string;
  tagline: string;
  desc: string;
  architecture: string;
  engine: string;
  stats: { label: string; value: string }[];
  accent: string;
}

const REALMS: Realm[] = [
  {
    id: "ayodhya",
    num: "01",
    name: "AYODHYA",
    sanskrit: "अयोध्या · सूर्यवंशपीठम्",
    epoch: "THRONE OF DAWN // CAPITAL",
    density: "DHARMA DENSITY: MAXIMUM",
    micro: "The Unconquerable Sun Capital",
    image: "/images/realm-ayodhya.jpg",
    tagline: "The Unconquerable Golden Citadel of the Solar Dynasty",
    desc: "A living city-builder and open-world epicenter. Experience 7-layer concentric white-marble fortifications, soaring spires of Surya temples, and the serene holy Sarayu River.",
    architecture: "Concentric octagonal Vastu Shastra layout, 12 fortified gateways guarded by solar archers, and subterranean armories housing celestial Astras.",
    engine: "UE5 Nanite geometry with 400,000 real-time simulated Vedic citizens driven by custom Dharma-utility AI state machines.",
    stats: [
      { label: "SCALE", value: "12 YOJANAS" },
      { label: "DEFENSE", value: "7 PRAKARA WALLS" },
      { label: "POPULATION", value: "400K CITIZENS" },
      { label: "TECH", value: "NANITE + LUMEN" },
    ],
    accent: "from-amber-500/20 to-yellow-600/10",
  },
  {
    id: "kishkindha",
    num: "02",
    name: "KISHKINDHA",
    sanskrit: "किष्किन्धा · वानरराज्यम्",
    epoch: "VERTICAL CHASM // CANOPY",
    density: "TERRAIN: VERTICAL BIOME",
    micro: "Where the mountain awakens",
    image: "/images/realm-kishkindha.jpg",
    tagline: "The Vertical Cavern-Citadel of the Wind Gods",
    desc: "Traversal-action through a towering vertical jungle kingdom. Swing, climb, wall-run, and wage guerrilla warfare across colossal moss-covered monoliths and roaring subterranean cascades.",
    architecture: "Subterranean basalt throne rooms illuminated by bioluminescent flora, colossal ropeway spans, and cliffside shrines carved into living rock.",
    engine: "Advanced procedural parkour traversal system with dynamic branch momentum physics and vertical volumetric mist simulation.",
    stats: [
      { label: "ELEVATION", value: "3,200 METERS" },
      { label: "VANARA SENA", value: "72 DIVINE LEGIONS" },
      { label: "TRAVERSAL", value: "DYNAMIC MOMENTUM" },
      { label: "SANCTUARY", value: "PAMPA LAKE SHORE" },
    ],
    accent: "from-emerald-500/20 to-teal-600/10",
  },
  {
    id: "lanka",
    num: "03",
    name: "LANKA",
    sanskrit: "लङ्का · त्रिकूटशिखरम्",
    epoch: "OBSIDIAN CITADEL // FORTRESS",
    density: "RAKSHASA SURGE: CRITICAL",
    micro: "The Citadel of Ten Crowns",
    image: "/images/realm-lanka.jpg",
    tagline: "The Impregnable Golden Island of the Asura King",
    desc: "A floating ocean-encircled titan fortress atop Mount Trikuta. Guarded by storm barriers, magnetic reef vortexes, and dark sorcery towers powered by captured planetary alignments.",
    architecture: "Black obsidian foundations fused with molten gold filigree, subterranean alchemical forges, and multi-tiered ramparts capable of repelling cosmic armies.",
    engine: "Global destruction physics allowing walls, spires, and bridges to shatter dynamically under Astra impact.",
    stats: [
      { label: "ISLAND CITADEL", value: "TRIKUTA PEAK" },
      { label: "BARRIER TECH", value: "PLANETARY SORCERY" },
      { label: "DESTRUCTION", value: "FULL CHAOS UE5" },
      { label: "COMMANDER", value: "DASANANA RAVANA" },
    ],
    accent: "from-rose-500/20 to-red-600/10",
  },
];

export default function Realms() {
  const [activeModal, setActiveModal] = useState<Realm | null>(null);

  return (
    <section
      id="realms"
      className="relative min-h-screen py-24 md:py-36 bg-obsidian text-ivory overflow-hidden border-t border-sand/15"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(217,164,65,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER (Kasane #districts headline style) */}
        <div className="border-b border-sand/15 pb-8 mb-16">
          <div className="flex items-center gap-3 text-xs font-mono text-sand/60 tracking-[0.25em] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span>04 / SACRED REALMS</span>
            <span>—</span>
            <span className="text-gold/90 font-bold">THE CONTINENT OF BHARAT</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-ivory">
              EXPLORE SACRED<br />
              <span className="text-gold-gradient font-light italic font-serif">Frontiers &amp; Citadels.</span>
            </h2>
            <p className="max-w-md text-sm sm:text-base text-sand/80 font-light leading-relaxed">
              Every yojana of this earth holds divine memory. From the golden spires of Ayodhya
              to the mist-shrouded chasms of Kishkindha and the burning basalt walls of Lanka.
            </p>
          </div>
        </div>

        {/* 3-CARD DISTRICT GRID (Kasane district-grid style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REALMS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveModal(r)}
              className="group relative rounded-2xl overflow-hidden border border-sand/20 bg-coal/80 text-left cursor-pointer transition-all duration-500 hover:border-gold/60 hover:shadow-[0_20px_50px_rgba(217,164,65,0.2)] focus:outline-none flex flex-col justify-between aspect-[3/4]"
            >
              {/* Background Artwork with Zoom on Hover */}
              <div className="absolute inset-0">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-transparent" />
              </div>

              {/* Card Top: Code & Density Pill */}
              <div className="relative z-10 p-6 flex items-start justify-between text-[10px] font-mono tracking-widest text-sand/80">
                <span className="border border-sand/20 px-2 py-0.5 rounded bg-obsidian/70">
                  {r.num} — {r.id.toUpperCase()}
                </span>
                <span className="text-gold font-bold bg-gold/15 px-2.5 py-0.5 rounded border border-gold/30">
                  {r.density}
                </span>
              </div>

              {/* Card Bottom: Realm Name & CTA */}
              <div className="relative z-10 p-6 border-t border-sand/15 bg-obsidian/70 backdrop-blur-md">
                <p className="text-[10px] font-mono text-sand/60 tracking-widest uppercase mb-1">
                  {r.micro}
                </p>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-ivory tracking-tight group-hover:text-goldbright transition-colors mb-1">
                  {r.name}
                </h3>
                <p className="text-xs font-sanskrit text-gold/90 mb-3">
                  {r.sanskrit}
                </p>

                <div className="flex items-center justify-between text-xs font-mono text-gold pt-2 border-t border-sand/10">
                  <span className="tracking-widest">ENTER REALM</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </div>

              {/* Corner reticles */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold/60" />
            </button>
          ))}
        </div>

      </div>

      {/* DETAILED REALM INSPECTION MODAL */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gold/40 bg-coal p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-sand/20 hover:border-gold bg-bark/60 text-sand hover:text-gold flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-gold tracking-widest uppercase mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>REALM DOSSIER // {activeModal.epoch}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-display font-black text-ivory mb-2">
                {activeModal.name}
              </h3>
              <p className="text-sm font-sanskrit text-gold/90 mb-6">
                {activeModal.sanskrit}
              </p>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-sand/20">
                <Image
                  src={activeModal.image}
                  alt={activeModal.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              </div>

              <p className="text-base text-sand/90 font-light leading-relaxed mb-6">
                {activeModal.desc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {activeModal.stats.map((s) => (
                  <div key={s.label} className="p-3 rounded-xl border border-sand/15 bg-bark/40">
                    <div className="text-[9px] font-mono text-sand/50 uppercase tracking-widest">
                      {s.label}
                    </div>
                    <div className="text-xs font-mono font-bold text-gold mt-1">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-gold/20 bg-bark/50 mb-6">
                <div className="text-xs font-mono text-gold font-bold mb-1 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  UNREAL ENGINE 5 TECH SPEC
                </div>
                <p className="text-xs font-mono text-sand/80 leading-relaxed">
                  {activeModal.engine}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="btn-gold px-8 py-3 rounded-full font-display text-xs font-bold tracking-[0.2em]"
                >
                  CLOSE DOSSIER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
