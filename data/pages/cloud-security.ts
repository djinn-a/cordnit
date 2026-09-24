import type { PageDocument } from "@/lib/cms/types";

export const cloudSecurityPage: PageDocument = {
  slug: "cloud-security",
  title: "Cloud Security",
  layout: "default",
  seo: {
    title: "Cloud Security | Cordinit",
    description: "Secure cloud adoption and operation.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "cloud-security-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "Cloud Security", isCurrent: true },
      ],
    },
    {
      _type: "contentMedia",
      _key: "cloud-security-hero",
      eyebrow: "CLOUD SECURITY",
      title: "Secure cloud adoption\nand operation.",
      description: "Build a more secure cloud environment with stronger visibility, controls and continuous protection across infrastructure, identities, workloads and data.",
      cta: {
        label: "Discuss your cloud security",
        href: "/contactus",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "Cloud Security Infrastructure",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Cloud Data visualization",
      },
    },
    {
      _type: "dataSecurityOverview",
      _key: "cloud-security-overview",
      data: {
        header: {
          eyebrow: "CLOUD SECURITY OVERVIEW",
          title: "Security built into every layer of your cloud.",
          description: "Cordinit helps organisations secure cloud environments across posture, configuration, identities, workloads, data and ongoing monitoring \u2014 supporting secure adoption and confident operation."
        },
        cardSection: {
          sectionTag: "OPERATIONAL LIFECYCLE PIPELINE",
          sectionTitle: "END-TO-END ASSURANCE",
          footerText: "FROM EXTERNAL ATTACK SURFACE TO CORE INFRASTRUCTURE, PRIORITISE WHAT MATTERS",
          footerHighlight: "SECURE_ADOPTION // FULL_COVERAGE",
          cards: [
            {
              stepNumber: "01",
              title: "Posture",
              description: "Comprehensive asset & configuration discovery."
            },
            {
              stepNumber: "02",
              title: "Configuration",
              description: "Hardened baselines and preventative policies."
            },
            {
              stepNumber: "03",
              title: "Identity",
              description: "Least privilege and access boundary controls."
            },
            {
              stepNumber: "04",
              title: "Workload & Data",
              description: "Containers, serverless and storage encryption."
            },
            {
              stepNumber: "05",
              title: "Monitoring",
              description: "Continuous telemetry and telemetry drift alerts."
            }
          ]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "cloud-posture",
      variant: "steps",
      data: {
        leftSection: {
          eyebrow: "CLOUD POSTURE",
          title: "Understand your cloud environment.",
          description: "Gain visibility into your cloud environment and understand where security gaps, misconfigurations and exposure may exist across multi-account structures and hybrid estates.",
          features: [
            { text: "Automated discovery across multi-cloud, SaaS, and on-premises stores" },
            { text: "Real-time classification of PII, IP, financial, and regulated records" },
            { text: "Continuous posture alignment with GDPR, HIPAA, SOC 2, and ISO 27001" }
          ]
        },
        rightSection: {
          eyebrow: "POSTURE ANALYSIS FLOW",
          statusText: "DISCOVERY // CONTEXT",
          cards: [
            {
              stepNumber: "SOURCE",
              title: "CLOUD ENVIRONMENT",
              description: "Accounts, VPCs, clusters & subscriptions"
            },
            {
              stepNumber: "TELEMETRY",
              title: "VISIBILITY",
              description: "Asset topology, state changes & configuration sync"
            },
            {
              stepNumber: "BASELINE",
              title: "SECURITY POSTURE",
              description: "Configuration drift against hardened policy"
            },
            {
              stepNumber: "OUTCOME",
              title: "EXPOSURE & RISK REDUCTION",
              description: "Prioritised remediation roadmap with context"
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
          title: "Build stronger, more secure cloud environments.",
          description: "We combine people, processes and technology to help embed security across your cloud lifecycle and reduce risk."
        },
        cards: [
          {
            numberStr: "01",
            title: "SECURE POSTURE",
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
            title: "CLOUD & WORKLOAD RISK",
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
      _type: "dataSecurityOverview",
      _key: "cloud-configuration",
      data: {
        header: {
          eyebrow: "CONFIGURATION",
          title: "Build stronger cloud foundations.",
          description: "Establish stronger configuration controls across your cloud environment and reduce unnecessary security exposure through automated policy guardrails and infrastructure-as-code validation.",
        },
        processCards: [
          {
            stepNumber: "01",
            phase: "BASELINE",
            title: "CONFIGURE",
            description: "Embed hardened configuration baselines directly into cloud accounts, templates, and deployment scripts.",
            subDescription: "Landing zones - Golden AMI - IaC modules"
          },
          {
            stepNumber: "02",
            phase: "VERIFICATION",
            title: "VALIDATE",
            description: "Continuously test active settings against defined security guardrails to intercept drift before exposure.",
            subDescription: "Drift detection - Policy-as-code - CI/CD gates"
          },
          {
            stepNumber: "03",
            phase: "REMEDIATION",
            title: "IMPROVE",
            description: "Remediate misconfigurations systematically with playbooks that avoid breaking production workloads.",
            subDescription: "Automated fixes - Root cause analysis - Feedback"
          }
        ]
      }
    },
    {
      _type: "dataDiscovery",
      _key: "workload-and-data",
      variant: "alternate",
      data: {
        leftSection: {
          eyebrow: "WORKLOAD & DATA",
          title: "Protect workloads and data.",
          description: "Protect cloud workloads and sensitive data across the environments where they are created, stored, processed and used ensuring end-to-end operational resilience.",
          features: [
            {
              title: "Cloud Workload Protection",
              text: "Continuously monitor and secure your containers, virtual machines, and serverless functions against runtime threats and unauthorized access."
            },
            {
              title: "Data Security Posture Management",
              text: "Automatically discover, classify, and protect sensitive data across your cloud storage, databases, and managed services."
            }
          ]
        },
        rightSection: {
          eyebrow: "RESILIENCE ARCHITECTURE",
          statusText: "DEFENSE_IN_DEPTH",
          cards: [
            { stepNumber: "LAYER 01 // INFRASTRUCTURE", title: "CLOUD WORKLOADS", description: "VMs, Kubernetes nodes & serverless containers" },
            { stepNumber: "LAYER 02 // SERVICES", title: "APPLICATIONS", description: "Microservices, API gateways & messaging queues" },
            { stepNumber: "LAYER 03 // ASSETS", title: "DATA ASSETS", description: "Object storage, relational databases & key vaults" },
            { stepNumber: "LAYER 04 // OUTCOME", title: "UNIFIED PROTECTION BOUNDARY", description: "Zero unauthorized data egress and hardened runtime posture" }
          ]
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
          description: "From cloud vulnerabilities and misconfigurations to insecure libraries and APIs, we help you find and address risks early — reducing the chance of costly breaches later.",
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
              description: "Monitor and protect workloads in production."
            }
          ]
        }
      }
    },
    {
      _type: "secureDataOperations",
      _key: "secure-cloud-operation",
      data: {
        header: {
          eyebrow: "SECURE CLOUD OPERATION",
          title: "From cloud adoption to secure operation.",
          description: "Build security into every stage of your cloud journey — from establishing the right foundations to maintaining visibility as your environment evolves."
        },
        cards: [
          {
            numberStr: "01",
            phaseLabel: "PHASE 1",
            title: "ADOPT",
            description: "Understand your current attack surface, assets, and exposure points across hybrid environments.",
            footerText: "Attack Surface Inventory & Baseline"
          },
          {
            numberStr: "02",
            phaseLabel: "PHASE 2",
            title: "CONFIGURE",
            description: "Apply risk and business context to identify what matters most and filter out low-value alerts.",
            footerText: "Contextual Risk Scoring Engine"
          },
          {
            numberStr: "03",
            phaseLabel: "PHASE 3",
            title: "PROTECT",
            description: "Coordinate focused remediation across the teams responsible for affected crown-jewel assets.",
            footerText: "Orchestrated Remediation Playbooks"
          },
          {
            numberStr: "04",
            phaseLabel: "PHASE 4",
            title: "MONITOR",
            description: "Track progress, report changes and continuously improve your long-term exposure defensibility.",
            footerText: "Continuous Telemetry & Posture Audits"
          }
        ]
      }
    }
  ],
};

