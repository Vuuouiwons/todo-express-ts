import { Response, Request } from 'express'

const handleHelloWorld = (req: Request, res: Response) => {
    res.send('Hello World!');
}

export { handleHelloWorld }