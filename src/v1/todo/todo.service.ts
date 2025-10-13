import { Todo } from "../../database/models/todo.model";
import { TodoRepo, TodoRepoInterface } from "../../database/repository/todo.repo";
import { filterTodoData, TodoData } from "./todo.validator";

export interface TodoServiceInterface {
    getAllTodo(userId: number, todolistId: number, limit: number, offset: number): Promise<TodoData[]>;
    getOneTodo(userId: number, todolistId: number, id: number): Promise<TodoData>;
    createTodo(userId: number, todolistId: number, message: string): Promise<TodoData>;
    updateTodo(userId: number, todolistId: number, id: number, message: string | undefined, status: boolean | undefined): Promise<TodoData>;
    deleteTodo(userId: number, todolistId: number, id: number): Promise<null>;
}

export class TodoService implements TodoServiceInterface {
    private todoRepo: TodoRepoInterface;
    constructor(todoRepoInject: TodoRepoInterface | null = null) {
        this.todoRepo = todoRepoInject ? todoRepoInject : new TodoRepo();
    }

    public async getAllTodo(userId: number, todolistId: number, limit: number, offset: number): Promise<TodoData[]> {
        try {
            const todo = await this.todoRepo.getAllTodoByTodolistId(userId, todolistId, limit, offset);
            const parsedTodo: TodoData[] = todo.map(d => {
                return {
                    'id': d.id,
                    'message': d.message,
                    'status': d.status,
                    'updatedAt': d.updatedAt,
                }
            });

            return parsedTodo;
        } catch (e) {
            throw e;
        }
    }

    public async getOneTodo(userId: number, todolistId: number, id: number): Promise<TodoData> {
        try {
            const todo = await this.todoRepo.getTodoByTodoId(userId, todolistId, id);
            const parsedTodo = filterTodoData(todo);

            return parsedTodo;
        } catch (e) {
            throw e;
        }
    }

    public async createTodo(userId: number, todolistId: number, message: string): Promise<TodoData> {
        try {

            const newTodo = await this.todoRepo.insertTodoByTodolistId(userId, todolistId, message);
            const parsedTodo = filterTodoData(newTodo);

            return parsedTodo;
        } catch (e) {
            throw e;
        }
    }

    public async updateTodo(userId: number, todolistId: number, id: number, message: string | undefined, status: boolean | undefined): Promise<TodoData> {
        try {
            const todo = await this.todoRepo.updateTodoById(userId, todolistId, id, message, status);
            const parsedTodo = filterTodoData(todo);

            return parsedTodo;
        } catch (e) {
            throw e;
        }
    }

    public async deleteTodo(userId: number, todolistId: number, id: number): Promise<null> {
        try {
            await this.todoRepo.deleteTodoById(userId, todolistId, id);
            
            return null;
        } catch (e) {
            throw e;
        }
    }
}