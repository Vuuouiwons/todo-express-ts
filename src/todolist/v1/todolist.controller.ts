import { Request, Response } from "express";
import { parseError, parseResponse } from "../../common/dto/response";
import { updateTodolistSchema, createTodolistSchema } from "./dto/todolist.request";
import { getAllTodolist, getTodolist, updateTodolist, addTodolist, deleteTodolist } from "./todolist.service";

const handleGetAllTodolist = async (req: Request, res: Response) => {
    const username = res.locals.userInformation.username;

    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;

    getAllTodolist(username, res.locals.userInformation, limit, offset)
        .then(payload => {
            if (!payload)
                return res
                    .status(200)
                    .send(parseResponse(0, "TL", 200, "you don't have todolists", {}));
            return res
                .status(200)
                .send(parseResponse(0, "TL", 200, "success", payload));
        })
        .catch(e => {
            return res
                .status(500)
                .send(parseError(0, 'TL', 500, e.message));
        });
};

const handleCreateTodolist = async (req: Request, res: Response) => {
    const result = createTodolistSchema.safeParse(req.body);

    if (!result.success)
        return res
            .status(422)
            .send(parseResponse(0, "TL", 422, 'invalid body', result.error.format()));

    const data = req.body;
    const username = res.locals.userInformation.username;

    addTodolist(username, data)
        .then(payload => {
            return res
                .status(201)
                .send();
        })
        .catch(e => {
            return res
                .status(500)
                .send(parseError(0, 'TL', 500, e.message));
        });
};

const handleUpdateTodolist = async (req: Request, res: Response) => {
    const result = updateTodolistSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse(0, "TL", 422, 'invalid body', result.error.format()));
    }

    const todolistId = req.params.listId;
    updateTodolist(todolistId, req.body, res.locals.userInformation)
        .then(payload => {
            return res
                .status(201)
                .send(parseResponse(0, 'TL', 201, '', null));
        })
        .catch(e => {
            if (e.message === 'todolist does not exist')
                return res
                    .status(400)
                    .send(parseError(0, 'TL', 400, e.message));
            return res
                .status(500)
                .send(parseResponse(0, 'TL', 500, e.message, null))
        });
};

const handleDeleteTodolist = async (req: Request, res: Response) => {
    const todolistId = req.params.listId;
    deleteTodolist(todolistId, res.locals.userInformation)
        .then(payload => {
            return res.status(204).send()
        })
        .catch(e => {
            if (e.message === 'delete failed')
                return res
                    .status(400)
                    .send(parseResponse(0, 'TL', 400, e.message, null));

            return res
                .status(500)
                .send(parseError(0, 'TL', 500, e.message))
        });
};

const handleGetTodolist = async (req: Request, res: Response) => {
    const todolistId = req.params.listId;

    const limit = Number(req.query.limit) || 0;
    const offset = Number(req.query.offset) || 0;

    getTodolist(todolistId, res.locals.userInformation, limit, offset)
        .then(payload => {
            console.log(payload);
            res
                .status(200)
                .send(parseResponse(0, 'TL', 200, '', payload));
        })
        .catch(e => {
            if (e.message === 'todolist does not exist')
                return res
                    .status(400)
                    .send(parseError(0, 'TL', 400, e.message));
                    
            return res
                .status(500)
                .send(parseError(0, 'TL', 500, e.message));
        });
};

export { handleGetAllTodolist, handleCreateTodolist, handleGetTodolist, handleUpdateTodolist, handleDeleteTodolist }