import { useState } from 'react';

export function useLeadForm(additionalContext: Record<string, any> = {}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    helpDetails: '',
    introCall: false,
    privacy: false
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (name === 'email') {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) delete newErrors[name];
        } else if (type === 'checkbox') {
          if (checked) delete newErrors[name];
        } else {
          if (value.trim() !== '') delete newErrors[name];
        }
        return newErrors;
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
          const newErrs = { ...errs };
          delete newErrs.interests;
          return newErrs;
        });
      }
      return newInterests;
    });
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      jobTitle: '',
      helpDetails: '',
      introCall: false,
      privacy: false
    });
    setSelectedInterests([]);
    setErrors({});
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: Record<string, boolean> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.lastName.trim()) newErrors.lastName = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.company.trim()) newErrors.company = true;
    if (!formData.helpDetails.trim()) newErrors.helpDetails = true;
    if (!formData.introCall) newErrors.introCall = true;
    if (!formData.privacy) newErrors.privacy = true;
    if (selectedInterests.length === 0) newErrors.interests = true;
    
    setErrors(newErrors);
    setSubmitError(null);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const payload = {
          ...formData,
          interests: selectedInterests,
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
      } catch (error) {
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
    isSubmitting,
    submitError,
    isSuccess,
    handleInputChange,
    toggleInterest,
    handleSubmit,
    resetForm,
    setIsSuccess // allow manual override if needed
  };
}
