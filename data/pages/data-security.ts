import type { PageDocument } from "@/lib/cms/types";

export const dataSecurityPage: PageDocument = {
  slug: "data-security",
  title: "Data Security",
  layout: "default",
  seo: {
    title: "Data Security | Cordinit",
    description: "Protect sensitive data wherever it is created, used and stored.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "data-security-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "Data Security", isCurrent: true },
      ],
    },
    {
      _type: "contentMedia",
      _key: "data-security-hero",
      eyebrow: "DATA SECURITY",
      title: "Protect your most valuable asset.",
      description: "Protect sensitive data wherever it is created, used and stored. We help you implement robust data security measures to ensure compliance, privacy, and protection against unauthorized access or breaches.",
      cta: {
        label: "Discuss your data security",
        href: "/contactus",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "Data Security Infrastructure",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Technology abstract visualization",
      },
    },
    {
      _type: "dataSecurityOverview",
      _key: "data-security-overview",
      data: {
        header: {
          eyebrow: "DATA SECURITY OVERVIEW",
          title: "Protect data from discovery to everyday use.",
          description: "Effective data security starts with knowing what information you have, where it resides and how it is being used. We bring discovery, classification, access controls, protection and governance together to help keep sensitive information secure wherever it moves."
        },
        cardSection: {
          sectionTag: "SECURE APPS FASTER",
          sectionTitle: "APPLICATION LIFECYCLE SECURITY",
          footerText: "FROM CLOUD TO ENDPOINT, PROTECT DATA AT REST, IN TRANSIT AND IN USE.",
          footerHighlight: "SECURITY BUILT IN // BY DESIGN",
          cards: [
            {
              stepNumber: "01",
              title: "Discover",
              description: "Understand users, identities, applications and access across hybrid estates."
            },
            {
              stepNumber: "02",
              title: "Classify",
              description: "Strengthen how users and systems prove who they are with phishing- resistant MFA."
            },
            {
              stepNumber: "03",
              title: "Protect",
              description: "Give the right level of access based on role, real-time context and dynamic risk."
            },
            {
              stepNumber: "04",
              title: "Monitor",
              description: "Review, monitor and manage access throughout its complete operational lifecycle."
            },
            {
              stepNumber: "05",
              title: "Govern",
              description: "Continuously reduce unnecessary privilege and strengthen posture over time."
            }
          ]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "data-security-discovery",
      data: {
        leftSection: {
          eyebrow: "DATA DISCOVERY",
          title: "Know where your sensitive data lives.",
          description: "Gain a clearer view of sensitive information across cloud platforms, applications, databases and other environments. Identify critical data stores, understand exposure and establish the visibility needed to make better security decisions.",
          features: [
            { text: "Automated discovery across multi-cloud, SaaS, and on-premises stores" },
            { text: "Real-time classification of PII, IP, financial, and regulated records" },
            { text: "Continuous posture alignment with GDPR, HIPAA, SOC 2, and ISO 27001" }
          ]
        },
        rightSection: {
          eyebrow: "DATA LANDSCAPE TOPOLOGY",
          statusText: "STATUS: SYNCED",
          cards: [
            {
              icon: "Cloud",
              title: "CLOUD REPOSITORIES",
              description: "Cloud storage, S3 buckets, Azure Blobs & multi-cloud platforms"
            },
            {
              icon: "LayoutGrid",
              title: "APPLICATIONS & SAAS",
              description: "Salesforce, Workday, ERP, CRM & internal microservices"
            },
            {
              icon: "Database",
              title: "DATABASES & PIPELINES",
              description: "Structured SQL, NoSQL clusters, Snowflake & analytical lakes"
            },
            {
              icon: "MonitorSmartphone",
              title: "USER ENDPOINTS",
              description: "Corporate laptops, BYOD devices & secure virtual desktop nodes"
            },
            {
              icon: "Share2",
              title: "SHARED WORKSPACES",
              description: "Slack, Microsoft Teams, SharePoint & shared cloud drives"
            }
          ]
        }
      }
    },
    {
      _type: "dataSecurityOverview",
      _key: "data-classification-protection",
      data: {
        header: {
          eyebrow: "CLASSIFICATION & PROTECTION",
          title: "Apply the right protection to the right data.",
          description: "Not all information carries the same level of risk. We help establish practical classification and protection approaches so controls are aligned with the sensitivity and business value of the data."
        },
        processCards: [
          {
            stepNumber: "01",
            phase: "PHASE I",
            title: "IDENTIFY",
            description: "Find sensitive and business-critical information across fragmented storage silos.",
            subDescription: "Ingest telemetry across scanners, cloud configs, and code."
          },
          {
            stepNumber: "02",
            phase: "PHASE ii",
            title: "CLASSIFY",
            description: "Assign meaningful sensitivity and handling categories (Public, Internal, Confidential, Restricted).",
            subDescription: "Overlay asset tags, data classifications, and blast radius."
          },
          {
            stepNumber: "03",
            phase: "PHASE iii",
            title: "PROTECT",
            description: "Continuously reassess protection tiers as data, user roles, and business requirements transform.",
            subDescription: "Filter out noise; highlight true breach paths."
          },
          {
            stepNumber: "04",
            phase: "PHASE iv",
            title: "REVIEW",
            description: "Continuously reassess protection tiers as data, user roles, and business requirements transform.",
            subDescription: "Dispatch validated tickets with actionable fix guidance."
          }
        ]
      }
    },
    {
      _type: "dataDiscovery",
      _key: "data-access-architecture",
      variant: "alternate",
      data: {
        leftSection: {
          eyebrow: "DATA ACCESS",
          title: "Control who can access sensitive information.",
          description: "Strengthen access controls around sensitive data to limit exposure and contain potential incidents. Ensure that the right people and systems have appropriate access while actively removing unnecessary permissions.",
          features: [
            { title: "Contextual Guardrails & Output Sanitization", text: "Mask or redact sensitive fields before they reach the user based on clearance." },
            { title: "Time-Bound Privileges & Session Management", text: "Enforce dynamic session timeouts and revoke access automatically post-task." }
          ]
        },
        rightSection: {
          eyebrow: "PRIVILEGED ACCESS ARCHITECTURE",
          statusText: "ISO 27001 / SOC 2",
          cards: [
            { stepNumber: "01", title: "USER / IDENTITY", description: "Human, Service Account, or API Consumer" },
            { stepNumber: "02", title: "ACCESS POLICY GATEWAY", description: "Context-Aware RBAC/ABAC & Device Posture Check" },
            { stepNumber: "03", title: "PROTECTED DATA STORE", description: "Column/Row Masked, Tokenized, Encrypted Data Engine" },
            { stepNumber: "04", title: "MONITORING & AUDIT", description: "Immutable Access Ledger & SIEM/SOAR Ingestion" }
          ],
          footerBadges: ["Role-Based Access", "Tokenization"]
        }
      }
    },
    {
      _type: "authenticationGovernance",
      _key: "authentication-governance",
      data: {
        header: {
          eyebrow: "AUTHENTICATION & GOVERNANCE",
          title: "Build confidence into every access decision.",
          description: "Bring stronger authentication, access policies and governance together to create secure experiences without adding unnecessary friction for users."
        },
        cards: [
          {
            numberStr: "01",
            title: "Data Monitoring",
            description: "Identify unusual access, exfiltration patterns, and potential exposure across hybrid environments. Stream DLP telemetry into enterprise SIEM platforms for rapid triage.",
            iconName: "Activity",
            pills: ["Threat Modeling", "Security Champions", "Policy as Code"]
          },
          {
            numberStr: "02",
            title: "Access Controls",
            description: "Strengthen permissions and reduce unnecessary data access with dynamic policy enforcement. Implement fine-grained attribute based constraints mapped to organizational hierarchy.",
            iconName: "Lock",
            pills: ["Vector Store DLP", "PII Masking", "Synthetic Data"]
          },
          {
            numberStr: "03",
            title: "Data Protection",
            description: "Apply appropriate safeguards including tokenization, field-level encryption, format-preserving encryption, and hardware-backed secure key management integration.",
            iconName: "ShieldCheck",
            pills: ["Red Teaming", "KMS Integration", "Hardware HSM"]
          },
          {
            numberStr: "04",
            title: "Governance",
            description: "Establish clear data custodianship, lineage tracking, automated compliance auditing, and executive risk metrics to satisfy regulatory mandates with speed.",
            iconName: "Scale",
            pills: ["Lineage Mapping", "Compliance Audits", "Risk Scorecards"]
          }
        ]
      }
    },

    {
      _type: "secureDataOperations",
      _key: "secure-data-operations",
      data: {
        header: {
          eyebrow: "SECURE DATA OPERATIONS",
          title: "From data visibility to continuous protection.",
          description: "We help turn data security priorities into practical controls that work across your technology environment and everyday business processes."
        },
        cards: [
          {
            numberStr: "01",
            phaseLabel: "PHASE 1",
            title: "DISCOVER",
            description: "Understand your current attack surface, assets, and exposure points across hybrid environments.",
            footerText: "Attack Surface Inventory & Baseline"
          },
          {
            numberStr: "02",
            phaseLabel: "PHASE 2",
            title: "ASSESS",
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
            title: "MONITOR & IMPROVE",
            description: "Track progress, report changes and continuously improve your long-term exposure defensibility.",
            footerText: "Continuous Telemetry & Posture Audits"
          }
        ]
      }
    }
  ],
};
