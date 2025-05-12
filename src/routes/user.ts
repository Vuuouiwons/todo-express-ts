const express = require('express');
const userRouter = express.Router();

import { handleRegister, handleLogin } from "../controllers/user";

userRouter.post('/register', handleRegister);
userRouter.post('/login', handleLogin);

export { userRouter };