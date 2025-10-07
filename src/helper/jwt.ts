const jwt = require('jsonwebtoken');

function generateJWT(userId: string): string {
    const exp = {
        expiresIn: '1d'
    };
    const data = {
        'user_id': userId
    };

    const token: string = jwt.sign(data, process.env.JWT_SECRET, exp);
    return token
}