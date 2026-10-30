"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 53 + 9) % 100}%`,
  size: 2 + ((i * 5) % 4),
  duration: 10 + ((i * 11) % 11),
  delay: (i * 4.1) % 12,
}));

export default function CareersHero({ count }: { count: number }) {
  return (
    <section className="relative flex min-h-[64svh] items-end overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(164,19,60,0.22),transparent_65%),radial-gradient(ellipse_50%_45%_at_50%_100%,rgba(255,122,47,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember-dot"
            style={{
              left: e.left,
              width: e.size,
              height: e.size,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sanskrit text-lg text-gold/90"
        >
          आह्वानम् — the summons
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-stroke-gold">THE CALL</span>
          <span className="block text-gold-gradient">TO ARMS</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 flex flex-wrap items-center gap-6"
        >
          <p className="max-w-lg leading-relaxed text-sand">
            {count} sacred seats stand open in the Sena. Read each decree, and
            when one speaks to your spirit — nock your arrow, take aim, and
            release.
          </p>
          <a
            href="#vacancies"
            className="btn-ghost flex h-12 w-12 items-center justify-center rounded-full"
            aria-label="Scroll to vacancies"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
