import { z } from "zod";

export enum Environment {
  Development = "development",
  Production = "production",
}

const zEnv = z.object({
  ENVIRONMENT: z.nativeEnum(Environment).default(Environment.Development),
});

export const ENV = zEnv.parse(process.env);
