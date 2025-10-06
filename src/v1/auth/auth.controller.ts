import { Request, Response } from 'express';
import { registerSchema, loginSchema } from './auth.validator';
import { parseResponse } from '../../common/response';

const handleRegister = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse('RE', 422, 'invalid body', result.error.format()));
    }

    const { username, password } = req.body;
}

const handleLogin = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse('LO', 422, 'invalid body', result.error.format()));
    }

    const { username, password } = req.body;
}

export { handleRegister, handleLogin };