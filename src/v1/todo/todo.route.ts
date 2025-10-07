const express = require('express');
const todoRouter = express.Router({ mergeParams: true });

import { handleGetAllTodo, handleGetOneTodo, handleAddTodo, handleUpdateTodo, handleDeleteTodo } from './todo.controller'

todoRouter.get('/', handleGetAllTodo);
todoRouter.post('/', handleAddTodo);
todoRouter.get('/:todoId', handleGetOneTodo);
todoRouter.put('/:todoId', handleUpdateTodo);
todoRouter.delete('/:todoId', handleDeleteTodo);

export { todoRouter }

