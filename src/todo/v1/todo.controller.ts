import { Request, Response } from "express";
import { addTodo, updateTodo, deleteTodo } from "./todo.service";
import { addTodoSchema, updateTodoSchema } from "./dto/todo.request";
import { parseResponse, parseError } from "../../common/dto/response";

const handleAddTodo = async (req: Request, res: Response) => {
    const result = addTodoSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse(0, 'TO', 422, 'invalid body', result.error.format()));
    };

    const { message } = req.body;
    const listId = req.params.listId;

    addTodo(listId, message, res.locals.userInformation)
        .then(
            payload => {
                return res.status(201).send(parseResponse(0, 'TO', 201, '', payload));
            })
        .catch(e => {
            if (e.message === 'todolist does not exist')
                return res
                    .status(400)
                    .send(parseError(0, 'TO', 400, e.message));

            return res
                .status(500)
                .send(parseError(0, 'TO', 500, e.message));
        });
};

const handleUpdateTodo = async (req: Request, res: Response) => {
    const result = updateTodoSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse(0, 'TO', 422, 'invalid body', result.error.format()));
    };

    const listId = req.params.listId;
    const todoId = req.params.todoId;
    const { message, status } = req.body;

    updateTodo(listId, todoId, status, message, res.locals.userInformation)
        .then(payload => {
            return res
                .status(201)
                .send(parseResponse(0, 'TO', 201, '', payload));
        })
        .catch(e => {
            console.log(e);
            if (e.message === 'todolist does not exist' ||
                e.message === 'todo does not exist')
                return res
                    .status(400)
                    .send(parseError(0, 'TO', 400, e.message));

            return res
                .status(500)
                .send(parseError(0, 'TO', 500, e.message));

        });
};

const handleDeleteTodo = async (req: Request, res: Response) => {
    const listId = req.params.listId;
    const todoId = req.params.todoId;

    deleteTodo(listId, todoId, res.locals.userInformation)
        .then(payload => {
            return res.status(204).send();
        })
        .catch(e => {
            if (e.message === 'todolist does not exist' ||
                e.message === 'todo does not exist'
            )
                return res
                    .status(400)
                    .send(parseResponse(0, "TO", 400, 'todolist does not exist', null));
            return res
                .status(500)
                .send(parseResponse(0, 'TO', 500, 'delete todo failed', null));
        });
};

export { handleAddTodo, handleUpdateTodo, handleDeleteTodo }