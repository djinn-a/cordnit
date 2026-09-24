export const INTERESTS_LIST = [
  'Cybersecurity', 'Managed Services', 'AI & Automation',
  'Application Engineering', 'Data & Integration',
  'Salesforce', 'Cloud & Infrastructure', 'Something else'
];

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

export const FORM_FIELDS: {
  label: string;
  name: 'firstName' | 'lastName' | 'email' | 'company' | 'jobTitle';
  type: string;
  placeholder: string;
  required: boolean;
}[] = [
  { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Enter First Name', required: true },
  { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Enter Last Name', required: true },
  { label: 'Enter Work Email', name: 'email', type: 'email', placeholder: 'Enter Work Email', required: true },
  { label: 'Company', name: 'company', type: 'text', placeholder: 'Enter Company', required: true },
  { label: 'Job Title', name: 'jobTitle', type: 'text', placeholder: 'Enter Job Title', required: false },
];
