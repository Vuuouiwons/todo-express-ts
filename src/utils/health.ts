import { Request, Response } from "express";

const handleHealth = async (req: Request, res: Response) => {
    return res
        .status(200)
        .send({ 'status': 'OK' });
}

export { handleHealth }