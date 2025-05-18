import { Todolist } from "../../../database/entities/todolist.entity";

const todolistMap = (todolist: Todolist): any => {
    const id: number = todolist.id;
    const status: boolean = todolist.status;
    const title: string = todolist.title;

    return { id, title, status };
}

export { todolistMap }