import { InsertResult } from "typeorm";
import { UserInformation } from "../../user/v1/dto/user.request";
import { todolistMap } from "./mappings/todolist.map";
import { todoMap } from "../../todo/v1/mappings/todo.map";
import { addTodolistByUsername, getAllTodolistByUsername, getTodolistById, updateTodolistStatusById, deleteTodolistById, deleteTodoByTodolistId, getTodoByTodolistId } from "./todolist.repository";

const getAllTodolist = async (username: string, userInformation: UserInformation): Promise<any[] | null> => {
    const todolists = await getAllTodolistByUsername(username);

    if (!todolists || todolists.length === 0) {
        return null
    }

    if (todolists[0].user !== userInformation.id) {
        return null
    }

    const mappedTodolists = todolists.map(todolistMap);

    if (!mappedTodolists) {
        return null
    }

    return mappedTodolists
}

const updateTodolist = async (id: number, data: any, userInformation: UserInformation): Promise<string> => {
    const todolist = await getTodolistById(id);

    if (!todolist) {
        return 'todolist does not exsist'
    }

    if (todolist.user !== userInformation.id) {
        return 'unauthorized';
    }

    const title = data.title;
    const status = data.status;

    if (!await updateTodolistStatusById(id, title, status)) {
        return 'update failed';
    }

    return 'success';
}

const addTodolist = async (username: string, data: any): Promise<InsertResult | null> => {
    const addTodolistStatus = await addTodolistByUsername(username, data);

    if (!addTodolistStatus) {
        return null
    }

    return addTodolistStatus;
}

const deleteTodolist = async (id: number, userInformation: UserInformation): Promise<string> => {
    const todolist = await getTodolistById(id);

    if (!todolist) {
        return 'todolist deleted'
    }

    if (todolist.user !== userInformation.id) {
        return 'unauthorized'
    }

    const deleteTodolistStatus = await deleteTodolistById(id);
    const deleteTodoStatus = await deleteTodoByTodolistId(id);

    if (!deleteTodolistStatus && !deleteTodoStatus) {
        return 'delete failed';
    }

    return 'success';
}

interface TodoData {
    id: number,
    message: string
}

interface TodolistData {
    id: number,
    title: string,
    status: boolean,
    todo: TodoData[]
}

const getTodolist = async (id: number, userInformation: UserInformation): Promise<TodolistData | string> => {
    const todolist = await getTodolistById(id);

    if (!todolist) {
        return 'todolist does not exsist'
    }

    if (todolist.user !== userInformation.id) {
        return 'unauthorized'
    }

    const mappedTodolist = todolistMap(todolist);
    const todo = (await getTodoByTodolistId(id)).map(todoMap);

    const data = {
        ...mappedTodolist,
        todo
    }

    return data;
}

export { getAllTodolist, getTodolist, addTodolist, updateTodolist, deleteTodolist }