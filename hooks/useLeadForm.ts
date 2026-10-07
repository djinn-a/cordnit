import { useCallback, useRef, useState } from 'react';
import { submitLead } from '@/lib/leads/client';
import {
  contactSubmissionSchema,
  leadFieldErrors,
  leadFormSubmissionSchema,
  validateEnquiryField,
  type EnquiryField,
} from '@/lib/leads/schema';
import { useBotSignals } from './useBotSignals';
import { trackEvent } from '@/lib/analytics';

export type EnquiryLeadType = 'lead_form' | 'contact';
type LeadContext = Record<string, string | boolean | undefined>;

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  jobTitle: '',
  phone: '',
  helpDetails: '',
  introCall: false,
  privacy: false
};

type FormData = typeof EMPTY_FORM;

const TEXT_FIELDS = new Set<EnquiryField>(['firstName', 'lastName', 'email', 'company', 'jobTitle', 'phone', 'helpDetails']);

export function useLeadForm(type: EnquiryLeadType, context: LeadContext = {}) {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  /** string messages – empty string means no error */
  const [errors, setErrors] = useState<Record<string, string>>({});
  /** tracks which fields the user has blurred at least once */
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { honeypotProps, getSignals, resetSignals } = useBotSignals();
  const hasStartedRef = useRef(false);

  const schema = type === 'contact' ? contactSubmissionSchema : leadFormSubmissionSchema;
  const requiresPhone = type === 'contact';
  const analyticsLocation = type === 'contact' ? 'contact-page' : 'contact-modal';

  const trackStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent('contact_form_start', { location: analyticsLocation });
  };

  const buildCandidate = (data: FormData, interests: string[]) => ({
    type,
    ...data,
    interests,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    trackStart();
    const { name, value, type: inputType } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let nextValue: string | boolean = inputType === 'checkbox' ? checked : value;
    if (name === 'phone') nextValue = value.replace(/\D/g, '').slice(0, 10);

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    // Live-clear errors as the user corrects the field
    if (errors[name] && name in EMPTY_FORM) {
      const stillInvalid = validateEnquiryField(name as EnquiryField, nextValue);
      if (!stillInvalid) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    }
  };

  const toggleInterest = (interest: string) => {
    trackStart();
    setSelectedInterests((prev) => {
      const newInterests = prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest];

      if (newInterests.length > 0 && errors.interests) {
        setErrors((errs) => {
          const next = { ...errs };
          delete next.interests;
          return next;
        });
      }
      return newInterests;
    });
  };

  const resetForm = useCallback(() => {
    setFormData(EMPTY_FORM);
    setSelectedInterests([]);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSuccess(false);
    hasStartedRef.current = false;
    resetSignals();
  }, [resetSignals]);

  /**
   * Validates a single field by name and sets/clears its error.
   * Called on blur so errors only appear after the user has left a field.
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!TEXT_FIELDS.has(name as EnquiryField)) return;
    if (name === 'phone' && !requiresPhone && !value) return;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const message = validateEnquiryField(name as EnquiryField, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  };

  const validateForm = () => {
    const result = schema.safeParse(buildCandidate(formData, selectedInterests));
    const newErrors = result.success ? {} : leadFieldErrors(result.error);
    // The intro-call checkbox is a UX requirement of these forms, not a data rule.
    if (!formData.introCall) newErrors.introCall = 'Required.';

    // Mark all fields as touched so messages become visible
    setTouched({
      firstName: true, lastName: true, email: true,
      company: true, jobTitle: true, phone: requiresPhone, helpDetails: true,
      introCall: true, privacy: true, interests: true
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Derives whether all required fields are currently valid without touching
   * error state – used for live button enable/disable.
   */
  const isFormValid =
    formData.introCall && schema.safeParse(buildCandidate(formData, selectedInterests)).success;

  const handleSubmit = async (e?: React.FormEvent, scheduledTime?: string) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    trackStart();
    trackEvent('contact_form_submit', { location: analyticsLocation });
    try {
      const result = await submitLead(
        {
          ...buildCandidate(formData, selectedInterests),
          phone: formData.phone || undefined,
          bookingDateTime: scheduledTime || undefined,
        },
        { context, signals: getSignals() }
      );

      if (result.ok) {
        trackEvent('contact_form_success', { location: analyticsLocation });
        setIsSuccess(true);
      } else if (result.code === 'VALIDATION') {
        trackEvent('contact_form_error', { location: analyticsLocation });
        setErrors(result.fieldErrors);
        setSubmitError('Please check the highlighted fields and try again.');
      } else {
        trackEvent('contact_form_error', { location: analyticsLocation });
        setSubmitError(result.message);
      }
    } catch (error) {
      trackEvent('contact_form_error', { location: analyticsLocation });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    selectedInterests,
    errors,
    touched,
    isSubmitting,
    submitError,
    isSuccess,
    isFormValid,
    honeypotProps,
    handleInputChange,
    handleBlur,
    toggleInterest,
    validateForm,
    handleSubmit,
    resetForm,
    setIsSuccess
  };
}
