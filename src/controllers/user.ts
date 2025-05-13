import { Request, Response } from 'express';
import { parseResponse } from '../dto/response/index';
import { isUsernameAvailable, addUser, getUserInformation } from "../services/user"
import { registerSchema, loginSchema } from '../dto/request/user';
import { userMap } from '../dto/mapper/user';
import { generateJWTToken } from '../utils/helpers/auth';
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
        res.send(parseResponse(0, 'RE', 400, 'username not available', null));
        return;
    }

    const insertionStatus = await addUser(username, password);

    if (!insertionStatus) {
        res.send(parseResponse(0, 'RE', 500, "something in database insertion went wrong", null));
        return;
    }

    res.status(201).send(parseResponse(0, 'RE', 201, 'success', userMap(insertionStatus)));
}

const handleLogin = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res
            .status(422)
            .send(parseResponse(0, 'RE', 422, 'invalid body', result.error.format()));
    }

    const { username, password } = req.body;

    const userInformation = await getUserInformation(username);

    const unauthenticatedMessage = "username or password doesn't exsist";

    if (userInformation.username === undefined) {
        res.status(401).send(parseResponse(0, 'LO', 401, unauthenticatedMessage, null));
    }

    if (!bcrypt.compareSync(password, userInformation.password)) {
        res.status(401).send(parseResponse(0, 'LO', 401, unauthenticatedMessage, null));
    };

    const jwtToken: string = generateJWTToken({ id: userInformation.id, username: userInformation.username });

    const payload = {
        token: jwtToken
    };

    res.status(200).send(parseResponse(0, 'LO', 200, 'user authenticated', payload));
}

export { handleRegister, handleLogin }