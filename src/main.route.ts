const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const morgan = require('morgan');
const cors = require('cors')

import { userRouter } from './user/v1/user.route';
import { helloWorldRouter } from './hello/hello.route';
import { todolistRouter } from './todolist/v1/todolist.route';
import { todoRouter } from './todo/v1/todo.route'
import { fetchUserInformation, isAuthorized } from './middlewares/authorization/authorization';

const parserMiddleware = [cors(), bodyParser.json(), morgan('dev')]

router.use(parserMiddleware);

router.use('/hello-world', helloWorldRouter);
router.use('/', userRouter);

router.use([isAuthorized, fetchUserInformation]);
router.use('/todolists', todolistRouter);
router.use('/todolists/:listId/todos', todoRouter);

export { router };