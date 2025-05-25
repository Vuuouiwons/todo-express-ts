
import { AppDataSource } from "../../database";
import { Todolist } from "../../database/entities/todolist.entity";
import { Todo } from "../../database/entities/todo.entity";

import { InsertResult, UpdateResult, DeleteResult } from "typeorm";
import { findUserByUsername } from "../../user/v1/user.repository";


const todoRepository = AppDataSource.getRepository(Todo);
const todolistRepository = AppDataSource.getRepository(Todolist);

const getAllTodolistByUsername = async (username: string, limit: number, offset: number): Promise<Todolist[] | null> => {
    console.log("LIMIT:", limit, "OFFSET:", offset);
    const todolist = await todolistRepository
        .createQueryBuilder("todolist")
        .leftJoinAndSelect("todolist.user", "user")
        .where("user.username = :username", { username: username })
        .orderBy("todolist.id", "DESC")
        .take(limit)
        .skip(offset)
        .getMany();

    if (!todolist) {
        return null;
    }

    return todolist;
};

const addTodolistByUsername = async (username: string, data: any): Promise<InsertResult | null> => {
    // select id from user where username = username
    const user = await findUserByUsername(username);

    if (!user) {
        return null
    }

    const todolist = await todolistRepository
        .createQueryBuilder('todolist')
        .insert()
        .into(Todolist)
        .values({
            "title": data.title,
            "user": user
        })
        .orIgnore()
        .execute()

    if (!todolist) {
        return null
    }

    return todolist;
}

const getTodolistById = async (id: string | number, userId: string | number): Promise<Todolist> => {
    const todolist = await todolistRepository
        .createQueryBuilder('todolist')
        .leftJoinAndSelect("todolist.user", "user")
        .select("todolist.id", "id")
        .addSelect("todolist.title", "title")
        .addSelect("todolist.status", "status")
        .addSelect('user.id', 'user')
        .where('todolist.id = :id', { id })
        .andWhere('todolist.userId = :userId', { userId })
        .getRawOne();

    return todolist;
}

const getTodoByTodolistId = async (id: string | number, userId: string | number, limit: number, offset: number): Promise<Todo[]> => {
    const todo = await todoRepository
        .createQueryBuilder('todo')
        .leftJoinAndSelect('todo.todolist', 'todolist')
        .leftJoinAndSelect('todolist.user', 'user')
        .where("todo.todolistId = :id", { id })
        .andWhere('user.id = :userId', { userId })
        .skip(offset)
        .take(limit)
        .getMany()

    return todo
}

const updateTodolistStatusById = async (id: string | number, userId: string | number, title: string, status: boolean): Promise<UpdateResult> => {
    const todolist = await todolistRepository
        .createQueryBuilder('todolist')
        .leftJoinAndSelect('todolist.user', 'user')
        .update(Todolist)
        .set({
            title: title,
            status: status
        })
        .where('todolist.id = :id', { id })
        .andWhere('user.id = :userId', { userId })
        .execute();

    return todolist;
}

const deleteTodolistById = async (id: string | number, userId: string | number): Promise<DeleteResult | null> => {
    const todolist = await todolistRepository
        .createQueryBuilder('todolist')
        .leftJoinAndSelect('todolist.user', 'user')
        .delete()
        .from(Todolist)
        .where('todolist.id = :id', { id })
        .andWhere('user.id = :userId', { userId })
        .execute();

    return todolist;
}

const deleteTodoByTodolistId = async (id: string | number, userId: string | number): Promise<DeleteResult | null> => {
    const todo = await todoRepository
        .createQueryBuilder('todo')
        .leftJoinAndSelect('todo.todolist', 'todolist')
        .leftJoinAndSelect('todolist.user', 'user')
        .delete()
        .from(Todo)
        .where('todolist.id = :id', { id })
        .andWhere('user.id = :userId', { userId })
        .execute()

    return todo
}

export { getAllTodolistByUsername, addTodolistByUsername, getTodolistById, updateTodolistStatusById, deleteTodolistById, deleteTodoByTodolistId, getTodoByTodolistId }

