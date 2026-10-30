"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, User, X, Volume2, VolumeX } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { BowMark, notifySessionChange } from "@/components/Bow";

type Me = { name: string; email: string } | null;

const LINKS = [
  { href: "/#jobs", num: "01", label: "Job Offers (7)" },
  { href: "/#traverse", num: "02", label: "The Saga" },
  { href: "/#character", num: "03", label: "Avatara" },
  { href: "/#realms", num: "04", label: "Realms" },
  { href: "/#astras", num: "05", label: "Astras" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [me, setMe] = useState<Me>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = (await res.json()) as { user: Me };
      setMe(data.user);
    } catch {
      setMe(null);
    }
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("kodanda-session", refresh);
    return () => window.removeEventListener("kodanda-session", refresh);
  }, [refresh]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    notifySessionChange();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-sand/15 bg-obsidian/85 backdrop-blur-xl py-3"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          
          {/* BRAND: LEGENDS OF TRETA — HERINOVA GAME STUDIOS presents */}
          <Link href="/" className="group flex items-center gap-3">
            <BowMark className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-500 group-hover:scale-105" />
            <span className="leading-tight">
              <span className="block font-display text-base sm:text-lg font-black tracking-[0.16em] text-ivory group-hover:text-goldbright transition-colors">
                LEGENDS OF TRETA
              </span>
              <span className="block text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-gold/80 uppercase">
                HERINOVA GAME STUDIOS presents
              </span>
            </span>
          </Link>

          {/* NUMBERED NAV LINKS (Kasane nav style: 01 The world, 02 Revenants, etc.) */}
          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="group flex items-center gap-1.5 font-display text-xs tracking-wider text-sand/80 hover:text-goldbright transition-colors"
              >
                <span className="font-mono text-[9px] text-gold/70 group-hover:text-gold">
                  {l.num}
                </span>
                <span>{l.label}</span>
              </Link>
            ))}
          </nav>

                    {/* HEADER ACTIONS (Kasane style: Enlist button & login/logout) */}
          <div className="hidden items-center gap-4 sm:flex">
            {me ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full border border-gold/25 bg-bark/70 px-4 py-1.5 text-xs font-mono text-ivory">
                  <User className="h-3 w-3 text-gold" />
                  {me.name.split(" ")[0]}
                </span>
                <button
                  onClick={logout}
                  title="Leave the Sabha"
                  className="w-8 h-8 rounded-full border border-sand/20 hover:border-gold flex items-center justify-center text-sand hover:text-gold transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : null}

            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-job-apply"));
                const el = document.getElementById("jobs");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-gold px-5 py-2 rounded-full font-display text-[11px] font-bold tracking-[0.2em] flex items-center gap-2 shadow-[0_0_20px_rgba(217,164,65,0.4)] cursor-pointer"
            >
              <span>REGISTER FOR JOB</span>
              <span className="text-xs">↗</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="text-ivory lg:hidden p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-gold" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-sand/15 bg-obsidian/95 backdrop-blur-2xl lg:hidden"
            >
              <div className="flex flex-col gap-2 px-6 py-6">
                {LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 py-2 font-display text-sm tracking-widest text-sand hover:text-gold"
                  >
                    <span className="font-mono text-xs text-gold">{l.num}</span>
                    <span>{l.label}</span>
                  </Link>
                ))}
                {me ? (
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="btn-ghost mt-3 py-3 rounded-xl font-display text-xs font-bold tracking-widest"
                  >
                    LEAVE THE SABHA ({me.name.split(" ")[0]})
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setLoginOpen(true);
                    }}
                    className="btn-gold mt-3 py-3 rounded-xl font-display text-xs font-bold tracking-widest text-center"
                  >
                    ENTER THE SABHA ↗
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
