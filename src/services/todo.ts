import { InsertResult } from "typeorm"
import { addTodoByTodolistId, updateTodoById, deleteTodoById, getTodoById } from '../repository/todo'
import { getTodolistById } from "../repository/todolist";
import { UserInformation } from "../dto/request/user";

const addTodo = async (todolistId: number, message: string, userInformation: UserInformation): Promise<string> => {
    const todolist = await getTodolistById(todolistId);

    if (!todolist) {
        return 'todolist does not exsist'
    }

    if (todolist.user !== userInformation.id) {
        return 'unauthorized';
    }

    const addTodoStatus = await addTodoByTodolistId(message, todolist);

    if (!addTodoStatus) {
        return 'add todo failed';
    }

    return 'todo added';
}

const updateTodo = async (listId: number, todoId: number, status: boolean, message: string, userInformation: UserInformation): Promise<string> => {
    const todolist = await getTodolistById(listId);

    if (!todolist) {
        return 'todolist does not exsist';
    }

    if (todolist.user !== userInformation.id) {
        return 'unauthorized';
    }

    const todo = await getTodoById(todoId);

    if (!todo) {
        return 'todo does not exsist';
    }

    if (todo.todolist !== listId) {
        return 'unauthorized';
    }

    const updateTodoStatus = await updateTodoById(todoId, status, message);

    if (!updateTodoStatus) {
        return 'update failed';
    }

    return 'todo updated';
}

const deleteTodo = async (listId: number, todoId: number, userInformation: UserInformation): Promise<string> => {
    const todolist = await getTodolistById(listId);

    if (!todolist) {
        return 'todolist does not exsist';
    }

    if (todolist.user !== userInformation.id) {
        return 'unauthorized';
    }

    const todo = await getTodoById(todoId);

    if (!todo) {
        return 'todo does not exsist';
    }

    if (todo.todolist !== listId) {
        return 'unauthorized';
    }

    const deleteTodoStatus = await deleteTodoById(todoId);

    if (!deleteTodoStatus) {
        return 'deletion failed';
    }

    return 'todo deleted';
}

export { addTodo, updateTodo, deleteTodo }
