import { AppDataSource } from "../index";
import { Todolist } from "../models/todolist.model";
import { User } from "../models/user.model";
import { DatabaseError } from "../../errors/500";

const todolistRepository = AppDataSource.getRepository(Todolist);

export async function getTodolistByUserId(userId: number, limit: number, offset: number) {
    try {
        const todolist = await todolistRepository.find({
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

export async function insertTodolistByUserId(userId: number, title: string): Promise<null> {
    const todolist = new Todolist()
    todolist.title = title;
    todolist.user = { id: userId } as User;

    try {
        const todolistStatus = await todolistRepository.save(todolist);

        return null;
    } catch (e: any) {
        throw new DatabaseError(e.message);
    }
}

export async function updateTodolistById(userId: number, id: number, title?: string, status?: boolean) {
    const todolist = await todolistRepository.findOneBy({
        id,
        user: {
            id: userId
        }
    });

    if (!todolist) {
        throw new Error('todolist does\'t exist');
    }

    if (title !== undefined && title !== null) {
        todolist.title = title;
    }

    if (status !== undefined && status !== null) {
        todolist.status = status;
    }

    return await todolistRepository.save(todolist);
}

export async function deleteTodolistById(userId: number, id: number) {
    const todolist = await todolistRepository.findOneBy({
        id,
        user: {
            id: userId
        }
    });

    if (!todolist) {
        throw new Error('todolist does\'t exist')
    }

    await todolistRepository.remove(todolist);
}