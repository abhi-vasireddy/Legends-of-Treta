import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "kodanda_session";
const THIRTY_DAYS = 60 * 60 * 24 * 30;
const SECRET =
  process.env.SESSION_SECRET ?? "kodanda-sabha-dev-secret-राम";

export type SessionPayload = {
  uid: string;
  name: string;
  email: string;
  exp: number;
};

function sign(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

export async function setSession(
  payload: Omit<SessionPayload, "exp">,
): Promise<void> {
  const body: SessionPayload = {
    ...payload,
    exp: Date.now() + THIRTY_DAYS * 1000,
  };
  const data = Buffer.from(JSON.stringify(body)).toString("base64url");
  const store = await cookies();
  store.set(COOKIE_NAME, `${data}.${sign(data)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: THIRTY_DAYS,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const idx = raw.lastIndexOf(".");
  if (idx <= 0) return null;
  const data = raw.slice(0, idx);
  const sig = raw.slice(idx + 1);
  const expected = sign(data);
  // constant-time-ish comparison
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf8"),
    ) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
