import nodemailer from "nodemailer";
import { Resend } from "resend";

export interface ApplicationEmailPayload {
  docId?: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  jobTitle: string;
  department?: string;
  university?: string;
  candidatePortfolio?: string;
  candidateOath?: string;
  timestamp?: string;
}

const DEFAULT_RECIPIENT = "koushik908p@gmail.com";

/**
 * Generates an executive Ramayana / Legends of Treta themed HTML email for the recruiter
 */
export function generateApplicationEmailHtml(data: ApplicationEmailPayload): string {
  const dateStr = data.timestamp || new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const portfolioLink = data.candidatePortfolio
    ? `<a href="${data.candidatePortfolio}" style="color:#ffd700;word-break:break-all;" target="_blank">${data.candidatePortfolio}</a>`
    : `<span style="color:#8f9e95;">Not provided</span>`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Job Application - Legends of Treta</title>
</head>
<body style="margin:0;padding:24px;background-color:#070a08;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f7eedb;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;background:#101511;border:1px solid rgba(212,175,55,0.4);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,0.8);overflow:hidden;">
    <!-- Gold Trim Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#ffd700 0%,#ff9933 100%);padding:6px 20px;text-align:right;">
        <span style="font-family:monospace;font-size:10px;font-weight:700;color:#090d0a;letter-spacing:0.18em;text-transform:uppercase;">
          HERINOVA GAME STUDIOS // RECRUITMENT NOTIFICATION
        </span>
      </td>
    </tr>

    <!-- Main Title Header -->
    <tr>
      <td style="padding:28px 32px 18px;border-bottom:1px solid rgba(212,175,55,0.2);">
        <div style="font-family:monospace;font-size:11px;color:#ffd700;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:6px;">
          ⚔ LEGENDS OF TRETA // SABHA INSCRIPTION
        </div>
        <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:700;letter-spacing:0.02em;">
          New Candidate Application Received
        </h1>
        <p style="margin:8px 0 0;font-size:13px;color:#8f9e95;line-height:1.5;">
          A new application has been submitted and stored in Firebase Firestore (<code style="color:#ffd700;">ramayana-jobs</code>).
        </p>
      </td>
    </tr>

    <!-- Candidate Summary Card -->
    <tr>
      <td style="padding:24px 32px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0 10px;">
          <!-- Role -->
          <tr>
            <td width="35%" style="font-family:monospace;font-size:11px;color:#8f9e95;text-transform:uppercase;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:6px 0 0 6px;">
              Applied Role:
            </td>
            <td style="padding:8px 12px;background:rgba(212,175,55,0.06);border-left:2px solid #ffd700;border-radius:0 6px 6px 0;font-weight:600;color:#ffffff;font-size:14px;">
              ${data.jobTitle}
            </td>
          </tr>

          <!-- Full Name -->
          <tr>
            <td style="font-family:monospace;font-size:11px;color:#8f9e95;text-transform:uppercase;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:6px 0 0 6px;">
              Candidate Name:
            </td>
            <td style="padding:8px 12px;background:rgba(255,255,255,0.02);border-radius:0 6px 6px 0;font-weight:600;color:#f7eedb;font-size:14px;">
              ${data.candidateName}
            </td>
          </tr>

          <!-- Email -->
          <tr>
            <td style="font-family:monospace;font-size:11px;color:#8f9e95;text-transform:uppercase;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:6px 0 0 6px;">
              Email Address:
            </td>
            <td style="padding:8px 12px;background:rgba(255,255,255,0.02);border-radius:0 6px 6px 0;font-size:13px;">
              <a href="mailto:${data.candidateEmail}" style="color:#ffd700;text-decoration:none;font-weight:500;">
                ${data.candidateEmail} ↗
              </a>
            </td>
          </tr>

          <!-- University -->
          <tr>
            <td style="font-family:monospace;font-size:11px;color:#8f9e95;text-transform:uppercase;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:6px 0 0 6px;">
              University / College:
            </td>
            <td style="padding:8px 12px;background:rgba(255,255,255,0.02);border-radius:0 6px 6px 0;color:#ffffff;font-size:13px;font-weight:500;">
              🎓 ${data.university || "Manav Rachana (MRIIRS / MRU)"}
            </td>
          </tr>

          <!-- Portfolio / Links -->
          <tr>
            <td style="font-family:monospace;font-size:11px;color:#8f9e95;text-transform:uppercase;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:6px 0 0 6px;">
              Portfolio / GitHub:
            </td>
            <td style="padding:8px 12px;background:rgba(255,255,255,0.02);border-radius:0 6px 6px 0;font-size:13px;">
              ${portfolioLink}
            </td>
          </tr>

          ${data.docId ? `
          <!-- Firestore ID -->
          <tr>
            <td style="font-family:monospace;font-size:11px;color:#8f9e95;text-transform:uppercase;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:6px 0 0 6px;">
              Firestore Doc ID:
            </td>
            <td style="padding:8px 12px;background:rgba(255,255,255,0.02);border-radius:0 6px 6px 0;font-family:monospace;font-size:12px;color:#ffd700;">
              ${data.docId}
            </td>
          </tr>
          ` : ""}
        </table>

        <!-- Candidate Oath / Statement -->
        ${data.candidateOath ? `
        <div style="margin-top:20px;padding:16px;background:rgba(0,0,0,0.5);border:1px solid rgba(212,175,55,0.25);border-radius:8px;">
          <div style="font-family:monospace;font-size:10px;color:#ffd700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;">
            STATEMENT OF INTENT / OATH
          </div>
          <div style="font-size:13px;color:#d5e0d8;line-height:1.6;font-style:italic;">
            "${data.candidateOath}"
          </div>
        </div>
        ` : ""}

        <!-- Action Buttons -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;">
          <tr>
            <td align="center">
              <a href="mailto:${data.candidateEmail}?subject=Legends%20of%20Treta%20Application%20-%20Herinova%20Game%20Studios" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#ffd700,#ff9933);color:#090d0a;font-family:monospace;font-size:12px;font-weight:700;letter-spacing:0.12em;text-decoration:none;border-radius:6px;text-transform:uppercase;box-shadow:0 4px 15px rgba(255,215,0,0.3);">
                REPLY TO CANDIDATE ✉
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:18px 32px;background:#090d0a;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
        <div style="font-family:monospace;font-size:10px;color:#8f9e95;letter-spacing:0.1em;text-transform:uppercase;">
          Transmitted to: <span style="color:#ffd700;">${DEFAULT_RECIPIENT}</span>
        </div>
        <div style="font-size:11px;color:#5f6e65;margin-top:4px;">
          Legends of Treta Recruitment System · Herinova Game Studios
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Dispatch application notification email to recruiter (koushik908p@gmail.com)
 */
export async function sendApplicationNotificationEmail(data: ApplicationEmailPayload): Promise<{
  success: boolean;
  provider: string;
  error?: string;
  messageId?: string;
}> {
  const recipient = process.env.NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
  const subject = `[Legends of Treta] New Application: ${data.candidateName} - ${data.jobTitle} (${data.university || "University"})`;
  const html = generateApplicationEmailHtml(data);
  const text = `
New Job Application Received for Legends of Treta
------------------------------------------------
Role: ${data.jobTitle}
Candidate: ${data.candidateName}
Email: ${data.candidateEmail}
University: ${data.university || "Not provided"}
Portfolio: ${data.candidatePortfolio || "Not provided"}
Statement of Intent: ${data.candidateOath || "Not provided"}
Firestore Doc ID: ${data.docId || "Pending"}
  `.trim();

  // 1. Try Resend if RESEND_API_KEY is available
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Legends of Treta <onboarding@resend.dev>";
      const result = await resend.emails.send({
        from: fromEmail,
        to: recipient,
        subject,
        html,
        text,
      });

      if (result.error) {
        console.error("[Mailer Resend Error]:", result.error);
      } else {
        console.log(`[Mailer] Notification email sent via Resend to ${recipient}. ID: ${result.data?.id}`);
        return { success: true, provider: "resend", messageId: result.data?.id };
      }
    } catch (resendErr: any) {
      console.error("[Mailer Resend Exception]:", resendErr.message);
    }
  }

  // 2. Try Nodemailer with SMTP / Gmail App Password
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (smtpUser && smtpPass) {
    try {
      const isGmail = (process.env.SMTP_HOST || "").includes("gmail") || smtpUser.includes("@gmail.com");
      const transporter = nodemailer.createTransport(
        isGmail
          ? {
              service: "gmail",
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
            }
          : {
              host: process.env.SMTP_HOST || "smtp.gmail.com",
              port: Number(process.env.SMTP_PORT) || 465,
              secure: process.env.SMTP_SECURE === "false" ? false : true,
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
            }
      );

      const info = await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || "Legends of Treta Recruitment"}" <${smtpUser}>`,
        to: recipient,
        subject,
        html,
        text,
      });

      console.log(`[Mailer] Notification email sent via SMTP to ${recipient}. MessageId: ${info.messageId}`);
      return { success: true, provider: "smtp", messageId: info.messageId };
    } catch (smtpErr: any) {
      console.error("[Mailer SMTP Error]:", smtpErr.message);
      return { success: false, provider: "smtp", error: smtpErr.message };
    }
  }

  // 3. Fallback: Log application payload for recruiter
  console.log(`[Mailer] Application received for ${recipient}: Candidate "${data.candidateName}" for "${data.jobTitle}".`);
  console.log(`[Mailer Setup Notice]: To send live emails to ${recipient}, configure SMTP_USER/SMTP_PASS (Gmail App Password) or RESEND_API_KEY in .env.local.`);
  
  return {
    success: false,
    provider: "unconfigured",
    error: "SMTP_USER/SMTP_PASS or RESEND_API_KEY not configured yet in .env.local",
  };
}
