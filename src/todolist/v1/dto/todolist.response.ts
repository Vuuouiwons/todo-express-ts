interface TodolistI {
    id: number,
    title: string,
    status: boolean,
}

interface GetAllTodolistI {
    todolist: TodolistI[]
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


export { TodolistI, GetAllTodolistI, TodoData, TodolistData }