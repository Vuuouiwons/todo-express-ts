const express = require('express');
const authRouter = express.Router({ mergeParams: true });

authRouter.use('/register', handleRegister);
authRouter.use('/login', handleLogin);

export { authRouter };