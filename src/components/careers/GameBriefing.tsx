import { BookOpen, Mountain, Swords } from "lucide-react";

const PILLARS = [
  {
    icon: Mountain,
    title: "Three distinct realms",
    description:
      "Help shape Ayodhya, the vertical wilds of Kishkindha, and the fortress of Lanka into places players want to explore.",
  },
  {
    icon: Swords,
    title: "Combat with purpose",
    description:
      "Build expressive action around Parashurama, legendary weapons, and Astra abilities that feel powerful and clear in a fight.",
  },
  {
    icon: BookOpen,
    title: "Lore players can inhabit",
    description:
      "Bring research, character stories, quests, and dialogue together so the world feels connected from one mission to the next.",
  },
];

export default function GameBriefing() {
  return (
    <section
      aria-labelledby="game-briefing-title"
      className="relative mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-20"
    >
      <div className="overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-bark/80 via-obsidian to-bark/50 p-6 sm:p-9 md:p-12">
        <div className="max-w-3xl">
          <p className="font-display text-[10px] font-bold tracking-[0.3em] text-gold">
            THE GAME BEHIND THE ROLES
          </p>
          <h2
            id="game-briefing-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ivory sm:text-4xl"
          >
            Help bring <span className="text-gold-gradient">Legends of Treta</span> to life.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-sand/80">
            We&apos;re building an action RPG inspired by the Ramayana&apos;s Treta
            Yuga. It brings mythic characters, responsive combat, and richly
            imagined worlds together—and every discipline helps make that world
            playable.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="rounded-2xl border border-sand/10 bg-obsidian/50 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-goldbright">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-mute">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ivory">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/70">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
