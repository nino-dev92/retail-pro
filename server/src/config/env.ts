import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),

  MONGO_URI: z.string().min(1),

  JWT_SECRET: z.string().min(1),

  JWT_REFRESH_SECRET: z.string().min(1),

  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const env = envSchema.parse(process.env);

export default env;
