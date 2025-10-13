import { z } from "zod";

interface UserInformation {
    id: number,
    username: string
}

const registerSchema = z.object({
    username: z.string().max(24),
    password: z.string().min(8),
});

const loginSchema = z.object({
    username: z.string().max(24),
    password: z.string().min(8)
});

export { registerSchema, loginSchema, UserInformation }