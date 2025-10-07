import { Todolist } from '../../database/models/todolist.model';
import { TodolistRepo, TodolistRepoInterface } from '../../database/repository/todolist.repo'

export interface TodolistServiceInterface {
    getAllTodolist(userId: number, limit: number, offset: number): Promise<Todolist[] | null>;
    getOneTodolist(userId: number, id: number): Promise<Todolist | null>;
    createTodolist(userId: number, title: string): Promise<null>;
    updateTodolist(userId: number, id: number, title: string | undefined, status: boolean | undefined): Promise<null>;
    deleteTodolist(userId: number, id: number): Promise<null>;
}

export class TodolistService implements TodolistServiceInterface {
    private todolistRepo: TodolistRepoInterface;

    constructor(todolistRepo: TodolistRepoInterface | null = null) {
        this.todolistRepo = todolistRepo ? todolistRepo : new TodolistRepo()
    }

    public async getAllTodolist(userId: number, limit: number, offset: number): Promise<Todolist[] | null> {
        try {

            const allTodolist = await this.todolistRepo.getTodolistByUserId(userId, limit, offset);

            return allTodolist;
        } catch (e) {
            return null;
        }
    }

    public async getOneTodolist(userId: number, id: number): Promise<Todolist | null> {
        try {
            const todolist = await this.todolistRepo.getTodolistById(userId, id);

            return todolist;
        } catch (e) {
            return null
        }
    }

    public async createTodolist(userId: number, title: string): Promise<null> {
        await this.todolistRepo.insertTodolistByUserId(userId, title);

        return null;
    }

    public async updateTodolist(userId: number, id: number, title: string, status: boolean): Promise<null> {
        await this.todolistRepo.updateTodolistById(userId, id, title, status);

        return null;
    }

    public async deleteTodolist(userId: number, id: number): Promise<null> {
        try {
            await this.todolistRepo.deleteTodolistById(userId, id);

            return null;
        } catch (e) {
            return null;
        }
    }
}

