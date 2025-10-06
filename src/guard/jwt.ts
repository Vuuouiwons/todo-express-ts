import { IGuardService, GuardPayload, GuardResponse } from './guard.interface';
const jwt = require('jsonwebtoken');

export class JWTGuardService implements IGuardService {
    public verify(payload: GuardPayload): GuardResponse | null {
        const token = payload.token;
        let userId: string;

        jwt.verify(token,
            process.env.JWT_SECRET,
            { maxAge: process.env.JWT_AGE },
            (err: any, decoded: any) => {
                if (err) {
                    throw new Error('token invalid');
                };

                userId = decoded.userId;
                return { userId };
            });
        
        return null;
    }
}
