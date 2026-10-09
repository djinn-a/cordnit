/**
 * Section content schemas: the editable (text-only) contract per section type.
 * Scaffolded by scripts/cms/generate-registry.ts from real content, then
 * hand-maintained. Images, icons, variants and ids live in systemProps and are
 * intentionally absent here.
 */
import { z } from "zod";
import type { SectionType } from "../types";
import { cta, group, image, link, list, section, stringList, text, textarea, select } from "./fields";
import { SOCIAL_PLATFORMS, isSafeChromeHref } from "../site-chrome";

const siteChromeLink = (label: string) =>
  z
    .string()
    .trim()
    .max(2048)
    .refine(isSafeChromeHref, "Use a same-site path (/about), anchor (#id), https://, mailto: or tel: link.")
    .meta({ label, widget: "url", help: "Leave blank to show the text without a link." });

const uniqueIds = <T extends { _id: string }>(items: T[]) => new Set(items.map((item) => item._id)).size === items.length;
const chromeLink = { label: text("Label", 120).min(1, "Label is required."), href: siteChromeLink("Destination") };

export const sectionContentSchemas = {
  hero: section({
    eyebrow: text("Eyebrow", 300),
    titleDesktop: text("Title desktop", 300),
    cardEyebrow: text("Card eyebrow", 300),
    cardTitle: text("Card title", 300),
    cardBody: textarea("Card body", 2000),
    primaryCta: cta("Primary CTA"),
    secondaryCta: cta("Secondary CTA"),
  }),
  help: section({
    title: text("Title", 300),
    description: textarea("Description", 2000),
    cta: cta("CTA"),
    services: list("Services", "Service", {
      num: text("Number", 300),
      title: text("Title", 300),
      desc: textarea("Description", 2000),
    }),
  }),
  insights: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    insights: list("Insights", "Insight", {
      tag: text("Tag", 300),
      date: text("Date", 300),
      title: text("Title", 300),
      readMoreUrl: link("Read more URL"),
    }),
  }),
  methodology: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    description: textarea("Description", 2000),
    steps: list("Steps", "Step", {
      num: text("Number", 300),
      title: text("Title", 300),
      desc: textarea("Description", 2000),
    }),
  }),
  recognition: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    description: textarea("Description", 2000),
    items: list("Items", "Item", {
      category: text("Category", 300),
      title: text("Title", 300),
      desc: textarea("Description", 2000),
    }),
  }),
  testimonials: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    description: textarea("Description", 2000),
    items: list("Items", "Item", {
      name: text("Name", 300),
      role: text("Role", 300),
      company: text("Company", 300),
      quote: textarea("Quote", 2000),
    }),
  }),
  cta: section({
    title: text("Title", 300),
    body: textarea("Body", 2000),
    expertName: text("Expert name", 300),
    cta: cta("CTA", { variant: false }),
  }),
  aboutHero: section({
    title: text("Title", 300),
    bodyMobile: textarea("Body mobile", 2000),
    bodyDesktop: textarea("Body desktop", 2000),
    cta: cta("CTA"),
  }),
  aboutContent: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    tabs: list("Tabs", "Tab", {
      label: text("Label", 300),
      title: text("Title", 300),
      paragraphs: stringList("Paragraphs", textarea("Paragraph", 2000)),
    }),
  }),
  aboutPrinciples: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    description: textarea("Description", 2000),
    principles: list("Principles", "Principle", {
      number: text("Number", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000),
    }),
  }),
  aboutTeam: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    description: textarea("Description", 2000),
    members: list("Members", "Member", {
      name: text("Name", 300),
      role: text("Role", 300),
      description: textarea("Description", 2000),
    }),
  }),
  contactHero: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    description: textarea("Description", 2000),
  }),
  contactForm: section({
    formContent: group("Form content", {
      interestTitle: text("Interest title", 300),
      requirementLabel: text("Requirement label", 300),
      requirementPlaceholder: text("Requirement placeholder", 300),
      introCallLabel: textarea("Intro call label", 2000),
      privacyLabelPart1: text("Privacy label part1", 300),
      privacyLabelLink: text("Privacy label link", 300),
      privacyLabelPart2: text("Privacy label part2", 300),
      submitButtonIdle: text("Submit button idle", 300),
      submitButtonSubmitting: text("Submit button submitting", 300),
      scheduleCallButton: text("Schedule call button", 300),
      interestsList: stringList("Interests list", text("Interests list", 300)),
    }),
    processSteps: group("Process steps", {
      sectionTitle: text("Section title", 300),
      steps: list("Steps", "Step", {
        number: text("Number", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
    contactInfo: group("Contact info", {
      headerTitle: text("Header title", 300),
      headerSubtitle: textarea("Header subtitle", 2000),
      cards: list("Cards", "Card", {
        title: text("Title", 300),
        name: text("Name", 300).optional(),
        role: text("Role", 300).optional(),
        email: text("Email", 300).optional(),
        ctaText: textarea("CTA text", 2000).optional(),
        description: textarea("Description", 2000).optional(),
        links: list("Links", "Link", {
          text: textarea("Text", 2000),
          href: link("Link"),
        }).optional(),
      }),
    }),
  }),
  contentMedia: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    description: textarea("Description", 2000),
    cta: cta("CTA"),
  }),
  contextApproach: section({
    eyebrow: text("Eyebrow", 300).optional(),
    title: text("Title", 300),
    description: textarea("Description", 2000),
  }),
  perspective: section({
    eyebrow: text("Eyebrow", 300),
    title: text("Title", 300),
    description: textarea("Description", 2000),
    cta: cta("CTA").optional(),
  }),
  contentInsights: section({
    eyebrow: text("Eyebrow", 300),
    featured: group("Featured", {
      articleLabel: text("Article label", 300),
      category: text("Category", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000),
      cta: cta("CTA", { variant: false }),
    }),
    exploreByTopic: group("Explore by topic", {
      eyebrow: text("Eyebrow", 300),
      topics: list("Topics", "Topic", {
        label: text("Label", 300),
      }),
    }),
    insightCards: list("Insight cards", "Insight card", {
      topic: text("Topic", 300),
      metadata: group("Metadata", {
        label: text("Label", 300),
        pill: text("Pill", 300),
      }),
      title: text("Title", 300),
      description: textarea("Description", 2000),
      dateInfo: text("Date info", 300),
      cta: cta("CTA", { variant: false }),
    }),
  }),
  industryCards: section({
    title: text("Title", 300),
    cards: list("Cards", "Card", {
      title: text("Title", 300),
      description: textarea("Description", 2000),
      cta: cta("CTA", { variant: false }),
    }),
    description: textarea("Description", 2000).optional(),
  }),
  cybersecurityHero: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000),
      cta: cta("CTA"),
      quoteOverlay: group("Quote overlay", {
        quote: textarea("Quote", 2000),
        author: text("Author", 300),
      }),
    }),
  }),
  cybersecuritySplitContent: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      paragraphs: stringList("Paragraphs", textarea("Paragraph", 2000)),
    }),
  }),
  cardGridSection: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      cards: list("Cards", "Card", {
        code: text("Code", 300),
        category: text("Category", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        cta: cta("CTA", { variant: false }),
      }),
    }),
  }),
  credentialsSection: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      certificationHeading: text("Certification heading", 300),
      certifications: list("Certifications", "Certification", {
        aspectRatio: text("Aspect ratio", 300),
      }),
    }),
  }),
  processSection: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      steps: list("Steps", "Step", {
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  splitActionCards: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      cta: cta("CTA"),
      supportingText: textarea("Supporting text", 2000),
      listHeader: group("List header", {
        leftText: textarea("Left text", 2000),
        rightText: textarea("Right text", 2000),
      }),
      cards: list("Cards", "Card", {
        category: text("Category", 300),
        label: text("Label", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        metadata: text("Metadata", 300),
      }),
    }),
  }),
  whyChooseSection: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      cards: list("Cards", "Card", {
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  salesforceHero: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000),
      cta: cta("CTA"),
      quoteOverlay: group("Quote overlay", {
        quote: textarea("Quote", 2000),
        author: text("Author", 300),
      }),
    }),
  }),
  salesforceSplitContent: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      paragraphs: stringList("Paragraphs", textarea("Paragraph", 2000)),
    }),
  }),
  salesforceCredentials: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      certificationHeading: text("Certification heading", 300),
      certifications: list("Certifications", "Certification", {
        aspectRatio: text("Aspect ratio", 300),
      }),
    }),
  }),
  salesforceCapabilities: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      cards: list("Cards", "Card", {
        code: text("Code", 300),
        category: text("Category", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        cta: cta("CTA", { variant: false }),
      }),
    }),
  }),
  salesforceApproach: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      steps: list("Steps", "Step", {
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  salesforceSpecialists: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      cta: cta("CTA"),
      supportingText: textarea("Supporting text", 2000),
      listHeader: group("List header", {
        leftText: textarea("Left text", 2000),
        rightText: textarea("Right text", 2000),
      }),
      cards: list("Cards", "Card", {
        category: text("Category", 300),
        label: text("Label", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        metadata: text("Metadata", 300),
      }),
    }),
  }),
  salesforceWhyChoose: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      cards: list("Cards", "Card", {
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  aiAutomationHero: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000),
      cta: cta("CTA"),
      quoteOverlay: group("Quote overlay", {
        quote: textarea("Quote", 2000),
        author: text("Author", 300),
      }),
    }),
  }),
  aiAutomationSplitContent: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      paragraphs: stringList("Paragraphs", textarea("Paragraph", 2000)),
    }),
  }),
  aiAutomationCredentials: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      certificationHeading: text("Certification heading", 300),
      certifications: list("Certifications", "Certification", {
        aspectRatio: text("Aspect ratio", 300),
      }),
    }),
  }),
  aiAutomationApproach: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      steps: list("Steps", "Step", {
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  aiAutomationSpecialists: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      cta: cta("CTA"),
      supportingText: textarea("Supporting text", 2000),
      listHeader: group("List header", {
        leftText: textarea("Left text", 2000),
        rightText: textarea("Right text", 2000),
      }),
      cards: list("Cards", "Card", {
        category: text("Category", 300),
        label: text("Label", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        metadata: text("Metadata", 300),
      }),
    }),
  }),
  aiAutomationWhyChoose: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      cards: list("Cards", "Card", {
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  aiAutomationWhereWeHelp: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      subtitle: textarea("Subtitle", 2000),
      cards: list("Cards", "Card", {
        number: text("Number", 300),
        code: text("Code", 300),
        category: text("Category", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  solutionsHero: section({
    eyebrow: text("Eyebrow", 300),
    titleDesktop: text("Title desktop", 300),
    titleMobile: text("Title mobile", 300),
    body: textarea("Body", 2000),
    cta: cta("CTA"),
  }),
  solutionsCapabilities: section({
    title: text("Title", 300),
    capabilities: list("Capabilities", "Capability", {
      title: text("Title", 300),
      description: textarea("Description", 2000),
      href: link("Link"),
    }),
  }),
  solutionsDelivery: section({
    data: group("Data", {
      heading: text("Heading", 300),
      paragraphs: stringList("Paragraphs", textarea("Paragraph", 2000)),
      bottomLeftText: textarea("Bottom left text", 2000),
      bottomRightText: textarea("Bottom right text", 2000),
      stats: list("Stats", "Stat", {
        value: text("Value", 300),
        label: text("Label", 300),
      }),
    }),
  }),
  solutionsCombination: section({
    data: group("Data", {
      heading: text("Heading", 300),
      cards: list("Cards", "Card", {
        number: text("Number", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  cloudInfrastructureHero: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000),
      cta: cta("CTA"),
    }),
  }),
  pageHero: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000),
      cta: cta("CTA"),
    }),
  }),
  splitContent: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      paragraphs: stringList("Paragraphs", textarea("Paragraph", 2000)),
    }),
  }),
  whyChoose: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      cards: list("Cards", "Card", {
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  breadcrumb: section({
    items: list("Items", "Item", {
      label: text("Label", 300),
      href: link("Link").optional(),
    }),
  }),
  splitContentSection: section({
    data: group("Data", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      paragraphs: stringList("Paragraphs", textarea("Paragraph", 2000)),
    }),
  }),
  dataSecurityOverview: section({
    data: group("Data", {
      header: group("Header", {
        eyebrow: text("Eyebrow", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
      cardSection: group("Card section", {
        sectionTag: text("Section tag", 300).optional(),
        sectionTitle: text("Section title", 300).optional(),
        footerText: textarea("Footer text", 2000).optional(),
        footerHighlight: textarea("Footer highlight", 2000).optional(),
        cards: list("Cards", "Card", {
          stepNumber: text("Step number", 300),
          title: text("Title", 300),
          description: textarea("Description", 2000),
        }),
      }).optional(),
      processCards: list("Process cards", "Process card", {
        stepNumber: text("Step number", 300),
        phase: text("Phase", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        subDescription: textarea("Sub description", 2000),
      }).optional(),
      processSectionInfo: group("Process section info", {
        headerLeft: text("Header left", 300),
        headerRight: text("Header right", 300),
        footerText: textarea("Footer text", 2000),
        footerHighlight: textarea("Footer highlight", 2000),
      }).optional(),
    }),
  }),
  dataDiscovery: section({
    data: group("Data", {
      leftSection: group("Left section", {
        eyebrow: text("Eyebrow", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        features: list("Features", "Feature", {
          text: textarea("Text", 2000),
          title: text("Title", 300).optional(),
        }),
      }),
      rightSection: group("Right section", {
        eyebrow: text("Eyebrow", 300),
        statusText: textarea("Status text", 2000),
        cards: list("Cards", "Card", {
          title: text("Title", 300),
          description: textarea("Description", 2000),
          stepNumber: text("Step number", 300).optional(),
        }),
        footerBadges: stringList("Footer badges", text("Footer badge", 300)).optional(),
      }),
    }),
  }),
  authenticationGovernance: section({
    data: group("Data", {
      header: group("Header", {
        eyebrow: text("Eyebrow", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
      cards: list("Cards", "Card", {
        numberStr: text("Number", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        pills: stringList("Pills", text("Pill", 300)),
      }),
    }),
  }),
  lifecycleManagement: section({
    data: group("Data", {
      header: group("Header", {
        eyebrow: text("Eyebrow", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
      cards: list("Cards", "Card", {
        numberStr: text("Number", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        pills: stringList("Pills", text("Pill", 300)),
      }),
    }),
  }),
  secureDataOperations: section({
    data: group("Data", {
      header: group("Header", {
        eyebrow: text("Eyebrow", 300),
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
      cards: list("Cards", "Card", {
        numberStr: text("Number", 300),
        phaseLabel: text("Phase label", 300).optional(),
        title: text("Title", 300),
        description: textarea("Description", 2000),
        footerText: textarea("Footer text", 2000),
      }),
      cardStyle: text("Card style", 300).optional(),
    }),
  }),
  journeyStepsBlock: section({
    header: group("Header", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000),
    }),
    cards: list("Cards", "Card", {
      numberStr: text("Number", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000).optional(),
      footerText: textarea("Footer text", 2000),
      dots: stringList("Dots", text("Dot", 300)).optional(),
    }),
    flowHeaderLeft: text("Flow header left", 300).optional(),
    flowHeaderRight: text("Flow header right", 300).optional(),
    footerLeft: text("Footer left", 300).optional(),
    footerRight: text("Footer right", 300).optional(),
  }),
  leadQualificationBlock: section({
    header: group("Header", {
      eyebrow: text("Eyebrow", 300),
      title: text("Title", 300),
      description: textarea("Description", 2000),
      highlightPrefix: textarea("Highlight prefix", 2000).optional(),
      highlightText: textarea("Highlight text", 2000).optional(),
      highlightStyle: textarea("Highlight style", 2000).optional(),
    }),
    flow: group("Flow", {
      eyebrowLeft: text("Eyebrow left", 300),
      eyebrowRight: text("Eyebrow right", 300),
      steps: list("Steps", "Step", {
        numberStr: text("Number", 300).optional(),
        title: text("Title", 300),
        description: textarea("Description", 2000),
      }),
    }),
  }),
  newsletter: section({
    title: text("Title", 300),
    description: textarea("Description", 2000),
    placeholder: text("Placeholder", 300),
    buttonText: textarea("Button text", 2000),
    consentText: textarea("Consent text", 2000),
  }),
  navbar: section({
    logo: image("Logo", "logo").optional(),
    logoAltText: text("Logo alt text (used when no logo is uploaded)", 200),
    logoHref: siteChromeLink("Logo destination"),
    topBarBreachLabel: text("Top bar: breach link label", 120),
    topBarBreachHref: siteChromeLink("Top bar: breach link destination"),
    topBarNewsletterLabel: text("Top bar: newsletter button label", 120),
    solutionsMenu: group("Solutions menu (always first in the navigation)", {
      label: text("Menu label", 120).min(1, "Menu label is required."),
      href: siteChromeLink("Menu label destination"),
      panelTitle: text("Panel title", 200),
      panelDescription: textarea("Panel description", 1000),
      exploreAllLabel: text("Explore link label", 120),
      exploreAllHref: siteChromeLink("Explore link destination"),
      items: list("Solutions", "Solution", {
        title: text("Title", 160).min(1, "Title is required."),
        description: textarea("Description", 1000),
        href: siteChromeLink("Destination"),
        icon: image("Icon", "icon").optional(),
      }).min(1, "Add at least one solution.").max(30).refine(uniqueIds, "Each solution needs its own ID."),
    }),
    navLinks: list("Other navigation links", "Link", chromeLink).max(12).refine(uniqueIds, "Each link needs its own ID."),
    getInTouchLabel: text("Contact button label", 120),
    mobileMenuToggleAriaLabel: text("Mobile menu button label (for screen readers)", 200),
  }),
  footer: section({
    logo: image("Logo", "logo").optional(),
    logoHref: siteChromeLink("Logo destination"),
    branding: group("Branding", {
      logoAlt: text("Logo alt text (used when no logo is uploaded)", 200),
      tagline: textarea("Tagline", 3000),
      ctaText: text("Contact button label", 120),
    }),
    contact: group("Contact details (also used in search-engine structured data)", {
      email: z
        .string()
        .trim()
        .max(254)
        .refine((v) => v === "" || z.email().safeParse(v).success, "Enter a valid email address.")
        .meta({ label: "Email", widget: "text" }),
      phone: z
        .string()
        .trim()
        .max(40)
        .regex(/^$|^\+?[0-9 ()-]{6,}$/, "Use digits, spaces, dashes and an optional leading +.")
        .meta({ label: "Phone (international format, e.g. +91 98765 43210)", widget: "text" }),
    }),
    navColumns: list("Link columns", "Column", {
      title: text("Column heading", 160),
      links: list("Links", "Link", chromeLink).min(1, "Add at least one link.").max(40),
    }).min(1).max(8).refine(uniqueIds, "Each column needs its own ID."),
    socialLinks: list("Social profiles", "Profile", {
      platform: select(
        "Platform",
        SOCIAL_PLATFORMS.map((p) => ({ value: p.id, label: p.label })),
      ),
      href: siteChromeLink("Profile URL"),
    })
      .max(SOCIAL_PLATFORMS.length)
      .refine((items) => new Set(items.map((item) => item.platform)).size === items.length, "Each platform can be added only once."),
    newsletter: group("Newsletter", {
      heading: text("Heading", 200),
      description: textarea("Description", 1000),
      placeholder: text("Email placeholder", 160),
      emailLabel: text("Email accessible label", 160),
      formLabel: text("Form accessible label", 160),
      consentText: text("Consent copy before privacy link", 500),
      privacyLinkLabel: text("Privacy link label", 120),
      privacyLinkHref: siteChromeLink("Privacy link destination"),
      buttonText: text("Subscribe button label", 120),
      submittingText: text("Submitting button label", 120),
      successText: text("Success message", 300),
    }),
    media: group("Media feature", {
      eyebrow: text("Eyebrow", 200),
      heading: text("Heading", 300),
      description: textarea("Description", 1000),
      ctaText: text("Button label", 120),
      href: siteChromeLink("Destination"),
      thumbnail: image("Thumbnail", "media").optional(),
    }),
    copyright: text("Copyright text", 300),
    legalLinks: list("Legal links", "Link", chromeLink).max(30),
  }),
} satisfies Record<SectionType, z.ZodObject>;

export type SectionContentMap = {
  [K in SectionType]: z.infer<(typeof sectionContentSchemas)[K]>;
};
