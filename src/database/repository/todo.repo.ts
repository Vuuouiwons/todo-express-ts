import { Repository } from "typeorm";

import { AppDataSource } from "../index";
import { Todolist } from "../models/todolist.model";
import { Todo } from '../models/todo.model';

import { DatabaseError } from "../../errors/500";

export interface TodoRepoInterface {
    getAllTodoByTodolistId(userId: number, todolistId: number, limit: number, offset: number): Promise<Todo[] | null>;
    getTodoByTodoId(userId: number, todolistId: number, id: number): Promise<Todo | null>;
    insertTodoByTodolistId(userId: number, todolistId: number, message: string): Promise<null>;
    updateTodoById(userId: number, todolistId: number, id: number, message: string | undefined, status: boolean | undefined): Promise<null>;
    deleteTodoById(userId: number, todolistId: number, id: number): Promise<null>;
}

export class TodoRepo implements TodoRepoInterface {
    private todoRepository: Repository<Todo>;

    constructor(todoRepositoryInject: Repository<Todo> | null = null) {
        this.todoRepository = todoRepositoryInject ? todoRepositoryInject : AppDataSource.getRepository(Todo);
    }
    public async getAllTodoByTodolistId(userId: number, todolistId: number, limit: number, offset: number): Promise<Todo[] | null> {
        try {
            const todo = await this.todoRepository.find({
                where: {
                    todolist: {
                        id: todolistId,
                        user: {
                            id: userId
                        }
                    }
                },
                skip: offset,
                take: limit,
            });

            return todo;
        } catch (e: any) {
            throw new DatabaseError(e.message);
        }
    }

    public async getTodoByTodoId(userId: number, todolistId: number, id: number): Promise<Todo | null> {
        try {
            const todo = await this.todoRepository.findOne({
                where: {
                    id,
                    todolist: {
                        id: todolistId,
                        user: {
                            id: userId,
                        }
                    }
                }
            });

            return todo;
        } catch (e: any) {
            throw new DatabaseError(e.message);
        }
    }

    public async insertTodoByTodolistId(userId: number, todolistId: number, message: string): Promise<null> {
        try {
            const todo = new Todo();
            todo.message = message;
            todo.todolist = {
                id: todolistId,
                user: {
                    id: userId
                }
            } as Todolist;

            await this.todoRepository.save(todo);

            return null;
        } catch (e: any) {
            throw new DatabaseError(e.message);
        }
    }

    public async updateTodoById(userId: number, todolistId: number, id: number, message: string | undefined, status: boolean | undefined): Promise<null> {
        try {
            const todo = await this.getTodoByTodoId(userId, todolistId, id);

            if (!todo) {
                throw new Error('todo does\'t exist');
            }

            if (message !== undefined && message !== null) {
                todo.message = message;
            }

            if (status !== undefined && status !== null) {
                todo.status = status;
            }

            await this.todoRepository.save(todo);

            return null;
        } catch (e: any) {
            throw new DatabaseError(e);
        }
    }

    public async deleteTodoById(userId: number, todolistId: number, id: number): Promise<null> {
        try {
            const todo = await this.getTodoByTodoId(userId, todolistId, id);

            if (!todo) {
                throw new Error('todo does\'t exist');
            }

            await this.todoRepository.remove(todo);

            return null;
        } catch (e: any) {
            throw new DatabaseError(e);
        }
    }
}
