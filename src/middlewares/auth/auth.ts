import { JWTGuardService } from "../../guard/jwt";
import { Request, Response, NextFunction } from "express";
import { res401, res500 } from './../../common/response'

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
            res401(res, 'MO', 'token invalid')
        }
        res500(res, 'MO')
    }
};

export { isAuthorized };