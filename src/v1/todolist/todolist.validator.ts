import { z } from "zod";
import { Todolist } from "../../database/models/todolist.model";

const createTodolistSchema = z.object({
    title: z.string().max(24),
});

const updateTodolistSchema = z.object({
    title: z.string().max(24).optional(),
    status: z.boolean().optional()
})

interface TodolistData {
    id: number;
    title: string;
    status: boolean;
    updatedAt: Date;
};


function filterTodolistData(todolist: Todolist): TodolistData {
    return {
        'id': todolist.id,
        'title': todolist.title,
        'status': todolist.status,
        'updatedAt': todolist.updatedAt,
    }
}

export { updateTodolistSchema, createTodolistSchema, TodolistData, filterTodolistData };