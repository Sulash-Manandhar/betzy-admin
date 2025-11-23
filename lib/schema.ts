import z from "zod/v3";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  CLERK_PUBLISHABLE_KEY: z.string(),
  BACKEND_API: z.string().url(),
  IMAGE_URL: z.string().url(),
});

export const createGameSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Game name should be atleast 3 character long." }),
  game_link: z.string().url(),
  image_id: z.number().optional(),
  description: z.string().optional(),
});
