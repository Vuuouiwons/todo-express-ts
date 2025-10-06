const express = require('express');
const todolistRouter = express.Router({ mergeParams: true });

import { handleGetTodolist, handleAddTodolist, handleUpdateTodolist, handleDeleteTodolist } from './todolist.controller'

todolistRouter.get('/', handleGetTodolist);
todolistRouter.post('/', handleAddTodolist);
todolistRouter.put('/:todoId', handleUpdateTodolist);
todolistRouter.delete('/:todoId', handleDeleteTodolist);

export { todolistRouter }
