const express = require('express');
const v1Router = express.Router({ mergeParams: true });

import { todolistRouter } from './todolist/todolist.route';
import { todoRouter } from './todo/todo.route';
import { authRouter } from './auth/auth.route';
import { isAuthorized } from '../guard/jwt';

// INSECURED
v1Router.use('/auth', authRouter);

// SECURED
v1Router.use([isAuthorized]);
v1Router.use('/todolists', todolistRouter);
v1Router.use('/todolists/:todolistId/todos', todoRouter);

export { v1Router };