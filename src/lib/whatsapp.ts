export interface WhatsAppApplicationPayload {
  docId?: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  jobTitle: string;
  department?: string;
  university?: string;
  candidatePortfolio?: string;
  candidateOath?: string;
}

export const RECRUITER_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_RECRUITER_NUMBER ||
  process.env.WHATSAPP_RECRUITER_NUMBER ||
  "919398113504";

/**
 * Format candidate application details into a rich WhatsApp message
 */
export function formatWhatsAppMessage(data: WhatsAppApplicationPayload): string {
  const lines: string[] = [
    "🏹 *NEW CANDIDATE APPLICATION*",
    "⚔ *LEGENDS OF TRETA // HERINOVA GAME STUDIOS*",
    "━━━━━━━━━━━━━━━━━━━━",
    `🎯 *Role Applied:* ${data.jobTitle}`,
    `👤 *Candidate:* ${data.candidateName}`,
    `📧 *Email:* ${data.candidateEmail}`,
  ];

  if (data.candidatePhone) {
    lines.push(`📱 *Candidate Phone / WA:* ${data.candidatePhone}`);
  }

  lines.push(`🎓 *University / College:* ${data.university || "Manav Rachana (MRIIRS / MRU)"}`);

  if (data.candidatePortfolio) {
    lines.push(`🔗 *Portfolio / GitHub:* ${data.candidatePortfolio}`);
  }

  if (data.candidateOath) {
    lines.push("📜 *Statement of Intent / Oath:*");
    lines.push(`"${data.candidateOath}"`);
  }

  if (data.docId) {
    lines.push(`🆔 *Firestore Sabha ID:* ${data.docId}`);
  }

  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("🕹 _Transmitted via Legends of Treta Official Campus Portal_");

  return lines.join("\n");
}

/**
 * Generates direct WhatsApp transmission URL to Koushik (+91 93981 13504)
 */
export function getRecruiterWhatsAppUrl(
  data: WhatsAppApplicationPayload,
  recruiterNumber: string = RECRUITER_WHATSAPP_NUMBER
): string {
  const cleanNumber = recruiterNumber.replace(/[^0-9]/g, "");
  const message = formatWhatsAppMessage(data);
  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;
}

/**
 * Generates direct WhatsApp URL to reply to the candidate
 */
export function getCandidateChatWhatsAppUrl(
  candidatePhone: string,
  candidateName: string,
  jobTitle: string
): string {
  const cleanPhone = candidatePhone.replace(/[^0-9]/g, "");
  const replyMessage = `Namaste ${candidateName}! We have reviewed your application for *${jobTitle}* at *Legends of Treta (Herinova Game Studios)*. Let us schedule your interview!`;
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(replyMessage)}`;
}
