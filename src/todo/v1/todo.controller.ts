import { Request, Response } from "express";
import { addTodo, updateTodo, deleteTodo } from "./todo.service";
import { addTodoSchema, updateTodoSchema } from "./dto/todo.request";
import { parseResponse } from "../../common/dto/response";

const handleAddTodo = async (req: Request, res: Response) => {
    const result = addTodoSchema.safeParse(req.body);

    if (!result.success) {
        res
            .status(422)
            .send(parseResponse(0, 'TO', 422, 'invalid body', result.error.format()));
        return;
    };

    const { message } = req.body;
    const listId = Number(req.params.listId);

    const addTodoStatus = await addTodo(listId, message, res.locals.userInformation);

    if (addTodoStatus === 'todolist does not exsist') {
        res
            .status(400)
            .send(parseResponse(0, "TO", 400, 'todolist does not exsist', null));
        return;
    }

    if (addTodoStatus === 'unauthorized') {
        res
            .status(401)
            .send(parseResponse(0, 'TO', 401, 'unauthorized', null));
        return;
    }

    if (addTodoStatus === 'add todo failed') {
        res
            .status(500)
            .send(parseResponse(0, 'TO', 500, 'failed adding todo', null));
        return;
    }

    res
        .status(201)
        .send(parseResponse(0, 'TO', 201, 'added todo to todolist', null));
};

const handleUpdateTodo = async (req: Request, res: Response) => {
    const result = updateTodoSchema.safeParse(req.body);

    if (!result.success) {
        res
            .status(422)
            .send(parseResponse(0, 'TO', 422, 'invalid body', result.error.format()));
        return;
    };

    const listId = Number(req.params.listId);
    const todoId = Number(req.params.todoId);

    const { message, status } = req.body;
    const updateTodoStatus = await updateTodo(listId, todoId, status, message, res.locals.userInformation);


    if (updateTodoStatus === 'todolist does not exsist') {
        res
            .status(400)
            .send(parseResponse(0, "TO", 400, 'todolist does not exsist', null));
        return;
    }

    if (updateTodoStatus === 'unauthorized') {
        res
            .status(401)
            .send(parseResponse(0, 'TO', 401, 'unauthorized', null));
        return;
    }

    if (updateTodoStatus === 'update failed') {
        res
            .status(500)
            .send(parseResponse(0, 'TO', 500, 'update todo failed', null));
        return;
    }

    res
        .status(201)
        .send(parseResponse(0, 'TO', 201, 'todo updated', null));
};

const handleDeleteTodo = async (req: Request, res: Response) => {
    const listId = Number(req.params.listId);
    const todoId = Number(req.params.todoId);

    const deleteTodoStatus = await deleteTodo(listId, todoId, res.locals.userInformation);

    if (deleteTodoStatus === 'todolist does not exsist') {
        res
            .status(400)
            .send(parseResponse(0, "TO", 400, 'todolist does not exsist', null));
        return;
    }

    if (deleteTodoStatus === 'unauthorized') {
        res
            .status(401)
            .send(parseResponse(0, 'TO', 401, 'unauthorized', null));
        return;
    }

    if (deleteTodoStatus === 'deletion failed') {
        res
            .status(500)
            .send(parseResponse(0, 'TO', 500, 'delete todo failed', null));
        return;
    }

    res.status(204).send()
};

export { handleAddTodo, handleUpdateTodo, handleDeleteTodo }