import { z } from "zod";

const registerSchema = z.object({
    username: z.string().max(24),
    password: z.string().min(8),
});

const loginSchema = z.object({
    username: z.string().max(24),
    password: z.string().min(8)
});

export { registerSchema, loginSchema }