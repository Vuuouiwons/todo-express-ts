import { Repository } from "typeorm";

import { AppDataSource } from "../index";
import { Todolist } from "../models/todolist.model";
import { Todo } from '../models/todo.model';
import { NotFoundError } from "../../errors/400";
import { DatabaseError } from "../../errors/500";

export interface TodoRepoInterface {
    getAllTodoByTodolistId(userId: number, todolistId: number, limit: number, offset: number): Promise<Todo[]>;
    getTodoByTodoId(userId: number, todolistId: number, id: number): Promise<Todo>;
    insertTodoByTodolistId(userId: number, todolistId: number, message: string): Promise<Todo>;
    updateTodoById(userId: number, todolistId: number, id: number, message: string | undefined, status: boolean | undefined): Promise<Todo>;
    deleteTodoById(userId: number, todolistId: number, id: number): Promise<null>;
}

export class TodoRepo implements TodoRepoInterface {
    private todoRepository: Repository<Todo>;

    constructor(todoRepositoryInject: Repository<Todo> | null = null) {
        this.todoRepository = todoRepositoryInject ? todoRepositoryInject : AppDataSource.getRepository(Todo);
    }
    public async getAllTodoByTodolistId(userId: number, todolistId: number, limit: number, offset: number): Promise<Todo[]> {
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

            if (!todo) {
                throw new NotFoundError('todo not found');
            }

            return todo;
        } catch (e: any) {
            throw new DatabaseError(e.message);
        }
    }

    public async getTodoByTodoId(userId: number, todolistId: number, id: number): Promise<Todo> {
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

            if (!todo) {
                throw new NotFoundError('todo not found');
            }

            return todo;
        } catch (e: any) {
            throw new DatabaseError(e.message);
        }
    }

    public async insertTodoByTodolistId(userId: number, todolistId: number, message: string): Promise<Todo> {
        try {
            const todo = new Todo();
            todo.message = message;
            todo.todolist = {
                id: todolistId,
                user: {
                    id: userId
                }
            } as Todolist;

            const newTodo = await this.todoRepository.save(todo);

            return newTodo;
        } catch (e: any) {
            throw new DatabaseError(e.message);
        }
    }

    public async updateTodoById(userId: number, todolistId: number, id: number, message: string | undefined, status: boolean | undefined): Promise<Todo> {
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

            const newTodo = await this.todoRepository.save(todo);

            return newTodo;
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
