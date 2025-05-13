import { z } from "zod";

const getAllTodolistSchema = z.object({
    XUsername: z.string().max(24),
});

const createTodolistSchema = z.object({
    title: z.string().max(32),
});


export { getAllTodolistSchema, createTodolistSchema }