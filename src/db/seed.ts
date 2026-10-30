import "dotenv/config";
import { db } from "@/db";
import { jobs } from "@/db/schema";

const SEED: (typeof jobs.$inferInsert)[] = [
  {
    slug: "senior-engine-developer",
    title: "Senior Engine Developer",
    sanskritTitle: "यन्त्रज्ञः",
    department: "Engineering",
    realm: "Ayodhya HQ · Hybrid",
    type: "Full-time",
    experience: "6+ years",
    salary: "$130k – $170k + realm equity",
    featured: true,
    summary:
      "Tune the very fabric of our realms — rendering, physics, and the silence between frames.",
    description:
      "You will sit at the heart of the forge, extending our custom Unreal Engine 5 pipeline. Lumen, Nanite, Chaos — these are your astras. Your work decides whether Lanka burns beautifully at 120 frames per second or not at all.",
    duties: [
      "Extend and harden our UE5 rendering and world-partition pipelines.",
      "Profile and banish frame-time rakshasas across PC and console targets.",
      "Design tools that turn artists' intent into engine truth.",
      "Mentor younger warriors in the disciplines of C++ and clean architecture.",
    ],
    requisites: [
      "6+ years shipping AAA or technically ambitious titles in C++.",
      "Deep command of modern rendering: PBR, GI, virtualized geometry.",
      "A portfolio of optimizations you are genuinely proud of.",
      "Reverence for measurable dharma: telemetry over gut feeling.",
    ],
  },
  {
    slug: "setu-backend-architect",
    title: "Backend Architect — Setu Systems",
    sanskritTitle: "सेतुनिर्माता",
    department: "Engineering",
    realm: "Remote — Any Realm",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120k – $160k + realm equity",
    featured: true,
    summary:
      "Build the bridge across the ocean that carries a million warriors at once.",
    description:
      "Nala built a bridge of stone across the sea; you will build one of services. Our live systems — identity, progression, economy, matchmaking across the three realms — must hold when the whole vanara host arrives on launch night.",
    duties: [
      "Design and ship low-latency services in Go/Rust on Kubernetes.",
      "Own the player-economy ledger where every karma point is accounted.",
      "Engineer for launch-day floods: queues, backpressure, grace under fire.",
      "Guard player data like the gates of Ayodhya — encrypted, audited, calm.",
    ],
    requisites: [
      "5+ years of distributed systems in production, at real scale.",
      "PostgreSQL mastery — you speak in query plans.",
      "Event-driven design experience (Kafka/NATS or kin).",
      "You have been paged at 3 a.m. and made peace with the pager.",
    ],
  },
  {
    slug: "gameplay-programmer-unreal",
    title: "Gameplay Programmer",
    sanskritTitle: "क्रीडाशिल्पी",
    department: "Engineering",
    realm: "Kishkindha Studio · Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$90k – $125k + realm equity",
    featured: false,
    summary:
      "Make the bow sing — combat, traversal, and the feel of a divine weapon in hand.",
    description:
      "The moment a player draws the Kodanda, time itself should lean in. You will craft the moment-to-moment feel of combat and traversal across Kishkindha: the draw, the loose, the ricochet of an empowered astra off a shrine bell.",
    duties: [
      "Implement combat and traversal systems in C++/Blueprints.",
      "Partner with animators on responsive, gorgeous state machines.",
      "Build systemic enemy behaviors worthy of a ten-headed king.",
      "Iterate fast with designers — proto, playtest, polish, repeat.",
    ],
    requisites: [
      "3+ years of gameplay programming, at least one shipped title.",
      "Strong math instincts — vectors are your mother tongue.",
      "Opinions about game feel, and the humility to test them.",
      "You play what you build and can argue about frames per action.",
    ],
  },
  {
    slug: "3d-environment-artist",
    title: "Senior 3D Environment Artist",
    sanskritTitle: "लोकचित्रकारः",
    department: "Art & Visuals",
    realm: "Ayodhya HQ · Hybrid",
    type: "Full-time",
    experience: "5+ years",
    salary: "$100k – $140k + realm equity",
    featured: true,
    summary:
      "Paint with geometry — gilded Lanka, misted Kishkindha, dawn-struck Ayodhya.",
    description:
      "Our realms must feel excavated, not assembled. You will sculpt monumental Indian architecture, jungles that breathe, and battlefields that remember every war. Photogrammetry, modular kits, and a relentless eye for light.",
    duties: [
      "Own environments from blockout to final polish and optimization.",
      "Build modular architecture kits rooted in real Indian craft traditions.",
      "Compose lighting and atmosphere that tells story without words.",
      "Document your kit logic so other artists build beside you, not after you.",
    ],
    requisites: [
      "5+ years in AAA environments; a portfolio that stops our scroll.",
      "Mastery of Unreal 5, substance workflows, and modern foliage tools.",
      "Deep reference culture — you research before you model.",
      "Comfort owning huge scenes and hitting perf budgets.",
    ],
  },
  {
    slug: "vfx-artist-astras",
    title: "VFX Artist — Astras & Elements",
    sanskritTitle: "तेजस्करः",
    department: "Art & Visuals",
    realm: "Remote — Any Realm",
    type: "Full-time",
    experience: "4+ years",
    salary: "$85k – $120k + realm equity",
    featured: false,
    summary:
      "Give fire a conscience, rain a reason, and every divine weapon its own weather.",
    description:
      "When the Agneyastra flies, the screen should feel the heat. You will design the visual language of the divine weapons — fire, frost, storm, and light — in Niagara and Houdini, tuned for readability in the chaos of the Lanka siege.",
    duties: [
      "Create signature VFX for astras, environments, and cinematic beats.",
      "Balance spectacle with combat readability at 120 fps.",
      "Build reusable Niagara modules the whole team can wield.",
      "Collaborate with lighting and audio to make one voice speak.",
    ],
    requisites: [
      "4+ years of real-time VFX for shipped games.",
      "Niagara fluency; Houdini simulation chops a great boon.",
      "A showreel where every effect earns its place on screen.",
      "You understand silhouette, timing, and the poetry of restraint.",
    ],
  },
  {
    slug: "character-animator",
    title: "Character Animator",
    sanskritTitle: "चरित्रचालकः",
    department: "Art & Visuals",
    realm: "Kishkindha Studio · Remote",
    type: "Full-time",
    experience: "4+ years",
    salary: "$85k – $118k + realm equity",
    featured: false,
    summary:
      "Teach mountains to leap — vanara locomotion, divine combat, and ten heads arguing.",
    description:
      "Hanuman does not walk; he decides where the horizon should be. You will animate heroes, beasts, and demon lords — from hand-keyed cinematic arcs to systemic combat sets that read at a glance and feel like thunder.",
    duties: [
      "Deliver hand-keyed and mocap-polished animation sets for heroes and foes.",
      "Build locomotion that carries personality in every frame.",
      "Prototype combat reactions with designers and programmers.",
      "Feed the facial pipeline for our story scenes — ten heads included.",
    ],
    requisites: [
      "4+ years animating characters for shipped action titles.",
      "Deep Maya/mocap toolkit experience; Motion Matching curiosity a boon.",
      "Reel showing weight, timing, and acting — not just movement.",
      "You animate for the player's eyes first and the camera second.",
    ],
  },
  {
    slug: "game-systems-designer",
    title: "Lead Game Systems Designer",
    sanskritTitle: "युक्तिकर्ता",
    department: "Design",
    realm: "Ayodhya HQ · Hybrid",
    type: "Full-time",
    experience: "7+ years",
    salary: "$115k – $150k + realm equity",
    featured: true,
    summary:
      "Architect karma itself — the systems by which every deed returns to its doer.",
    description:
      "Design the invisible machinery of dharma: economy, progression, and the karma engine that remembers every choice from Ayodhya to Lanka. You will write systems that are simple to grasp and vast in consequence.",
    duties: [
      "Own progression, economy, and the cross-realm karma simulation.",
      "Model, simulate, and tune systems in spreadsheets and in engine.",
      "Run playtests that seek truth, not comfort.",
      "Write the design scrolls that keep ninety people building one game.",
    ],
    requisites: [
      "7+ years in systems design with at least two shipped titles.",
      "You can simulate an economy before a single line of code exists.",
      "Elegant writing — your docs read like scripture, not tickets.",
      "A lover of systemic games who can cite your influences precisely.",
    ],
  },
  {
    slug: "narrative-writer",
    title: "Narrative Writer — the Katha Cell",
    sanskritTitle: "कथावाचकः",
    department: "Narrative",
    realm: "Remote — Any Realm",
    type: "Full-time",
    experience: "4+ years",
    salary: "$80k – $115k + realm equity",
    featured: false,
    summary:
      "Write verses that players will quote at weddings. No pressure, warrior.",
    description:
      "The Ramayana survived three thousand years on the strength of its telling. You will script quests, barks, and cinematic moments that honor the epic while giving players agency Valmiki never dreamed of — branching dharma, earned endings.",
    duties: [
      "Write main-quest and side-quest scripts with real branching weight.",
      "Collaborate with quest designers on narrative systems and reactivity.",
      "Maintain the story bible that keeps three realms consistent.",
      "Work with Sanskrit scholars to keep our reverence accurate.",
    ],
    requisites: [
      "4+ years writing for shipped games or long-form interactive fiction.",
      "A portfolio of scenes with subtext, rhythm, and restraint.",
      "Familiarity with the Ramayana — or the hunger to study it deeply.",
      "You give notes as generously as you take them.",
    ],
  },
  {
    slug: "audio-designer-composer",
    title: "Audio Designer & Composer",
    sanskritTitle: "नादकर्ता",
    department: "Audio",
    realm: "Kishkindha Studio · Remote",
    type: "Contract → Full-time",
    experience: "4+ years",
    salary: "$75k – $110k realm-equivalent",
    featured: false,
    summary:
      "Score the conch, the rain on Lanka's gold, and the silence before an arrow lands.",
    description:
      "Sound is half of every epic ever told around a fire. You will fuse the veena and the modular synth, record real conch and thunder, and build a mix that makes players weep at a menu screen.",
    duties: [
      "Compose adaptive themes for realms, battles, and quiet dawns.",
      "Design SFX for weapons, creatures, and the vastness between them.",
      "Implement in Wwise/FMOD with our audio programmer.",
      "Protect the mix's dynamic range like a vow.",
    ],
    requisites: [
      "4+ years composing/designing for games or film with a strong reel.",
      "Interactive audio implementation experience (Wwise/FMOD).",
      "Indian classical instrumentation knowledge is a great boon.",
      "You mix for feeling first and loudness last.",
    ],
  },
  {
    slug: "qa-engineer-parikshak",
    title: "QA Engineer",
    sanskritTitle: "परीक्षकः",
    department: "Quality",
    realm: "Ayodhya HQ · Hybrid",
    type: "Full-time",
    experience: "3+ years",
    salary: "$70k – $95k + realm equity",
    featured: false,
    summary:
      "Break the realms before the players do — lovingly, systematically, completely.",
    description:
      "Every bridge to Lanka was tested stone by stone. You will hunt the rakshasas hiding in our builds: automation frameworks, destructive playtesting, and the cool judgment to decide what truly blocks the war effort.",
    duties: [
      "Design and maintain automated coverage for build-critical systems.",
      "Run structured destructive test campaigns across realms and builds.",
      "Triage with surgical clarity — severity, repro, and root-cause hints.",
      "Champion the player's trust in every release discussion.",
    ],
    requisites: [
      "3+ years in game QA with automation experience (Python a boon).",
      "A talent for breaking things that seemed unbreakable.",
      "Calm, precise bug writing — your reports need no translator.",
      "You care about the playtesters' time as much as the players'.",
    ],
  },
  {
    slug: "community-keeper",
    title: "Keeper of the Sabha — Community Lead",
    sanskritTitle: "सभापालकः",
    department: "Operations",
    realm: "Remote — Any Realm",
    type: "Full-time",
    experience: "4+ years",
    salary: "$70k – $100k + realm equity",
    featured: false,
    summary:
      "Host a community of millions as if each were a guest in your own court.",
    description:
      "The Sabha is where warriors gather, and its keeper sets the tone. You will build our community from first ember to wildfire — dev diaries, playtests, creator programs, and the honest voice of a studio that listens.",
    duties: [
      "Design and run our community rituals across Discord and beyond.",
      "Produce dev diaries and behind-the-forge stories with the team.",
      "Build the playtest pipeline that turns fans into co-creators.",
      "Measure sentiment honestly and carry it into the council.",
    ],
    requisites: [
      "4+ years growing game communities with receipts.",
      "Writing that sounds like a person, not a press release.",
      "Crisis-tested judgment — you have weathered a launch storm.",
      "Genuine love for the Ramayana's themes and the fans who carry them.",
    ],
  },
];

async function main() {
  console.log("Clearing old decrees…");
  await db.delete(jobs);
  console.log(`Posting ${SEED.length} decrees to the board…`);
  await db.insert(jobs).values(SEED);
  console.log("The board is set. The Sabha awaits.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
