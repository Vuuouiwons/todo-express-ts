import { Repository } from "typeorm";

import { AppDataSource } from "../index";
import { Todolist } from "../models/todolist.model";
import { User } from "../models/user.model";
import { DatabaseError } from "../../errors/500";
import { NotFound } from "../../errors/400";

export interface TodolistRepoInterface {
    getTodolistByUserId(userId: number, limit: number, offset: number): Promise<Todolist[]>;
    getTodolistById(userId: number, id: number): Promise<Todolist>;
    insertTodolistByUserId(userId: number, title: string): Promise<null>;
    updateTodolistById(userId: number, id: number, title?: string, status?: boolean): Promise<null>;
    deleteTodolistById(userId: number, id: number): Promise<null>;
}

export class TodolistRepo implements TodolistRepoInterface {
    private todolistRepository: Repository<Todolist>;

    constructor(todolistRepositoryInject: Repository<Todolist> | null = null) {
        this.todolistRepository = todolistRepositoryInject ? todolistRepositoryInject : AppDataSource.getRepository(Todolist);
    }

    public async getTodolistByUserId(userId: number, limit: number, offset: number): Promise<Todolist[]> {
        try {
            const todolist = await this.todolistRepository.find({
                where: {
                    user: {
                        id: userId
                    }
                },
                skip: offset,
                take: limit,
            });

            return todolist;
        } catch (e: any) {
            throw new DatabaseError(e.message);
        }
    }

    public async getTodolistById(userId: number, id: number): Promise<Todolist> {
        try {
            const todolist = await this.todolistRepository.findOne({
                where: {
                    user: {
                        id: userId
                    },
                    id
                },
            });

            if (!todolist) {
                throw new NotFound('todolist not found');
            }

            return todolist;
        } catch (e: any) {
            throw new DatabaseError(e);
        }
    }

    public async insertTodolistByUserId(userId: number, title: string): Promise<null> {
        const todolist = new Todolist()
        todolist.title = title;
        todolist.user = { id: userId } as User;

        try {
            await this.todolistRepository.save(todolist);

            return null;
        } catch (e: any) {
            throw new DatabaseError(e.message);
        }
    }

    public async updateTodolistById(userId: number, id: number, title?: string, status?: boolean): Promise<null> {
        try {
            const todolist = await this.getTodolistById(userId, id);

            if (!todolist) {
                throw new Error('todolist does\'t exist');
            }

            if (title !== undefined && title !== null) {
                todolist.title = title;
            }

            if (status !== undefined && status !== null) {
                todolist.status = status;
            }

            await this.todolistRepository.save(todolist);

            return null;
        } catch (e: any) {
            throw new DatabaseError(e.message)
        }
    }

    public async deleteTodolistById(userId: number, id: number): Promise<null> {
        try {
            const todolist = await this.getTodolistById(userId, id);

            if (!todolist) {
                throw new Error('todolist does\'t exist')
            }

            await this.todolistRepository.remove(todolist);

            return null;
        } catch (e: any) {
            throw new DatabaseError(e.message)
        }
    }
}
