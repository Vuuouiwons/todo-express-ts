const express = require('express');
const helloWorldRouter = express.Router();

import { handleHelloWorld } from "./hello.controller";

helloWorldRouter.get('/', handleHelloWorld);

export { helloWorldRouter };