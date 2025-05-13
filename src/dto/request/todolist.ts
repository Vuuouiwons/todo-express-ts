import { z } from "zod";

const createTodolistSchema = z.object({
    title: z.string().max(24),
});

const updateTodolistSchema = z.object({
    title: z.string().max(24).optional(),
    status: z.boolean().optional()
})

export { updateTodolistSchema, createTodolistSchema }