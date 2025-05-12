const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const morgan = require('morgan');
const cors = require('cors')

import { userRouter } from './user';
import { helloWorldRouter } from './helloWorld';
import { todolistRouter } from './todolist';
import { todoRouter } from './todo'

router.use(cors());
router.use(morgan('dev'));
router.use(bodyParser.json());

router.use('/hello-world', helloWorldRouter);
router.use('/', userRouter);
router.use('/todolists', todolistRouter);
router.use('/todolists/:listId/todos', todoRouter);

export { router };