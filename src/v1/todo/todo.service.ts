import { Todo } from "../../database/models/todo.model";
import { TodoRepo, TodoRepoInterface } from "../../database/repository/todo.repo";

export interface TodoServiceInterface {
    getAllTodo(userId: number, todolistId: number, limit: number, offset: number): Promise<Todo[] | null>;
    getOneTodo(userId: number, todolistId: number, id: number): Promise<Todo | null>;
    createTodo(userId: number, todolistId: number, message: string): Promise<null>;
    updateTodo(userId: number, todolistId: number, id: number, message: string | undefined, status: boolean | undefined): Promise<null>;
    deleteTodo(userId: number, todolistId: number, id: number): Promise<null>;
}

export class TodoService implements TodoServiceInterface {
    private todoRepo: TodoRepoInterface;
    constructor(todoRepoInject: TodoRepoInterface | null = null) {
        this.todoRepo = todoRepoInject ? todoRepoInject : new TodoRepo();
    }

    public async getAllTodo(userId: number, todolistId: number, limit: number, offset: number): Promise<Todo[] | null> {
        try {
            const todo = await this.todoRepo.getAllTodoByTodolistId(userId, todolistId, limit, offset);

            return todo;
        } catch (e) {
            return null;
        }
    }

    public async getOneTodo(userId: number, todolistId: number, id: number): Promise<Todo | null> {
        try {
            const todo = await this.todoRepo.getTodoByTodoId(userId, todolistId, id);

            return todo;
        } catch (e) {
            return null;
        }
    }

    public async createTodo(userId: number, todolistId: number, message: string): Promise<null> {
        try {
            const todo = await this.todoRepo.insertTodoByTodolistId(userId, todolistId, message);
            return null;
        } catch (e) {
            return null;
        }
    }

    public async updateTodo(userId: number, todolistId: number, id: number, message: string | undefined, status: boolean | undefined): Promise<null> {
        const todo = await this.todoRepo.updateTodoById(userId, todolistId, id, message, status);

        return null;
    }

    public async deleteTodo(userId: number, todolistId: number, id: number): Promise<null> {
        const todo = await this.todoRepo.deleteTodoById(userId, todolistId, id);

        return null;
    }
}