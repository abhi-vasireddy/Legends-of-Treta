"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Coins,
  Filter,
  MapPin,
  Scroll,
  Send,
  ShieldCheck,
  Target,
} from "lucide-react";
import type { Job } from "@/db/schema";
import ApplyModal from "@/components/careers/ApplyModal";

type Me = { name: string; email: string } | null;
type MyApp = {
  id: string;
  status: string;
  jobTitle: string;
  jobSanskrit: string;
  createdAt: string;
};

export default function CareersBoard({ jobs }: { jobs: Job[] }) {
  const [dept, setDept] = useState<string>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [target, setTarget] = useState<Job | null>(null);
  const [me, setMe] = useState<Me>(null);
  const [myApps, setMyApps] = useState<MyApp[]>([]);

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))],
    [jobs],
  );

  const visible = useMemo(
    () => (dept === "All" ? jobs : jobs.filter((j) => j.department === dept)),
    [dept, jobs],
  );

  const refresh = useCallback(async () => {
    try {
      const [meRes, appRes] = await Promise.all([
        fetch("/api/auth/me", { cache: "no-store" }),
        fetch("/api/applications/mine", { cache: "no-store" }),
      ]);
      const meData = (await meRes.json()) as { user: Me };
      setMe(meData.user);
      if (appRes.ok) {
        const appData = (await appRes.json()) as { applications: MyApp[] };
        setMyApps(appData.applications);
      } else {
        setMyApps([]);
      }
    } catch {
      /* the Sabha is momentarily silent */
    }
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("kodanda-session", refresh);
    return () => window.removeEventListener("kodanda-session", refresh);
  }, [refresh]);

  const appliedIds = useMemo(() => new Set(myApps.map((a) => a.jobTitle)), [myApps]);

  return (
    <section id="vacancies" className="relative mx-auto max-w-6xl px-6 pb-32 pt-16 md:px-10">
      {/* your quiver */}
      <AnimatePresence>
        {me && myApps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="panel-glass mb-12 flex flex-wrap items-center gap-4 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3">
              <Send className="h-4 w-4 -rotate-12 text-goldbright" />
              <p className="font-display text-xs font-bold tracking-[0.24em] text-goldbright">
                YOUR QUIVER, {me.name.split(" ")[0].toUpperCase()}
              </p>
            </div>
            <span className="hidden h-4 w-px bg-gold/25 sm:block" />
            <div className="flex flex-wrap gap-2">
              {myApps.map((a) => (
                <span
                  key={a.id}
                  className="flex items-center gap-2 rounded-full border border-gold/25 bg-bark/80 px-3.5 py-1.5 text-xs text-sand"
                >
                  <span className="font-sanskrit text-gold">{a.jobSanskrit}</span>
                  {a.jobTitle}
                  <span className="rounded-full bg-crimson/30 px-2 py-0.5 text-[10px] font-bold tracking-widest text-ivory">
                    {a.status.toUpperCase()}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 font-display text-[11px] font-bold tracking-[0.28em] text-mute">
          <Filter className="h-3.5 w-3.5 text-gold" />
          CHOOSE YOUR FIELD
        </span>
        <div className="flex flex-wrap gap-2">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`rounded-full px-4 py-2 font-display text-[11px] font-bold tracking-[0.16em] transition-all duration-300 ${
                dept === d
                  ? "btn-gold"
                  : "border border-gold/20 text-sand hover:border-goldbright/60 hover:text-goldbright"
              }`}
            >
              {d.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* vacancy list */}
      <div className="mt-10 space-y-5">
        <AnimatePresence mode="popLayout">
          {visible.map((job, i) => {
            const open = openSlug === job.slug;
            const applied = appliedIds.has(job.title);
            return (
              <motion.article
                layout
                key={job.slug}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: Math.min(i * 0.07, 0.4), ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-2xl border bg-bark/60 transition-colors duration-500 ${
                  job.featured
                    ? "border-gold/40 shadow-[0_0_60px_-20px_rgba(217,164,65,0.35)]"
                    : "border-gold/15 hover:border-gold/35"
                }`}
              >
                {job.featured && (
                  <div className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-golddeep to-gold px-4 py-1.5 font-display text-[10px] font-bold tracking-[0.22em] text-obsidian">
                    SACRED SEAT
                  </div>
                )}

                <button
                  onClick={() => setOpenSlug(open ? null : job.slug)}
                  className="flex w-full flex-col gap-5 px-6 py-7 text-left md:px-9"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="pr-24 md:pr-0">
                      <p className="font-sanskrit text-base text-gold/90">
                        {job.sanskritTitle}
                        <span className="ml-3 font-display text-[10px] font-bold tracking-[0.26em] text-mute">
                          {job.department.toUpperCase()}
                        </span>
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-bold tracking-wide text-ivory transition-colors group-hover:text-goldbright md:text-3xl">
                        {job.title}
                      </h3>
                    </div>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="btn-ghost mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-sand">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      {job.realm}
                    </span>
                    <span className="flex items-center gap-2">
                      <Scroll className="h-3.5 w-3.5 text-gold" />
                      {job.type} · {job.experience}
                    </span>
                    <span className="flex items-center gap-2">
                      <Coins className="h-3.5 w-3.5 text-gold" />
                      {job.salary}
                    </span>
                    {applied && (
                      <span className="flex items-center gap-2 rounded-full bg-crimson/25 px-3 py-1 font-display text-[10px] font-bold tracking-[0.18em] text-ivory">
                        ARROW FIRED
                      </span>
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gold/12 px-6 pb-8 pt-7 md:px-9">
                        <p className="max-w-3xl text-lg italic leading-relaxed text-goldbright/90">
                          “{job.summary}”
                        </p>
                        <p className="mt-4 max-w-3xl leading-relaxed text-sand">
                          {job.description}
                        </p>

                        <div className="mt-8 grid gap-8 md:grid-cols-2">
                          <div>
                            <h4 className="flex items-center gap-2 font-display text-xs font-bold tracking-[0.26em] text-gold">
                              <Target className="h-4 w-4" />
                              YOUR DUTIES IN THE VAN
                            </h4>
                            <ul className="mt-4 space-y-2.5">
                              {job.duties.map((d) => (
                                <li key={d} className="flex gap-3 text-sm leading-relaxed text-sand">
                                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="flex items-center gap-2 font-display text-xs font-bold tracking-[0.26em] text-gold">
                              <ShieldCheck className="h-4 w-4" />
                              THE PROOF OF YOUR WORTH
                            </h4>
                            <ul className="mt-4 space-y-2.5">
                              {job.requisites.map((r) => (
                                <li key={r} className="flex gap-3 text-sm leading-relaxed text-sand">
                                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-crimson" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                          <button
                            onClick={() => setTarget(job)}
                            disabled={applied}
                            className={`group/btn inline-flex items-center gap-3 rounded-full px-8 py-4 font-display text-xs font-bold tracking-[0.22em] ${
                              applied
                                ? "cursor-not-allowed border border-gold/20 text-mute"
                                : "btn-gold"
                            }`}
                          >
                            <Send className="h-4 w-4 -rotate-12 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                            {applied ? "ARROW ALREADY FIRED" : "NOCK YOUR ARROW"}
                          </button>
                          <p className="text-xs text-mute">
                            One moon&apos;s turning for the Sabha to answer.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </AnimatePresence>

        {visible.length === 0 && (
          <p className="rounded-2xl border border-gold/15 bg-bark/60 p-10 text-center text-sand">
            No seats open in this field today. The wheel of dharma turns —
            return soon.
          </p>
        )}
      </div>

      <ApplyModal job={target} onClose={() => setTarget(null)} />
    </section>
  );
}
