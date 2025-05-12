const express = require('express');
const todoRouter = express.Router();

import { handleAddTodo, handleUpdateTodo, handleDeleteTodo } from '../controllers/todo'
import { isAuthorized } from '../middlewares/authorization';

todoRouter.use(isAuthorized);

todoRouter.post('/', handleAddTodo);
todoRouter.put('/:todoId', handleUpdateTodo);
todoRouter.delete('/:todoId', handleDeleteTodo);

export { todoRouter }

