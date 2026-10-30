"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Crosshair,
  Feather,
  Flame,
  Loader2,
  Link as LinkIcon,
  Send,
  X,
} from "lucide-react";
import type { Job } from "@/db/schema";
import { notifySessionChange } from "@/components/Bow";

type Me = { name: string; email: string } | null;

const YEARS = [
  { value: "0–2 years", label: "Vanara Cadet", sub: "fresh to the field · 0–2" },
  { value: "3–5 years", label: "Seasoned Warrior", sub: "battle-tested · 3–5" },
  { value: "6–9 years", label: "Commander", sub: "leads the van · 6–9" },
  { value: "10+ years", label: "Rishi of Craft", sub: "sage mastery · 10+" },
];

const STEPS = [
  { label: "Take Aim", icon: Crosshair },
  { label: "Nock the Arrow", icon: Feather },
  { label: "Release", icon: Flame },
];

/** The golden arrow that travels along the bowstring as steps advance. */
function FlightMarker({ step }: { step: number }) {
  const positions = ["8%", "50%", "92%"];
  return (
    <div className="relative mx-auto mt-2 h-14 max-w-md">
      {/* bowstring */}
      <div className="gold-hairline absolute left-0 right-0 top-1/2 h-px -translate-y-1/2" />
      {STEPS.map((s, i) => (
        <div
          key={s.label}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: positions[i] }}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ${
              i <= step
                ? "border-goldbright bg-bark shadow-[0_0_20px_-4px_rgba(255,224,143,0.7)]"
                : "border-gold/25 bg-obsidian"
            }`}
          >
            <s.icon className={`h-4 w-4 ${i <= step ? "text-goldbright" : "text-mute"}`} />
          </div>
          <p
            className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[9px] font-bold tracking-[0.2em] ${
              i <= step ? "text-goldbright" : "text-mute/70"
            }`}
          >
            {s.label.toUpperCase()}
          </p>
        </div>
      ))}
      {/* the arrow */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        animate={{ left: positions[step] }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginLeft: -14 }}
      >
        <svg width="28" height="12" viewBox="0 0 28 12" className="drop-shadow-[0_0_6px_rgba(255,224,143,0.8)]">
          <line x1="0" y1="6" x2="22" y2="6" stroke="#ffe08f" strokeWidth="1.6" />
          <path d="M28 6l-7-4v8l7-4z" fill="#ffe08f" />
          <path d="M3 6l-3-2.5v5L3 6z" fill="#ff7a2f" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function ApplyModal({ job, onClose }: { job: Job | null; onClose: () => void }) {
  const open = job !== null;
  const [me, setMe] = useState<Me>(null);
  const [checking, setChecking] = useState(true);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // gate fields
  const [name, setName] = useState("");
  const [gateEmail, setGateEmail] = useState("");

  // form fields
  const [years, setYears] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState("");
  const [oath, setOath] = useState("");
  const [truth, setTruth] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setDone(false);
    setError(null);
    setYears(null);
    setPortfolio("");
    setOath("");
    setTruth(false);
    setChecking(true);
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { user: Me }) => setMe(d.user))
      .catch(() => setMe(null))
      .finally(() => setChecking(false));
  }, [open]);

  const gateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: gateEmail }),
      });
      const data = (await res.json()) as { error?: string; user?: Me };
      if (!res.ok) throw new Error(data.error ?? "The gates did not open.");
      setMe(data.user ?? null);
      notifySessionChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "The gates did not open.");
    } finally {
      setBusy(false);
    }
  };

  const release = async () => {
    if (!job) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          years,
          portfolio: portfolio || null,
          oath,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "The arrow fell short. Release again.");
      setDone(true);
      notifySessionChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "The arrow fell short.");
    } finally {
      setBusy(false);
    }
  };

  const oathReady = oath.trim().length >= 40 && truth;

  return (
    <AnimatePresence>
      {open && job && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-obsidian/85 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="panel-glass corner-frame relative my-8 w-full max-w-xl overflow-hidden rounded-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 text-mute transition-colors hover:text-goldbright"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {done ? (
              /* ————— SUCCESS: the arrow flies ————— */
              <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden px-8 py-14 text-center">
                <div className="pointer-events-none absolute inset-x-0 top-1/3 h-16 overflow-visible">
                  <svg
                    width="120"
                    height="14"
                    viewBox="0 0 120 14"
                    className="absolute top-0 animate-flight drop-shadow-[0_0_10px_rgba(255,154,31,0.9)]"
                  >
                    <line x1="8" y1="7" x2="104" y2="7" stroke="#ffe08f" strokeWidth="2" />
                    <path d="M120 7l-14-6v12l14-6z" fill="#ffe08f" />
                    <path d="M10 7l-8-4.5v9L10 7z" fill="#ff7a2f" />
                  </svg>
                </div>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-goldbright/60 bg-bark shadow-[0_0_40px_-6px_rgba(255,224,143,0.8)]"
                >
                  <Check className="h-7 w-7 text-goldbright" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.6 }}
                >
                  <p className="mt-7 font-sanskrit text-base text-gold/90">लक्ष्यभेदः</p>
                  <h3 className="mt-2 font-display text-3xl font-bold tracking-wide text-ivory">
                    Your Arrow Flies True
                  </h3>
                  <div className="mx-auto mt-4 max-w-sm space-y-3">
                    <p className="font-display text-base font-bold text-goldbright leading-relaxed">
                      🏹 Every legend begins with a single arrow — thank you for aiming for greatness with Herinova Game Studios!
                    </p>
                    <p className="text-xs leading-relaxed text-sand/80 font-mono">
                      {me?.name ?? "Warrior"}, your application for{" "}
                      <span className="text-goldbright font-bold">{job.title}</span> has found its mark in the Sabha&apos;s scrolls.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="btn-gold mt-8 rounded-full px-8 py-3.5 font-display text-xs font-bold tracking-[0.24em]"
                  >
                    RETURN TO THE BOARD
                  </button>
                </motion.div>
              </div>
            ) : (
              /* ————— THE FLIGHT (form) ————— */
              <div className="px-7 pb-10 pt-12 md:px-10">
                <p className="text-center font-sanskrit text-sm text-gold/90">बाण-यात्रा</p>
                <h3 className="text-center font-display text-2xl font-bold tracking-wide text-ivory">
                  The Arrow&apos;s Flight
                </h3>

                {checking ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="h-7 w-7 animate-spin text-gold" />
                  </div>
                ) : !me ? (
                  /* gate — identify yourself */
                  <form onSubmit={gateSubmit} className="mt-9 space-y-4">
                    <p className="mb-2 text-center text-sm leading-relaxed text-sand">
                      Before any arrow may fly, the archer must speak their name
                      to the Sabha.
                    </p>
                    <div>
                      <label className="mb-1.5 block font-display text-[11px] font-semibold tracking-[0.24em] text-gold/90">
                        YOUR NAME
                      </label>
                      <input
                        required
                        minLength={2}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Arjun Sharma"
                        className="w-full rounded-lg border border-gold/20 bg-obsidian/70 px-4 py-3 text-sm text-ivory placeholder:text-mute/60 focus:border-goldbright/70 focus:outline-none focus:ring-1 focus:ring-gold/40"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-display text-[11px] font-semibold tracking-[0.24em] text-gold/90">
                        YOUR MESSAGE ROUTE (EMAIL)
                      </label>
                      <input
                        required
                        type="email"
                        value={gateEmail}
                        onChange={(e) => setGateEmail(e.target.value)}
                        placeholder="you@kingdom.com"
                        className="w-full rounded-lg border border-gold/20 bg-obsidian/70 px-4 py-3 text-sm text-ivory placeholder:text-mute/60 focus:border-goldbright/70 focus:outline-none focus:ring-1 focus:ring-gold/40"
                      />
                    </div>
                    {error && (
                      <p className="rounded-lg border border-crimson/40 bg-crimson/10 px-4 py-2.5 text-xs text-ivory/90">
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={busy}
                      className="btn-gold flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-display text-xs font-bold tracking-[0.24em] disabled:opacity-60"
                    >
                      {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                      {busy ? "OPENING THE GATES…" : "ENTER & TAKE AIM"}
                    </button>
                  </form>
                ) : (
                  <>
                    <FlightMarker step={step} />

                    <div className="mt-12">
                      {/* STEP 0 — TAKE AIM */}
                      {step === 0 && (
                        <motion.div key="s0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
                          <div className="rounded-xl border border-gold/25 bg-obsidian/60 p-5">
                            <p className="font-display text-[10px] font-bold tracking-[0.28em] text-mute">
                              YOUR TARGET
                            </p>
                            <p className="mt-2 font-sanskrit text-base text-gold">
                              {job.sanskritTitle}
                            </p>
                            <p className="font-display text-xl font-bold text-ivory">
                              {job.title}
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-sand">
                              {job.realm} · {job.type} · {job.salary}
                            </p>
                          </div>
                          <p className="mt-4 text-sm leading-relaxed text-sand">
                            Archer confirmed as <span className="text-goldbright">{me.name}</span>.
                            Sight the target, steady your breath — then draw.
                          </p>
                          <button
                            onClick={() => setStep(1)}
                            className="btn-gold mt-7 flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-display text-xs font-bold tracking-[0.24em]"
                          >
                            <Crosshair className="h-4 w-4" />
                            TARGET LOCKED — NOCK THE ARROW
                          </button>
                        </motion.div>
                      )}

                      {/* STEP 1 — NOCK THE ARROW */}
                      {step === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
                          <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-gold/90">
                            SEASONS OF BATTLE (EXPERIENCE)
                          </p>
                          <div className="mt-3 grid grid-cols-2 gap-3">
                            {YEARS.map((y) => (
                              <button
                                key={y.value}
                                onClick={() => setYears(y.value)}
                                className={`rounded-xl border p-3.5 text-left transition-all duration-300 ${
                                  years === y.value
                                    ? "border-goldbright bg-gold/10 shadow-[0_0_24px_-8px_rgba(255,224,143,0.6)]"
                                    : "border-gold/20 bg-obsidian/50 hover:border-gold/50"
                                }`}
                              >
                                <p className="font-display text-sm font-bold text-ivory">{y.label}</p>
                                <p className="mt-0.5 text-[11px] text-mute">{y.sub}</p>
                              </button>
                            ))}
                          </div>

                          <p className="mt-6 font-display text-[11px] font-semibold tracking-[0.24em] text-gold/90">
                            SCROLL OF DEEDS (PORTFOLIO / LINK)
                          </p>
                          <div className="relative mt-3">
                            <LinkIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
                            <input
                              type="url"
                              value={portfolio}
                              onChange={(e) => setPortfolio(e.target.value)}
                              placeholder="https://your-deeds.com"
                              className="w-full rounded-lg border border-gold/20 bg-obsidian/70 py-3 pl-11 pr-4 text-sm text-ivory placeholder:text-mute/60 focus:border-goldbright/70 focus:outline-none focus:ring-1 focus:ring-gold/40"
                            />
                          </div>

                          <div className="mt-7 flex gap-3">
                            <button onClick={() => setStep(0)} className="btn-ghost flex-1 rounded-full px-6 py-3.5 font-display text-xs font-bold tracking-[0.24em]">
                              BACK
                            </button>
                            <button
                              onClick={() => setStep(2)}
                              disabled={!years}
                              className="btn-gold flex-[2] rounded-full px-6 py-3.5 font-display text-xs font-bold tracking-[0.24em] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              DRAW THE BOW
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2 — RELEASE */}
                      {step === 2 && (
                        <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
                          <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-gold/90">
                            THE OATH — WHY DOES THIS SEAT CALL YOU?
                          </p>
                          <textarea
                            value={oath}
                            onChange={(e) => setOath(e.target.value)}
                            rows={5}
                            placeholder="Speak from the heart, warrior. Forty runes at least…"
                            className="mt-3 w-full resize-none rounded-lg border border-gold/20 bg-obsidian/70 px-4 py-3 text-sm text-ivory placeholder:text-mute/60 focus:border-goldbright/70 focus:outline-none focus:ring-1 focus:ring-gold/40"
                          />
                          <div className="mt-1 flex justify-between text-[11px] text-mute">
                            <span>{oath.trim().length}/40 runes</span>
                            <span>{years} · {job.title}</span>
                          </div>

                          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-gold/15 bg-obsidian/50 p-4">
                            <input
                              type="checkbox"
                              checked={truth}
                              onChange={(e) => setTruth(e.target.checked)}
                              className="mt-0.5 h-4 w-4 accent-[#d9a441]"
                            />
                            <span className="text-xs leading-relaxed text-sand">
                              I swear by dharma that every rune above is true, and
                              I accept the trials the Sabha may set before me.
                            </span>
                          </label>

                          {error && (
                            <p className="mt-4 rounded-lg border border-crimson/40 bg-crimson/10 px-4 py-2.5 text-xs text-ivory/90">
                              {error}
                            </p>
                          )}

                          <div className="mt-7 flex gap-3">
                            <button onClick={() => setStep(1)} className="btn-ghost flex-1 rounded-full px-6 py-3.5 font-display text-xs font-bold tracking-[0.24em]">
                              BACK
                            </button>
                            <button
                              onClick={release}
                              disabled={!oathReady || busy}
                              className="btn-gold group flex flex-[2] items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-display text-xs font-bold tracking-[0.24em] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {busy ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Send className="h-4 w-4 -rotate-12 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                              )}
                              {busy ? "THE ARROW FLIES…" : "RELEASE THE ARROW"}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
