import type { PageDocument } from "@/lib/cms/types";

export const applicationSecurityPage: PageDocument = {
  slug: "application-security",
  title: "Application Security",
  layout: "default",
  seo: {
    title: "Application Security | Cordinit",
    description: "Security at every stage of your application lifecycle.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "application-security-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "Application Security", isCurrent: true },
      ],
    },
    {
      _type: "contentMedia",
      _key: "application-security-hero",
      eyebrow: "APPLICATION SECURITY",
      title: "Build and run\nsecure\u00A0applications.",
      description: "Embed security across the application lifecycle \u2014 from design and development to testing, deployment and operation.",
      cta: {
        label: "Secure your applications",
        href: "/contactus",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "Application Security Infrastructure",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Technology abstract visualization",
      },
    },
    {
      _type: "dataSecurityOverview",
      _key: "application-security-overview",
      data: {
        header: {
          eyebrow: "APPLICATION SECURITY OVERVIEW",
          title: "Security at every stage of your application lifecycle.",
          description: "Cordinit helps you build, test and run secure applications by combining proven security practices, automated testing and DevSecOps integration \u2014 so you can innovate with confidence."
        },
        cardSection: {
          sectionTag: "SECURE APPS FASTER",
          sectionTitle: "APPLICATION LIFECYCLE SECURITY",
          footerText: "From code to cloud we help you build secure applications that last",
          footerHighlight: "SECURITY BUILT IN // BY DESIGN",
          cards: [
            {
              stepNumber: "01",
              title: "Plan",
              description: "Define security requirements and threatmodels."
            },
            {
              stepNumber: "02",
              title: "Develop",
              description: "Embed secure coding practices and frameworks."
            },
            {
              stepNumber: "03",
              title: "Test",
              description: "Identify and fix vulnerabilities early."
            },
            {
              stepNumber: "04",
              title: "Deploy",
              description: "Ensure secure release and configuration."
            },
            {
              stepNumber: "05",
              title: "Operate",
              description: "Monitor, respond and continuously improve."
            }
          ]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "why-application-security",
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
              icon: "Code",
              title: "Vulnerabilities",
              description: "Code, dependencies and APIs"
            },
            {
              icon: "Code",
              title: "Exploitation",
              description: "Automated and targeted attacks"
            },
            {
              icon: "Code",
              title: "Impact",
              description: "Data loss, service disruption and regulatory risk"
            }
          ]
        }
      }
    },
    {
      _type: "authenticationGovernance",
      _key: "core-capabilities",
      data: {
        header: {
          eyebrow: "CORE CAPABILITIES",
          title: "Build stronger, more secure applications.",
          description: "We combine people, processes and technology to help embed security across your development lifecycle and reduce application risk."
        },
        cards: [
          {
            numberStr: "01",
            title: "SECURE SDLC",
            description: "Unified executive dashboards showing defensibility and asset hygiene over time.",
            iconName: "Activity",
            pills: ["Threat Modeling", "Security Champions", "Policy as Code"]
          },
          {
            numberStr: "02",
            title: "TESTING & ASSESSMENT",
            description: "Team-level velocity metrics and SLA compliance tracking across engineering teams.",
            iconName: "Lock",
            pills: ["Vector Store DLP", "PII Masking", "Synthetic Data"]
          },
          {
            numberStr: "03",
            title: "CODE & DEPENDENCY RISK",
            description: "Historical exposure trajectories across subsidiaries and enterprise business units.",
            iconName: "ShieldCheck",
            pills: ["Red Teaming", "KMS Integration", "Hardware HSM"]
          },
          {
            numberStr: "04",
            title: "REMEDIATION & GUIDANCE",
            description: "Real-time board-level summaries of high-impact attack paths needing intervention.",
            iconName: "Scale",
            pills: ["Lineage Mapping", "Compliance Audits", "Risk Scorecards"]
          }
        ]
      }
    },
    {
      _type: "dataDiscovery",
      _key: "integrate-security",
      variant: "alternate",
      data: {
        leftSection: {
          eyebrow: "INTEGRATE SECURITY",
          title: "Security that fits your way of working.",
          description: "We help you integrate security into your existing development and delivery processes, toolchains and CI/CD pipelines — enabling faster, safer releases without slowing your teams down.",
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
          eyebrow: "TRI-TIER OPERATING MODEL",
          statusText: "DEFENSE_IN_DEPTH",
          cards: [
            { stepNumber: "LAYER 01 // People", title: "PEOPLE", description: "Development, Security & Operations" },
            { stepNumber: "LAYER 02 // process", title: "PROCESS", description: "SDLC, CI/CD & Change Management" },
            { stepNumber: "LAYER 03 // tools", title: "TOOLS", description: "Security Testing, Monitoring & Automation" },
            { stepNumber: "LAYER 04 // OUTCOME", title: "UNIFIED PROTECTION BOUNDARY", description: "Zero unauthorized data egress and hardened runtime posture" }
          ],
          footerBadges: ["GitHub", "GitLab", "Jenkins", "Azure DevOps", "AWS", "Docker", "Kubernetes"]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "protect-what-you-build",
      data: {
        leftSection: {
          eyebrow: "PROTECT WHAT YOU BUILD",
          title: "Identify and fix risks before they become threats.",
          description: "From code vulnerabilities and misconfigurations to insecure libraries and APIs, we help you find and address risks early — reducing the chance of costly breaches later.",
          features: []
        },
        rightSection: {
          eyebrow: "",
          statusText: "",
          cards: [
            {
              icon: "Code",
              title: "Application Code",
              description: "Identify security flaws in custom code."
            },
            {
              icon: "Server",
              title: "Open Source Dependencies",
              description: "Detect and manage third-party and open-source risks."
            },
            {
              icon: "LayoutGrid",
              title: "APIs & Integrations",
              description: "Secure APIs and connected services."
            },
            {
              icon: "Shield",
              title: "Runtime Protection",
              description: "Monitor and protect applications in production."
            }
          ]
        }
      }
    },
    {
      _type: "secureDataOperations",
      _key: "our-approach",
      data: {
        header: {
          eyebrow: "OUR APPROACH",
          title: "From secure design to confident operation.",
          description: "A structured, collaborative approach to help you build secure applications and keep them secure as they evolve."
        },
        cards: [
          {
            numberStr: "01",
            phaseLabel: "PHASE 1",
            title: "ASSESS",
            description: "Understand your current attack surface, assets, and exposure points across hybrid environments.",
            footerText: "Attack Surface Inventory & Baseline"
          },
          {
            numberStr: "02",
            phaseLabel: "PHASE 2",
            title: "IMPLEMENT",
            description: "Apply risk and business context to identify what matters most and filter out low-value alerts.",
            footerText: "Contextual Risk Scoring Engine"
          },
          {
            numberStr: "03",
            phaseLabel: "PHASE 3",
            title: "VALIDATE",
            description: "Coordinate focused remediation across the teams responsible for affected crown-jewel assets.",
            footerText: "Orchestrated Remediation Playbooks"
          },
          {
            numberStr: "04",
            phaseLabel: "PHASE 4",
            title: "OPERATE",
            description: "Track progress, report changes and continuously improve your long-term exposure defensibility.",
            footerText: "Continuous Telemetry & Posture Audits"
          }
        ]
      }
    }
  ],
};
