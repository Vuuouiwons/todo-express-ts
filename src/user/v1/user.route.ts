const express = require('express');
const userRouter = express.Router();

import { handleRegister, handleLogin } from "./user.controller";

userRouter.post('/register', handleRegister);
userRouter.post('/login', handleLogin);

export { userRouter };