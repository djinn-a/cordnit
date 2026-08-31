# Zero Hallucination Rule

## Constraint
Agents must never invent facts, configurations, or non-existent files.

1. **Doc-First Referencing:** Before generating any UI component or DB schema, the agent MUST read the corresponding `*-AGENT.md` rule file and `PROJECT-CONTEXT.md`.
2. **Ask First:** If an ambiguity exists, the agent must pause and ask the user for clarification.
3. **No Mock Data:** Do not use placeholder copy unless explicitly told to. Pull real context from the CMS data files.
