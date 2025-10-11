import { Todolist } from '../../database/models/todolist.model';
import { TodolistRepo, TodolistRepoInterface } from '../../database/repository/todolist.repo'

export interface TodolistServiceInterface {
    getAllTodolist(userId: number, limit: number, offset: number): Promise<TodolistData[] | null>;
    getOneTodolist(userId: number, id: number): Promise<TodolistData | null>;
    createTodolist(userId: number, title: string): Promise<null>;
    updateTodolist(userId: number, id: number, title: string | undefined, status: boolean | undefined): Promise<null>;
    deleteTodolist(userId: number, id: number): Promise<null>;
}

export interface TodolistData {
    id: number;
    title: string;
    status: boolean;
    updatedAt: Date;
}

export class TodolistService implements TodolistServiceInterface {
    private todolistRepo: TodolistRepoInterface;

    constructor(todolistRepo: TodolistRepoInterface | null = null) {
        this.todolistRepo = todolistRepo ? todolistRepo : new TodolistRepo()
    }

    public async getAllTodolist(userId: number, limit: number, offset: number): Promise<TodolistData[] | null> {
        try {
            const allTodolist = await this.todolistRepo.getTodolistByUserId(userId, limit, offset);

            const parsedData = allTodolist.map(d => {
                return {
                    'id': d.id,
                    'title': d.title,
                    'status': d.status,
                    'updatedAt': d.updatedAt,
                };
            });

            return parsedData;
        } catch (e) {
            throw e;
        }
    }

    public async getOneTodolist(userId: number, id: number): Promise<TodolistData | null> {
        try {
            const todolist = await this.todolistRepo.getTodolistById(userId, id);
            const parsedData = {
                'id': todolist.id,
                'title': todolist.title,
                'status': todolist.status,
                'updatedAt': todolist.updatedAt,
            };

            return parsedData;
        } catch (e) {
            throw e;
        }
    }

    public async createTodolist(userId: number, title: string): Promise<null> {
        try {
            await this.todolistRepo.insertTodolistByUserId(userId, title);

            return null;
        } catch (e) {
            throw e;
        }
    }

    public async updateTodolist(userId: number, id: number, title: string, status: boolean): Promise<null> {
        try {
            await this.todolistRepo.updateTodolistById(userId, id, title, status);

            return null;
        } catch (e) {
            throw e;
        }
    }

    public async deleteTodolist(userId: number, id: number): Promise<null> {
        try {
            await this.todolistRepo.deleteTodolistById(userId, id);

            return null;
        } catch (e) {
            throw e;
        }
    }
}
