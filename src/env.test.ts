import { expect, test } from "bun:test";
import { env, Environment } from "./env";

test("applies defaults", () => {
  expect(env({})).toEqual({
    ENVIRONMENT: Environment.Development,
    PORT: 3000,
  });
});

test("treats empty values as unset", () => {
  expect(env({ ENVIRONMENT: "", PORT: "", SENTRY_DSN: "" })).toEqual({
    ENVIRONMENT: Environment.Development,
    PORT: 3000,
  });
});

test("parses values", () => {
  expect(
    env({ ENVIRONMENT: "production", PORT: "8080", SENTRY_DSN: "https://dsn" })
  ).toEqual({
    ENVIRONMENT: Environment.Production,
    PORT: 8080,
    SENTRY_DSN: "https://dsn",
  });
});

test("rejects invalid values", () => {
  expect(() => env({ ENVIRONMENT: "staging" })).toThrow(/ENVIRONMENT/);
  expect(() => env({ PORT: "not-a-port" })).toThrow(/PORT/);
});
