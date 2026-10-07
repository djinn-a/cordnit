import { useCallback, useRef, useState } from 'react';
import { submitLead } from '@/lib/leads/client';
import { leadFieldErrors, newsletterSubmissionSchema } from '@/lib/leads/schema';
import { useBotSignals } from './useBotSignals';
import { trackEvent } from '@/lib/analytics';

export type NewsletterStatus = 'idle' | 'submitting' | 'success';

/** Shared state and submission for every newsletter signup surface. */
export function useNewsletterSubscribe(ctaLocation: string) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<NewsletterStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { honeypotProps, getSignals, resetSignals } = useBotSignals();
  const hasStartedRef = useRef(false);
  const analyticsLocation = ctaLocation === 'Newsletter Modal'
    ? 'newsletter-modal'
    : ctaLocation === 'Newsletter Section'
      ? 'newsletter-section'
      : 'newsletter-footer';

  const trackStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent('newsletter_start', { location: analyticsLocation });
  };

  const clearError = (field: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    trackStart();
    setEmail(e.target.value);
    if (errors.email) clearError('email');
  };

  const onConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    trackStart();
    setConsent(e.target.checked);
    if (errors.consent) clearError('consent');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (status === 'submitting') return;
    setSubmitError(null);

    const candidate = { type: 'newsletter' as const, email, consent };
    const parsed = newsletterSubmissionSchema.safeParse(candidate);
    if (!parsed.success) {
      setErrors(leadFieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setStatus('submitting');
    trackStart();
    trackEvent('newsletter_submit', { location: analyticsLocation });

    const result = await submitLead(candidate, { context: { ctaLocation }, signals: getSignals() });
    if (result.ok) {
      trackEvent('newsletter_success', { location: analyticsLocation });
      setStatus('success');
      return;
    }
    setStatus('idle');
    if (result.code === 'VALIDATION') setErrors(result.fieldErrors);
    setSubmitError(result.message);
  };

  const reset = useCallback(() => {
    setEmail('');
    setConsent(false);
    setStatus('idle');
    setErrors({});
    setSubmitError(null);
    hasStartedRef.current = false;
    resetSignals();
  }, [resetSignals]);

  return {
    email,
    consent,
    status,
    errors,
    submitError,
    honeypotProps,
    onEmailChange,
    onConsentChange,
    handleSubmit,
    reset
  };
}

export type NewsletterSubscribe = ReturnType<typeof useNewsletterSubscribe>;
