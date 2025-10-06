import { IGuardService, GuardPayload, GuardResponse } from './guard.interface';
const jwt = require('jsonwebtoken');

export class JWTGuardService implements IGuardService {
    public async verify(payload: GuardPayload): GuardResponse {
        const token = payload.token;

        jwt.verify(token, process.env.JWT_SECRET, { maxAge: process.env.JWT_AGE }, (err: any, decoded: JWTDecoded) => {
        if (err) {
            throw Error('token invalid');
        };
        
        return
    });
    }
}
