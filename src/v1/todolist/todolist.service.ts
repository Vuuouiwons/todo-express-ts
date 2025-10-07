import { getTodolistByUserId, insertTodolistByUserId, updateTodolistById, deleteTodolistById } from '../../database/repository/todolist.repo'

export async function getAllTodolist(userId: number, limit: number, offset: number) {
    const allTodolist = await getTodolistByUserId(userId, limit, offset);
    return allTodolist;
}

export async function createTodolist(userId: number, title: string) {
    return await insertTodolistByUserId(userId, title);
}

export async function updateTodolist(userId: number, id: number, title: string, status: boolean) {
    return await updateTodolistById(userId, id, title, status);
}

export async function deleteTodolist(userId: number, id: number) {
    return await deleteTodolistById(userId, id);
}