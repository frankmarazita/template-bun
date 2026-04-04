# Template Bun

A template for creating a Bun TypeScript project in my personal style.

It has CI/CD with type checking, formatting, tests, and containerization for easy deployment.

### Setup

Rename the `name` property in `package.json` to match your project name. This is used by the local `docker_build` and `docker_run` scripts.

Copy `.env.example` to `.env` and fill in the required values.

### Local Development

- `bun dev` - Start the development server with watch mode
- `bun test` - Run tests
- `bun run format` - Format code with Prettier

### CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml` runs on pushes to `main`:

1. **Check** - Type checks (`tsc --noEmit`), format validation, and tests
2. **Build & Push** - Builds and pushes a Docker image to GitHub Container Registry, tagged with both `latest` and the short commit SHA

Only the latest and one previous tagged version are kept to avoid exceeding GitHub storage quotas.
