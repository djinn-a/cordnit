export const contactCmsData = {
  formContent: {
    interestTitle: 'What can we help you with?',
    requirementLabel: 'Tell us about your requirement.',
    requirementPlaceholder: 'Briefly describe what you\'re looking to achieve...',
    introCallLabel: 'I would like to book a brief introductory call to discuss this.',
    privacyLabelPart1: 'I agree that Cordinit may use my details to process my enquiry in accordance with the ',
    privacyLabelLink: 'Privacy Policy',
    privacyLabelPart2: '.',
    submitButtonIdle: 'Submit',
    submitButtonSubmitting: 'Submitting...',
    scheduleCallButton: 'Schedule a Call',
    interestsList: [
      'Cybersecurity', 'Managed Services', 'AI & Automation',
      'Application Engineering', 'Data & Integration',
      'Salesforce', 'Cloud & Infrastructure', 'Something else'
    ],
  },
  modalContent: {
    interestTitle: 'Area of Interest',
    requirementLabel: 'Tell us about your requirement.',
    requirementPlaceholder: 'Enter details...',
    introCallLabel: 'I would like to book a brief introductory call to discuss this.',
    privacyLabelPart1: 'I agree that Cordinit may use my details to process my enquiry in accordance with the ',
    privacyLabelLink: 'Privacy Policy',
    privacyLabelPart2: '.',
    continueButton: 'Continue',
  },
  processSteps: {
    sectionTitle: 'What happens next',
    steps: [
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
    ]
  },
  contactInfo: {
    headerTitle: 'Work With Cordinit',
    headerSubtitle: 'We work with organisations to build, secure and transform their digital future.',
    cards: [
      { 
        id: 'new-business', 
        type: 'person' as const,
        iconPath: '/icons/contactus/business.svg',
        title: 'New Business', 
        name: 'Mohd. Rashid Khan',
        role: 'Chief Growth Officer',
        email: 'business@cordinit.co.in',
        ctaText: 'Book a Call'
      },
      { 
        id: 'media', 
        type: 'person' as const,
        iconPath: '/icons/contactus/outline.svg',
        title: 'Media & Press Inquiries', 
        name: 'Christina Adams',
        role: 'EVP, Marketing & Communications',
        email: 'media@cordinit.co.in',
        ctaText: 'Book a Call'
      },
      { 
        id: 'partnerships', 
        type: 'info' as const,
        iconPath: '/icons/contactus/handshake.svg',
        title: 'Partnerships', 
        description: 'For technology partners, strategic partners and business collaborations.',
        email: 'partnerships@cordinit.co.in',
        ctaText: 'Book a Call'
      },
      { 
        id: 'careers', 
        type: 'links' as const,
        iconPath: '/icons/contactus/paper-plane.svg',
        title: 'Careers',
        links: [
          { text: 'View Open Roles', href: '#' },
          { text: 'View Internships', href: '#' }
        ]
      }
    ]
  }
};
