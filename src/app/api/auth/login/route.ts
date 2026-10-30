import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { setSession } from "@/lib/session";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { name?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The scroll was unreadable." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json(
      { error: "Speak a true name — two runes at least." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That message route leads nowhere. Give a true email." },
      { status: 400 },
    );
  }

  const [user] = await db
    .insert(users)
    .values({ name, email })
    .onConflictDoUpdate({ target: users.email, set: { name } })
    .returning();

  await setSession({ uid: user.id, name: user.name, email: user.email });

  return NextResponse.json({
    user: { name: user.name, email: user.email },
  });
}
