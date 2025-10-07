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

export { parseResponse };