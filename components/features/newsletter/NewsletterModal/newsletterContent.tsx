import React from 'react';

export interface NewsletterContent {
  form: {
    eyebrow: string;
    heading: React.ReactNode;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    consentText: string;
    buttonText: string;
  };
  validation: {
    eyebrow: string;
    heading: string;
    description: string;
    emailFormatValid: string;
    consentConfirmed: string;
    waitMessage: React.ReactNode;
  };
  success: {
    eyebrow: string;
    heading: string;
    description1: string;
    description2: React.ReactNode;
    button1: React.ReactNode;
    button2: React.ReactNode;
  };
}

export const defaultNewsletterContent: NewsletterContent = {
  form: {
    eyebrow: "NEWSLETTER",
    heading: <>Stay ahead of<br />what&apos;s next.</>,
    description: "Get occasional insights from Cordinit on technology, security and transformation.",
    emailLabel: "Work email address",
    emailPlaceholder: "balamia@gmail.com",
    consentText: "I agree to receive updated from cordinit.",
    buttonText: "Subscribe",
  },
  validation: {
    eyebrow: "VALIDATION",
    heading: "Almost there...",
    description: "We&apos;re just validating your details",
    emailFormatValid: "Email format looks good.",
    consentConfirmed: "Consent confirmed",
    waitMessage: <>This will only take a moment. Please don&apos;t<br className="hidden sm:block" />refresh or close this window</>,
  },
  success: {
    eyebrow: "SUBSCRIPTION SUCCESSFUL",
    heading: "You&apos;re subscribed",
    description1: "Thank you for subscribing to Cordinit newsletter.",
    description2: <>You&apos;ll receive the latest insights and perspectives<br />straight to your inbox.</>,
    button1: <>Explore solution <span className="ml-1.5 font-bold">→</span></>,
    button2: <>View latest insights <span className="ml-1.5 font-bold">→</span></>,
  }
};
