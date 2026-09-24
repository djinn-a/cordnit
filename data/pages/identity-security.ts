import type { PageDocument } from "@/lib/cms/types";

export const identitySecurityPage: PageDocument = {
  slug: "identity-security",
  title: "Identity Security",
  layout: "default",
  seo: {
    title: "Identity Security | Cordinit",
    description: "Control who can access what.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "identity-security-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "Identity Security", isCurrent: true },
      ],
    },
    {
      _type: "contentMedia",
      _key: "identity-security-hero",
      eyebrow: "IDENTITY SECURITY",
      title: "Control who can access\nwhat.",
      description: "Identity security helps ensure the right people and systems have the right access at the right time. Cordinit helps you strengthen identity controls, reduce unnecessary privilege and create a clearer foundation for secure access across your organisation.",
      cta: {
        label: "Discuss your identity priorities",
        href: "/contactus",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "People in server room",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Abstract code",
      },
    },
    {
      _type: "dataSecurityOverview",
      _key: "identity-security-overview",
      data: {
        header: {
          eyebrow: "IDENTITY SECURITY OVERVIEW",
          title: "Secure access built around people, systems and risk.",
          description: "Identity is now central to how organisations protect applications, data and cloud environments. We help bring identity strategy, access controls and governance together so that access is easier to manage, easier to understand and harder to misuse.",
        },
        cardSection: {
          sectionTag: "SECURE APPS FASTER",
          sectionTitle: "APPLICATION identity SECURITY",
          footerText: "FROM IDENTITY PROVISIONING TO AUDIT READY GOVERNANCE, SECURITY AT EVERY STEP.",
          footerHighlight: "ARCH-ID-2025.V4",
          cards: [
            {
              stepNumber: "01",
              title: "Discover",
              description: "Understand users, identities, applications and access across hybrid estates."
            },
            {
              stepNumber: "02",
              title: "Authenticate",
              description: "Strengthen how users and systems prove who they are with phishing-resistant MFA."
            },
            {
              stepNumber: "03",
              title: "Authorise",
              description: "Give the right level of access based on role, real-time context and dynamic risk."
            },
            {
              stepNumber: "04",
              title: "Govern",
              description: "Review, monitor and manage access throughout its complete operational lifecycle."
            },
            {
              stepNumber: "05",
              title: "Improve",
              description: "Continuously reduce unnecessary privilege and strengthen posture over time."
            }
          ]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "why-identity-security",
      variant: "steps",
      data: {
        leftSection: {
          eyebrow: "WHY APPLICATION SECURITY",
          title: "Reduce risk.\nIncrease trust.",
          description: "Modern applications face evolving threats, from vulnerable code and open-source dependencies to API risks and runtime attacks. We help you identify and mitigate these risks early, so you can deliver secure, reliable and trusted applications.",
          features: [
            { text: "Automated discovery across multi-cloud, SaaS, and on-premises stores" },
            { text: "Real-time classification of PII, IP, financial, and regulated records" },
            { text: "Continuous posture alignment with GDPR, HIPAA, SOC 2, and ISO 27001" }
          ]
        },
        rightSection: {
          eyebrow: "APPLICATION RISK FLOW",
          statusText: "PIPELINE ANALYSIS",
          cards: [
            {
              stepNumber: "01",
              title: "PEOPLE",
              description: "Code, dependencies and APIs"
            },
            {
              stepNumber: "02",
              title: "PRIVILEGED ACCESS",
              description: "Automated and targeted attacks"
            },
            {
              stepNumber: "03",
              title: "APPLICATIONS",
              description: "Data loss, service disruption and regulatory risk"
            },
            {
              stepNumber: "04",
              title: "MACHINES & SERVICES",
              description: "Data loss, service disruption and regulatory risk"
            },
            {
              stepNumber: "05",
              title: "DATA & RESOURCES",
              description: "Code, dependencies and APIs"
            }
          ]
        }
      }
    },
    {
      _type: "dataSecurityOverview",
      _key: "access-lifecycle",
      data: {
        header: {
          eyebrow: "ACCESS LIFECYCLE",
          title: "Make access intentional from joiner to leaver.",
          description: "Bring exposure information together and focus remediation on the vulnerabilities, assets and attack paths that represent the greatest potential impact."
        },
        processCards: [
          {
            stepNumber: "01",
            phase: "PHASE I",
            title: "JOIN",
            description: "Bring exposures and affected assets into one clearer view.",
            subDescription: "Ingest telemetry across scanners, cloud configs, and code."
          },
          {
            stepNumber: "02",
            phase: "PHASE II",
            title: "CHANGE",
            description: "Understand technical severity alongside business importance.",
            subDescription: "Overlay asset tags, data classifications, and blast radius."
          },
          {
            stepNumber: "03",
            phase: "PHASE III",
            title: "REVIEW",
            description: "Rank exposures based on risk, exploitability and potential impact.",
            subDescription: "Filter out noise; highlight true breach paths."
          },
          {
            stepNumber: "04",
            phase: "PHASE IV",
            title: "LEAVE",
            description: "Direct teams towards the remediation work that matters most.",
            subDescription: "Dispatch validated tickets with actionable fix guidance."
          }
        ]
      }
    },
    {
      _type: "dataDiscovery",
      _key: "privileged-access",
      variant: "alternate",
      data: {
        leftSection: {
          eyebrow: "PRIVILEGED ACCESS",
          title: "Reduce risk where access matters most.",
          description: "Strengthen controls around privileged accounts and high-impact access. We help organisations introduce appropriate authentication, approval, monitoring and governance so elevated access is controlled and accountable.",
          features: [
            { 
              title: "Contextual Guardrails & Output Sanitization", 
              text: "Prevent hallucinated toxic output and confidential data leakage in conversational responses, RAG retrieval sets, and multi-agent workflows." 
            },
            { 
              title: "Transparent Model Lineage & Auditability", 
              text: "End-to-end provenance for weights, prompt templates, fine-tuning datasets, and human-in-the-loop approvals mapped directly to global compliance statutes." 
            }
          ]
        },
        rightSection: {
          eyebrow: "PRIVILEGED ACCESS ARCHITECTURE",
          statusText: "ISO 27001 / SOC 2",
          cards: [
            { stepNumber: "RBAC Verified", title: "Identity Context", description: "Human Admin, Service Bot, or CI/CD Worker" },
            { stepNumber: "Risk-Adaptive", title: "Authentication & Challenge", description: "MFA, FIDO2 Hardware Keys, Biometric Telemetry" },
            { stepNumber: "Zero Standing", title: "Privileged Vault & JIT Broker", description: "Ephemeral credentials issued with fixed TTL expiration" },
            { stepNumber: "Audited", title: "Critical Systems & Datastores", description: "Isolated proxy execution with full session capture" }
          ],
          footerBadges: ["FIDO2 WebAuthn", "JIT Ephemeral", "Full Session Video Recording", "PAM Vault"]
        }
      }
    }
  ],
};
