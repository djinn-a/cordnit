import type { PageDocument } from "@/lib/cms/types";
import { cybersecurityCredentialsData, cybersecurityWhyChooseData } from "@/components/features/cybersecurity/data";

export const applicationEngineeringPage: PageDocument = {
  slug: "application-engineering",
  title: "Application Engineering",
  layout: "default",
  seo: {
    title: "Application Engineering | Cordinit",
    description: "Create digital products and applications that are useful for the people who rely on them, robust for the teams who run them and ready to evolve as needs change.",
  },
  sections: [
    {
      _type: "pageHero",
      _key: "application-engineering-hero",
      data: {
        eyebrow: "APPLICATION ENGINEERING",
        title: "Applications built around people and progress",
        description: "Create digital products and applications that are useful for the people who rely on them, robust for the teams who run them and ready to evolve as needs change.",
        cta: {
          label: "Discuss your application challenge",
          href: "/contact",
        },
        image: {
          src: "/Image-v2.webp",
          alt: "Server racks",
        },
      }
    },
    {
      _type: "splitContent",
      _key: "application-engineering-split-content",
      data: {
        eyebrow: "ABOUT APPLICATION ENGINEERING",
        title: "Build what matters and make it last",
        paragraphs: [
          "Applications sit at the heart of many customer, colleague and operational experiences. Whether you are creating something new, improving a critical service or modernising an existing estate, success depends on combining clear product thinking with dependable engineering.",
          "Cordinit helps you move from opportunity to a usable, secure and maintainable application."
        ],
        image: {
          src: "/ai-automation/ai-business-value-diagram.webp",
          alt: "Application Engineering Diagram",
        },
      }
    },
    {
      _type: "credentialsSection",
      _key: "application-engineering-credentials",
      data: cybersecurityCredentialsData
    },
    {
      _type: "aiAutomationWhereWeHelp",
      _key: "application-engineering-where-we-help",
      data: {
        eyebrow: "WHERE WE HELP",
        title: "From product thinking to dependable engineering.",
        subtitle: "We bring together product, design and engineering expertise to create applications that are useful today and ready to evolve tomorrow.",
        cards: [
          {
            number: "01",
            code: "AI:01",
            category: "OPPORTUNITY",
            title: "Shape the right product",
            description: "Understand user needs, clarify the problem, test assumptions and define a roadmap that balances value with practical delivery.",
            icon: "/ai-automation/icons/Icon.svg"
          },
          {
            number: "02",
            code: "AI:02",
            category: "WORKFLOWS",
            title: "Design experiences people can use",
            description: "Create simple, accessible journeys and interfaces that support adoption from the start.",
            icon: "/ai-automation/icons/Icon (1).svg"
          },
          {
            number: "03",
            code: "AI:03",
            category: "SCALE",
            title: "Engineer with confidence",
            description: "Build and integrate applications with quality, security, performance and maintainability in mind.",
            icon: "/ai-automation/icons/Icon (2).svg"
          },
          {
            number: "04",
            code: "AI:04",
            category: "IMPROVEMENT",
            title: "Modernise and improve",
            description: "Reduce the friction and risk of legacy applications through deliberate, incremental improvement.",
            icon: "/ai-automation/icons/Icon (3).svg"
          }
        ]
      }
    },
    {
      _type: "processSection",
      _key: "application-engineering-process",
      data: {
        eyebrow: "OUR APPROACH",
        title: "From first idea to ongoing evolution",
        subtitle: "We work in close partnership with your teams, bringing the right mix of discovery, design, engineering and operational thinking to the work.",
        steps: [
          {
            id: "discover",
            title: "Discover & Define",
            description: "Understand the opportunity, users and outcomes that matter.",
            iconSrc: "/cybersecurity/icons/Overlay.svg"
          },
          {
            id: "design-build",
            title: "Design & Build",
            description: "Turn the idea into a useful, secure and dependable application.",
            iconSrc: "/cybersecurity/icons/Overlay (1).svg"
          },
          {
            id: "evolve-improve",
            title: "Evolve & Improve",
            description: "Support adoption, performance and continuous improvement over time.",
            iconSrc: "/cybersecurity/icons/Overlay (2).svg"
          }
        ]
      }
    },
    {
      _type: "splitActionCards",
      _key: "application-engineering-specialists",
      data: {
        eyebrow: "AI & AUTOMATION",
        title: "Talk to the right security specialist.",
        subtitle: "Tell us where you need to strengthen security. Our specialists can help you understand the challenge, identify priorities and define the most useful next step.",
        cta: {
          label: "Start a security conversation",
          href: "/contactus"
        },
        supportingText: "No obligation. Just a useful first conversation.",
        listHeader: {
          leftText: "SECURITY SPECIALISTS",
          rightText: "DIRECT ARCHITECTURE ADVISORY"
        },
        cards: [
          {
            id: "specialist-1",
            imageSrc: "/cybersecurity/specialist-2.webp",
            category: "SECURITY SPECIALIST",
            label: "ADVISORY // 01",
            title: "James Harvey",
            description: "Security strategy, risk & resilience",
            metadata: "Governance • Posture • Board Risk"
          },
          {
            id: "specialist-2",
            imageSrc: "/cybersecurity/specialist-2.webp",
            category: "SECURITY SPECIALIST",
            label: "SEC.OPS // 02",
            title: "Graham Spratt",
            description: "Security operations & managed security",
            metadata: "24/7 Detection • Incident • Threat Surface"
          }
        ]
      }
    },
    {
      _type: "whyChoose",
      _key: "application-engineering-why-choose",
      data: cybersecurityWhyChooseData
    }
  ],
};
