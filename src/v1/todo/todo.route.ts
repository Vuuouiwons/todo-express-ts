const express = require('express');
const todoRouter = express.Router({ mergeParams: true });

import { handleGetTodo, handleAddTodo, handleUpdateTodo, handleDeleteTodo } from './todo.controller'

todoRouter.get('/', handleGetTodo);
todoRouter.post('/', handleAddTodo);
todoRouter.put('/:todoId', handleUpdateTodo);
todoRouter.delete('/:todoId', handleDeleteTodo);

export { todoRouter }

