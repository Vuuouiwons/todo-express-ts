const express = require('express');
const helloWorldRouter = express.Router();

import { handleHelloWorld } from "../controllers/helloWorld";

helloWorldRouter.get('/', handleHelloWorld);

export { helloWorldRouter };