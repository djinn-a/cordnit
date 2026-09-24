import type { PageDocument } from "@/lib/cms/types";

export const managedSecurityPage: PageDocument = {
  slug: "managed-security",
  title: "Managed Security",
  layout: "default",
  seo: {
    title: "Managed Security | Cordinit",
    description: "Extend your security operations capacity.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "managed-security-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "Managed Security", isCurrent: true },
      ],
    },
    {
      _type: "contentMedia",
      _key: "managed-security-hero",
      eyebrow: "MANAGED SECURITY",
      title: "Extend your security\noperations capacity.",
      description: "Strengthen your security operations with ongoing monitoring, response support and structured governance—giving your teams the coverage and expertise they need to manage security more consistently.",
      cta: {
        label: "Discuss your security operations",
        href: "/contactus",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "Business professionals reviewing data visualizations on large screens",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Abstract digital data and market metrics",
      },
    },
    {
      _type: "dataSecurityOverview",
      _key: "managed-security-coverage",
      data: {
        header: {
          eyebrow: "MANAGED SECURITY",
          title: "Security coverage that\nworks alongside your team.",
          description: "Security teams need consistent visibility and response without having to build every capability internally. Managed security extends operational capacity while keeping responsibilities, escalation paths and governance clear.",
        },
        cardSection: {
          sectionTitle: "Continuous Active Operations",
          sectionTag: "STAGE_FLOW.014 // MANAGED_OPERATIONS_LOOP",
          footerText: "FROM CONTINUOUS DETECTION TO RESOLUTION, MANAGED SECURITY EXTENDS YOUR TEAM",
          footerHighlight: "Continuous Programme Engine Active",
          cards: [
            {
              stepNumber: "01",
              title: "Onboard",
              description: "Identify assets, systems and attack-surface exposure across your hybrid technology estate.",
            },
            {
              stepNumber: "02",
              title: "Monitor",
              description: "Add context around vulnerabilities, criticality, asset owners, and direct business impact.",
            },
            {
              stepNumber: "03",
              title: "Analyse",
              description: "Focus attention on the exposures that represent the greatest immediate weaponisation risk.",
            },
            {
              stepNumber: "04",
              title: "Respond",
              description: "Coordinate remediation through clear, validated, actionable workflows directly into engineering backlogs.",
            },
            {
              stepNumber: "05",
              title: "Escalate",
              description: "Identify assets, systems and attack-surface exposure across your hybrid technology estate.",
            },
            {
              stepNumber: "06",
              title: "Report",
              description: "Add context around vulnerabilities, criticality, asset owners, and direct business impact.",
            },
            {
              stepNumber: "07",
              title: "Improve",
              description: "Focus attention on the exposures that represent the greatest immediate weaponisation risk.",
            },
          ]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "managed-security-ecosystem",
      data: {
        leftSection: {
          eyebrow: "ECOSYSTEM INTEGRATION",
          title: "Extend coverage across\nthe security environment.",
          description: "Comprehensive operational coverage, connecting distributed technology signals with dedicated security expertise, systematic investigation, and coordinated response.",
          features: [
            { text: "Real-time discovery across multi-cloud, on-prem, and shadow IT assets" },
            { text: "Continuous mapping of external-facing ports, APIs, and domain estates" },
            { text: "Unified asset inventory contextualised by data sensitivity and business role" },
          ]
        },
        rightSection: {
          eyebrow: "TELEMETRY & SIGNAL INGESTION",
          statusText: "STATUS: MONITORED",
          cards: [
            {
              icon: "Share2",
              title: "Security Events",
              description: "Cloud workloads, VPCs, and storage services"
            },
            {
              icon: "Cloud",
              title: "Cloud Estate",
              description: "Web & core microservices APIs exposed"
            },
            {
              icon: "UserCog",
              title: "Identity",
              description: "Internal servers, firewalls, and network fabrics"
            },
            {
              icon: "MonitorSmartphone",
              title: "Data Layer",
              description: "Corporate laptops, mobile, and managed systems"
            },
            {
              icon: "Globe",
              title: "External Feeds",
              description: "Internet-facing perimeter nodes, DNS records, and external SaaS integrations"
            }
          ]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "managed-security-operations",
      variant: "alternate",
      data: {
        leftSection: {
          eyebrow: "HOW SECURITY OPERATIONS WORK",
          title: "From signal to action, with\na clear operating model.",
          description: "Our operating model provides end-to-end operational rigor while respecting internal ownership and client decision authority.",
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
          eyebrow: "AI GOVERNANCE ARCHITECTURE",
          statusText: "NIST AI RMF / EU AI ACT",
          cards: [
            {
              stepNumber: "01",
              title: "Security Monitoring Lane",
              description: "Ideation, Business Justification & Registry"
            },
            {
              stepNumber: "02",
              title: "Security Analysis Lane",
              description: "Impact Rating, Data Sensitivity & Bias Audit"
            },
            {
              stepNumber: "03",
              title: "Response Team Lane",
              description: "Model Guardrails, Sandboxing & DLP Interceptor"
            },
            {
              stepNumber: "04",
              title: "Client & Specialist Escalation",
              description: "Real-time Output Validation & Behavioral Drift Telmetry"
            }
          ]
        }
      }
    },
    {
      _type: "secureDataOperations",
      _key: "managed-security-onboarding",
      data: {
        headerLayout: "stacked",
        cardStyle: "pale-blue",
        header: {
          eyebrow: "ONBOARDING",
          title: "Start with a security service built\naround your environment.",
          description: "A seamless 4-phase activation framework designed to integrate with your existing technology stack with zero operational downtime."
        },
        cards: [
          {
            numberStr: "01",
            phaseLabel: "PHASE I",
            title: "Understand",
            description: "Bring exposures and affected assets into one clearer view.",
            footerText: "Ingest telemetry across scanners, cloud configs, and code."
          },
          {
            numberStr: "02",
            phaseLabel: "PHASE II",
            title: "Connect",
            description: "Understand technical severity alongside business importance.",
            footerText: "Overlay asset tags, data classifications, and blast radius."
          },
          {
            numberStr: "03",
            phaseLabel: "PHASE III",
            title: "Configure",
            description: "Rank exposures based on risk, exploitability and potential impact.",
            footerText: "Filter out noise; highlight true breach paths."
          },
          {
            numberStr: "04",
            phaseLabel: "PHASE IV",
            title: "Activate",
            description: "Direct teams towards the remediation work that matters most.",
            footerText: "Dispatch validated tickets with actionable fix guidance."
          }
        ]
      }
    },
    {
      _type: "authenticationGovernance",
      _key: "managed-security-visibility",
      data: {
        header: {
          eyebrow: "VISIBILITY & GOVERNANCE",
          title: "Make security operations\nvisible to the people who need to act.",
          description: "No black boxes. Direct, contextual dashboard intelligence backed by strategic operational governance gives executive leadership complete oversight."
        },
        cards: [
          {
            numberStr: "01",
            title: "Operational Reviews",
            description: "Unified executive dashboards showing defensibility and asset hygiene over time.",
            iconName: "LayoutGrid",
            pills: ["Threat Assessment", "Impact Tiering", "Risk Scoring"]
          },
          {
            numberStr: "02",
            title: "Security Reporting",
            description: "Team-level velocity metrics and SLA compliance tracking across engineering teams.",
            iconName: "Gauge",
            pills: ["Vector Store DLP", "PII Masking", "Synthetic Data"]
          },
          {
            numberStr: "03",
            title: "Escalation Reviews",
            description: "Historical exposure trajectories across subsidiaries and enterprise business units.",
            iconName: "TrendingUp",
            pills: ["Red Teaming", "KMS Integration", "Hardware HSM"]
          },
          {
            numberStr: "04",
            title: "Continuous Improvement",
            description: "Real-time board-level summaries of high-impact attack paths needing intervention.",
            iconName: "Bell",
            pills: ["Lineage Mapping", "Compliance Audits", "Risk Scorecards"]
          }
        ]
      }
    },
    {
      _type: "secureDataOperations",
      _key: "managed-security-portfolio",
      data: {
        headerLayout: "split",
        cardStyle: "clean",
        header: {
          eyebrow: "INTERCONNECTED PORTFOLIO",
          title: "Security capabilities that\nwork together.",
          description: "Cordinit provides an interconnected cybersecurity portfolio to secure your technology estate end-to-end."
        },
        cards: [
          {
            numberStr: "01",
            title: "Exposure Management",
            description: "Embed hardened configuration baselines directly into cloud accounts, templates, and deployment scripts.",
            footerText: "Landing zones · Golden AMI · IaC modules"
          },
          {
            numberStr: "02",
            title: "Vulnerability Management",
            description: "Continuously test active settings against defined security guardrails to intercept drift before exposure.",
            footerText: "Drift detection · Policy-as-code · CI/CD gates"
          },
          {
            numberStr: "03",
            title: "Application Security",
            description: "Remediate misconfigurations systematically with playbooks that avoid breaking production workloads.",
            footerText: "Automated fixes · Root cause analysis · Feedback",
            highlighted: true
          },
          {
            numberStr: "04",
            title: "Identity Security",
            description: "Embed hardened configuration baselines directly into cloud accounts, templates, and deployment scripts.",
            footerText: "Landing zones · Golden AMI · IaC modules"
          },
          {
            numberStr: "05",
            title: "Data Security",
            description: "Continuously test active settings against defined security guardrails to intercept drift before exposure.",
            footerText: "Drift detection · Policy-as-code · CI/CD gates"
          },
          {
            numberStr: "06",
            title: "AI Security",
            description: "Remediate misconfigurations systematically with playbooks that avoid breaking production workloads.",
            footerText: "Automated fixes · Root cause analysis · Feedback",
            highlighted: true
          }
        ]
      }
    },
    {
      _type: "secureDataOperations",
      _key: "managed-security-approach",
      data: {
        headerLayout: "split",
        cardStyle: "default",
        header: {
          eyebrow: "OUR APPROACH",
          title: "Extend capacity without\nlosing control.",
          description: "A disciplined consulting architecture tailored to enterprise operational realities."
        },
        cards: [
          {
            numberStr: "01",
            phaseLabel: "PHASE 1",
            title: "Assess",
            description: "Understand your current attack surface, assets, and exposure points across hybrid environments.",
            footerText: "Attack Surface Inventory & Baseline"
          },
          {
            numberStr: "02",
            phaseLabel: "PHASE 2",
            title: "Onboard",
            description: "Apply risk and business context to identify what matters most and filter out low-value alerts.",
            footerText: "Contextual Risk Scoring Engine"
          },
          {
            numberStr: "03",
            phaseLabel: "PHASE 3",
            title: "Operate",
            description: "Coordinate focused remediation across the teams responsible for affected crown-jewel assets.",
            footerText: "Orchestrated Remediation Playbooks"
          },
          {
            numberStr: "04",
            phaseLabel: "PHASE 4",
            title: "Improve",
            description: "Track progress, report changes and continuously improve your long-term exposure defensibility.",
            footerText: "Continuous Telemetry & Posture Audits"
          }
        ]
      }
    }
  ],
};
