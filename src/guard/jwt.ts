import { IGuardService, GuardRequest, GuardResponse } from './guard.interface';
const jwt = require('jsonwebtoken');

export class JWTGuardService implements IGuardService {
    public verify(body: GuardRequest): GuardResponse {
        const token = body.token;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const payload: GuardResponse = {
                'userId': decoded.userId
            };
            return payload;
        } catch (e) {
            throw e;
        }
    }
}
