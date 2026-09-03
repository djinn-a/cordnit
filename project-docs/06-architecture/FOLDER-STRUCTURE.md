# FOLDER STRUCTURE

## Purpose
Describe the purpose of this document.

## Scope
Defines the boundaries and applicability of this document.

## Current Status
Draft / In Progress / Approved

## Rules / Requirements
List all core rules and requirements here.

## Implementation Details
Provide technical or process implementation details.

## Dependencies
List related documents, systems, or processes.

## Decisions
Record any key decisions made within the scope of this document.

## Risks
Document any identified risks.

## Open Questions
List any unresolved queries or topics.

## Last Updated
2026-09-01



## Legacy Content (Merged from folder-structure.md)

# FOLDER-STRUCTURE.md — Repository Layout

The repository structure explicitly enforces the separation between the Next.js routing layer, the reusable UI components, and the backend API/database logic.

```text
/cordinit-website
├── app/                        # Next.js App Router
│   ├── (marketing)/            # Route group for public pages
│   │   ├── page.tsx            # Home
│   │   ├── solutions/
│   │   ├── industries/
│   │   ├── accelerators/
│   │   ├── insights/
│   │   ├── about/
│   │   ├── contact/
│   │   └── legal/
│   ├── api/                    # Route Handlers (API boundary)
│   │   ├── graphql/            # Main GraphQL endpoint
│   │   ├── revalidate/         # CMS webhook for ISR
│   │   └── webhooks/           # Third-party integrations
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── error.tsx
├── components/                 # React Components
│   ├── ui/                     # Design-system primitives (Tokens only)
│   ├── layout/                 # Header, Footer, MegaMenu
│   ├── sections/               # Reusable page sections (Hero, ValueProps)
│   └── features/               # Complex compositions (Filtered Lists)
├── lib/                        # Core Business & Data Logic
│   ├── graphql/                # GraphQL schema, resolvers, typed clients
│   ├── cms/                    # CMS fetching logic (called by GraphQL/API)
│   ├── supabase/               # Supabase server clients (called by GraphQL/API)
│   ├── analytics/              # GA4 helpers and consent logic
│   └── utils/                  # Pure utility functions
├── types/                      # Shared TypeScript definitions
├── styles/                     # Global CSS and Tailwind directives
├── public/                     # Static assets (fonts, icons)
├── tests/                      # Unit and integration tests
├── specs/                      # Master Documentation Tree (this folder)
├── .agents/                    # Antigravity operational rules and skills
├── Dockerfile                  # Containerization definition
├── docker-compose.yml          # Local environment dependencies
├── tailwind.config.ts          # Design token mapping
├── next.config.js              
├── package.json
└── tsconfig.json
```

**Rule for Agents:** When creating new files, strictly adhere to this structure. Do not mix data fetching logic inside `components/ui/`. Keep `app/` strictly for routing and server component orchestration.

