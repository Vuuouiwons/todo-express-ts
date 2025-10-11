import { JWTGuardService } from "../../guard/jwt";
import { Request, Response, NextFunction } from "express";
import { parseResponse } from "../../common/response";
const jwt = require('jsonwebtoken');

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;
    const guard = new JWTGuardService();

    try {
        const decoded = guard.verify({ 'tokenHeader': tokenHeader });
        const userId = decoded.userId;
        res.locals.userId = userId;
        next()
    } catch (e: any) {
        if (e instanceof jwt.TokenExpiredError || e instanceof jwt.JsonWebTokenError) {
            console.warn(e);
            res.status(401).send(parseResponse('MO', 401, 'token invalid'))
        }

        res.status(500).send()
    }
};

export { isAuthorized };