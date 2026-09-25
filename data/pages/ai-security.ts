import type { PageDocument } from "@/lib/cms/types";

export const aiSecurityPage: PageDocument = {
  slug: "ai-security",
  title: "AI Security",
  layout: "default",
  seo: {
    title: "AI Security | Cordinit",
    description: "Adopt AI with confidence and control.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "ai-security-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "AI Security", isCurrent: true },
      ],
    },
    {
      _type: "contentMedia",
      _key: "ai-security-hero",
      eyebrow: "AI SECURITY",
      title: "Adopt AI with\nconfidence and control.",
      description: "AI is creating new opportunities for organisations, but it also introduces new security, privacy and governance considerations. Cordinit helps you identify AI-related risks and establish practical controls for secure, responsible adoption.",
      cta: {
        label: "Discuss your AI security priorities",
        href: "/contactus",
      },
      mainImage: {
        src: "/images/content-media/frame_1984077885.webp",
        alt: "AI Security Professionals",
        width: 600,
        height: 600,
      },
    },
    {
      _type: "dataSecurityOverview",
      _key: "ai-security-overview",
      data: {
        header: {
          eyebrow: "AI SECURITY OVERVIEW",
          title: "Build security into every stage of AI adoption.",
          description: "AI security is more than protecting a model. It requires understanding how AI is being used, what data it relies on, who can access it and how its outputs are governed. We bring risk assessment, data protection, governance and monitoring together to create a safer path to AI adoption.",
        },
        cardSection: {
          sectionTitle: "APPLICATION IDENTITY SECURITY",
          sectionTag: "SECURE APPS FASTER",
          footerText: "FROM MODEL TO APPLICATION, SECURE EVERY LAYER OF ENTERPRISE AI.",
          footerHighlight: "Continuous Alignment Active",
          cards: [
            {
              stepNumber: "01",
              title: "Identify",
              description: "Identify where sensitive and business-critical data exists across structured and unmanaged repositories."
            },
            {
              stepNumber: "02",
              title: "Assess",
              description: "Understand data sensitivity, importance and handling requirements via ML and contextual tagging."
            },
            {
              stepNumber: "03",
              title: "Protect",
              description: "Apply appropriate controls to safeguard information wherever it lives via encryption and masking."
            },
            {
              stepNumber: "04",
              title: "Govern",
              description: "Detect unusual access, mass exfiltration, shadow SaaS synchronization, and exposure events."
            },
            {
              stepNumber: "05",
              title: "Monitor",
              description: "Continuously manage policies, custodian ownership, retention rules, and compliance posture."
            }
          ]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "ai-risk",
      variant: "default",
      data: {
        leftSection: {
          eyebrow: "AI RISK",
          title: "Understand where AI introduces new risk.",
          description: "AI can introduce risks across data, models, applications and user interactions. We help identify where those risks exist and prioritise practical controls around the AI use cases that matter most to your organisation.",
          features: [
            { text: "Training data poisoning and sensitive data exfiltration in RAG pipelines" },
            { text: "Model inversion, intellectual property theft, and parameter tampering" },
            { text: "Continuous regulatory alignment with EU AI Act, NIST AI RMF, and ISO 42001" }
          ]
        },
        rightSection: {
          eyebrow: "AI RISK TOPOLOGY",
          statusText: "STATUS: MONITORED",
          cards: [
            { title: "DATA", description: "Cloud storage, S3 buckets, Azure Blobs & multi-cloud platforms", icon: "Cloud" },
            { title: "MODEL", description: "Salesforce, Workday, ERP, CRM & internal microservices", icon: "LayoutDashboard" },
            { title: "APPLICATION", description: "Structured SQL, NoSQL clusters, Snowflake & analytical lakes", icon: "Database" },
            { title: "PEOPLE", description: "Corporate laptops, BYOD devices & secure virtual desktop nodes", icon: "MonitorSmartphone" },
            { title: "OUTPUTS", description: "Slack, Microsoft Teams, SharePoint & shared cloud drives", icon: "Share2" }
          ]
        }
      }
    },
    {
      _type: "dataSecurityOverview",
      _key: "data-model-protection",
      data: {
        header: {
          eyebrow: "DATA & MODEL PROTECTION",
          title: "Protect what AI learns from and produces.",
          description: "AI systems depend on data and models that can introduce security and privacy risks if they are not properly controlled. We help establish safeguards around sensitive data, model access and AI-generated outputs."
        },
        processCards: [
          {
            stepNumber: "01",
            phase: "PHASE I",
            title: "IDENTIFY",
            description: "Find sensitive and business-critical information across fragmented storage silos.",
            subDescription: "Mechanism: Automated cataloging & vector store discovery"
          },
          {
            stepNumber: "02",
            phase: "PHASE II",
            title: "PROTECT",
            description: "Assign meaningful sensitivity and handling categories (Public, Internal, Confidential, Restricted).",
            subDescription: "Mechanism: Automated cataloging & vector store discovery"
          },
          {
            stepNumber: "03",
            phase: "PHASE III",
            title: "VALIDATE",
            description: "Apply appropriate controls based on risk: dynamic masking, tokenization, field-level encryption.",
            subDescription: "Mechanism: Automated cataloging & vector store discovery"
          },
          {
            stepNumber: "04",
            phase: "PHASE IV",
            title: "MONITOR",
            description: "Continuously reassess protection tiers as data, user roles, and business requirements transform.",
            subDescription: "Mechanism: Automated cataloging & vector store discovery"
          }
        ]
      }
    },
    {
      _type: "dataDiscovery",
      _key: "ai-governance-architecture",
      variant: "alternate",
      data: {
        leftSection: {
          eyebrow: "DATA ACCESS",
          title: "Control who can access sensitive information.",
          description: "Strengthen access controls around sensitive data and reduce unnecessary exposure. We help align permissions with roles, responsibilities and risk while improving visibility into how information is accessed and used.",
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
            { stepNumber: "01", title: "AI USE CASES", description: "Ideation, Business Justification & Registry" },
            { stepNumber: "02", title: "RISK ASSESSMENT", description: "Impact Rating, Data Sensitivity & Bias Audit" },
            { stepNumber: "03", title: "SECURITY CONTROLS", description: "Model Guardrails, Sandboxing & DLP Interceptor" },
            { stepNumber: "04", title: "GOVERNANCE", description: "Policy Enforcement, Ownership & Lineage Tracking" },
            { stepNumber: "05", title: "MONITORING", description: "Real-time Output Validation & Behavioral Drift Telemetry" }
          ]
        }
      }
    },
    {
      _type: "authenticationGovernance",
      _key: "secure-ai-adoption",
      data: {
        header: {
          eyebrow: "SECURE AI ADOPTION",
          title: "Move from experimentation to trusted AI.",
          description: "AI adoption works best when security is considered from the beginning. We help teams introduce practical guardrails that allow useful AI experimentation while creating a clearer path toward secure, scalable adoption."
        },
        cards: [
          {
            numberStr: "01",
            title: "Use-Case Risk",
            description: "Identify unusual access, exfiltration patterns, and potential exposure across hybrid environments. Stream DLP telemetry into enterprise SIEM platforms for rapid triage.",
            iconName: "Activity",
            pills: ["Threat Assessment", "Impact Tiering", "Risk Scoring"]
          },
          {
            numberStr: "02",
            title: "Data Protection",
            description: "Strengthen permissions and reduce unnecessary data access with dynamic policy enforcement. Implement fine-grained attribute based constraints mapped to organizational hierarchy.",
            iconName: "Lock",
            pills: ["Vector Store DLP", "PII Masking", "Synthetic Data"]
          },
          {
            numberStr: "03",
            title: "Secure AI Engineering",
            description: "Apply appropriate safeguards including tokenization, field-level encryption, format-preserving encryption, and hardware-backed secure key management integration.",
            iconName: "ShieldCheck",
            pills: ["Red Teaming", "KMS Integration", "Hardware HSM"]
          },
          {
            numberStr: "04",
            title: "Governance & Guardrails",
            description: "Establish clear data custodianship, lineage tracking, automated compliance auditing, and executive risk metrics to satisfy regulatory mandates with speed.",
            iconName: "Scale",
            pills: ["Lineage Mapping", "Compliance Audits", "Risk Scorecards"]
          }
        ]
      }
    },
    {
      _type: "secureDataOperations",
      _key: "secure-ai-operations",
      data: {
        header: {
          eyebrow: "SECURE AI OPERATIONS",
          title: "From AI ambition to secure adoption.",
          description: "We help turn AI security priorities into practical controls that evolve alongside your use cases, technology and business needs."
        },
        cards: [
          {
            numberStr: "01",
            phaseLabel: "PHASE 1",
            title: "DISCOVER",
            description: "Identify AI use cases, data flows and potential shadow AI risks across enterprise departments.",
            footerText: "Enterprise AI Asset Inventory & Shadow AI Audit"
          },
          {
            numberStr: "02",
            phaseLabel: "PHASE 2",
            title: "ASSESS",
            description: "Evaluate security, privacy and governance requirements against target operating models.",
            footerText: "Threat Model & Risk Taxonomy"
          },
          {
            numberStr: "03",
            phaseLabel: "PHASE 3",
            title: "PROTECT",
            description: "Implement appropriate controls, runtime interceptors, and engineer adoption guardrails.",
            footerText: "Guardrail Deployment & integration playbooks"
          },
          {
            numberStr: "04",
            phaseLabel: "PHASE 4",
            title: "MONITOR & IMPROVE",
            description: "Continuously monitor AI usage and strengthen controls dynamically as threats evolve.",
            footerText: "Automated Telemetry & Model Retraining Gates"
          }
        ]
      }
    }
  ],
};
