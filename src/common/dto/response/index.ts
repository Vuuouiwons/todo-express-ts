const parseResponse = (node: number, controllerId: string, httpCode: number, message: string, data: any) => {
    const status: string = `${node}-${controllerId}-${httpCode}`
    const payload: Object = {
        status,
        message,
        data,
    }
    return payload;
}

const parseError = (node: number | string, controllerId: string, httpCode: number, message: string) => {
    const status: string = `${node}-${controllerId}-${httpCode}`
    const payload: Object = {
        status,
        message,
    }
    return payload;
}


export { parseResponse, parseError }