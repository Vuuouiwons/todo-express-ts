async function parseResponse(
    controllerId: string,
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