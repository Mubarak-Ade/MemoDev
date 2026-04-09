import { NextFunction, Request, Response } from "express"
import { isHttpError } from "http-errors"

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction): Response => {
    console.error(error)
    let errorMessage = 'Unknown Error Occured'
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    }
    return res.status(statusCode).json({ error: errorMessage })
}

export const NotFoundHandler = (req: Request, res: Response): Response => {
    return res.status(404).json({ error: 'Route Not Found' })
}