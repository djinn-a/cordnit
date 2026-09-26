import { useCallback, useState } from 'react';

/** Regex: only letters and spaces (no digits, symbols, underscores) */
const NAME_REGEX = /^[A-Za-z ]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useLeadForm(additionalContext: Record<string, string | boolean | undefined> = {}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    helpDetails: '',
    introCall: false,
    privacy: false
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  /** string messages – empty string means no error */
  const [errors, setErrors] = useState<Record<string, string>>({});
  /** tracks which fields the user has blurred at least once */
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Filter value at input level before storing in state
    let sanitizedValue = type === 'checkbox' ? checked : value;
    if (name === 'firstName' || name === 'lastName' || name === 'company' || name === 'jobTitle') {
      // Strip any character that is not a letter or space
      sanitizedValue = (value as string).replace(/[^A-Za-z ]/g, '');
    } else if (name === 'phone') {
      // Strip non-digits and cap at 10 characters
      sanitizedValue = (value as string).replace(/\D/g, '').slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Live-clear errors as the user corrects the field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };

        if (name === 'firstName' || name === 'lastName' || name === 'company' || name === 'jobTitle') {
          const trimmed = value.trim();
          if (trimmed && NAME_REGEX.test(trimmed)) delete next[name];
        } else if (name === 'email') {
          if (EMAIL_REGEX.test(value)) delete next[name];
        } else if (type === 'checkbox') {
          if (checked) delete next[name];
        } else {
          if (value.trim() !== '') delete next[name];
        }

        return next;
      });
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      const isSelected = prev.includes(interest);
      const newInterests = isSelected
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
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      jobTitle: '',
      phone: '',
      helpDetails: '',
      introCall: false,
      privacy: false
    });
    setSelectedInterests([]);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSuccess(false);
  }, []);

  /**
   * Validates a single field by name and sets/clears its error.
   * Called on blur so errors only appear after the user has left a field.
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => {
      const next = { ...prev };

      if (name === 'firstName') {
        const trimmed = value.trim();
        if (!trimmed) next.firstName = 'Please enter your first name.';
        else if (!NAME_REGEX.test(trimmed)) next.firstName = 'Only letters and spaces are allowed.';
        else delete next.firstName;
      } else if (name === 'lastName') {
        const trimmed = value.trim();
        if (!trimmed) next.lastName = 'Please enter your last name.';
        else if (!NAME_REGEX.test(trimmed)) next.lastName = 'Only letters and spaces are allowed.';
        else delete next.lastName;
      } else if (name === 'email') {
        const trimmed = value.trim();
        if (!trimmed) next.email = 'Please enter your email address.';
        else if (!EMAIL_REGEX.test(value)) next.email = 'Please enter a valid email address.';
        else delete next.email;
      } else if (name === 'company') {
        const trimmed = value.trim();
        if (!trimmed) next.company = 'Please enter your company name.';
        else if (!NAME_REGEX.test(trimmed)) next.company = 'Only letters and spaces are allowed.';
        else delete next.company;
      } else if (name === 'jobTitle') {
        const trimmed = value.trim();
        if (!trimmed) next.jobTitle = 'Please enter your job title.';
        else if (!NAME_REGEX.test(trimmed)) next.jobTitle = 'Only letters and spaces are allowed.';
        else delete next.jobTitle;
      } else if (name === 'phone') {
        if (!value) next.phone = 'Please enter a 10-digit number.';
        else if (value.length < 10) next.phone = 'Please enter a 10-digit number.';
        else delete next.phone;
      } else if (name === 'helpDetails') {
        if (!value.trim()) next.helpDetails = 'Please tell us about your requirement.';
        else delete next.helpDetails;
      }

      return next;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const firstTrimmed = formData.firstName.trim();
    if (!firstTrimmed) {
      newErrors.firstName = 'Please enter your first name.';
    } else if (!NAME_REGEX.test(firstTrimmed)) {
      newErrors.firstName = 'Only letters and spaces are allowed.';
    }

    const lastTrimmed = formData.lastName.trim();
    if (!lastTrimmed) {
      newErrors.lastName = 'Please enter your last name.';
    } else if (!NAME_REGEX.test(lastTrimmed)) {
      newErrors.lastName = 'Only letters and spaces are allowed.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your company name.';
    } else if (!NAME_REGEX.test(formData.company.trim())) {
      newErrors.company = 'Only letters and spaces are allowed.';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Please enter your job title.';
    } else if (!NAME_REGEX.test(formData.jobTitle.trim())) {
      newErrors.jobTitle = 'Only letters and spaces are allowed.';
    }

    if (!formData.helpDetails.trim()) {
      newErrors.helpDetails = 'Please tell us about your requirement.';
    }

    if (!formData.introCall) newErrors.introCall = 'Required.';
    if (!formData.privacy) newErrors.privacy = 'Required.';
    if (selectedInterests.length === 0) newErrors.interests = 'Please select an area of interest.';

    // Mark all fields as touched so messages become visible
    setTouched({
      firstName: true, lastName: true, email: true,
      company: true, jobTitle: true, helpDetails: true,
      introCall: true, privacy: true, interests: true
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Derives whether all required fields are currently valid without touching
   * error state – used for live button enable/disable.
   */
  const isFormValid = (() => {
    const firstTrimmed = formData.firstName.trim();
    const lastTrimmed = formData.lastName.trim();
    const companyTrimmed = formData.company.trim();
    const jobTitleTrimmed = formData.jobTitle.trim();
    return (
      Boolean(firstTrimmed) &&
      NAME_REGEX.test(firstTrimmed) &&
      Boolean(lastTrimmed) &&
      NAME_REGEX.test(lastTrimmed) &&
      EMAIL_REGEX.test(formData.email) &&
      Boolean(companyTrimmed) &&
      NAME_REGEX.test(companyTrimmed) &&
      Boolean(jobTitleTrimmed) &&
      NAME_REGEX.test(jobTitleTrimmed) &&
      Boolean(formData.helpDetails.trim()) &&
      formData.introCall &&
      formData.privacy &&
      selectedInterests.length > 0
    );
  })();

  const handleSubmit = async (e?: React.FormEvent, scheduledTime?: string) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Artificial 2-second delay to show the validation UI
        await new Promise(resolve => setTimeout(resolve, 2000));

        const payload = {
          ...formData,
          interests: selectedInterests,
          bookingDateTime: scheduledTime || null,
          ...additionalContext
        };

        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setIsSuccess(true);
        } else {
          setSubmitError("Something went wrong while submitting your enquiry. Please try again.");
        }
      } catch {
        setSubmitError("Something went wrong while submitting your enquiry. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
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
    handleInputChange,
    handleBlur,
    toggleInterest,
    validateForm,
    handleSubmit,
    resetForm,
    setIsSuccess
  };
}
