export default function SectionHeading({
  sanskrit,
  eyebrow,
  title,
  goldWord,
  description,
  subtitle,
  align = "center",
}: {
  sanskrit: string;
  eyebrow: string;
  title: string;
  /** Trailing word rendered in the molten-gold gradient. */
  goldWord?: string;
  description?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="font-sanskrit text-base text-gold/90 md:text-lg">{sanskrit}</p>
      <p
        className={`mt-3 flex items-center gap-3 font-display text-[11px] font-bold tracking-[0.34em] text-mute ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="gold-hairline h-px w-10" />
        {eyebrow}
        <span className="gold-hairline h-px w-10" />
      </p>
      <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ivory sm:text-5xl md:text-6xl">
        {title}{" "}
        {goldWord ? <span className="text-gold-gradient">{goldWord}</span> : null}
      </h2>
      {(description || subtitle) ? (
        <p className="mt-6 text-base leading-relaxed text-sand md:text-lg">
          {description || subtitle}
        </p>
      ) : null}
    </div>
  );
}
