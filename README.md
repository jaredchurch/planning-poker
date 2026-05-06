# base

This repository provides a standardized development environment (Dev Container) configured for AI-assisted development and specification-driven workflows.

## Features

### Development Tools
- **Node.js**: Standard Node.js environment.
- **Python**: Configured with modern tooling:
  - `uv`: Extremely fast Python package installer and resolver.
  - `ruff`: An extremely fast Python linter and code formatter.
  - `mypy`: Optional static typing for Python.
- **PowerShell**: Cross-platform shell support.
- **GitHub CLI (`gh`)**: Official command-line tool for GitHub.

### AI & Specification Tools
- **Google Gemini CLI (`@google/gemini-cli`)**: Interactive CLI agent for AI-assisted engineering.
- **OpenCode (`opencode-ai`)**: AI-powered coding assistance.
- **Spec Kit (`specify-cli`)**: Tooling for specification-driven development, installed during container initialization.

### Environment Configuration
- **Locale**: Configured for `en_NZ.UTF-8` with `Pacific/Auckland` timezone.
- **Base Image**: Debian Trixie (`mcr.microsoft.com/devcontainers/base:trixie`).

## Usage

### Quick Start
To initialize the AI integrations within the `./project` directory:

```bash
cd ./project
specify init . --integration gemini
specify init . --integration opencode
```

### Manual Installation (Local)
If you are not using the Dev Container, you can install the core tools manually:

```bash
# Gemini CLI
npm install -g @google/gemini-cli

# OpenCode
npm install -g opencode-ai

# Spec Kit
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```
