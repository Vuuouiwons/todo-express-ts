const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const morgan = require('morgan');
const cors = require('cors')

import { userRouter } from './v1/user/user.route';
import { helloWorldRouter } from './hello/hello.route';
import { todolistRouter } from './v1/todolist/todolist.route';
import { todoRouter } from './v1/todo/todo.route'
import { fetchUserInformation, isAuthorized } from './middlewares/authorization/authorization';

const parserMiddleware = [cors(), bodyParser.json(), morgan('dev')]

router.use(parserMiddleware);

router.use('/hello-world', helloWorldRouter);
router.use('/', userRouter);

router.use([isAuthorized, fetchUserInformation]);
router.use('/todolists', todolistRouter);
router.use('/todolists/:listId/todos', todoRouter);

export { router };