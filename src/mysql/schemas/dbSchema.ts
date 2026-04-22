import { z } from "zod";

const envSchema = z.object({
  MYSQL_HOST: z.string(),
  MYSQL_USER: z.string(),
  MYSQL_PASSWORD: z.string(),
  MYSQL_DATABASE: z.string()
})

export const env = envSchema.parse(process.env);