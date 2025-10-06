async function parseResponse(
    controllerId: number,
    statusCode: number,
    message: string,
    data: any = null) {
    return {
        'status': `${controllerId}-${statusCode}`,
        message,
        data
    }
}

export { parseResponse };