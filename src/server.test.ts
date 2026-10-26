import { afterAll, expect, test } from "bun:test";
import { createServer } from "./server";

const server = createServer({ port: 0 });

afterAll(() => server.stop(true));

test("health returns ok", async () => {
  const response = await fetch(new URL("/health", server.url));

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ status: "ok" });
});

test("unknown routes return 404", async () => {
  const response = await fetch(new URL("/missing", server.url));

  expect(response.status).toBe(404);
});
