"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Swords, Zap, Crosshair } from "lucide-react";

interface Warrior {
  id: string;
  num: string;
  name: string;
  sanskrit: string;
  role: string;
  alias: string;
  image: string;
  bio: string;
  quote: string;
  weapon: string;
  astra: string;
  combatStyle: string;
  badge: string;
}

const WARRIORS: Warrior[] = [
  {
    id: "parashurama",
    num: "01",
    name: "PARASHURAMA",
    sanskrit: "परशुरामः · षष्ठोऽवतारः",
    role: "01 / THE AXE-BEARING IMMORTAL",
    alias: "The earth trembled twenty-one times before righteousness returned.",
    image: "/images/legends_of_treta_parashurama.jpg",
    bio: "The ferocious master of warfare who trained Bhishma, Drona, and Karna. Parashurama wields the axe of Shiva and the Vaishnava bow, cutting through tyrannical empires with divine thunderbolts.",
    quote: "“When dharma is eclipsed by tyrants, words perish — and the axe must speak.”",
    weapon: "Vidyudabhi Parashu (Axe of Divine Thunderbolt)",
    astra: "Brahmashira & Vaishnava Dhanush",
    combatStyle: "Brutal Cleave, Kinetic Shockwaves & Titan Decapitation",
    badge: "IMMORTAL CHIRANJEEVI",
  },
  {
    id: "lakshmana",
    num: "02",
    name: "LAKSHMANA",
    sanskrit: "लक्ष्मणः · अनन्तांशः",
    role: "02 / THE SERPENT SHIELD",
    alias: "The sleepless sentinel who conquered slumber itself.",
    image: "/images/lakshmana.jpg",
    bio: "An avatar of the thousand-headed serpent Sheshanaga. Lakshmana stayed awake for 14 continuous years of exile to guard Rama and Sita, culminating in the slaying of the unconquerable sorcerer Indrajit.",
    quote: "“I do not sleep so that dharma may rest in peace.”",
    weapon: "Chandrahasa Blade & Serpentine Curved Bow",
    astra: "Aindrastra & Varunastra Swarm",
    combatStyle: "High-Agility Parries, Flurry Arrows & Shield Wall Intercepts",
    badge: "SENTINEL OF JANASTHANA",
  },
  {
    id: "hanuman",
    num: "03",
    name: "HANUMAN",
    sanskrit: "हनुमान् · रुद्रावतारः",
    role: "03 / THE WIND TITAN",
    alias: "The leap that spanned the Southern Ocean.",
    image: "/images/hanuman.jpg",
    bio: "Incarnation of Lord Shiva and son of the wind god Vayu. Capable of shifting scale from a microscopic atom to a mountain titan carrying the Dronagiri herb peak through the heavens.",
    quote: "“There is no obstacle on earth or sky that withstands the name of Rama.”",
    weapon: "Vajra Gada (Thunderbolt Mace of Indra)",
    astra: "Vayu Astra & Anima-Mahima Scale Shift",
    combatStyle: "Titan Brawling, Mountain Hurling & Sonic Roar Stuns",
    badge: "RUDRASENA COMMANDER",
  },
  {
    id: "rama",
    num: "04",
    name: "SRI RAMA",
    sanskrit: "श्रीरामः · मर्यदा पुरुषोत्तमः",
    role: "04 / THE SOLAR SOVEREIGN",
    alias: "The original archer whose arrow never turns back empty.",
    image: "/images/archer.jpg",
    bio: "The supreme exemplar of righteousness who broke the celestial Pinaka bow in Janakpur and crossed the ocean on floating rocks to liberate the realm from the ten-headed demon king Ravana.",
    quote: "“Dharma protects those who protect it.”",
    weapon: "Kodanda Bow (Forged by Vishwakarma)",
    astra: "Brahmastra & Suryastra Piercing Sunburst",
    combatStyle: "Precise Sniper Geometry, Piercing Volleys & Divine Truesight",
    badge: "SURYAVANSHA EMPEROR",
  },
];

export default function Epic() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const warrior = WARRIORS[selectedIdx];

  return (
    <section
      id="epic"
      className="relative min-h-screen py-24 md:py-32 bg-obsidian text-ivory overflow-hidden border-t border-sand/10"
    >
      {/* Kasane Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(217,164,65,0.08),transparent_75%)] pointer-events-none" />
      <div className="absolute -left-48 top-1/4 w-96 h-96 bg-ember/6 blur-[120px] pointer-events-none" />
      <div className="absolute -right-48 bottom-1/4 w-96 h-96 bg-crimson/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* TOPLINE / HEADER (Exact Kasane #revenants frame layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-sand/15 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono text-sand/60 tracking-[0.25em] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>02 / THE AVATARAS</span>
              <span>—</span>
              <span className="text-gold/90 font-bold">FOUR SOULS · ETERNAL DHARMA</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-ivory">
              IMMORTALITY WAS <span className="text-gold-gradient font-light italic font-serif">a beginning.</span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 text-right">
            <span className="inline-block px-3 py-1 rounded border border-sand/20 bg-bark/40 text-[10px] font-mono text-sand/70 tracking-widest uppercase">
              WARRIOR RECORD // CLASSIFIED
            </span>
            <p className="text-xs text-sand/60 font-mono mt-1">
              SELECT SOUL TO INSPECT GAMEPLAY ARCHETYPE
            </p>
          </div>
        </div>

        {/* 4 CHARACTER TABS (Kasane tab style) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 mb-12">
          {WARRIORS.map((w, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedIdx(idx)}
                className={`relative p-4 md:p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer group ${
                  isSelected
                    ? "border-gold bg-bark/80 shadow-[0_0_25px_rgba(217,164,65,0.25)]"
                    : "border-sand/15 bg-coal/60 hover:border-gold/50 hover:bg-bark/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold tracking-widest ${isSelected ? "text-gold" : "text-sand/50"}`}>
                    {w.num}
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                    isSelected ? "bg-gold/20 text-goldbright" : "bg-obsidian/40 text-sand/40"
                  }`}>
                    {w.badge.split(" ")[0]}
                  </span>
                </div>
                <div className="text-sm md:text-base font-display font-bold text-ivory group-hover:text-goldbright transition-colors">
                  {w.name}
                </div>
                <div className="text-[11px] font-sanskrit text-sand/60 truncate mt-0.5">
                  {w.sanskrit}
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="activeWarriorBorder"
                    className="absolute inset-0 rounded-xl border-2 border-gold pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* HERO CHARACTER DISPLAY PANEL (Split Art & Specs) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={warrior.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-2xl border border-sand/20 bg-coal/70 p-6 md:p-12 relative overflow-hidden backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
          >
            {/* GIANT ROMAN WATERMARK */}
            <div
              className="absolute -right-8 -bottom-12 text-[18vw] font-display font-black text-sand/5 select-none pointer-events-none leading-none z-0"
              aria-hidden="true"
            >
              {warrior.num}
            </div>

            {/* LEFT SIDE: CHARACTER ART WITH KASANE BORDER RETICLES */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-obsidian group">
                <Image
                  src={warrior.image}
                  alt={warrior.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95 contrast-105"
                />
                
                {/* Vignette washes */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-transparent" />

                {/* Corner reticle marks */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold/70" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold/70" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold/70" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold/70" />

                {/* In-frame classified stamp */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-sand/80 z-10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    LIVE COMBATANT
                  </span>
                  <span className="px-2 py-0.5 rounded bg-obsidian/80 border border-sand/20">
                    UE5 RIG // 4K
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="text-[10px] font-mono tracking-widest text-gold/80 mb-0.5">
                    HERINOVA GAME STUDIOS
                  </div>
                  <div className="text-lg font-display font-bold text-ivory">
                    {warrior.name}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: EXTENSIVE NARRATIVE & COMBAT SPECS */}
            <div className="lg:col-span-7 relative z-10 flex flex-col justify-center">
              
              <div className="flex items-center gap-2 text-xs font-mono text-sand/70 tracking-widest uppercase mb-2">
                <span>{warrior.role}</span>
                <span>•</span>
                <span className="text-gold font-bold">{warrior.badge}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-display font-black text-ivory tracking-tight mb-2">
                {warrior.name}
              </h3>

              <p className="text-sm font-sanskrit text-gold/90 mb-4 tracking-wider">
                {warrior.sanskrit}
              </p>

              <p className="text-base sm:text-lg text-goldbright/90 font-light italic font-serif leading-relaxed mb-4">
                &ldquo;{warrior.alias}&rdquo;
              </p>

              <p className="text-sm sm:text-base text-sand/85 leading-relaxed font-light mb-6">
                {warrior.bio}
              </p>

              <blockquote className="border-l-2 border-gold/60 pl-4 py-2 italic text-sm text-sand/70 mb-8 bg-bark/30 rounded-r">
                {warrior.quote}
              </blockquote>

              {/* TECHNICAL COMBAT SPECS (Kasane character-specs style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-3.5 rounded-xl border border-sand/15 bg-bark/50">
                  <div className="text-[10px] font-mono text-sand/50 tracking-widest uppercase mb-1 flex items-center gap-1.5">
                    <Swords className="w-3 h-3 text-gold" />
                    SIGNATURE WEAPON
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-ivory">
                    {warrior.weapon}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-sand/15 bg-bark/50">
                  <div className="text-[10px] font-mono text-sand/50 tracking-widest uppercase mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-ember" />
                    DIVINE ASTRA
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-gold">
                    {warrior.astra}
                  </div>
                </div>

                <div className="sm:col-span-2 p-3.5 rounded-xl border border-sand/15 bg-bark/50">
                  <div className="text-[10px] font-mono text-sand/50 tracking-widest uppercase mb-1 flex items-center gap-1.5">
                    <Crosshair className="w-3 h-3 text-goldbright" />
                    COMBAT ARCHETYPE & GAMEPLAY
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-sand/90">
                    {warrior.combatStyle}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div>
                <a
                  href="#jobs"
                  className="btn-gold inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-display text-xs font-bold tracking-[0.2em]"
                >
                  <Swords className="w-4 h-4" />
                  BUILD {warrior.name} (7 ROLES OPEN) ↗
                </a>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
