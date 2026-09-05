import { google } from 'googleapis';
import { WebsiteLead } from '@/types/lead';

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
  
  const values = [
    [
      new Date().toISOString(), // Timestamp
      lead.firstName,
      lead.lastName,
      lead.email,
      lead.company,
      lead.jobTitle || '',
      lead.interests.join(', '),
      lead.helpDetails,
      lead.introCall ? 'Yes' : 'No',
      lead.privacy ? 'Yes' : 'No',
      'New', // Default status
      lead.source || '',
      lead.landingPage || '',
      lead.ctaLocation || '',
      lead.solution || '',
      lead.service || '',
      lead.industry || '',
      lead.accelerator || '',
      lead.insight || '',
      lead.content || '',
      lead.utmSource || '',
      lead.utmMedium || '',
      lead.utmCampaign || '',
      lead.utmContent || '',
      lead.referrer || ''
    ]
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Leads!A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
  
  return { success: true };
}
