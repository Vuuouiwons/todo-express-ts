import { JWTGuardService } from "../../guard/jwt";
import { Request, Response, NextFunction } from "express";
import { parseResponse } from "../../common/response";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res
            .status(401)
            .send(parseResponse("MO", 401, "missing authorization token", null));
    }

    const tokenParts = tokenHeader!.split(' ');

    if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
        return res
            .status(401)
            .send(parseResponse("MO", 401, "unknown authentication", null));
    }
    const token = tokenParts[1];
    const guard = new JWTGuardService();

    try {
        const decoded = guard.verify({ token });
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