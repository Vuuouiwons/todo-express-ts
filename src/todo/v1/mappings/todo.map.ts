import { Todo } from "../../../database/entities/todo.entity";

interface TodoData {
    id: number,
    message: string
}

const todoMap = (todo: Todo): any => {
    const id: number = todo.id;
    const message: string = todo.message;
    const status: boolean = todo.status;

    return {
        id,
        message,
        status
    }
}

export { todoMap }