export const FORM_FIELDS = [
  { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'First Name', required: true, autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Last Name', required: true, autoComplete: 'family-name' },
  { name: 'email', label: 'Business Email', type: 'email', placeholder: 'Your Email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company', type: 'text', placeholder: 'Your Company', required: true, autoComplete: 'organization' },
  { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Your Job Title', required: true, autoComplete: 'organization-title' },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Your Phone Number', required: true, autoComplete: 'tel-national' }
] as const;
