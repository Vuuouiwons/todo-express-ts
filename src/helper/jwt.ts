const jwt = require('jsonwebtoken');
import { JWT_SECRET } from "../config/config";
export function generateJWT(userId: string | number): string {
    const exp = {
        expiresIn: '1d'
    };
    const data = {
        'user_id': userId
    };

    const token: string = jwt.sign(data, JWT_SECRET, exp);
    return token
}