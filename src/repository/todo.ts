
import { AppDataSource } from "../database";
import { Todolist } from "../database/entities/todolist";
import { Todo } from "../database/entities/todo";
import { InsertResult, UpdateResult, DeleteResult } from "typeorm";
import { promises } from "dns";

const todoRepository = AppDataSource.getRepository(Todo);

const getTodoById = async (todoId: number): Promise<Todo> => {
    const todoGetStatus = todoRepository
        .createQueryBuilder('todo')
        .select('todo.id', 'id')
        .addSelect('todo.message', 'message')
        .addSelect('todo.status', 'status')
        .addSelect('todo.todolistId', 'todolist')
        .where('todo.id = :id', { id: todoId })
        .getRawOne()

    return todoGetStatus
}

const addTodoByTodolistId = async (message: string, todolist: Todolist): Promise<InsertResult> => {
    const todoInsertStatus = todoRepository
        .createQueryBuilder('todo')
        .insert()
        .into(Todo)
        .values({
            todolist: todolist,
            message,
        })
        .execute()

    return todoInsertStatus;
}

const updateTodoById = async (todoId: number, status: boolean, message: string): Promise<UpdateResult> => {
    const todoUpdateStatus = todoRepository
        .createQueryBuilder('todo')
        .update()
        .set({ status, message })
        .where('todo.id = :id', { id: todoId })
        .execute()
    return todoUpdateStatus;
}

const deleteTodoById = async (todoId: number): Promise<DeleteResult> => {
    const todoDeleteStatus = todoRepository
        .createQueryBuilder('todo')
        .delete()
        .from(Todo)
        .where('todo.id = :id', { id: todoId })
        .execute()
    return todoDeleteStatus;
}

export { addTodoByTodolistId, updateTodoById, deleteTodoById, getTodoById }