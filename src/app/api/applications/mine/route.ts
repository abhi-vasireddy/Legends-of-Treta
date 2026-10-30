import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { applications, jobs } from "@/db/schema";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "The gates are shut." }, { status: 401 });
  }

  const rows = await db
    .select({
      id: applications.id,
      status: applications.status,
      years: applications.years,
      oath: applications.oath,
      portfolio: applications.portfolio,
      createdAt: applications.createdAt,
      jobTitle: jobs.title,
      jobSanskrit: jobs.sanskritTitle,
      jobSlug: jobs.slug,
    })
    .from(applications)
    .innerJoin(jobs, eq(applications.jobId, jobs.id))
    .where(eq(applications.userId, session.uid))
    .orderBy(desc(applications.createdAt));

  return NextResponse.json({ applications: rows });
}
