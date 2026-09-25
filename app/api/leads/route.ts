import { NextRequest, NextResponse } from 'next/server';
import { WebsiteLead } from '@/types/lead';
import { appendLeadToSheet } from '@/lib/services/googleSheets';
import { sendLeadNotification } from '@/lib/services/email';

export async function POST(req: NextRequest) {
  try {
    const data: WebsiteLead = await req.json();

    data.submissionDateTime = new Date().toISOString();

    await appendLeadToSheet(data);
    await sendLeadNotification(data);
    
    return NextResponse.json({ success: true, message: 'Lead received successfully.' });
  } catch (error) {
    console.error('Error processing lead:', error);
    
    // Return safe configuration error if env vars are missing
    if (error instanceof Error && error.message.includes('configuration is missing')) {
       return NextResponse.json(
        { success: false, error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
