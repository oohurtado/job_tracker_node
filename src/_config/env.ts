import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    
    JWT_SECRET: z.string().min(1),
    JWT_EXPIRES_IN: z.string().min(1),
    
    MAIL_HOST: z.string().min(1),
    MAIL_PORT: z.string().min(1),
    MAIL_USER: z.string().min(1),
    MAIL_PASSWORD: z.string().min(1),
    MAIL_FROM: z.string().min(1),
});

export const env = envSchema.parse(process.env);
