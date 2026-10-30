"use client";

import { motion } from "framer-motion";
import { Swords, MoveRight, Sparkles, GraduationCap } from "lucide-react";
import { BowMark } from "@/components/Bow";

export default function CallCTA() {
  return (
    <section
      id="recruitment"
      className="relative min-h-[85vh] flex items-center justify-center py-28 md:py-36 bg-obsidian text-ivory overflow-hidden border-t border-sand/15"
    >
      {/* Kasane atmospheric lighting and spinning geometric mandalas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[720px] h-[720px] rounded-full border border-gold/10 animate-spin-slower" />
        <div className="absolute w-[520px] h-[520px] rounded-full border border-dashed border-gold/20 animate-spin-slow" />
        <div className="absolute w-[360px] h-[360px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,164,65,0.15),transparent_70%)] blur-2xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        {/* EYEBROW / BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md mb-8"
        >
          <GraduationCap className="w-4 h-4 text-gold" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-goldbright uppercase font-bold">
            05 / CAMPUS RECRUITMENT · MRIIRS &amp; MRU
          </span>
        </motion.div>

        {/* KASANE HEADLINE: LEAVE YOUR MARK */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tight leading-[0.92] uppercase mb-8"
        >
          <span>LEAVE</span><br />
          <span
            className="text-transparent"
            style={{
              WebkitTextStroke: "2.5px rgba(217, 164, 65, 0.95)",
            }}
          >
            YOUR
          </span><br />
          <span className="text-gold-gradient">MARK.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-sand/85 font-light leading-relaxed mb-12"
        >
          The next chapter of Indian AAA gaming is being forged in Unreal Engine 5.
          Herinova Game Studios is opening 7 elite campus roles exclusively for students of{" "}
          <strong className="text-goldbright font-semibold">MRIIRS</strong> &amp;{" "}
          <strong className="text-goldbright font-semibold">MRU</strong>.
        </motion.p>

        {/* CTA BUTTON ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#jobs"
            className="btn-gold group inline-flex items-center gap-3 px-10 py-5 rounded-full font-display text-xs font-bold tracking-[0.22em]"
          >
            <Swords className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
            ENLIST FOR 7 ROLES
            <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>

          <a
            href="#traverse"
            className="btn-ghost inline-flex items-center gap-3 px-8 py-5 rounded-full font-display text-xs font-bold tracking-[0.22em]"
          >
            TRAVERSE THE SAGA
          </a>
        </motion.div>

        {/* Classification footer stamp */}
        <div className="mt-16 text-[10px] font-mono tracking-[0.3em] text-sand/40 uppercase">
          OFFICIAL RECRUITMENT CODEX // HERINOVA GAME STUDIOS 2026
        </div>

      </div>
    </section>
  );
}
