export interface SubmitLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
  helpDetails: string;
  interests: string[];
  introCall: boolean;
  privacy: boolean;
  bookingDateTime?: string | null;
  submissionId: string;
  [key: string]: unknown; // For additional context fields
}

export interface SubmitLeadResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Executes the /api/leads network request and orchestrates a minimum UI delay
 * so that loaders don't flash too quickly on fast networks.
 */
export async function submitLeadAPI(payload: SubmitLeadPayload): Promise<SubmitLeadResponse> {
  // Network request starts immediately
  const fetchReq = fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // Minimum visual duration for UI consistency (1.5s)
  const uiDelay = new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // Wait for both the network and the UI delay to complete
    const [response] = await Promise.all([fetchReq, uiDelay]);
    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, message: data.message };
    } else {
      return { success: false, error: data.error || 'Unknown error occurred.' };
    }
  } catch (error) {
    // Exception is caught and handled here to prevent the UI from crashing,
    // allowing us to return a structured and graceful fallback response instead.
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Lead submission failed:', errorMessage);
    
    return { success: false, error: 'Network error or unable to parse response.' };
  }
}
