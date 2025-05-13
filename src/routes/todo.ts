const express = require('express');
const todoRouter = express.Router({ mergeParams: true });

import { handleAddTodo, handleUpdateTodo, handleDeleteTodo } from '../controllers/todo'
import { isAuthorized } from '../middlewares/authorization';

todoRouter.post('/', handleAddTodo);
todoRouter.put('/:todoId', handleUpdateTodo);
todoRouter.delete('/:todoId', handleDeleteTodo);

export { todoRouter }

