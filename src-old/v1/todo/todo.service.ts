import { addTodoByTodolistId, updateTodoById, deleteTodoById, getTodoById } from './todo.repository'
import { getTodolistById } from "../todolist/todolist.repository";
import { UserInformation } from "../user/dto/user.request";

const addTodo = async (todolistId: string | number, message: string, userInformation: UserInformation): Promise<void> => {
    const todolist = await getTodolistById(todolistId, userInformation.id);

    if (!todolist) throw new Error('todolist does not exist');

    await addTodoByTodolistId(message, todolist.id);
}

const updateTodo = async (listId: string | number, todoId: string | number, status: boolean, message: string, userInformation: UserInformation): Promise<void> => {
    const todolist = await getTodolistById(listId, userInformation.id);
    if (!todolist) throw new Error('todolist does not exist');

    const todo = await getTodoById(todoId, userInformation.id);
    if (!todo) throw new Error('todo does not exist');

    await updateTodoById(todoId, status, message);
}

const deleteTodo = async (listId: string | number, todoId: string | number, userInformation: UserInformation): Promise<void> => {
    const todolist = await getTodolistById(listId, userInformation.id);
    if (!todolist) throw new Error('todolist does not exist');

    const todo = await getTodoById(todoId, userInformation.id);
    if (!todo) throw new Error('todo does not exist');

    await deleteTodoById(todoId, userInformation.id);
}

export { addTodo, updateTodo, deleteTodo }
