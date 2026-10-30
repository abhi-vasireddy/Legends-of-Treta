import { NextResponse } from "next/server";
import { asc, desc } from "drizzle-orm";
import { db } from "@/db";
import { jobs } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  const allJobs = await db
    .select()
    .from(jobs)
    .orderBy(desc(jobs.featured), asc(jobs.title));
  return NextResponse.json({ jobs: allJobs });
}
