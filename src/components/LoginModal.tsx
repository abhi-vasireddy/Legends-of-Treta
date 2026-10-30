"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, LogIn, X } from "lucide-react";
import { BowMark, notifySessionChange } from "@/components/Bow";

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "The gates did not open.");
      notifySessionChange();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "The gates did not open.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-obsidian/80 px-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="panel-glass corner-frame relative w-full max-w-md rounded-2xl p-8 md:p-10"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-mute transition-colors hover:text-goldbright"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <BowMark className="h-12 w-12" />
              <p className="mt-4 font-sanskrit text-sm text-gold/90">प्रवेशः</p>
              <h3 className="mt-1 font-display text-2xl font-bold tracking-wide text-ivory">
                Enter the Sabha
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-sand">
                Every warrior who walked into Ayodhya&apos;s court first spoke
                their name. Speak yours — no password, no gatekeepers.
              </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                className="btn-gold group flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-display text-xs font-bold tracking-[0.24em] disabled:opacity-60"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                )}
                {busy ? "OPENING THE GATES…" : "STEP INSIDE"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
