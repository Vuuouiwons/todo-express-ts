import { Request, Response, NextFunction } from "express";
import { parseResponse } from "../../common/dto/response";
import { JWTDecoded } from './interface/authorization'
import { findUserByUsername } from "../../user/v1/user.repository";

const jwt = require('jsonwebtoken');

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        res
            .status(403)
            .send(parseResponse(0, "MO", 403, "missing authorization token", null))
    }

    const [authType, token] = tokenHeader!.split(' ');

    if (authType !== "Bearer") {
        res.status(401).send(parseResponse(0, "MO", 401, "Authorization type unknown", null));
    }

    jwt.verify(token, process.env.JWT_SECRET, { maxAge: process.env.JWT_AGE }, (err: any, decoded: JWTDecoded) => {
        if (err) {
            res.status(401).send(parseResponse(0, "MO", 401, 'Token Invalid', null));
            return;
        };
        res.locals.jwtDecoded = decoded;
    });

    next();
};


const fetchUserInformation = async (req: Request, res: Response, next: NextFunction) => {
    const user = await findUserByUsername(res.locals.jwtDecoded.username);

    res.locals.userInformation = user;

    next();
}

export { isAuthorized, fetchUserInformation }