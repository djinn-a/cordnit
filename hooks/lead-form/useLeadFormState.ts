import { useState, useCallback } from 'react';
import { FormDataState } from '@/lib/utils/leadFormValidators';

const initialData: FormDataState = {
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

interface UseLeadFormStateProps {
  clearErrorIfValid: (name: string, value: string | boolean, isCheckbox: boolean) => void;
  clearInterestError: () => void;
}

export function useLeadFormState({ clearErrorIfValid, clearInterestError }: UseLeadFormStateProps) {
  const [formData, setFormData] = useState<FormDataState>(initialData);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const isCheckbox = type === 'checkbox';

    let sanitizedValue: string | boolean = isCheckbox ? checked : value;
    if (name === 'firstName' || name === 'lastName' || name === 'company' || name === 'jobTitle') {
      sanitizedValue = (value as string).replace(/[^A-Za-z ]/g, '');
    } else if (name === 'phone') {
      sanitizedValue = (value as string).replace(/\D/g, '').slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue
    }));

    clearErrorIfValid(name, sanitizedValue, isCheckbox);
  }, [clearErrorIfValid]);

  const toggleInterest = useCallback((interest: string) => {
    setSelectedInterests((prev) => {
      const isSelected = prev.includes(interest);
      const newInterests = isSelected
        ? prev.filter((i) => i !== interest)
        : [...prev, interest];

      if (newInterests.length > 0) {
        clearInterestError();
      }
      
      return newInterests;
    });
  }, [clearInterestError]);

  const resetState = useCallback(() => {
    setFormData(initialData);
    setSelectedInterests([]);
  }, []);

  return {
    formData,
    selectedInterests,
    handleInputChange,
    toggleInterest,
    resetState
  };
}
