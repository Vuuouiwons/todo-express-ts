import { JWTGuardService } from "../guard/jwt";
import { Request, Response, NextFunction } from "express";
import { parseResponse } from "../common/response";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        res
            .status(403)
            .send(parseResponse("MO", 403, "missing authorization token", null))
    }

    const [authType, token] = tokenHeader!.split(' ');

    if (authType !== "Bearer") {
        res.status(401).send(parseResponse("MO", 401, "Authorization type unknown", null));
    }

    next();
};