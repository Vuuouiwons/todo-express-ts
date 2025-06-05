const express = require('express');
const todoRouter = express.Router({ mergeParams: true });

import { handleAddTodo, handleUpdateTodo, handleDeleteTodo } from './todo.controller'

todoRouter.post('/', handleAddTodo);
todoRouter.put('/:todoId', handleUpdateTodo);
todoRouter.delete('/:todoId', handleDeleteTodo);

export { todoRouter }

