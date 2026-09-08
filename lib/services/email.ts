import { Resend } from 'resend';
import { WebsiteLead } from '@/types/lead';

/**
 * Service to handle email notifications for new leads via Resend.
 */
export async function sendLeadNotification(lead: WebsiteLead) {
  // TODO: Temporarily disabled because cordinit.com Resend domain verification is pending.
  // Remove this early return to re-enable email notifications once the domain is verified in Resend.
  return;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NOTIFICATION_FROM_EMAIL as string;
  const toEmail = process.env.NOTIFICATION_TO_EMAIL as string;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error('Email notification failed: Missing environment configuration.');
    return;
  }

  const resend = new Resend(apiKey);

  const renderOptionalRow = (label: string, value: string | null | undefined) => {
    const displayValue = value ? value : 'Not provided';
    return `<tr><td style="padding: 5px 0; font-weight: bold; width: 200px;">${label}:</td><td>${displayValue}</td></tr>`;
  };

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #2b5cff; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Cordinit Website Lead</h2>
      
      <h3 style="margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Contact Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 5px 0; font-weight: bold; width: 150px;">First Name:</td><td>${lead.firstName}</td></tr>
        <tr><td style="padding: 5px 0; font-weight: bold;">Last Name:</td><td>${lead.lastName}</td></tr>
        <tr><td style="padding: 5px 0; font-weight: bold;">Email:</td><td>${lead.email}</td></tr>
        <tr><td style="padding: 5px 0; font-weight: bold;">Company:</td><td>${lead.company}</td></tr>
        <tr><td style="padding: 5px 0; font-weight: bold;">Job Title:</td><td>${lead.jobTitle || 'Not provided'}</td></tr>
      </table>

      <h3 style="margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Enquiry Details</h3>
      <p><strong>Areas of Interest:</strong></p>
      <ul style="margin-top: 5px;">
        ${lead.interests.map(i => `<li>${i}</li>`).join('')}
      </ul>
      <p><strong>Help Details:</strong></p>
      <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #2b5cff; margin-top: 5px;">${lead.helpDetails}</p>

      <h3 style="margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Consent</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 5px 0; font-weight: bold; width: 250px;">Introductory Call Requested:</td><td>${lead.introCall ? 'Yes' : 'No'}</td></tr>
        <tr><td style="padding: 5px 0; font-weight: bold;">Privacy Policy Consent:</td><td>${lead.privacy ? 'Yes' : 'No'}</td></tr>
      </table>

      <h3 style="margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Lead Attribution</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${renderOptionalRow('Source', lead.source)}
        ${renderOptionalRow('Landing Page', lead.landingPage)}
        ${renderOptionalRow('CTA Location', lead.ctaLocation)}
        ${renderOptionalRow('Solution', lead.solution)}
        ${renderOptionalRow('Service', lead.service)}
        ${renderOptionalRow('Industry', lead.industry)}
        ${renderOptionalRow('Accelerator', lead.accelerator)}
        ${renderOptionalRow('Insight', lead.insight)}
        ${renderOptionalRow('Content', lead.content)}
        ${renderOptionalRow('UTM Source', lead.utmSource)}
        ${renderOptionalRow('UTM Medium', lead.utmMedium)}
        ${renderOptionalRow('UTM Campaign', lead.utmCampaign)}
        ${renderOptionalRow('UTM Content', lead.utmContent)}
        ${renderOptionalRow('Referrer', lead.referrer)}
        ${renderOptionalRow('Submission Date & Time', lead.submissionDateTime)}
        ${renderOptionalRow('Booking Date & Time', lead.bookingDateTime)}
      </table>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: 'New Cordinit Website Lead',
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API returned an error:', error);
    }
  } catch (err) {
    console.error('Failed to send lead notification email:', err);
  }
}
