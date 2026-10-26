import { z } from "zod";

export enum Environment {
  Development = "development",
  Production = "production",
}

const EnvSchema = z.object({
  ENVIRONMENT: z.enum(Environment).default(Environment.Production),
  PORT: z.coerce.number().int().min(0).max(65535).default(3000),
  SENTRY_DSN: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

export function env(
  source: Record<string, string | undefined> = process.env
): Env {
  const set = Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== "")
  );

  const result = EnvSchema.safeParse(set);
  if (!result.success) {
    throw new Error(`Invalid environment:\n${z.prettifyError(result.error)}`);
  }

  return result.data;
}
