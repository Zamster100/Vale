const SERVICE_LABELS: Record<string, string> = {
  cremation: "Cremation",
  burial: "Burial",
  direct_cremation: "Direct cremation",
  repatriation: "Repatriation",
  other: "Other / not sure yet",
};

export interface FDNotificationData {
  fdName: string;
  familyName: string;
  email: string;
  phone?: string;
  serviceType: string;
  message?: string;
  dashboardUrl: string;
}

export interface FamilyConfirmationData {
  familyName: string;
  fdName: string;
  serviceType: string;
}

const BRAND_HEADER = `
  <div style="background:#1a3a52;border-radius:8px 8px 0 0;padding:20px 32px;">
    <span style="color:#d4a574;font-size:20px;font-weight:700;letter-spacing:-0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">VALE</span>
  </div>`;

const BRAND_FOOTER = `
  <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    © 2026 VALE · Transparent prices. Genuine choice. Dignity for every family.<br/>
    Registered in England &amp; Wales.
  </p>`;

function wrap(inner: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:32px 16px;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;">
    ${BRAND_HEADER}
    <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:32px;">
      ${inner}
    </div>
    ${BRAND_FOOTER}
  </div>
</body></html>`;
}

export function buildFDNotificationEmail(data: FDNotificationData): string {
  const rows = [
    ["Family name", `<strong>${data.familyName}</strong>`],
    ["Email", `<a href="mailto:${data.email}" style="color:#1a3a52;">${data.email}</a>`],
    ...(data.phone ? [["Phone", `<a href="tel:${data.phone}" style="color:#1a3a52;">${data.phone}</a>`]] : []),
    ["Service", SERVICE_LABELS[data.serviceType] ?? data.serviceType],
    ...(data.message ? [["Message", `<em style="color:#374151;">"${data.message}"</em>`]] : []),
  ] as [string, string][];

  const table = rows.map(([label, val]) =>
    `<tr>
      <td style="padding:6px 0;color:#6b7280;font-size:13px;width:130px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;font-size:13px;">${val}</td>
    </tr>`
  ).join("");

  return wrap(`
    <h2 style="color:#1a3a52;font-size:20px;margin:0 0 6px;">New quote request</h2>
    <p style="color:#6b7280;font-size:14px;margin:0 0 24px;">A family has requested a quote from ${data.fdName}.</p>

    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin-bottom:24px;">
      <table style="width:100%;border-collapse:collapse;">${table}</table>
    </div>

    <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 24px;">
      Families who hear back within a few hours are significantly more likely to book.
      We recommend reaching out today.
    </p>

    <a href="${data.dashboardUrl}"
       style="display:inline-block;background:#1a3a52;color:#fff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:6px;text-decoration:none;">
      View in dashboard →
    </a>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0 16px;"/>
    <p style="color:#9ca3af;font-size:12px;margin:0;">
      You're receiving this because your business is listed on VALE.
      Manage notification preferences in your dashboard settings.
    </p>`);
}

export function buildFamilyConfirmationEmail(data: FamilyConfirmationData): string {
  return wrap(`
    <h2 style="color:#1a3a52;font-size:20px;margin:0 0 12px;">Your request has been sent</h2>
    <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 24px;">
      Thank you, ${data.familyName}. Your quote request has been sent to
      <strong>${data.fdName}</strong>. They will typically be in touch within 24 hours.
    </p>

    <div style="background:#faf6f1;border-left:3px solid #d4a574;padding:14px 18px;border-radius:0 6px 6px 0;margin-bottom:24px;">
      <p style="color:#92400e;font-size:12px;font-weight:600;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">Service requested</p>
      <p style="color:#374151;font-size:14px;margin:0;font-weight:600;">${SERVICE_LABELS[data.serviceType] ?? data.serviceType}</p>
    </div>

    <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 16px;">In the meantime:</p>
    <ul style="color:#374151;font-size:14px;line-height:1.9;margin:0 0 24px;padding-left:20px;">
      <li>Read verified reviews from other families</li>
      <li>Compare other funeral directors on VALE</li>
      <li>Pre-plan ahead using VALE Vault</li>
    </ul>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 16px;"/>
    <p style="color:#9ca3af;font-size:12px;margin:0;line-height:1.6;">
      VALE helps families find funeral directors with transparent, honest pricing.
      We never share your details with anyone other than the funeral director you contacted.
    </p>`);
}

export function logEmails(fd: FDNotificationData, family: FamilyConfirmationData): void {
  console.log("\n── [VALE EMAIL] FD Notification ──────────────────────────");
  console.log(`  To:      ${fd.fdName} <enquiries@vale.co.uk>`);
  console.log(`  Subject: New quote request from ${fd.familyName}`);
  console.log(`  Family:  ${fd.familyName} | ${fd.email}${fd.phone ? ` | ${fd.phone}` : ""}`);
  console.log(`  Service: ${SERVICE_LABELS[fd.serviceType] ?? fd.serviceType}`);
  if (fd.message) console.log(`  Message: "${fd.message}"`);
  console.log(`  CTA:     ${fd.dashboardUrl}`);

  console.log("\n── [VALE EMAIL] Family Confirmation ──────────────────────");
  console.log(`  To:      ${family.familyName} <${fd.email}>`);
  console.log(`  Subject: Your quote request has been sent to ${family.fdName}`);
  console.log("  Body:    See buildFamilyConfirmationEmail() for HTML template");
  console.log("──────────────────────────────────────────────────────────\n");

  // TODO: replace with Resend:
  // await resend.emails.send({
  //   from: "VALE <noreply@vale.co.uk>",
  //   to: fdEmail,
  //   subject: `New quote request from ${fd.familyName}`,
  //   html: buildFDNotificationEmail(fd),
  // });
}
