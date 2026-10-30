import Link from "next/link";
import { Clapperboard, Globe, MessagesSquare } from "lucide-react";
import { BowMark } from "@/components/Bow";

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-coal">
      <div className="gold-hairline absolute inset-x-0 top-0 h-px" />
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <BowMark className="h-12 w-12" />
            <div>
              <p className="font-display text-xl font-bold tracking-[0.18em] text-ivory">
                LEGENDS OF TRETA
              </p>
              <p className="mt-1 font-mono text-xs text-gold/80 tracking-wider">
                HERINOVA GAME STUDIOS presents · MRIIRS &amp; MRU PARTNERSHIP
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { href: "/#jobs", label: "7 Roles" },
              { href: "/#realms", label: "Ramayana Realms" },
              { href: "/#traverse", label: "Epic Passage" },
              { href: "/#epic", label: "The Legend" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-display text-xs font-semibold tracking-[0.24em] text-sand transition-colors hover:text-goldbright"
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {[Globe, Clapperboard, MessagesSquare].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="btn-ghost flex h-10 w-10 items-center justify-center rounded-full"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-8 text-xs text-mute md:flex-row">
          <p>© {new Date().getFullYear()} Herinova Game Studios. Legends of Treta. All rights reserved.</p>
          <p className="font-sanskrit text-sm text-gold/60">
            यतो धर्मस्ततो जयः — where there is dharma, there is victory
          </p>
          <p>Campus Recruitment with MRIIRS &amp; MRU.</p>
        </div>
      </div>
    </footer>
  );
}
