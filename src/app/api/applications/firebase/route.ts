import { NextResponse } from "next/server";
import { submitJobApplication, getJobApplications } from "@/lib/firebase";
import { sendApplicationNotificationEmail } from "@/lib/mailer";
import { getRecruiterWhatsAppUrl } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const candidateName = (body.candidateName || body.name || "").trim();
    const candidateEmail = (body.candidateEmail || body.email || "").trim();
    const candidatePhone = (body.candidatePhone || body.phone || "").trim();
    const jobTitle = (body.jobTitle || body.job || body.role || "").trim();
    const jobId = (body.jobId || jobTitle.toLowerCase().replace(/\s+/g, "-") || "general").trim();
    const candidatePortfolio = (body.candidatePortfolio || body.portfolio || "").trim();
    const candidateOath = (body.candidateOath || body.oath || "").trim();
    const university = (body.university || "Manav Rachana (MRIIRS / MRU)").trim();
    const department = (body.department || "").trim();

    if (!candidateName || !candidateEmail || !jobTitle) {
      return NextResponse.json(
        { error: "Candidate name, email, and job title are required." },
        { status: 400 }
      );
    }

    const docId = await submitJobApplication({
      jobId,
      jobTitle,
      department,
      candidateName,
      candidateEmail,
      candidatePhone,
      candidatePortfolio,
      candidateOath,
      university,
      status: "Inscribed in Sabha",
    });

    // Build instant WhatsApp transmission link for Koushik (+91 93981 13504)
    const whatsAppUrl = getRecruiterWhatsAppUrl({
      docId,
      candidateName,
      candidateEmail,
      candidatePhone,
      jobTitle,
      department,
      university,
      candidatePortfolio,
      candidateOath,
    });

    // Dispatch background email if configured
    const emailResult = await sendApplicationNotificationEmail({
      docId,
      candidateName,
      candidateEmail,
      candidatePhone,
      jobTitle,
      department,
      university,
      candidatePortfolio,
      candidateOath,
    }).catch((err) => {
      console.error("Email dispatch caught error:", err);
      return { success: false, provider: "error", error: err.message };
    });

    return NextResponse.json(
      {
        success: true,
        docId,
        whatsAppUrl,
        recruiterWhatsApp: "919398113504",
        emailNotification: emailResult,
        message: "Application inscribed into Firebase Firestore successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Firebase application submission error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to record application to Firestore.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const list = await getJobApplications();
    return NextResponse.json({ success: true, count: list.length, applications: list });
  } catch (error: any) {
    console.error("Firebase get applications error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve applications." },
      { status: 500 }
    );
  }
}
