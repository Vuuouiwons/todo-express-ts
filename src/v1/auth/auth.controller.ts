import { Request, Response } from 'express';
import { registerSchema, loginSchema } from './auth.validator';

import { AuthService, AuthServiceInterface } from './auth.service'
import { UsernameExistsError, CredentialError } from '../../errors/400';
import { res200, res201, res400, res422, res500 } from "../../common/response";


const authService: AuthServiceInterface = new AuthService()

const handleRegister = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res422(res, 'RE', result.error.format());
    }

    const { username, password } = result.data;

    try {
        await authService.register(username, password);

        return res201(res, 'RE');
    } catch (e: unknown) {
        if (e instanceof UsernameExistsError) {
            return res400(res, 'RE', e.message);
        }

        return res500(res, 'RE');
    }
}

const handleLogin = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res422(res, 'RE', result.error.format());
    }

    const { username, password } = result.data;

    try {
        const token = await authService.login(username, password);

        return res200(res, 'LO', { token });
    } catch (e) {
        if (e instanceof CredentialError) {
            return res400(res, 'LO', e.message);
        }

        return res500(res, 'LO');
    }
}

export { handleRegister, handleLogin };