import { Request, Response } from "express";
import { createTodolistSchema, updateTodolistSchema } from './todolist.validator';
import { parseResponse } from "../../common/response";
import { TodolistService, TodolistServiceInterface } from './todolist.service'
import { NotFoundError } from "../../errors/400";

const todolistService: TodolistServiceInterface = new TodolistService()

const handleGetAllTodolist = async (req: Request, res: Response) => {
    const userId = res.locals.userId;

    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;

    try {
        const todolist = await todolistService.getAllTodolist(userId, limit, offset);

        return res.status(200).send(parseResponse('TL', 200, "success", todolist));
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).send(parseResponse('TL', 404));
        }

        return res.status(500).send();
    }
};

const handleGetTodolist = async (req: Request, res: Response) => {
    const userId: number = res.locals.userId;
    const todolistId: number = Number(req.params.todolistId);
    try {
        const todolist = await todolistService.getOneTodolist(userId, todolistId);

        return res.status(200).send(parseResponse('TL', 200, 'success', todolist));
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).send(parseResponse('TL', 404));
        }

        return res.status(500).send();
    }
}

const handleAddTodolist = async (req: Request, res: Response) => {
    const result = createTodolistSchema.safeParse(req.body);

    if (!result.success)
        return res
            .status(422)
            .send(parseResponse("TL", 422, 'invalid body', result.error.format()));

    const userId = res.locals.userId;

    const data = result.data;
    const title = data.title;
    try {
        await todolistService.createTodolist(userId, title)
        return res.status(201).send();
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).send(parseResponse('TL', 404));
        }
        return res.status(500).send();
    }

};
const handleUpdateTodolist = async (req: Request, res: Response) => {
    const result = updateTodolistSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse("TL", 422, 'invalid body', result.error.format()));
    }

    const userId = res.locals.userId;
    const todolistId = Number(req.params.todolistId);
    const title = result.data.title;
    const status = result.data.status;
    try {
        await todolistService.updateTodolist(userId, todolistId, title, status)

        return res.status(201).send(parseResponse('TL', 201));
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).send(parseResponse('TL', 404));
        }
        return res.status(500).send();
    }
};
const handleDeleteTodolist = async (req: Request, res: Response) => {
    const todolistId = Number(req.params.todolistId);
    const userId = res.locals.userId;
    try {
        await todolistService.deleteTodolist(userId, todolistId);

        return res.status(204).send(parseResponse('TL', 204));

    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).send(parseResponse('TL', 404));
        }
        return res.status(500).send();
    }
};

export { handleGetAllTodolist, handleGetTodolist, handleAddTodolist, handleUpdateTodolist, handleDeleteTodolist }