import { Sparkle } from "lucide-react";

const ITEMS = [
  "धर्मो रक्षति रक्षितः",
  "HERINOVA GAME STUDIOS",
  "LEGENDS OF TRETA — CHARACTER 02: PARASHURAMA",
  "MRIIRS & MRU CAMPUS RECRUITMENT",
  "7 SPECIALIZED ROLES OPEN",
  "रामाय विजयते",
  "DUTY · VALOR · DEVOTION",
  "THE CONCH HAS SOUNDED",
  "कोदण्डम् उद्यम्य",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-gold/15 bg-bark/60 py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap pr-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`text-sm tracking-[0.28em] md:text-base ${
                /[\u0900-\u097F]/.test(item)
                  ? "font-sanskrit text-gold/90"
                  : "font-display font-semibold text-sand/80"
              }`}
            >
              {item}
            </span>
            <Sparkle className="h-3.5 w-3.5 shrink-0 text-gold/60" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent" />
    </div>
  );
}
