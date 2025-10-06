import { Request, Response } from "express";
import { createTodolistSchema, updateTodolistSchema } from './todolist.validator';
import { parseResponse } from "../../common/response";

const handleGetTodolist = async (req: Request, res: Response) => {
    const userId = res.locals.userInformation.userId;

    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
};
const handleAddTodolist = async (req: Request, res: Response) => {
    const result = createTodolistSchema.safeParse(req.body);

    if (!result.success)
        return res
            .status(422)
            .send(parseResponse("TL", 422, 'invalid body', result.error.format()));

    const userId = res.locals.userInformation.userId;
    const data = req.body;
};
const handleUpdateTodolist = async (req: Request, res: Response) => {
    const result = updateTodolistSchema.safeParse(req.body);
    
    if (!result.success) {
        return res
        .status(422)
        .send(parseResponse("TL", 422, 'invalid body', result.error.format()));
    }
    
    const userId = res.locals.userInformation.userId;
    const todolistId = req.params.listId;

};
const handleDeleteTodolist = async (req: Request, res: Response) => {
    const todolistId = req.params.listId;
    const userId = res.locals.userInformation.userId;
};

export { handleGetTodolist, handleAddTodolist, handleUpdateTodolist, handleDeleteTodolist }