# RUNBOOK

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



## Legacy Content (Merged from runbook.md)

# RUNBOOK.md — Operations, Deployment & Incident Response

Operational runbook, local bootstrapping, Docker setup, CI/CD pipeline, and 301 redirect map for DNS cutover.

## 1. Local Bootstrapping

To set up the project locally:
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env.local` and populate required environment variables (Supabase URL, Anon Key, CMS Endpoint, etc.).
4. Run `npm run dev` to start the local Next.js server.
5. If using Docker for local dependencies, run `docker-compose up -d`.

## 2. CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment.
- **Push to branch**: Runs tests, linting, formatting, and a Lighthouse preview build.
- **Merge to `main`**: Automatically deploys to the Staging environment.
- **Production release**: Triggered manually from the Staging build after final QA.

## 3. Deployment Environments

| Environment | Purpose | Infrastructure |
|---|---|---|
| **Local** | Developer testing | localhost |
| **Staging** | QA, stakeholder review, CMS preview | Vercel / AWS Amplify |
| **Production** | Live site | Vercel / AWS Amplify |

## 4. Docker Setup

A `Dockerfile` and `docker-compose.yml` are provided.
- `docker-compose.yml`: For spinning up local versions of Postgres/Supabase if not using cloud Supabase.
- `Dockerfile`: Used for building the Next.js standalone container for production deployment if deploying to AWS/GCP (as opposed to Vercel).

## 5. DNS Cutover & 301 Redirect Map

Before going live, a full redirect map from the old website must be implemented.

- Old paths (e.g. `/services/security`) must 301 redirect to new paths (`/solutions/cybersecurity`).
- Next.js `next.config.js` `redirects()` function should be used.
- Final cutover requires updating A/CNAME records in the DNS provider.

## 6. Incident Response

- **Lead capture failing**: Check Supabase connection limits and Next.js Route Handler logs. Ensure hCaptcha keys are valid.
- **CMS content not updating**: Verify webhook for on-demand Incremental Static Regeneration (ISR) is firing correctly in Sanity. Trigger manual revalidation via `/api/revalidate` if necessary.
- **Site 500 error**: Roll back to the previous deployment immediately via the hosting provider dashboard. Check Vercel/AWS logs for server-side exceptions.

