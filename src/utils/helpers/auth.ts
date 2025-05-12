const jwt = require('jsonwebtoken');

const generateJWTToken = (username: string): string => {
    const token = jwt.sign({ username }, process.env.SECRET_KEY)
    return token;
}

export { generateJWTToken }