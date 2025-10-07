import { JWTGuardService } from "../../guard/jwt";
import { Request, Response, NextFunction } from "express";
import { parseResponse } from "../../common/response";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;
    const guard = new JWTGuardService();

    try {
        const decoded = guard.verify({ 'tokenHeader': tokenHeader });
        const userId = decoded.userId;
        res.locals.userId = userId;
        next()
    } catch (e) {
        if (e instanceof Error) {
            console.warn(e);
            res.status(401).send(parseResponse('MO', 401, e.message));
            return;
        }
    }
};

export { isAuthorized };