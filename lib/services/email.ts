import 'server-only';
import { Resend } from 'resend';
import { LEAD_TYPE_LABELS, type LeadSubmission } from '@/lib/leads/schema';
import { logger } from '@/server/logger';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const row = (label: string, value: string | null | undefined) =>
  `<tr><td style="padding: 5px 0; font-weight: bold; width: 200px;">${escapeHtml(label)}:</td><td>${value ? escapeHtml(value) : 'Not provided'}</td></tr>`;

function renderLead(lead: LeadSubmission): string {
  const attribution = Object.entries(lead.attribution)
    .map(([key, value]) => row(key, value))
    .join('');

  const enquiry =
    lead.type === 'newsletter'
      ? ''
      : `
      <h3 style="margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Contact Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${row('First Name', lead.firstName)}
        ${row('Last Name', lead.lastName)}
        ${row('Company', lead.company)}
        ${row('Job Title', lead.jobTitle)}
        ${row('Phone', lead.phone)}
      </table>
      <h3 style="margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Enquiry Details</h3>
      <p><strong>Areas of Interest:</strong></p>
      <ul style="margin-top: 5px;">${lead.interests.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
      <p><strong>Help Details:</strong></p>
      <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #2b5cff; margin-top: 5px; white-space: pre-wrap;">${escapeHtml(lead.helpDetails)}</p>
      <table style="width: 100%; border-collapse: collapse;">
        ${row('Introductory Call Requested', lead.introCall ? 'Yes' : 'No')}
        ${row('Booking Date & Time', lead.bookingDateTime)}
      </table>`;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #2b5cff; border-bottom: 2px solid #eee; padding-bottom: 10px;">New ${escapeHtml(LEAD_TYPE_LABELS[lead.type])} lead</h2>
      <table style="width: 100%; border-collapse: collapse;">${row('Email', lead.email)}</table>
      ${enquiry}
      <h3 style="margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Lead Attribution</h3>
      <table style="width: 100%; border-collapse: collapse;">${attribution || row('Attribution', null)}</table>
    </div>
  `;
}

/**
 * Best-effort notification for a lead that is already stored. Never throws.
 */
export async function sendLeadNotification(lead: LeadSubmission) {
  // TODO: Temporarily disabled because cordinit.com Resend domain verification is pending.
  // Set LEAD_NOTIFICATIONS_ENABLED=true once the domain is verified in Resend.
  if (process.env.LEAD_NOTIFICATIONS_ENABLED !== 'true') return;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NOTIFICATION_FROM_EMAIL;
  const toEmail = process.env.NOTIFICATION_TO_EMAIL;
  if (!apiKey || !fromEmail || !toEmail) {
    logger.error('lead.notify.misconfigured');
    return;
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New ${LEAD_TYPE_LABELS[lead.type]} lead`,
      html: renderLead(lead),
    });
    if (error) logger.error('lead.notify.failed', { err: error.message });
  } catch (err) {
    logger.error('lead.notify.failed', { err });
  }
}
