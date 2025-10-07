import { Request, Response } from 'express';
import { registerSchema, loginSchema } from './auth.validator';
import { parseResponse } from '../../common/response';

import { AuthService, AuthServiceInterface } from './auth.service'
import { UsernameExistsError, CredentialError } from '../../errors/400';
import { DatabaseError } from '../../errors/500';

const authService: AuthServiceInterface = new AuthService()

const handleRegister = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse('RE', 422, 'invalid body', result.error.format()));
    }

    const { username, password } = result.data;

    try {
        await authService.register(username, password);
        return res
            .status(201)
            .send(parseResponse('RE', 201));
    } catch (e: unknown) {
        if (e instanceof UsernameExistsError) {
            return res.status(400).send(parseResponse('RE', 400, e.message));
        }
        if (e instanceof DatabaseError) {
            return res.status(500).send(parseResponse('RE', 500, e.message));
        }

        return res.status(500).send(parseResponse('RE', 500, 'unhandled error'))
    }
}

const handleLogin = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse('RE', 422, 'invalid body', result.error.format()));
    }

    const { username, password } = result.data;

    try {
        const token = await authService.login(username, password);

        return res.status(200).send(parseResponse('RE', 200, null, { token }));
    } catch (e) {
        if (e instanceof CredentialError) {
            return res
                .status(400)
                .send(parseResponse('RE', 400, e.message));
        }

        return res
            .status(500)
            .send(parseResponse('RE', 500, 'unhandled error'));
    }
}

export { handleRegister, handleLogin };