import { JWT_SECRET } from '../config/config';
import { IGuardService, GuardRequest, GuardResponse } from './guard.interface';
const jwt = require('jsonwebtoken');

export class JWTGuardService implements IGuardService {
    public verify(body: GuardRequest): GuardResponse {
        const tokenHeader = body.tokenHeader;

        if (!tokenHeader) {
            throw new Error('missing authorization token');
        }

        const tokenParts: string[] = tokenHeader!.split(' ');

        if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
            throw new Error('unknown authentication');
        }

        const token = tokenParts[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const payload: GuardResponse = {
                'userId': decoded.user_id
            };
            return payload;
        } catch (e) {
            throw e;
        }
    }
}
