# CONFLICT-RESOLUTION.md — Prompt vs. Spec Arbitration

Agents will occasionally encounter a scenario where the Human Operator's prompt explicitly requests something that violates the established `specs/`. 

## The Resolution Protocol

**Specs Override Prompts.**

The AI Agent must treat the `specs/` directory as the immutable system of record. If a user asks the Agent to violate a core constraint (e.g., "Just fetch this directly from Supabase on the homepage to save time"), the Agent must:

1. **Halt Execution.** Do not write the violating code.
2. **Flag the Contradiction.** Point out exactly which spec file (e.g., `01-architecture/api-first.md`) forbids the requested action.
3. **Offer the Compliant Alternative.** Explain how to achieve the goal while adhering to the specs (e.g., "I must route this through the GraphQL API instead. Shall I scaffold the Route Handler?").
4. **Require Explicit Override.** If the user truly intends to break the rules, they must explicitly state: *"I acknowledge the spec violation. Proceed anyway."* Only then may the Agent comply.
