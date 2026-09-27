export const NAME_REGEX = /^[A-Za-z ]+$/;
// Simplified email regex to avoid backtracking warnings
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateNameField = (value: string, emptyMsg: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return emptyMsg;
  if (!NAME_REGEX.test(trimmed)) return 'Only letters and spaces are allowed.';
  return null;
};

const validators: Record<string, (value: string) => string | null> = {
  firstName: (v) => validateNameField(v, 'Please enter your first name.'),
  lastName: (v) => validateNameField(v, 'Please enter your last name.'),
  company: (v) => validateNameField(v, 'Please enter your company name.'),
  jobTitle: (v) => validateNameField(v, 'Please enter your job title.'),
  email: (v) => {
    if (!v.trim()) return 'Please enter your email address.';
    if (!EMAIL_REGEX.test(v)) return 'Please enter a valid email address.';
    return null;
  },
  phone: (v) => {
    if (!v || v.length < 10) return 'Please enter a 10-digit number.';
    return null;
  },
  helpDetails: (v) => {
    if (!v.trim()) return 'Please tell us about your requirement.';
    return null;
  }
};

export const validateField = (name: string, value: string): string | null => {
  const validator = validators[name];
  return validator ? validator(value) : null;
};

export interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  helpDetails: string;
  introCall: boolean;
  privacy: boolean;
}

export const checkIsFormValid = (formData: FormDataState, selectedInterests: string[], requiresPhone: boolean = false): boolean => {
  const fieldsToValidate: (keyof FormDataState)[] = ['firstName', 'lastName', 'email', 'company', 'jobTitle', 'helpDetails'];
  if (requiresPhone) fieldsToValidate.push('phone');
  
  for (const field of fieldsToValidate) {
    if (validateField(field, formData[field] as string)) {
      return false;
    }
  }

  if (!formData.introCall || !formData.privacy || selectedInterests.length === 0) {
    return false;
  }

  return true;
};
