import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { getPortalPinFromFirebase, updatePortalPinInFirebase } from "@/lib/firebase";

const COOKIE_NAME = "treta_portal_auth";
const SESSION_DURATION = 60 * 60 * 24; // 24 hours
const SECRET = process.env.SESSION_SECRET || "treta-sabha-portal-secret-key-2026";

function signToken(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

function verifyToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [data, signature] = parts;
  const expected = signToken(data);

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

/**
 * Verify 6-digit PIN directly against Cloud Firestore
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inputPin = String(body.pin || "").trim();

    if (inputPin.length !== 6 || !/^\d{6}$/.test(inputPin)) {
      return NextResponse.json(
        { error: "Please enter a valid 6-digit PIN" },
        { status: 400 }
      );
    }

    // Retrieve security PIN directly from Cloud Firestore (Document: settings/portal_security)
    const expectedPin = await getPortalPinFromFirebase();

    // Secure timing-safe comparison
    const inputBuf = Buffer.from(inputPin);
    const expectedBuf = Buffer.from(expectedPin);
    const isMatch =
      inputBuf.length === expectedBuf.length &&
      crypto.timingSafeEqual(inputBuf, expectedBuf);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect 6-digit PIN. Access denied." },
        { status: 401 }
      );
    }

    // Generate signed session token valid for 24 hours
    const payload = {
      role: "recruiter",
      exp: Date.now() + SESSION_DURATION * 1000,
    };
    const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const token = `${data}.${signToken(data)}`;

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_DURATION,
    });

    return NextResponse.json({
      success: true,
      message: "Authentication successful. Access granted to Candidate Sabha.",
    });
  } catch (error: any) {
    console.error("Portal PIN verification error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify PIN with Firebase" },
      { status: 500 }
    );
  }
}

/**
 * Update the 6-digit PIN stored in Cloud Firestore (Requires authenticated session)
 */
export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!verifyToken(token || "")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const newPin = String(body.newPin || "").trim();

    if (newPin.length !== 6 || !/^\d{6}$/.test(newPin)) {
      return NextResponse.json(
        { error: "New PIN must be exactly 6 digits." },
        { status: 400 }
      );
    }

    await updatePortalPinInFirebase(newPin);

    return NextResponse.json({
      success: true,
      message: `Security PIN updated in Firebase Firestore to ${newPin}.`,
    });
  } catch (error: any) {
    console.error("Portal PIN update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update PIN in Firebase" },
      { status: 500 }
    );
  }
}

/**
 * Check if the current browser session has a valid PIN token
 */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const isAuthenticated = verifyToken(token || "");

  return NextResponse.json({
    authenticated: isAuthenticated,
  });
}

/**
 * Lock / Logout from the portal
 */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out." });
}
