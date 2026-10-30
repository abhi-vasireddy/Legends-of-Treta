import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { applications, jobs } from "@/db/schema";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Speak your name to the Sabha before you loose an arrow." },
      { status: 401 },
    );
  }

  let body: { jobId?: string; years?: string; portfolio?: string | null; oath?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The scroll was unreadable." }, { status: 400 });
  }

  const jobId = (body.jobId ?? "").trim();
  const years = (body.years ?? "").trim();
  const oath = (body.oath ?? "").trim();
  const portfolio = body.portfolio?.trim() || null;

  if (!jobId) {
    return NextResponse.json({ error: "No target was chosen." }, { status: 400 });
  }
  if (!years) {
    return NextResponse.json(
      { error: "Name your seasons of battle before you draw." },
      { status: 400 },
    );
  }
  if (oath.length < 40 || oath.length > 2000) {
    return NextResponse.json(
      { error: "The oath must carry weight — forty runes at least." },
      { status: 400 },
    );
  }
  if (portfolio && !/^https?:\/\/.+\..+/.test(portfolio)) {
    return NextResponse.json(
      { error: "That scroll of deeds has no readable route (use a full URL)." },
      { status: 400 },
    );
  }

  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  if (!job) {
    return NextResponse.json(
      { error: "That seat does not exist in this realm." },
      { status: 404 },
    );
  }

  const [existing] = await db
    .select()
    .from(applications)
    .where(and(eq(applications.userId, session.uid), eq(applications.jobId, jobId)))
    .limit(1);
  if (existing) {
    return NextResponse.json(
      { error: "Your arrow already flies toward this target." },
      { status: 409 },
    );
  }

  const [created] = await db
    .insert(applications)
    .values({
      userId: session.uid,
      name: session.name,
      email: session.email,
      jobId,
      years,
      portfolio,
      oath,
      status: "Fired",
    })
    .returning();

  return NextResponse.json({ application: created }, { status: 201 });
}
