"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Target, Zap, ShieldAlert, Sparkles, ChevronDown, Swords, Crosshair } from "lucide-react";

interface Astra {
  id: string;
  num: string;
  name: string;
  sanskrit: string;
  sync: string;
  deity: string;
  summary: string;
  role: string;
  icon: typeof Flame;
  accent: string;
  stats: { label: string; val: string }[];
}

const ASTRAS: Astra[] = [
  {
    id: "brahmashira",
    num: "01",
    name: "BRAHMASHIRA ASTRA",
    sanskrit: "ब्रह्मशिरा अस्त्रम् · सौराग्निः",
    sync: "096%",
    deity: "LORD BRAHMA",
    summary: "Manifests four blazing solar crowns at its tip. When loosed, twelve suns manifest in the stratosphere, vaporizing dark rakshasa shields and incinerating all illusions across a 50-mile radius.",
    role: "Ultimate Raid Breaker. Bypasses elemental immunities and deconstructs mythic forcefields.",
    icon: Flame,
    accent: "from-amber-500 to-orange-600",
    stats: [
      { label: "POTENCY", val: "SOLAR CATACLYSM" },
      { label: "RANGE", val: "STRATOSPHERIC" },
      { label: "CAST FOCUS", val: "4.2 SECONDS" },
    ],
  },
  {
    id: "narayana",
    num: "02",
    name: "NARAYANASTRA",
    sanskrit: "नारायणास्त्रम् · अयुतशरवृष्टिः",
    sync: "091%",
    deity: "LORD VISHNU",
    summary: "Discharges millions of incandescent celestial darts simultaneously. The weapon scales its lethality exponentially with the resistance of the adversary. Surrender disarms it; defiance brings total annihilation.",
    role: "Counter-Siege Area Denial. Punishes aggressive enemy squads with self-multiplying damage.",
    icon: Target,
    accent: "from-blue-400 to-cyan-500",
    stats: [
      { label: "SWARM COUNT", val: "10,000,000 ARROWS" },
      { label: "TRACKING", val: "AUTONOMOUS HOMING" },
      { label: "COUNTER", val: "PROSTRATION" },
    ],
  },
  {
    id: "pashupata",
    num: "03",
    name: "PASHUPATASTRA",
    sanskrit: "पाशुपतास्त्रम् · संहारशक्तिः",
    sync: "099%",
    deity: "LORD SHIVA",
    summary: "The ultimate weapon of destruction capable of shattering creation. Loosed only by the direct gaze of Lord Shiva; its activation bends space-time into a collapsing singularity.",
    role: "Reality Decapitation. Single-target execution that removes bosses from reality.",
    icon: Zap,
    accent: "from-purple-500 to-pink-600",
    stats: [
      { label: "SINGULARITY", val: "EVENT HORIZON" },
      { label: "DAMAGE", val: "INFINITE PIERCE" },
      { label: "RELOAD", val: "ONCE PER SAGA" },
    ],
  },
  {
    id: "aindra",
    num: "04",
    name: "AINDRASTRA",
    sanskrit: "ऐन्द्रास्त्रम् · वज्रधारा",
    sync: "088%",
    deity: "LORD INDRA",
    summary: "Draws electrical lightning from the storm canopy, raining thousands of thunderbolt spears upon opposing battle ranks with devastating electrical cascade chains.",
    role: "High-Frequency Chain Stun. Paralyzes frontline titans and breaks phalanx formations.",
    icon: Sparkles,
    accent: "from-amber-300 to-yellow-500",
    stats: [
      { label: "ELEMENT", val: "DIVINE LIGHTNING" },
      { label: "CHAIN COUNT", val: "64 TARGETS" },
      { label: "STUN DURATION", val: "5.5 SECONDS" },
    ],
  },
];

export default function Mantras() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeAstra = ASTRAS[activeIdx];

  return (
    <section
      id="astras"
      className="relative min-h-screen py-24 md:py-36 bg-obsidian text-ivory overflow-hidden border-t border-sand/15"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(217,164,65,0.06),transparent_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER (Kasane #arts headline style) */}
        <div className="border-b border-sand/15 pb-8 mb-16">
          <div className="flex items-center gap-3 text-xs font-mono text-sand/60 tracking-[0.25em] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span>03 / CELESTIAL ASTRAS</span>
            <span>—</span>
            <span className="text-gold/90 font-bold">SACRED WEAPONRY</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-ivory">
              A LITTLE GRACE.<br />
              <span className="text-gold-gradient font-light italic font-serif">A storm of devastation.</span>
            </h2>
            <p className="max-w-md text-sm sm:text-base text-sand/80 font-light leading-relaxed">
              Don&apos;t just master a blade or bow. Awaken the divine mantra sealed inside it.
              Every perfect parry and invocation bends the trajectory of the battlefield.
            </p>
          </div>
        </div>

        {/* 2-COLUMN GRID (Left: Combat Visual Card, Right: Ability Accordion List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: COMBAT VISUAL WITH KASANE HUD OVERLAY */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-sand/20 bg-coal/90 p-8 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.8)] group backdrop-blur-xl">
              
              {/* Dynamic Aura Gradient according to active Astra */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${activeAstra.accent} opacity-15 blur-2xl transition-all duration-700`}
              />

              {/* Target Reticle in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-sand/15 animate-spin-slower" />
                  <div className="absolute w-28 h-28 rounded-full border border-dashed border-gold/30 animate-spin-slow" />
                  <Crosshair className="absolute w-8 h-8 text-gold/70 animate-pulse" />
                  <span className="absolute -top-6 text-[9px] font-mono tracking-widest text-gold/60">
                    ASTRA LOCK: ACTIVE
                  </span>
                </div>
              </div>

              {/* Top HUD Row */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-sand/70">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  SPIRIT SYNC <b className="text-gold font-bold">{activeAstra.sync}</b>
                </span>
                <span className="border border-sand/20 px-2.5 py-1 rounded bg-obsidian/60 text-[10px] tracking-wider text-goldbright">
                  FORM {activeAstra.num} // INVOCATION
                </span>
              </div>

              {/* Bottom HUD: Active Astra Specs */}
              <div className="relative z-10 bg-obsidian/75 p-5 rounded-xl border border-sand/15 backdrop-blur-md">
                <div className="text-[10px] font-mono text-sand/50 tracking-widest uppercase mb-1">
                  DEITY PATRON: {activeAstra.deity}
                </div>
                <div className="text-xl font-display font-bold text-ivory mb-1">
                  {activeAstra.name}
                </div>
                <div className="text-xs font-sanskrit text-gold/90 mb-3">
                  {activeAstra.sanskrit}
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-sand/10 text-center">
                  {activeAstra.stats.map((st) => (
                    <div key={st.label}>
                      <div className="text-[8px] font-mono text-sand/40 tracking-wider uppercase">
                        {st.label}
                      </div>
                      <div className="text-[10px] font-mono font-bold text-gold truncate">
                        {st.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corner marks */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-gold/60" />
            </div>
          </div>

          {/* RIGHT: KASANE ABILITY ACCORDION LIST */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {ASTRAS.map((a, idx) => {
              const isOpen = idx === activeIdx;
              const Icon = a.icon;
              return (
                <div
                  key={a.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-gold/50 bg-bark/80 shadow-[0_10px_30px_rgba(217,164,65,0.15)]"
                      : "border-sand/15 bg-coal/50 hover:border-sand/40 hover:bg-bark/40"
                  }`}
                >
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className="w-full p-6 text-left flex items-center justify-between cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-mono font-bold ${isOpen ? "text-gold" : "text-sand/40"}`}>
                        {a.num}
                      </span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        isOpen ? "border-gold/40 bg-gold/10 text-gold" : "border-sand/15 bg-obsidian text-sand/50"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-display font-bold text-ivory">
                          {a.name}
                        </div>
                        <div className="text-xs font-sanskrit text-sand/60">
                          {a.sanskrit}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono hidden sm:inline ${isOpen ? "text-gold" : "text-sand/40"}`}>
                        SYNC {a.sync}
                      </span>
                      <div className={`w-8 h-8 rounded-full border border-sand/20 flex items-center justify-center text-xs transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-gold border-gold" : "text-sand/40"
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="px-6 pb-6 pt-2 border-t border-sand/10"
                      >
                        <p className="text-sm text-sand/90 font-light leading-relaxed mb-4">
                          {a.summary}
                        </p>
                        
                        <div className="p-3.5 rounded-xl border border-gold/20 bg-obsidian/60 text-xs font-mono text-goldbright mb-4 flex items-center gap-2">
                          <Swords className="w-4 h-4 text-gold flex-shrink-0" />
                          <span>{a.role}</span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-sand/50 pt-2 border-t border-sand/10">
                          <span>INVOCATION: {a.deity}</span>
                          <span className="text-gold hover:underline cursor-pointer">
                            Inspect Astra Tree ↗
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
