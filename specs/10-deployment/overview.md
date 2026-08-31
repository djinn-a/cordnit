# OVERVIEW.md — DevOps & Environments

**Responsibility:** Docker, CI/CD (merge - staging), environments.
**Source:** Project Brief Section 4 Infrastructure, Section 7 multi-env, Section 12

## 1. Environments & Deployment
- Multi-environment support: local, staging, production.
- CI/CD via GitHub Actions (merge to `main` - auto-deploy to staging).
- Docker and `docker-compose.yml` provide environment consistency for local development.

## 2. Secrets Management
- All secrets live in environment variables.
- `.env.example` documents every required variable without real values.
- No secrets in client code or repository.
