import { z } from "zod";
import { envSchema } from "./schema";
import { DEVELOPMENT, PRODUCTION } from "./constant/index";

function validateEnv() {
  try {
    const parsed = envSchema.parse({
      NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
      CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_URL,
      IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
    });

    return {
      ...parsed,
      isProd: parsed.NODE_ENV === PRODUCTION,
      isDev: parsed.NODE_ENV === DEVELOPMENT,
    } as const;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      throw new Error(
        `❌ Invalid environment variables:\n${errorMessages.join("\n")}`
      );
    }
    throw error;
  }
}

export const env = validateEnv();

type Env = ReturnType<typeof validateEnv>;

export const getEnv = (): Readonly<Env> => env;

if (process.env.EXPO_NODE_ENV !== PRODUCTION) {
  validateEnv();
}
