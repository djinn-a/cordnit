export const FORM_FIELDS = [
  { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'First Name', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Last Name', required: true },
  { name: 'email', label: 'Business Email', type: 'email', placeholder: 'Your Email', required: true },
  { name: 'company', label: 'Company', type: 'text', placeholder: 'Your Company', required: true },
  { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Your Job Title', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Your Phone Number', required: true }
] as const;
