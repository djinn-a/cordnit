import { useState, useCallback } from 'react';
import { validateField, FormDataState } from '@/lib/utils/leadFormValidators';
interface UseLeadFormValidationProps {
  requiresPhone?: boolean;
}

export function useLeadFormValidation({ requiresPhone = false }: UseLeadFormValidationProps = {}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const clearErrorIfValid = useCallback((name: string, value: string | boolean, isCheckbox: boolean) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      
      const next = { ...prev };
      if (isCheckbox) {
        if (value) delete next[name];
      } else {
        const error = validateField(name, String(value));
        if (!error) delete next[name];
      }
      return next;
    });
  }, []);

  const clearInterestError = useCallback(() => {
    setErrors((prev) => {
      if (!prev.interests) return prev;
      const next = { ...prev };
      delete next.interests;
      return next;
    });
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }
      return next;
    });
  }, []);

  const validateForm = useCallback((formData: FormDataState, selectedInterests: string[]) => {
    const newErrors: Record<string, string> = {};

    const fieldsToValidate: (keyof FormDataState)[] = ['firstName', 'lastName', 'email', 'company', 'jobTitle', 'helpDetails'];
    if (requiresPhone) fieldsToValidate.push('phone');
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field] as string);
      if (error) newErrors[field] = error;
    });

    if (!formData.introCall) newErrors.introCall = 'Required.';
    if (!formData.privacy) newErrors.privacy = 'Required.';
    if (selectedInterests.length === 0) newErrors.interests = 'Please select an area of interest.';

    setTouched({
      firstName: true, lastName: true, email: true,
      company: true, jobTitle: true, helpDetails: true,
      introCall: true, privacy: true, interests: true
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [requiresPhone]);

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    clearErrorIfValid,
    clearInterestError,
    handleBlur,
    validateForm,
    resetValidation
  };
}
