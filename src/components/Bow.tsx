"use client";

/** Broadcasts that the Sabha session changed so listeners can refresh. */
export const notifySessionChange = () =>
  window.dispatchEvent(new Event("kodanda-session"));

/** The official Herinova Game Studios emblem logo */
export function BowMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full shadow-[0_0_15px_rgba(217,164,65,0.45)] border border-gold/40 bg-obsidian ${className}`}
      style={{ aspectRatio: "1/1" }}
    >
      <img
        src="/images/logo.png"
        alt="Herinova Game Studios Logo"
        className="w-full h-full object-contain"
        loading="eager"
      />
    </div>
  );
}
