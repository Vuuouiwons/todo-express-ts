import { TodolistRepo, TodolistRepoInterface } from '../../database/repository/todolist.repo'
import { TodolistData, filterTodolistData } from './todolist.validator';
export interface TodolistServiceInterface {
    getAllTodolist(userId: number, limit: number, offset: number): Promise<TodolistData[]>;
    getOneTodolist(userId: number, id: number): Promise<TodolistData>;
    createTodolist(userId: number, title: string): Promise<TodolistData>;
    updateTodolist(userId: number, id: number, title: string | undefined, status: boolean | undefined): Promise<TodolistData>;
    deleteTodolist(userId: number, id: number): Promise<null>;
}

export class TodolistService implements TodolistServiceInterface {
    private todolistRepo: TodolistRepoInterface;

    constructor(todolistRepo: TodolistRepoInterface | null = null) {
        this.todolistRepo = todolistRepo ? todolistRepo : new TodolistRepo()
    }

    public async getAllTodolist(userId: number, limit: number, offset: number): Promise<TodolistData[]> {
        try {
            const allTodolist = await this.todolistRepo.getTodolistByUserId(userId, limit, offset);

            const parsedTodolist = allTodolist.map(d => {
                return {
                    'id': d.id,
                    'title': d.title,
                    'status': d.status,
                    'updatedAt': d.updatedAt,
                };
            });

            return parsedTodolist;
        } catch (e) {
            throw e;
        }
    }

    public async getOneTodolist(userId: number, id: number): Promise<TodolistData> {
        try {
            const todolist = await this.todolistRepo.getTodolistById(userId, id);
            const parsedTodolist = {
                'id': todolist.id,
                'title': todolist.title,
                'status': todolist.status,
                'updatedAt': todolist.updatedAt,
            };

            return parsedTodolist;
        } catch (e) {
            throw e;
        }
    }

    public async createTodolist(userId: number, title: string): Promise<TodolistData> {
        try {
            const todolist = await this.todolistRepo.insertTodolistByUserId(userId, title);
            const parsedTodolist = filterTodolistData(todolist);

            return parsedTodolist;
        } catch (e) {
            throw e;
        }
    }

    public async updateTodolist(userId: number, id: number, title: string, status: boolean): Promise<TodolistData> {
        try {
            const todolist = await this.todolistRepo.updateTodolistById(userId, id, title, status);
            const parsedTodolist = filterTodolistData(todolist);

            return parsedTodolist;
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
