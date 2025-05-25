import { InsertResult } from "typeorm";
import { UserInformation } from "../../user/v1/dto/user.request";
import { todolistMap } from "./mappings/todolist.map";
import { todoMap } from "../../todo/v1/mappings/todo.map";
import { addTodolistByUsername, getAllTodolistByUsername, getTodolistById, updateTodolistStatusById, deleteTodolistById, deleteTodoByTodolistId, getTodoByTodolistId } from "./todolist.repository";
import { Todolist } from "../../database/entities/todolist.entity";
import { TodolistData } from './dto/todolist.response';

const getAllTodolist = async (username: string, userInformation: UserInformation, limit: number, offset: number): Promise<Todolist[] | null> => {
    const todolists = await getAllTodolistByUsername(username, limit, offset);

    if (!todolists || todolists.length === 0) {
        return null
    }

    const mappedTodolists = todolists.map(todolistMap);

    if (!mappedTodolists) {
        return null
    }

    return mappedTodolists
}

const updateTodolist = async (id: string, data: any, userInformation: UserInformation): Promise<void> => {
    const todolist = await getTodolistById(id, userInformation.id);

    if (!todolist) throw new Error('todolist does not exist');

    const title = data.title;
    const status = data.status;

    if (!await updateTodolistStatusById(id, userInformation.id, title, status))
        throw new Error('update failed');

}

const addTodolist = async (username: string, data: any): Promise<InsertResult> => {
    const addTodolistStatus = await addTodolistByUsername(username, data);
    if (!addTodolistStatus) throw new Error('failed adding todolist');

    return addTodolistStatus;
}

const deleteTodolist = async (id: string, userInformation: UserInformation): Promise<string> => {
    const todolist = await getTodolistById(id, userInformation.id);

    if (!todolist) {
        return 'failed'
    }

    const deleteTodoStatus = await deleteTodoByTodolistId(id, userInformation.id);
    const deleteTodolistStatus = await deleteTodolistById(id, userInformation.id);

    if (!deleteTodolistStatus && !deleteTodoStatus) {
        return 'delete failed';
    }

    return 'success';
}

const getTodolist = async (id: string, userInformation: UserInformation, limit: number, offset: number): Promise<TodolistData> => {
    const todolist = await getTodolistById(id, userInformation.id);

    if (!todolist) {
        throw new Error('todolist does not exist');
    }

    const mappedTodolist = todolistMap(todolist);
    const todo = (await getTodoByTodolistId(id, userInformation.id, limit, offset)).map(todoMap);

    const data = {
        ...mappedTodolist,
        todo
    }

    return data;
}

export { getAllTodolist, getTodolist, addTodolist, updateTodolist, deleteTodolist }