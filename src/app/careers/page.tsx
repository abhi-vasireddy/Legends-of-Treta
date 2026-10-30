import type { Metadata } from "next";
import { asc, desc } from "drizzle-orm";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import Nav from "@/components/Nav";
import CareersHero from "@/components/careers/CareersHero";
import CareersBoard from "@/components/careers/CareersBoard";
import GameBriefing from "@/components/careers/GameBriefing";
import TretaJobBoard from "@/components/careers/TretaJobBoard";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "LEGENDS OF TRETA — Herinova Game Studios presents | Open Roles",
  description:
    "Open vacancies for LEGENDS OF TRETA — Herinova Game Studios presents: engineering, art, design, narrative, audio. Campus Recruitment Drive with MRIIRS & MRU.",
};

export default async function CareersPage() {
  let allJobs: any[] = [];
  try {
    allJobs = await db
      .select()
      .from(jobs)
      .orderBy(desc(jobs.featured), asc(jobs.title));
  } catch (err) {
    console.warn("DB offline, using TretaJobBoard fallback:", err);
  }

  return (
    <main className="relative bg-obsidian">
      <Nav />
      {allJobs && allJobs.length > 0 ? (
        <>
          <CareersHero count={allJobs.length} />
          <GameBriefing />
          <CareersBoard jobs={allJobs} />
        </>
      ) : (
        <div className="pt-20">
          <TretaJobBoard />
        </div>
      )}
      <Footer />
    </main>
  );
}
