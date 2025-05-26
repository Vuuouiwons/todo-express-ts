import { Request, Response } from 'express';
import { parseResponse, parseError } from '../../common/dto/response/index';
import { isUsernameAvailable, addUser, getUserInformation } from "./user.service"
import { registerSchema, loginSchema } from './dto/user.request';
import { generateJWTToken } from '../../common/helpers/auth';
import bcrypt from "bcryptjs";

const handleRegister = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse(0, 'RE', 422, 'invalid body', result.error.format()));
    }

    const { username, password } = req.body;

    if (!await isUsernameAvailable(username)) {
        return res
            .status(400)
            .send(parseError(0, 'RE', 400, 'username not available'));
    }

    addUser(username, password)
        .then(payload => {
            return res
                .status(201)
                .send();
        })
        .catch(e => {
            return res
                .status(500)
                .send(parseError(0, 'RE', 500, e.message));
        });
}

const handleLogin = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse(0, 'LO', 422, 'invalid body', result.error.format()));
    }

    const { username, password } = req.body;

    const userInformation = await getUserInformation(username);

    const unauthenticatedMessage = "username or password doesn't exist";

    if (userInformation.username === undefined ||
        !bcrypt.compareSync(password, userInformation.password)) {
        res
            .status(401)
            .send(parseError(0, 'LO', 401, unauthenticatedMessage));
    }

    const jwtToken: string = generateJWTToken({ id: userInformation.id, username: userInformation.username });

    return res
        .status(201)
        .send(parseResponse(0, 'LO', 201, 'user authenticated', { token: jwtToken }));
}

export { handleRegister, handleLogin }