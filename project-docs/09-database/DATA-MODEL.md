# DATA MODEL

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



## Legacy Content (Merged from data-model.md)

# DATA-MODEL.md — Relational Schemas (Supabase / PostgreSQL)

This document dictates the exact SQL schemas required for the transactional database. Do not deviate from these constraints.

## 1. Leads Table (`leads`)
Captures all contact form submissions. Designed to be synced directly to the future CRM.

```sql
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    email_normalized VARCHAR(255) NOT NULL, -- Lowercase, stripped of aliases for deduplication
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(50), -- Optional to maximize conversion
    company_name VARCHAR(150),
    job_title VARCHAR(100),
    area_of_interest VARCHAR(100), -- Must match CMS taxonomy ID
    message TEXT,
    
    -- CRM & Metadata
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, disqualified, converted
    source VARCHAR(255), -- UTM Source or 'organic'
    page_path VARCHAR(255), -- The URL where the form was submitted
    inquiry_count INTEGER DEFAULT 1, -- Increments on duplicate submissions
    
    -- Auditing & Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast CRM querying and deduplication
CREATE UNIQUE INDEX idx_leads_email_norm ON public.leads(email_normalized);
CREATE INDEX idx_leads_status ON public.leads(status);
```

## 2. Newsletter Table (`newsletter_subscribers`)
Handles email subscriptions.

```sql
CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, subscribed, unsubscribed, bounced
    opt_in_ip_hash VARCHAR(255), -- GDPR compliance
    opt_in_date TIMESTAMPTZ DEFAULT NOW(),
    unsub_date TIMESTAMPTZ
);
```

## 3. Audit Log (`form_submissions_audit`)
A write-only append log for security monitoring and rate-limiting analysis.

```sql
CREATE TABLE public.form_submissions_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint VARCHAR(100) NOT NULL, -- '/api/contact', '/api/newsletter'
    ip_address_hash VARCHAR(255) NOT NULL,
    user_agent TEXT,
    payload JSONB, -- Stripped of PII (e.g. only contains domains, not full emails)
    was_successful BOOLEAN,
    error_code VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

