import { checkIsFormValid } from '@/lib/utils/leadFormValidators';
import { useLeadFormValidation } from './lead-form/useLeadFormValidation';
import { useLeadFormState } from './lead-form/useLeadFormState';
import { useLeadFormSubmit } from './lead-form/useLeadFormSubmit';

export interface UseLeadFormOptions {
  requiresPhone?: boolean;
}

export function useLeadForm(additionalContext: Record<string, string | boolean | undefined> = {}, options: UseLeadFormOptions = {}) {
  // 1. Validation Concern
  const { 
    errors, touched, clearErrorIfValid, clearInterestError, 
    handleBlur, validateForm, resetValidation 
  } = useLeadFormValidation({ requiresPhone: options.requiresPhone });

  // 2. State & Input Sanitization Concern
  const { 
    formData, selectedInterests, handleInputChange, 
    toggleInterest, resetState 
  } = useLeadFormState({ clearErrorIfValid, clearInterestError });

  // 3. API Submission Concern
  const { 
    isSubmitting, submitError, isSuccess, setIsSuccess, 
    executeSubmit, resetSubmit 
  } = useLeadFormSubmit(additionalContext);

  // Derived state: Live button enabling/disabling
  const isFormValid = checkIsFormValid(formData, selectedInterests, options.requiresPhone);

  // Orchestrate the final submit action
  const handleSubmit = async (e?: React.SubmitEvent<HTMLFormElement>, scheduledTime?: string) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    if (validateForm(formData, selectedInterests)) {
      await executeSubmit(formData, selectedInterests, scheduledTime);
    }
  };

  // Orchestrate the reset action
  const resetForm = () => {
    resetState();
    resetValidation();
    resetSubmit();
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
    validateForm: () => validateForm(formData, selectedInterests),
    handleSubmit,
    resetForm,
    setIsSuccess
  };
}
