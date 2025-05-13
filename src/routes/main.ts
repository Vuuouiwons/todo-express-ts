const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const morgan = require('morgan');
const cors = require('cors')

import { userRouter } from './user';
import { helloWorldRouter } from './helloWorld';
import { todolistRouter } from './todolist';
import { todoRouter } from './todo'
import { fetchUserInformation, isAuthorized } from '../middlewares/authorization';

const parserMiddleware = [cors(), bodyParser.json(), morgan('dev')]

router.use(parserMiddleware);

router.use('/hello-world', helloWorldRouter);
router.use('/', userRouter);

router.use([isAuthorized, fetchUserInformation]);
router.use('/todolists', todolistRouter);
router.use('/todolists/:listId/todos', todoRouter);

export { router };