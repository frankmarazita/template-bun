# Template Bun

Keep this file up to date with the latest architecture and practices of the project.

## Usage

- `bun dev` runs the server with watch mode, `bun start` without
- `bun test`, `bun run typecheck`, `bun run format`
- `scripts/ci-check` runs everything CI checks, the GitHub workflow only calls it
- `bun run docker_build` and `bun run docker_run` build and run the image locally with `.env`
- `http/` is a Bruno collection for the API, `bru run --env local` from that folder

## Setup

- Rename `name` in `package.json` to the repo name, the local Docker scripts use it
- Copy `.env.example` to `.env`
- The Bun version is pinned once by `packageManager` in `package.json`, which CI reads through `setup-bun`'s `bun-version-file`. The Dockerfile's `FROM oven/bun:<version>` must match it, and the same version should be used locally

## Architecture

- `index.ts` is the entry point: it reads the environment, starts Sentry, starts the server and stops it on SIGINT/SIGTERM
- `src/server.ts` creates the `Bun.serve` server, routes live in its `routes` table
- `src/env.ts` validates the environment with zod
- Pushes to `main` build the image and push it to the GitHub Container Registry tagged `latest` and the short commit SHA, keeping only the latest and one previous tagged version

## Practices

- Use Bun APIs (`Bun.serve`, `Bun.file`, `bun:sqlite`, `bun:test`) over Node packages that do the same
- Environment variables are read only through `env()` in `src/env.ts`, where an empty value counts as unset. Add new variables to its schema and to `.env.example`
- Tests live next to the source as `*.test.ts` and start real servers on port `0`, never a fixed port
- Keep code self documenting, comment only what can't be
