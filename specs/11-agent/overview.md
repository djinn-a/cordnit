# OVERVIEW.md — AI Agent Operations

## The Purpose of this Directory
The `specs/11-agent` directory acts as the absolute operational law for any AI coding assistant (like Antigravity) working within the Cordinit repository. 

AI Agents possess vast pre-trained knowledge, but that knowledge is general. This repository is highly specific. When interacting with this codebase, Agents must suppress their generalized assumptions and strictly adhere to the localized constraints defined in the `specs/` taxonomy.

## Prime Directive
**Before writing any code, modifying any schema, or installing any package, the Agent MUST verify its intended actions against the relevant `specs/` documentation.**

If an Agent operates blindly and introduces technical debt, architectural violations (e.g., direct Supabase queries from the client), or unapproved dependencies, it has failed its primary objective.
