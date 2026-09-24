export const contactStatusData = {
  success: {
    badge: 'CALL IS BOOKED',
    title: 'Call Scheduled',
    subtitle: 'Thank you for scheduling a call with us.',
    descriptionLines: [
      "You'll receive the latest insights and perspectives",
      "straight to your inbox."
    ],
    actions: [
      {
        href: '/solutions',
        label: 'Explore solution',
      },
      {
        href: '/insights',
        label: 'View latest insights',
      }
    ]
  },
  submitting: {
    badge: 'SCHEDULING',
    title: 'Almost there...',
    subtitle: "We're just scheduling your meeting",
    checks: [
      'Email format looks good.',
      'Consent confirmed'
    ],
    descriptionLines: [
      "This will only take a moment. Please don't",
      "refresh or close this window"
    ]
  }
};
