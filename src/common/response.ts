import { Response } from "express";

function parseResponse(
    controllerId: string,
    statusCode: number,
    message: string | null = null,
    data: any = null) {
    return {
        'status': `${controllerId}-${statusCode}`,
        message,
        data
    }
}

function res200(
    res: Response,
    controllerId: string,
    data: any = null
) {
    return res
        .status(200)
        .send({
            status: `${controllerId}-200`,
            data
        });
}

function res201(
    res: Response,
    controllerId: string,
) {
    return res
        .status(201)
        .send({
            status: `${controllerId}-201`
        });
}

function res204(
    res: Response,
    controllerId: string,
) {
    return res
        .status(204)
        .send({
            status: `${controllerId}-204`
        });
}

function res400(
    res: Response,
    controllerId: string,
    message: string,
) {
    return res
        .status(400)
        .send({
            status: `${controllerId}-400`,
            'message': message
        })
}

function res422(
    res: Response,
    controllerId: string,
    message: any = null,

) {
    message = message ? message : 'invalid body';

    return res
        .status(422)
        .send({
            status: `${controllerId}-422`,
            'invalid': message
        })
}

function res404(
    res: Response,
    controllerId: string,
    message: string | null = null,
) {
    message = message ?? 'resource not found';

    return res
        .status(404)
        .send({
            status: `${controllerId}-404`,
            message
        })
}

function res500(
    res: Response,
    controllerId: string
) {
    return res
        .status(500)
        .send({
            status: `${controllerId}-500`
        });
}

export { parseResponse, res200, res201, res204, res400, res422, res404, res500 };