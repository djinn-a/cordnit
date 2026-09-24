export const INTERESTS_LIST = [
  'Cybersecurity', 'Managed Services', 'AI & Automation',
  'Application Engineering', 'Data & Integration',
  'Salesforce', 'Cloud & Infrastructure', 'Something else'
];

export const FORM_FIELDS = [
  { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'First Name', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Last Name', required: true },
  { name: 'email', label: 'Business Email', type: 'email', placeholder: 'Your Email', required: true },
  { name: 'company', label: 'Company', type: 'text', placeholder: 'Your Company', required: true },
  { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Your Job Title', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Your Phone Number', required: true }
] as const;

export const PROCESS_STEPS = [
  {
    id: 'review',
    number: '1',
    title: 'We Review',
    description: 'Our team reviews your enquiry to identifies the right people to involve.'
  },
  {
    id: 'connect',
    number: '2',
    title: 'We Connect',
    description: 'We’ll get back to you within one business day to discuss your requirements and next steps.'
  },
  {
    id: 'understand',
    number: '3',
    title: 'We understand',
    description: 'We’ll discuss your objectives, challenges and priorities before recommending a way forward.'
  },
  {
    id: 'forward',
    number: '4',
    title: 'We move forward',
    description: 'If there’s a fit, we’ll define the right scope, approach and next steps together.'
  }
];

export const CONTACT_CARDS = [
  { id: 'new-business', title: 'New Business', email: 'business@cordinit.co.in' },
  { id: 'media', title: 'Media & Press Inquiries', email: 'media@cordinit.co.in' },
  { id: 'partnerships', title: 'Partnerships', email: 'partnerships@cordinit.co.in' },
  { id: 'careers', title: 'Careers' }
];
