const express = require('express');
const todolistRouter = express.Router();

import { handleGetAllTodolist, handleCreateTodolist, handleGetTodolist, handleUpdateTodolist, handleDeleteTodolist } from '../controllers/todolist'
import { isAuthorized } from '../middlewares/authorization';


todolistRouter.get('/', handleGetAllTodolist);
todolistRouter.post('/', handleCreateTodolist);

todolistRouter.get('/:listId', handleGetTodolist);
todolistRouter.put('/:listId', handleUpdateTodolist);
todolistRouter.delete('/:listId', handleDeleteTodolist);


export { todolistRouter };