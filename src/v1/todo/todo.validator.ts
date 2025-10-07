import { z } from 'zod';

const addTodoSchema = z.object({
    message: z.string().max(225),
});

const updateTodoSchema = z.object({
    message: z.string().max(225).optional(),
    status: z.boolean().optional()
});

export { addTodoSchema, updateTodoSchema };