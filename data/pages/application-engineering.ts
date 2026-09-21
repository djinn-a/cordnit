import type { PageDocument } from "@/lib/cms/types";
import { cybersecurityCredentialsData } from "@/components/features/cybersecurity/data";

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
          label: "Discuss your application challenge →",
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
    }
  ],
};
