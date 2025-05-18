import { Request, Response } from "express";
import { parseResponse } from "../../common/dto/response";
import { updateTodolistSchema, createTodolistSchema } from "./dto/todolist.request";
import { getAllTodolist, getTodolist, updateTodolist, addTodolist, deleteTodolist } from "./todolist.service";

const handleGetAllTodolist = async (req: Request, res: Response) => {
    const username = res.locals.userInformation.username;

    const todolists = await getAllTodolist(username, res.locals.userInformation);

    if (!todolists) {
        res
            .status(200)
            .send(parseResponse(0, "TL", 200, "you don't have todolists", {}));
        return;
    }

    res
        .status(200)
        .send(parseResponse(0, "TL", 200, "success", todolists));
};

const handleCreateTodolist = async (req: Request, res: Response) => {
    const result = createTodolistSchema.safeParse(req.body);

    if (!result.success) {
        res
            .status(422)
            .send(parseResponse(0, "TL", 422, 'invalid body', result.error.format()));
        return;
    }

    const data = req.body;
    const username = res.locals.userInformation.username;

    const addTodolistStatus = await addTodolist(username, data);

    if (!addTodolistStatus) {
        res
            .status(500)
            .send(parseResponse(0, 'TL', 500, 'Something went wrong while adding todolist', null));
        return;
    }

    res
        .status(201)
        .send(parseResponse(0, "TL", 201, 'added todolist', null));
};

const handleUpdateTodolist = async (req: Request, res: Response) => {
    const result = updateTodolistSchema.safeParse(req.body);

    if (!result.success) {
        res
            .status(422)
            .send(parseResponse(0, "TL", 422, 'invalid body', result.error.format()));
        return
    }

    const todolistId = Number(req.params.listId);
    const todolistUpdateStatus = await updateTodolist(todolistId, req.body, res.locals.userInformation);

    if (todolistUpdateStatus === 'todolist does not exsist') {
        res
            .status(400)
            .send(parseResponse(0, 'TL', 400, 'todo does not exsist', null));
        return;
    }

    if (todolistUpdateStatus === 'unauthorized') {
        res
            .status(401)
            .send(parseResponse(0, 'TL', 401, 'unauthorized', null));
        return;
    }

    if (todolistUpdateStatus === 'update failed') {
        res
            .status(500)
            .send(parseResponse(0, 'TL', 500, 'todolist update failed', null))
        return;
    }

    res
        .status(201)
        .send(parseResponse(0, 'TL', 201, 'todolist status updated', null));
};

const handleDeleteTodolist = async (req: Request, res: Response) => {
    const todolistId = Number(req.params.listId);
    const todolistDeleteStatus = await deleteTodolist(todolistId, res.locals.userInformation);

    if (todolistDeleteStatus === 'todolist deleted') {
        res
            .status(400)
            .send(parseResponse(0, 'TL', 400, 'delete failed', null));
        return;
    }

    if (todolistDeleteStatus == 'unauthorized') {
        res.status(401).send(parseResponse(0, 'TL', 401, 'unauthorized', null))
    }

    if (todolistDeleteStatus == 'deleting failed') {
        res.status(500).send(parseResponse(0, 'TL', 500, 'delete failed', null))
    }

    res.status(204).send()

};

const handleGetTodolist = async (req: Request, res: Response) => {
    const todolistId = Number(req.params.listId);
    const todolist = await getTodolist(todolistId, res.locals.userInformation);

    if (typeof (todolist) == typeof ('string') && todolist === 'todolist does not exsist') {
        res
            .status(400)
            .send(parseResponse(0, 'TL', 400, 'todolist does not exsist', null));
    }

    if (typeof (todolist) == typeof ('string') && todolist === 'unauthorized') {
        res
            .status(401)
            .send(parseResponse(0, 'TL', 401, 'unauthorized', null));
    }

    res
        .status(200)
        .send(parseResponse(0, 'TL', 200, 'success', todolist));
};

export { handleGetAllTodolist, handleCreateTodolist, handleGetTodolist, handleUpdateTodolist, handleDeleteTodolist }