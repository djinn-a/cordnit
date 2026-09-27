import { google } from 'googleapis';
import { WebsiteLead } from '@/types/lead';

/**
 * Explicit contract mapping a WebsiteLead to the Google Sheets row order.
 * If the physical Google Sheet columns are altered, this function MUST be updated.
 */
function mapLeadToSheetRow(lead: WebsiteLead): string[] {
  return [
    lead.submissionDateTime || new Date().toISOString(),
    lead.bookingDateTime || '',
    lead.firstName || '',
    lead.lastName || '',
    lead.email || '',
    lead.company || '',
    lead.jobTitle || '',
    lead.phone || '',
    Array.isArray(lead.interests) ? lead.interests.join(', ') : '',
    lead.helpDetails || '',
    lead.introCall ? 'Yes' : 'No',
    lead.privacy ? 'Yes' : 'No',
    'New', // Default CRM status
    lead.source || '',
    lead.landingPage || '',
    lead.ctaLocation || '',
    lead.utmSource || '',
    lead.utmMedium || '',
    lead.utmCampaign || '',
    lead.utmContent || '',
    lead.referrer || '',
    lead.submissionId || '' // Append ID to the end for correlation
  ];
}

/**
 * Service to handle Google Sheets integration for lead storage.
 */
export async function appendLeadToSheet(lead: WebsiteLead) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // Safe parsing for private key newlines
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!sheetId || !clientEmail || !privateKey) {
    throw new Error('Google Sheets configuration is missing.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  
  const values = [mapLeadToSheetRow(lead)];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'A1',
    valueInputOption: 'RAW',
    requestBody: { values },
  });
  
  return { success: true };
}
