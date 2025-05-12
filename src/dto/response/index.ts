const parseResponse = (node: number, controllerId: string, httpCode: number, message: string, data: any) => {
    const status: string = `${node}-${controllerId}-${httpCode}`
    const payload: Object = {
        status,
        message,
        data,
    }
    return payload;
}

export { parseResponse }