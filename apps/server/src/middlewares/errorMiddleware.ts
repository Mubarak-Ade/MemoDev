import { NextFunction, Request, Response } from "express"
import { isHttpError } from "http-errors"

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction): Response => {
    console.error(error)
    let errorMessage = 'Unknown Error Occured'
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    } else if (error && typeof error === "object" && "name" in error) {
        const name = error.name
        if (name === "CastError" || name === "ValidationError") {
            statusCode = 400
            errorMessage = "Invalid request data"
        } else if (name === "MongoServerError" && "code" in error && error.code === 11000) {
            statusCode = 409
            errorMessage = "A record with that value already exists"
        }
    }
    return res.status(statusCode).json({ error: errorMessage })
}

export const NotFoundHandler = (req: Request, res: Response): Response => {
    return res.status(404).json({ error: 'Route Not Found' })
}