# Project Setup Guide

## Project Overview

This is a Bun TypeScript project using `Bun.serve`, featuring CI/CD pipeline, containerization, and Sentry error tracking.

## Technology Stack

- **Runtime**: Bun
- **Server**: `Bun.serve` with TypeScript
- **Validation**: Zod for environment variables
- **Monitoring**: Sentry for error tracking
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## Development Commands

- `bun dev` - Start development server with watch mode
- `bun start` - Start production server
- `bun run test` - Run tests
- `bun run typecheck` - Type check
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting
- `scripts/ci-check` - Run the same checks as CI
- `bun docker_build` - Build Docker image
- `bun docker_run` - Run Docker container

## Project Structure (This may change)

- `index.ts` - Main application entry point
- `src/env.ts` - Environment configuration with Zod validation
- `src/server.ts` - `Bun.serve` server setup
- `scripts/ci-check` - Checks run by CI
- `http/` - Bruno collection for the API

## Environment Variables

- This can be set in a `.env` file or directly in the environment
- There is a .env.example file to guide you on required variables

## Important Setup Notes

- **MUST** rename the `name` property in `package.json` to match your project/repo name, the local Docker scripts use it
- The Bun version is pinned by `packageManager` in `package.json`, which CI reads. Keep the Dockerfile's `FROM oven/bun:<version>` on the same version
- The CI/CD pipeline builds and pushes containers to GitHub Container Registry
- Production deployment uses webhook triggers for automatic updates
- Only keeps the latest and one previous container build to save storage space

## Development Best Practices

- **Type Checking**: Uses TypeScript strict mode - run `bun run typecheck` to verify types
- **Formatting**: Uses Prettier for code formatting - run `bun run format:check` before committing
- **Testing**: Always run `bun run test` before committing changes
- **Code Quality**: Ensure type safety, run linting, and test coverage before pushing

## Type Checking & Formatting

- Uses TypeScript strict mode
- Uses Prettier for consistent code formatting
- Run `bun run typecheck` for type checking before committing
- Run `bun run format:check` for formatting validation before committing

## Testing

- Test framework: Bun's built-in test runner
- Run tests with `bun run test`
- Write tests for new features and bug fixes
- Ensure all tests pass before committing
