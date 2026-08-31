# TERMINOLOGY.md — Project Glossary

This document defines the canonical terminology used across the Cordinit website project to ensure clear communication between stakeholders, marketing, and engineering.

## Content & Architecture

- **Practice:** A top-level service offering category (e.g., Cybersecurity, Salesforce, AI & Automation). Practices can be "deep" (having sub-services) or "flat" (no sub-services).
- **Sub-service:** A specific, detailed offering that falls under a deep Practice (e.g., "Cloud Security" under the "Cybersecurity" practice).
- **Hub:** A top-level routing page that aggregates and lists child items (e.g., the Solutions Hub lists all Practices; the Insights Hub lists all articles).
- **Accelerator:** Packaged offerings, tools, rapid-deployment solutions, or frameworks developed by Cordinit to speed up client implementations.
- **Insight:** A piece of content representing a blog post, article, case study, or resource. 
- **Gated Content:** Premium content (like whitepapers or detailed reports) that requires a user to submit a lead-capture form (usually an email address) before downloading.

## Technical

- **API-First:** An architectural pattern where the frontend application communicates exclusively with an intermediary API layer, never directly accessing the underlying databases (CMS or Supabase).
- **Headless CMS:** A content management system (e.g., Sanity, Strapi) that provides backend content authoring capabilities but delivers content purely via API (REST or GraphQL) rather than rendering HTML pages.
- **Design Tokens:** Abstracted visual design values (colors, spacing, typography sizes) stored as variables (e.g., CSS custom properties) rather than hardcoded values in component files.
- **Core Web Vitals:** Google's standardized metrics for measuring user experience, specifically loading performance (LCP), visual stability (CLS), and interactivity (INP).
