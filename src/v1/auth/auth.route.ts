const express = require('express');
import { handleRegister, handleLogin } from "./auth.controller";

const authRouter = express.Router({ mergeParams: true });

authRouter.use('/register', handleRegister);
authRouter.use('/login', handleLogin);

export { authRouter };