
import { AppDataSource } from "../../database";
import { Todolist } from "../../database/entities/todolist.entity";
import { Todo } from "../../database/entities/todo.entity";
import { InsertResult, UpdateResult, DeleteResult } from "typeorm";
import { UserInformation } from "../../user/v1/dto/user.request";

const todoRepository = AppDataSource.getRepository(Todo);

const getTodoById = async (todoId: string | number, userId: string | number): Promise<Todo> => {
    const todoGetStatus = todoRepository
        .createQueryBuilder('todo')
        .leftJoin('todo.todolist', 'todolist')
        .leftJoin('todolist.user', 'user')
        .select('todo.id', 'id')
        .addSelect('todo.message', 'message')
        .addSelect('todo.status', 'status')
        .addSelect('todo.todolistId', 'todolist')
        .where('todo.id = :id', { id: todoId })
        .andWhere('user.id = :userId', { userId })
        .getRawOne();

    return todoGetStatus
}

const addTodoByTodolistId = async (message: string, todolistId: number): Promise<InsertResult> => {
    const todoInsertStatus = todoRepository
        .createQueryBuilder('todo')
        .insert()
        .into(Todo)
        .values({
            todolist: todolistId,
            message,
        })
        .execute()

    return todoInsertStatus;
}

const updateTodoById = async (todoId: string | number, status: boolean, message: string): Promise<UpdateResult> => {
    const todoUpdateStatus = todoRepository
        .createQueryBuilder('todo')
        .update()
        .set({ status, message })
        .where('todo.id = :id', { id: todoId })
        .execute()
    return todoUpdateStatus;
}

const deleteTodoById = async (todoId: string | number, userId: string | number): Promise<DeleteResult> => {
    const todoDeleteStatus = todoRepository
        .createQueryBuilder('todo')
        .leftJoinAndSelect('todolist.id', 'todolist')
        .leftJoinAndSelect('todolist.user', 'user')
        .delete()
        .from(Todo)
        .where('todo.id = :id', { id: todoId })
        .andWhere('user.id = :userId', { userId })
        .execute()

    return todoDeleteStatus;
}

export { addTodoByTodolistId, updateTodoById, deleteTodoById, getTodoById }