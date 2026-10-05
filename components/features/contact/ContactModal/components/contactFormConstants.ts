export const interestsList = [
  'Cybersecurity', 'Managed Services', 'AI & Automation',
  'Application Engineering', 'Data & Integration',
  'Salesforce', 'Cloud & Infrastructure', 'Digital Transformation', 'Something else'
];

export const textFields = [
  { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'First Name', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Last Name', required: true },
  { name: 'email', label: 'Business Email', type: 'email', placeholder: 'Your Email', required: true },
  { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company', required: true },
  { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Your Job Title', required: true },
] as const;

export const inputClasses = (fieldName: string, errors: Record<string, string>) =>
  `cmi w-full px-4 py-3.5 rounded-lg border bg-white text-gray-900 text-[13px] placeholder-gray-500 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 ${errors[fieldName] ? 'border-error/80' : 'border-[#DCE6F5]'}`;
