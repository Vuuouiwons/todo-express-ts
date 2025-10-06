import { Request, Response } from "express";
import { addTodoSchema, updateTodoSchema } from "./todo.validator";
import { parseResponse } from "../../common/response";

const handleGetTodo = async (req: Request, res: Response) => {
    const result = addTodoSchema.safeParse(req.body);
    const userId = res.locals.userInformation.userId;

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse('TO', 422, 'invalid body', result.error.format()));
    };

    const { message } = req.body;
    const todolistId = req.params.todolistId;
}

const handleAddTodo = async (req: Request, res: Response) => {
    const result = addTodoSchema.safeParse(req.body);
    const userId = res.locals.userInformation.userId;

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse('TO', 422, 'invalid body', result.error.format()));
    };

    const { message } = req.body;
    const todolistId = req.params.todolistId;

};

const handleUpdateTodo = async (req: Request, res: Response) => {
    const result = updateTodoSchema.safeParse(req.body);
    const userId = res.locals.userInformation.userId;
    
    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse('TO', 422, 'invalid body', result.error.format()));
    };

    const todolistId = req.params.todolistId;
    const todoId = req.params.todoId;
    const { message, status } = req.body;

};

const handleDeleteTodo = async (req: Request, res: Response) => {
    const userId = res.locals.userInformation.userId;
    const todolistId = req.params.todolistId;
    const todoId = req.params.todoId;

};

export { handleGetTodo, handleAddTodo, handleUpdateTodo, handleDeleteTodo }