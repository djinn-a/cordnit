import { NextResponse } from 'next/server';
import { appendLeadToSheet } from '@/lib/services/googleSheets';
import { sendLeadNotification } from '@/lib/services/email';
import { validateLeadPayload, isError } from '@/lib/services/leadValidation';

// Configuration validation
function validateConfiguration(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEET_ID &&
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );
}

export async function POST(req: Request) {
  // Generate a server-owned request identity for logging
  const requestId = crypto.randomUUID();
  
  if (!validateConfiguration()) {
    console.error(`[Lead Submission] requestId=${requestId} category=GOOGLE_CONFIGURATION_FAILED`);
    return NextResponse.json(
      { success: false, error: 'Unable to submit your request right now. Please try again.' },
      { status: 500 }
    );
  }

  try {
    const rawData: unknown = await req.json();
    const { isValid, data, error } = validateLeadPayload(rawData);

    // Extract submissionId safely for logging if it exists
    const rawSubmissionId = extractSubmissionId(rawData);

    if (!isValid || !data) {
      console.warn(`[Lead Submission] requestId=${requestId} submissionId=${rawSubmissionId} operation=validate category=LEAD_VALIDATION_FAILED reason="${error}"`);
      return NextResponse.json({ success: false, error: 'Invalid submission data.' }, { status: 400 });
    }

    // Server-owned metadata
    data.submissionDateTime = new Date().toISOString();

    // Primary Operation: Append to Google Sheets
    try {
      await appendLeadToSheet(data);
    } catch (sheetError: unknown) {
      const category = getSheetErrorCategory(sheetError);
      const errMessage = getErrorMessage(sheetError);
      console.error(`[Lead Submission] requestId=${requestId} submissionId=${data.submissionId} operation=google_append category=${category} error="${errMessage}"`);
      
      return NextResponse.json(
        { success: false, error: 'Unable to submit your request right now. Please try again.' },
        { status: 500 }
      );
    }

    // Secondary Operation: Notify (Failures here DO NOT invalidate the primary submission)
    try {
      await sendLeadNotification(data);
    } catch (emailError: unknown) {
      const errMessage = getErrorMessage(emailError);
      console.error(`[Lead Submission] requestId=${requestId} submissionId=${data.submissionId} operation=notification category=NOTIFICATION_FAILED error="${errMessage}"`);
      // Proceed without throwing, since primary operation succeeded
    }
    
    return NextResponse.json({ success: true, message: 'Lead received successfully.' });
  } catch (error: unknown) {
    // Catch unhandled exceptions here to prevent the route from crashing,
    // and to ensure we always return a standardized JSON error response.
    const errorMessage = getErrorMessage(error);
    console.error(`[Lead Submission] requestId=${requestId} operation=api_handler category=UNKNOWN error="${errorMessage}"`);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

function extractSubmissionId(rawData: unknown): string {
  if (rawData && typeof rawData === 'object' && 'submissionId' in rawData) {
    const record = rawData as Record<string, unknown>;
    if (typeof record.submissionId === 'string') {
      return record.submissionId.substring(0, 50);
    }
  }
  return 'unknown';
}

function getSheetErrorCategory(sheetError: unknown): string {
  const isAuthError = isError(sheetError) && (
    sheetError.message.toLowerCase().includes('auth') || 
    sheetError.message.toLowerCase().includes('permission')
  );
  return isAuthError ? 'GOOGLE_PERMISSION_FAILED' : 'GOOGLE_APPEND_FAILED';
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
