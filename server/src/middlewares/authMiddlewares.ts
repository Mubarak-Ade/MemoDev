import jwt, { JwtPayload } from 'jsonwebtoken'
import { TokenPayload } from '../schema/auth.schema'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import env from '../env'

export const isTokenPayload = (payload: JwtPayload): payload is TokenPayload => {
    return typeof (payload as TokenPayload).id === 'string'
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken

    if (!token) {
        throw createHttpError(401, 'No Access Token Provided')
    }


    try {
        const decoded = jwt.verify(token, env.ACCESS_SECRET) as JwtPayload
        if (!isTokenPayload(decoded)) {
            throw createHttpError(401, 'Malformed token payload')
        }
        req.userId = decoded.id
        next()
    } catch (error) {
        throw createHttpError(401, 'Access Token Expired or Invalid')
    }
}
