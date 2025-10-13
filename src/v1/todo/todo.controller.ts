import { Request, Response } from "express";
import { addTodoSchema, updateTodoSchema } from "./todo.validator";
import { parseResponse, res200, res201, res204, res422, res500 } from "../../common/response";

import { TodoService } from "./todo.service";

const todoService = new TodoService();

const handleGetAllTodo = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const todolistId = Number(req.params.todolistId);

    try {
        const todo = await todoService.getAllTodo(userId, todolistId, limit, offset);
        return res200(res, 'TO', todo);
    } catch (e) {
        return res500(res, 'TO');
    }

}

const handleGetOneTodo = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const todolistId = Number(req.params.todolistId);
    const todoId = Number(req.params.todoId);

    try {
        const todo = await todoService.getOneTodo(userId, todolistId, todoId);

        return res200(res, 'TO', todo);
    } catch (e) {
        return res500(res, 'TO');
    }
}

const handleAddTodo = async (req: Request, res: Response) => {
    const result = addTodoSchema.safeParse(req.body);
    const userId = res.locals.userId;

    if (!result.success) {
        return res422(res, 'TO', result.error.format())
    };

    const { message } = result.data;
    const todolistId = Number(req.params.todolistId);

    try {
        const todo = await todoService.createTodo(userId, todolistId, message);

        return res201(res, 'TO', todo);
    } catch (e) {
        return res500(res, 'TO');
    }
};

const handleUpdateTodo = async (req: Request, res: Response) => {
    const result = updateTodoSchema.safeParse(req.body);
    const userId = res.locals.userId;

    if (!result.success) {
        return res422(res, 'TO', result.error.format());
    };

    const todolistId = Number(req.params.todolistId);
    const todoId = Number(req.params.todoId);
    const { message, status } = req.body;

    try {
        const todo = await todoService.updateTodo(userId, todolistId, todoId, message, status);

        return res201(res, 'TO', todo);
    } catch {
        return res500(res, 'TO');
    }

};

const handleDeleteTodo = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const todolistId = Number(req.params.todolistId);
    const todoId = Number(req.params.todoId);

    try {
        await todoService.deleteTodo(userId, todolistId, todoId);

        return res204(res, 'TO');
    } catch (e) {
        return res500(res, 'TO');
    }
};

export { handleGetAllTodo, handleGetOneTodo, handleAddTodo, handleUpdateTodo, handleDeleteTodo }