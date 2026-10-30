import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { getJobApplications, updateJobApplicationStatus } from "@/lib/firebase";

const COOKIE_NAME = "treta_portal_auth";
const SECRET = process.env.SESSION_SECRET || "treta-sabha-portal-secret-key-2026";

function verifyToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [data, signature] = parts;
  const expected = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    return payload && payload.exp && payload.exp > Date.now();
  } catch {
    return false;
  }
}

async function isAuthorized(req: Request): Promise<boolean> {
  // Check cookie first
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (verifyToken(token || "")) return true;

  // Check x-portal-pin header fallback
  const headerPin = req.headers.get("x-portal-pin");
  const expectedPin = process.env.ADMIN_PORTAL_PIN;
  if (headerPin && expectedPin && headerPin.trim() === expectedPin.trim()) {
    return true;
  }

  return false;
}

/**
 * Fetch all candidate responses from Firestore (Protected by 6-digit PIN)
 */
export async function GET(req: Request) {
  try {
    const authorized = await isAuthorized(req);
    if (!authorized) {
      return NextResponse.json(
        { error: "Unauthorized. Enter 6-digit PIN to access Sabha responses." },
        { status: 401 }
      );
    }

    const applications = await getJobApplications();

    return NextResponse.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error: any) {
    console.error("Portal responses GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch candidate responses." },
      { status: 500 }
    );
  }
}

/**
 * Update candidate status in Firestore (e.g. Under Review, Shortlisted, Interviewing, Hired)
 */
export async function PATCH(req: Request) {
  try {
    const authorized = await isAuthorized(req);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const docId = String(body.docId || "").trim();
    const status = String(body.status || "").trim();

    if (!docId || !status) {
      return NextResponse.json(
        { error: "docId and status are required." },
        { status: 400 }
      );
    }

    await updateJobApplicationStatus(docId, status);

    return NextResponse.json({
      success: true,
      message: `Status updated to '${status}'.`,
    });
  } catch (error: any) {
    console.error("Portal responses PATCH error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update status." },
      { status: 500 }
    );
  }
}
