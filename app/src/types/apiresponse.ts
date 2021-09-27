export function success<T>(data: T, additions?: any): Response {
    const responseMetaData = Object.assign({
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        }
    }, additions);
    return new Response(JSON.stringify({ successful: true, data }), responseMetaData);
}

export function failure<T>(error: T, additions?: any): Response {
    const responseMetaData = Object.assign({
        status: 500,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        }
    }, additions);
    return new Response(JSON.stringify({ successful: false, error }), responseMetaData);
}