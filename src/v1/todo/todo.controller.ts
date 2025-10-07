import { Request, Response } from "express";
import { addTodoSchema, updateTodoSchema } from "./todo.validator";
import { parseResponse } from "../../common/response";

import { TodoService } from "./todo.service";

const todoService = new TodoService();

const handleGetAllTodo = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const todolistId = Number(req.params.todolistId);

    try {
        const todo = await todoService.getAllTodo(userId, todolistId, limit, offset);
        return res
            .status(200)
            .send(parseResponse('TO', 201, '', todo));
    } catch (e) {
        return res
            .status(500)
            .send(parseResponse('TO', 500));
    }

}

const handleGetOneTodo = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const todolistId = Number(req.params.todolistId);
    const todoId = Number(req.params.todoId);

    try {
        const todo = await todoService.getOneTodo(userId, todolistId, todoId);
        return res
            .status(200)
            .send(parseResponse('TO', 201, '', todo));
    } catch (e) {
        return res
            .status(500)
            .send(parseResponse('TO', 500));
    }
}

const handleAddTodo = async (req: Request, res: Response) => {
    const result = addTodoSchema.safeParse(req.body);
    const userId = res.locals.userId;

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse('TO', 422, 'invalid body', result.error.format()));
    };

    const { message } = result.data;
    const todolistId = Number(req.params.todolistId);

    try {
        await todoService.createTodo(userId, todolistId, message);

        return res.status(201).send(parseResponse('TO', 201));
    } catch (e) {
        return res.status(500).send(parseResponse('TO', 500));
    }
};

const handleUpdateTodo = async (req: Request, res: Response) => {
    const result = updateTodoSchema.safeParse(req.body);
    const userId = res.locals.userId;

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse('TO', 422, 'invalid body', result.error.format()));
    };

    const todolistId = Number(req.params.todolistId);
    const todoId = Number(req.params.todoId);
    const { message, status } = req.body;

    try {
        await todoService.updateTodo(userId, todolistId, todoId, message, status);

        return res
            .status(201)
            .send(parseResponse('TO', 201));
    } catch {
        return res
            .status(500)
            .send(parseResponse('TO', 500));
    }

};

const handleDeleteTodo = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const todolistId = Number(req.params.todolistId);
    const todoId = Number(req.params.todoId);

    try {
        await todoService.deleteTodo(userId, todolistId, todoId);
    } catch (e) {
    }
    return res
        .status(204)
        .send();
};

export { handleGetAllTodo, handleGetOneTodo, handleAddTodo, handleUpdateTodo, handleDeleteTodo }