import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    
};

export { isAuthorized }