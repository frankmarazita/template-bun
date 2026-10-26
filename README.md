# Template Bun

A template for creating a Bun TypeScript project in my personal style.

It has CI/CD with type checking, formatting, tests, and containerization for easy deployment.

### Setup

Rename the `name` property in `package.json` to match your project name. This is used by the local `docker_build` and `docker_run` scripts.

Copy `.env.example` to `.env` and fill in the required values.

The Bun version is pinned by `packageManager` in `package.json`; keep the Dockerfile's base image on the same version.

### Local Development

- `bun dev` - Start the development server with watch mode
- `bun run test` - Run tests
- `bun run typecheck` - Type check
- `bun run format` - Format code with Prettier
- `scripts/ci-check` - Run the same checks as CI

### CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml` runs on pushes and pull requests to `main`:

1. **Check** - Type checks, format validation, and tests via `scripts/ci-check`
2. **Build & Push** - On pushes only, builds and pushes a Docker image to GitHub Container Registry, tagged with both `latest` and the short commit SHA

Only the latest and one previous tagged version are kept to avoid exceeding GitHub storage quotas.
