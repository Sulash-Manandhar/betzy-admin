import z from "zod/v3";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  CLERK_PUBLISHABLE_KEY: z.string(),
  BACKEND_API: z.string().url(),
  IMAGE_URL: z.string().url(),
});
