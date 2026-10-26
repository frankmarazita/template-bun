import * as Sentry from "@sentry/bun";
import { env } from "./src/env";
import { createServer } from "./src/server";

const ENV = env();

Sentry.init({
  environment: ENV.ENVIRONMENT,
  dsn: ENV.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

const server = createServer({ port: ENV.PORT });

console.log(`Server running on ${server.url}`);

async function shutdown() {
  console.log("Shutting down...");
  await server.stop();
  await Sentry.close(2000);
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
