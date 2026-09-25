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
        src: "/images/content-media/frame_1984077885.webp",
        alt: "Cloud Security Infrastructure",
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
          variant: "cloud-security",
          sectionTitle: "OPERATIONAL LIFECYCLE PIPELINE",
          sectionTag: "END-TO-END ASSURANCE",
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
            }
          ]
        }
      }
    },
    {
      _type: "dataSecurityOverview",
      _key: "cloud-configuration",
      data: {
        variant: "cloud-configuration",
        processSectionInfo: {
          headerLeft: "CONTINUOUS CONFIGURATION CYCLE",
          headerRight: "PREVENTATIVE_GUARDRAILS",
          footerText: "Preventative configuration ensures cloud agility does not introduce uncontrolled attack surfaces.",
          footerHighlight: "INFRASTRUCTURE_AS_CODE // ALIGNED"
        },
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
      _key: "identities-access",
      variant: "flowchart",
      data: {
        leftSection: {
          eyebrow: "IDENTITIES",
          title: "Control who and what has access.",
          description: "Strengthen access controls and help ensure people, applications and services have the right permissions at the right time across all cloud resources without friction.",
          features: []
        },
        rightSection: {
          eyebrow: "ENTITLEMENT & ACCESS MAPPING",
          statusText: "CIEM // ZERO TRUST",
          cards: [
            {
              stepNumber: "HUMAN",
              title: "PEOPLE",
              description: "Engineers & Admins",
            },
            {
              stepNumber: "WORKLOAD",
              title: "APPLICATIONS",
              description: "APIs & Microservices",
            },
            {
              stepNumber: "SYSTEM",
              title: "SERVICES",
              description: "Pipelines & Automation",
            },
            {
              stepNumber: "CENTRAL GOVERNANCE",
              title: "IDENTITY & ENTITLEMENTS",
              description: "Role baselines \u00b7 Token expiry \u00b7 Multi-factor",
            },
            {
              stepNumber: "ENFORCED OUTCOME",
              title: "APPROPRIATE & JUST-IN-TIME ACCESS",
              description: "Ephemeral permissions with complete audit trails",
            },
          ],
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "workload-and-data",
      variant: "stacked",
      data: {
        leftSection: {
          eyebrow: "WORKLOAD & DATA",
          title: "Protect workloads and data.",
          description: "Protect cloud workloads and sensitive data across the environments where they are created, stored, processed and used ensuring end-to-end operational resilience.",
          features: []
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
      _key: "continuous-assurance",
      variant: "loop",
      data: {
        leftSection: {
          eyebrow: "CONTINUOUS MONITORING",
          title: "Maintain continuous visibility.",
          description: "Continuously monitor your cloud environments to detect anomalous behaviors, contain threats instantly, and feed insights back to improve your security posture.",
          features: []
        },
        rightSection: {
          eyebrow: "CONTINUOUS ASSURANCE LOOP",
          statusText: "REACTIVE ➔ PREVENTATIVE",
          cards: [
            {
              stepNumber: "01",
              title: "MONITOR",
              description: "Continuous telemetry from cloud audit logs and API events."
            },
            {
              stepNumber: "02",
              title: "DETECT",
              description: "Isolate anomalous behaviors and exploit paths instantly."
            },
            {
              stepNumber: "03",
              title: "RESPOND",
              description: "Decisive containment and verified playbook steps."
            },
            {
              stepNumber: "04",
              title: "IMPROVE",
              description: "Feed insights back into configuration baselines."
            }
          ],
          footerBadges: ["CLOSED-LOOP CLOUD TELEMETRY CYCLE"]
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

