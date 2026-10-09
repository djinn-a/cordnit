/**
 * SEO copy refresh for the seeded pages. `previous` is the value that shipped in the
 * original seed: the backfill only replaces a field that is empty or still equal to it,
 * so anything an editor has changed is left alone.
 */
export type SeoCopy = { title: string; description: string };
export type SeoCopyEntry = { previous: Partial<SeoCopy>; next: SeoCopy };

export const SEO_COPY: Record<string, SeoCopyEntry> = {
  home: {
    previous: { title: "Cordinit | Secure Digital Transformation", description: "Simplifying complexity and enabling meaningful digital transformation." },
    next: {
      title: "Cordinit | Secure Digital Transformation",
      description: "Cordinit helps enterprises modernise securely across cybersecurity, Salesforce, AI automation, cloud, data and application engineering.",
    },
  },
  aboutus: {
    previous: { title: "About Cordinit", description: "Technology change made more useful." },
    next: {
      title: "About Cordinit | Our Story, Principles and Team",
      description: "Meet Cordinit: a technology partner making change more useful through security-first delivery, practical expertise and long-term partnership.",
    },
  },
  contactus: {
    previous: { title: "Contact Cordinit", description: "Let's talk about what's next." },
    next: {
      title: "Contact Cordinit | Talk to Our Experts",
      description: "Talk to Cordinit about cybersecurity, Salesforce, AI, cloud or data. Tell us what you are working on and book a call with our team.",
    },
  },
  industries: {
    previous: { title: "Industries | Cordinit", description: "Explore Cordinit's industry-specific capabilities." },
    next: {
      title: "Industries | Cordinit",
      description: "See how Cordinit applies security, Salesforce, AI, cloud and data expertise to the challenges and regulations of your industry.",
    },
  },
  accelerators: {
    previous: {
      title: "Accelerators | Cordinit",
      description:
        "Cordinit accelerators are repeatable, outcome-focused offers designed to help you make progress faster without starting every initiative from a blank page.",
    },
    next: {
      title: "Accelerators | Cordinit",
      description: "Cordinit accelerators are repeatable, outcome-focused offers that help you make progress faster without starting every initiative from scratch.",
    },
  },
  insights: {
    previous: {
      title: "Insights | Cordinit",
      description: "Explore practical perspectives on cybersecurity, Salesforce, cloud, AI, data and the challenges shaping technology change.",
    },
    next: {
      title: "Insights | Cordinit",
      description: "Practical perspectives from Cordinit on cybersecurity, Salesforce, cloud, AI, data and the challenges shaping technology change.",
    },
  },
  solutions: {
    previous: { title: "Solutions | Cordinit", description: "Solutions for progress that lasts." },
    next: {
      title: "Solutions | Cordinit",
      description: "Explore Cordinit solutions across cybersecurity, Salesforce, AI and automation, cloud, data integration and application engineering.",
    },
  },
  cybersecurity: {
    previous: { title: "Cybersecurity | Cordinit", description: "Cybersecurity that enables confident change." },
    next: {
      title: "Cybersecurity Services | Cordinit",
      description: "Cybersecurity that enables confident change: data, identity, cloud, application and AI security, plus exposure and managed security services.",
    },
  },
  salesforce: {
    previous: { title: "Salesforce | Cordinit", description: "Salesforce experience that connects your business." },
    next: {
      title: "Salesforce Services | Cordinit",
      description: "Salesforce consulting that connects your business, from Sales, Service and Marketing Cloud to Commerce, AI, integration and managed services.",
    },
  },
  "ai-automation": {
    previous: { title: "AI & Automation | Cordinit", description: "Make AI and automation useful where it matters most." },
    next: {
      title: "AI & Automation | Cordinit",
      description: "Make AI and automation useful where it matters most, with secure, governed use cases that remove manual work and improve decisions.",
    },
  },
  "cloud-infrastructure": {
    previous: { title: "Cloud Infrastructure | Cordinit", description: "Cloud and infrastructure built for change." },
    next: {
      title: "Cloud Infrastructure | Cordinit",
      description: "Cloud and infrastructure built for change: secure migration, modern platforms and resilient operations that keep pace with your business.",
    },
  },
  "application-engineering": {
    previous: {
      title: "Application Engineering | Cordinit",
      description:
        "Create digital products and applications that are useful for the people who rely on them, robust for the teams who run them and ready to evolve as needs change.",
    },
    next: {
      title: "Application Engineering | Cordinit",
      description: "Build digital products that are useful for the people who rely on them, robust for the teams who run them and ready to evolve as needs change.",
    },
  },
  "data-integration": {
    previous: { title: "Data Integration | Cordinit", description: "Connected data. Better decisions. Stronger operations." },
    next: {
      title: "Data Integration | Cordinit",
      description: "Connected data, better decisions, stronger operations. Cordinit integrates systems and data so teams can trust and act on what they see.",
    },
  },
  "cybersecurity/data-security": {
    previous: { title: "Data Security | Cordinit", description: "Protect sensitive data wherever it is created, used and stored." },
    next: {
      title: "Data Security | Cordinit",
      description: "Protect sensitive data wherever it is created, used and stored, with discovery, classification, governance and secure data operations.",
    },
  },
  "cybersecurity/application-security": {
    previous: { title: "Application Security | Cordinit", description: "Security at every stage of your application lifecycle." },
    next: {
      title: "Application Security | Cordinit",
      description: "Build security into every stage of your application lifecycle, from design and code review to testing, release and runtime protection.",
    },
  },
  "cybersecurity/cloud-security": {
    previous: { title: "Cloud Security | Cordinit", description: "Secure cloud adoption and operation." },
    next: {
      title: "Cloud Security | Cordinit",
      description: "Secure cloud adoption and operation with posture management, guardrails and monitoring that keep AWS, Azure and Google Cloud under control.",
    },
  },
  "cybersecurity/identity-security": {
    previous: { title: "Identity Security | Cordinit", description: "Control who can access what." },
    next: {
      title: "Identity Security | Cordinit",
      description: "Control who can access what, with identity governance, strong authentication and privileged access management that reduce risk.",
    },
  },
  "cybersecurity/ai-security": {
    previous: { title: "AI Security | Cordinit", description: "Adopt AI with confidence and control." },
    next: {
      title: "AI Security | Cordinit",
      description: "Adopt AI with confidence and control. Cordinit secures models, data and AI usage with governance, testing and practical guardrails.",
    },
  },
  "cybersecurity/exposure-management": {
    previous: { title: "Exposure Management | Cordinit", description: "Prioritise the exposures that matter most." },
    next: {
      title: "Exposure Management | Cordinit",
      description: "Prioritise the exposures that matter most with continuous visibility of your attack surface and remediation focused on real business risk.",
    },
  },
  "cybersecurity/vulnerability-management": {
    previous: { title: "Vulnerability Management | Cordinit", description: "Reduce vulnerability risk predictably." },
    next: {
      title: "Vulnerability Management | Cordinit",
      description: "Reduce vulnerability risk predictably with scanning, risk-based prioritisation and remediation tracking across infrastructure and applications.",
    },
  },
  "cybersecurity/managed-security": {
    previous: { title: "Managed Security | Cordinit", description: "Extend your security operations capacity." },
    next: {
      title: "Managed Security Services | Cordinit",
      description: "Extend your security operations capacity with 24/7 monitoring, detection and response from Cordinit security specialists.",
    },
  },
  "salesforce/sales": {
    previous: { title: "Salesforce Sales | Cordinit", description: "Make selling more focused and predictable." },
    next: {
      title: "Salesforce Sales Cloud | Cordinit",
      description: "Make selling more focused and predictable with Salesforce Sales Cloud: cleaner pipelines, guided selling and forecasts your leaders trust.",
    },
  },
  "salesforce/service": {
    previous: { title: "Salesforce Service | Cordinit", description: "Deliver connected, efficient customer service." },
    next: {
      title: "Salesforce Service Cloud | Cordinit",
      description: "Deliver connected, efficient customer service with Salesforce Service Cloud, from case management and self-service to connected agent workflows.",
    },
  },
  "salesforce/marketing": {
    previous: { title: "Salesforce Marketing | Cordinit", description: "Create relevant, connected customer engagement." },
    next: {
      title: "Salesforce Marketing Cloud | Cordinit",
      description: "Create relevant, connected customer engagement with Salesforce Marketing Cloud journeys, segmentation and measurable campaigns.",
    },
  },
  "salesforce/commerce": {
    previous: { title: "Salesforce Commerce Cloud | Cordinit", description: "Drive sales and improve efficiency with Salesforce Commerce Cloud." },
    next: {
      title: "Salesforce Commerce Cloud | Cordinit",
      description: "Drive sales and improve efficiency with Salesforce Commerce Cloud: connected storefronts built, integrated and optimised by Cordinit.",
    },
  },
  "salesforce/ai": {
    previous: { title: "Salesforce AI | Cordinit", description: "Make selling more focused and predictable." },
    next: {
      title: "Salesforce AI | Cordinit",
      description: "Put Salesforce AI to work safely, with trusted data, clear use cases and governance that turn AI into measurable business outcomes.",
    },
  },
  "salesforce/integration": {
    previous: { title: "Salesforce Integration | Cordinit", description: "Connect Salesforce to the business ecosystem." },
    next: {
      title: "Salesforce Integration | Cordinit",
      description: "Connect Salesforce to the rest of your business with reliable integrations that keep data accurate and processes connected across every system.",
    },
  },
  "salesforce/managed-services": {
    previous: { title: "Salesforce Managed Services | Cordinit", description: "Keep Salesforce improving after go-live." },
    next: {
      title: "Salesforce Managed Services | Cordinit",
      description: "Keep Salesforce improving after go-live with managed services covering support, releases, admin and continuous optimisation.",
    },
  },
};

export type SeoField = keyof SeoCopy;
export type SeoFieldChange = { field: SeoField; from: string | undefined; to: string };

/** Fields to replace on a page: only empty values or values still equal to the original seed. */
export function planSeoCopy(current: { title?: string; description?: string } | undefined, entry: SeoCopyEntry): SeoFieldChange[] {
  const changes: SeoFieldChange[] = [];
  for (const field of ["title", "description"] as const) {
    const value = current?.[field]?.trim() || undefined;
    const untouched = value === undefined || value === entry.previous[field];
    if (untouched && value !== entry.next[field]) changes.push({ field, from: value, to: entry.next[field] });
  }
  return changes;
}
