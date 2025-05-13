const jwt = require('jsonwebtoken');

interface JWTDataI {
    id: number,
    username: string
}

const generateJWTToken = (data: JWTDataI): string => {
    const token = jwt.sign(data, process.env.JWT_SECRET)
    return token;
}

export { generateJWTToken }