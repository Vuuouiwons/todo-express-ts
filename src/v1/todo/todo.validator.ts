import { z } from 'zod';
import { Todo } from '../../database/models/todo.model';

const addTodoSchema = z.object({
    message: z.string().max(225),
});

const updateTodoSchema = z.object({
    message: z.string().max(225).optional(),
    status: z.boolean().optional()
});

interface TodoData {
    id: number;
    message: string;
    status: boolean;
    updatedAt: Date;
};

function filterTodoData(todo: Todo): TodoData {
    return {
        'id': todo.id,
        'message': todo.message,
        'status': todo.status,
        'updatedAt': todo.updatedAt,
    }
}

export { addTodoSchema, updateTodoSchema, TodoData, filterTodoData };