const express = require('express');
const todolistRouter = express.Router({ mergeParams: true });

import { handleGetAllTodolist, handleGetTodolist, handleAddTodolist, handleUpdateTodolist, handleDeleteTodolist } from './todolist.controller'

todolistRouter.get('/', handleGetAllTodolist);
todolistRouter.post('/', handleAddTodolist);
todolistRouter.get('/:todolistId', handleGetTodolist)
todolistRouter.put('/:todolistId', handleUpdateTodolist);
todolistRouter.delete('/:todolistId', handleDeleteTodolist);

export { todolistRouter }
