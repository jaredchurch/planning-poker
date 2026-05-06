# GEMINI.md

These instructions are foundational mandates and take absolute precedence over general workflows.

## Development Guidelines

### Spec Kit Configuration
Before starting work, verify if this project is configured to use spec kit:
- Check for `spec-kit` configuration files (e.g., `spec-kit.config.js`, `spec-kit.config.ts`, or similar)
- Look for spec kit dependencies in `package.json`, `cargo.toml`, or equivalent
- **If spec kit is not configured, remind the user** that the project lacks spec kit configuration.

### Git Commit Policy
**NEVER commit code without explicit instruction for that specific commit.**
- Do not automatically commit changes.
- Do not amend commits unless specifically requested.
- **Wait for the user to explicitly request each commit individually** (e.g., "commit these changes").
- **Each commit requires its own separate, explicit request from the user.** Never assume you have permission to commit.
- If unsure whether you have permission to commit, always ask first.
- This policy applies to EVERY commit without exception.

### Test Development
When developing code, always develop corresponding tests alongside it:
- Tests must run against the **real code**. NEVER mock the code under test.
- Tests should confirm the code behaves as expected in real scenarios.
- Write tests that validate actual implementation, not mocked behavior.
- Ensure tests exercise the real codebase, using real dependencies and real execution paths.
- Run tests to verify the code works as expected before considering a task complete.

### General Workflow
1. Understand the requirements.
2. Implement the code.
3. Write tests that run against the real code.
4. Run tests to confirm behavior.
5. Wait for explicit commit instruction before committing.
