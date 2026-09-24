export const interestsList = [
  'Cybersecurity', 'Managed Services', 'AI & Automation',
  'Application Engineering', 'Data & Integration',
  'Salesforce', 'Cloud & Infrastructure', 'Something else'
];

export const textFields = [
  { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter First Name', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter Last Name', required: true },
  { name: 'email', label: 'Enter Email', type: 'email', placeholder: 'Enter Email', required: true },
  { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company', required: true },
  { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Enter Job Title', required: true },
] as const;

export const inputClasses = (fieldName: string, errors: Record<string, string>) =>
  `cmi w-full px-4 py-3.5 rounded-lg border bg-transparent text-white text-[13px] placeholder-white transition-colors focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 ${errors[fieldName] ? 'border-error/80' : 'border-white/20'}`;
