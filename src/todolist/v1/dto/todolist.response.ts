interface TodolistI {
    id: number,
    title: string,
    status: boolean,
}

interface GetAllTodolistI {
    todolist: TodolistI[]
}

export { TodolistI, GetAllTodolistI }