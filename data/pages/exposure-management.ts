import type { PageDocument } from "@/lib/cms/types";

export const exposureManagementPage: PageDocument = {
  slug: "exposure-management",
  title: "Exposure Management",
  layout: "default",
  seo: {
    title: "Exposure Management | Cordinit",
    description: "Prioritise the exposures that matter most.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "exposure-management-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "Exposure Management", isCurrent: true },
      ],
    },
    {
      _type: "contentMedia",
      _key: "exposure-management-hero",
      eyebrow: "EXPOSURE MANAGEMENT",
      title: "Prioritise the\u00A0exposures\nthat matter most.",
      description: "Gain a clearer view of your attack surface, understand which exposures create the greatest risk and focus remediation efforts where they can have the most impact.",
      cta: {
        label: "Discuss your exposure priorities",
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
      _key: "exposure-management-overview",
      data: {
        header: {
          eyebrow: "EXPOSURE MANAGEMENT OVERVIEW",
          title: "See the exposure. Understand the risk. Take action.",
          description: "Modern technology environments create a constantly changing attack surface. New assets, applications, identities and vulnerabilities can introduce exposure faster than teams can manually track. Cordinit helps bring asset visibility, vulnerability information and business context together so security teams can focus on the exposures that matter most."
        },
        cardSection: {
          sectionTitle: "APPLICATION IDENTITY SECURITY",
          sectionTag: "SECURE APPS FASTER",
          footerText: "FROM EXTERNAL ATTACK SURFACE TO CORE INFRASTRUCTURE, PRIORITISE WHAT MATTERS",
          footerHighlight: "Continuous Risk Engine Active",
          cards: [
            {
              stepNumber: "01",
              title: "Discover",
              description: "Identify assets, systems and attack-surface exposure across your hybrid technology estate."
            },
            {
              stepNumber: "02",
              title: "Understand",
              description: "Add context around vulnerabilities, criticality, asset owners, and direct business impact."
            },
            {
              stepNumber: "03",
              title: "Prioritise",
              description: "Focus attention on the exposures that represent the greatest immediate weaponisation risk."
            },
            {
              stepNumber: "04",
              title: "Remediate",
              description: "Coordinate remediation through clear, validated, actionable workflows directly into engineering backlogs."
            },
            {
              stepNumber: "05",
              title: "Report & Improve",
              description: "Track progress, communicate risk to leadership and continuously improve security defensibility."
            }
          ]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "attack-surface-visibility",
      data: {
        leftSection: {
          eyebrow: "ATTACK-SURFACE VISIBILITY",
          title: "Know what is exposed.",
          description: "You cannot protect what you cannot see. We help organisations build a clearer picture of their external and internal attack surface across applications, infrastructure, cloud environments, devices and other technology assets.",
          features: [
            { text: "Real-time discovery across multi-cloud, on-prem, and shadow IT assets" },
            { text: "Continuous mapping of external-facing ports, APIs, and domain estates" },
            { text: "Unified asset inventory contextualised by data sensitivity and business role" }
          ]
        },
        rightSection: {
          eyebrow: "YOUR ATTACK SURFACE",
          statusText: "STATUS: MONITORED",
          cards: [
            {
              icon: "Cloud",
              title: "CLOUD",
              description: "Cloud workloads, VPCs, and storage services"
            },
            {
              icon: "LayoutGrid",
              title: "APPLICATIONS",
              description: "Web & core microservices APIs exposed"
            },
            {
              icon: "Server",
              title: "INFRASTRUCTURE",
              description: "Internal servers, firewalls, and network fabrics"
            },
            {
              icon: "Monitor",
              title: "ENDPOINTS",
              description: "Corporate laptops, mobile, and managed systems"
            },
            {
              icon: "Globe",
              title: "EXTERNAL ASSETS",
              description: "Internet-facing perimeter nodes, DNS records, and external SaaS integrations"
            }
          ]
        }
      }
    },
    {
      _type: "dataDiscovery",
      _key: "risk-context",
      variant: "alternate",
      data: {
        leftSection: {
          eyebrow: "RISK CONTEXT",
          title: "Not every exposure deserves\nthe same response.",
          description: "Security teams often face more vulnerabilities and exposures than they can address at once. We help add business and technical context so teams can distinguish urgent risks from lower-priority findings.",
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
          eyebrow: "RISK PRIORITISATION MATRIX",
          statusText: "2D THREAT PLOTTING",
          cards: [
            { stepNumber: "01", title: "Asset criticality", description: "Understanding which systems support essential business operations and customer data." },
            { stepNumber: "02", title: "Exploitability", description: "Tracking active weaponisation, public exploit code, and ransomware linkage." },
            { stepNumber: "03", title: "Exposure", description: "Determining direct network reachability, perimeter positioning, and access restrictions." },
            { stepNumber: "04", title: "Business impact", description: "Quantifying potential revenue downtime, regulatory fines, and reputational fallout." },
            { stepNumber: "05", title: "Threat context", description: "Correlating real-time adversary targeting data and targeted campaign telemetry." }
          ]
        }
      }
    },
    {
      _type: "secureDataOperations",
      _key: "prioritisation-journey",
      data: {
        headerLayout: "stacked",
        cardStyle: "pale-blue",
        header: {
          eyebrow: "PRIORITISATION",
          title: "Turn a long list of findings\ninto a clear action plan.",
          description: "Bring exposure information together and focus remediation on the vulnerabilities, assets and attack paths that represent the greatest potential impact."
        },
        cards: [
          {
            numberStr: "01",
            phaseLabel: "PHASE I",
            title: "IDENTIFY",
            description: "Bring exposures and affected assets into one clearer view.",
            footerText: "Ingest telemetry across scanners, cloud configs, and code."
          },
          {
            numberStr: "02",
            phaseLabel: "PHASE II",
            title: "CONTEXTUALISE",
            description: "Understand technical severity alongside business importance.",
            footerText: "Overlay asset tags, data classifications, and blast radius."
          },
          {
            numberStr: "03",
            phaseLabel: "PHASE III",
            title: "PRIORITISE",
            description: "Rank exposures based on risk, exploitability and potential impact.",
            footerText: "Filter out noise; highlight true breach paths."
          },
          {
            numberStr: "04",
            phaseLabel: "PHASE IV",
            title: "ACT",
            description: "Direct teams towards the remediation work that matters most.",
            footerText: "Dispatch validated tickets with actionable fix guidance."
          }
        ]
      }
    },
    {
      _type: "dataSecurityOverview",
      _key: "remediation",
      data: {
        header: {
          eyebrow: "REMEDIATION",
          title: "Move from exposure\nto action.",
          description: "Effective exposure management is not just about finding problems. It is about making remediation easier to prioritise, assign, track and validate."
        },
        cardSection: {
          cards: [
            { stepNumber: "01", title: "DISCOVER", description: "Identify the exposure and affected asset across systems." },
            { stepNumber: "02", title: "PRIORITISE", description: "Determine urgency and business impact automatically." },
            { stepNumber: "03", title: "ASSIGN", description: "Route the issue directly to the asset owner or DevOps team." },
            { stepNumber: "04", title: "REMEDIATE", description: "Address the underlying vulnerability or configuration weakness." },
            { stepNumber: "05", title: "VALIDATE", description: "Confirm that exposure has been reduced via targeted rescan." }
          ]
        }
      }
    },
    {
      _type: "authenticationGovernance",
      _key: "reporting-visibility",
      data: {
        header: {
          eyebrow: "REPORTING & VISIBILITY",
          title: "Make exposure visible to the\npeople who need to act.",
          description: "Clear reporting helps security teams track remediation and gives leadership a more useful view of cyber risk. We help establish reporting that connects technical findings with business priorities."
        },
        cards: [
          {
            numberStr: "01",
            title: "Security posture",
            description: "Unified executive dashboards showing defensibility and asset hygiene over time.",
            iconName: "LayoutGrid",
            pills: ["Threat Assessment", "Impact Tiering", "Risk Scoring"]
          },
          {
            numberStr: "02",
            title: "Security posture",
            description: "Team-level velocity metrics and SLA compliance tracking across engineering teams.",
            iconName: "Activity",
            pills: ["Vector Store DLP", "PII Masking", "Synthetic Data"]
          },
          {
            numberStr: "03",
            title: "Risk trends",
            description: "Historical exposure trajectories across subsidiaries and enterprise business units.",
            iconName: "ShieldCheck",
            pills: ["Red Teaming", "KMS Integration", "Hardware HSM"]
          },
          {
            numberStr: "04",
            title: "Priority exposures",
            description: "Real-time board-level summaries of high-impact attack paths needing intervention.",
            iconName: "Scale",
            pills: ["Lineage Mapping", "Compliance Audits", "Risk Scorecards"]
          }
        ]
      }
    },
    {
      _type: "dataDiscovery",
      _key: "data-access",
      variant: "alternate",
      data: {
        leftSection: {
          eyebrow: "DATA ACCESS",
          title: "Control who can access\nsensitive information.",
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
      _type: "secureDataOperations",
      _key: "our-approach",
      data: {
        header: {
          eyebrow: "OUR APPROACH",
          title: "From attack-surface visibility\nto continuous improvement.",
          description: "We help create a practical exposure-management approach that evolves with your technology environment and security priorities."
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
            title: "PRIORITISE",
            description: "Apply risk and business context to identify what matters most and filter out low-value alerts.",
            footerText: "Contextual Risk Scoring Engine"
          },
          {
            numberStr: "03",
            phaseLabel: "PHASE 3",
            title: "REMEDIATE",
            description: "Coordinate focused remediation across the teams responsible for affected crown-jewel assets.",
            footerText: "Orchestrated Remediation Playbooks"
          },
          {
            numberStr: "04",
            phaseLabel: "PHASE 4",
            title: "MEASURE & IMPROVE",
            description: "Track progress, report changes and continuously improve your long-term exposure defensibility.",
            footerText: "Continuous Telemetry & Posture Audits"
          }
        ]
      }
    }
  ],
};
