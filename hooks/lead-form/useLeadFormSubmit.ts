import { useState, useCallback } from 'react';
import { submitLeadAPI } from '@/lib/services/leadApiClient';
import { FormDataState } from '@/lib/utils/leadFormValidators';

export function useLeadFormSubmit(additionalContext: Record<string, string | boolean | undefined> = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const executeSubmit = useCallback(async (
    formData: FormDataState,
    selectedInterests: string[],
    scheduledTime?: string
  ) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const submissionId = window?.crypto?.randomUUID?.() ?? Math.random().toString(36).substring(2, 15); // NOSONAR

      const payload = {
        ...formData,
        interests: selectedInterests,
        bookingDateTime: scheduledTime || null,
        submissionId,
        ...additionalContext
      };

      const result = await submitLeadAPI(payload);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(result.error || "Something went wrong while submitting your enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Lead form submission failed:", error);
      setSubmitError("Something went wrong while submitting your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [additionalContext]);

  const resetSubmit = useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSuccess(false);
  }, []);

  return {
    isSubmitting,
    submitError,
    isSuccess,
    setIsSuccess,
    executeSubmit,
    resetSubmit
  };
}
