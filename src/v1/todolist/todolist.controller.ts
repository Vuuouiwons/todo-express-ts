import { Request, Response } from "express";
import { createTodolistSchema, updateTodolistSchema } from './todolist.validator';
import { TodolistService, TodolistServiceInterface } from './todolist.service'
import { NotFoundError } from "../../errors/400";
import { res200, res201, res204, res404, res422, res500 } from "../../common/response";

const todolistService: TodolistServiceInterface = new TodolistService()

const handleGetAllTodolist = async (req: Request, res: Response) => {
    const userId = res.locals.userId;

    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;

    try {
        const todolist = await todolistService.getAllTodolist(userId, limit, offset);

        return res200(res, 'TL', todolist);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res404(res, 'TL');
        }

        return res500(res, 'TL');
    }
};

const handleGetTodolist = async (req: Request, res: Response) => {
    const userId: number = res.locals.userId;
    const todolistId: number = Number(req.params.todolistId);
    try {
        const todolist = await todolistService.getOneTodolist(userId, todolistId);

        return res200(res, 'TL', todolist);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res404(res, 'TL');
        }

        return res500(res, 'TL');
    }
}

const handleAddTodolist = async (req: Request, res: Response) => {
    const result = createTodolistSchema.safeParse(req.body);

    if (!result.success) {
        return res422(res, 'TL', result.error.format());
    }

    const userId = res.locals.userId;

    const data = result.data;
    const title = data.title;
    try {
        await todolistService.createTodolist(userId, title);

        return res201(res, 'TL');
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res404(res, 'TL');
        }
        return res500(res, 'TL');
    }

};
const handleUpdateTodolist = async (req: Request, res: Response) => {
    const result = updateTodolistSchema.safeParse(req.body);

    if (!result.success) {
        return res422(res, 'TL', result.error.format());
    }

    const userId = res.locals.userId;
    const todolistId = Number(req.params.todolistId);
    const title = result.data.title;
    const status = result.data.status;
    try {
        await todolistService.updateTodolist(userId, todolistId, title, status)

        return res201(res, 'TL');
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res404(res, 'TL');
        }
        return res500(res, 'TL');
    }
};
const handleDeleteTodolist = async (req: Request, res: Response) => {
    const todolistId = Number(req.params.todolistId);
    const userId = res.locals.userId;
    try {
        await todolistService.deleteTodolist(userId, todolistId);

        return res204(res, 'TL')
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res404(res, 'TL');
        }
        return res500(res, 'TL');
    }
};

export { handleGetAllTodolist, handleGetTodolist, handleAddTodolist, handleUpdateTodolist, handleDeleteTodolist }