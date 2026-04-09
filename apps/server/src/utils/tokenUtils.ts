import jwt from 'jsonwebtoken'
import env from '../env'
import { Response } from 'express'
import { TokenPayload } from '../schema/auth.schema'
import crypto from 'crypto'

const access_secret = env.ACCESS_SECRET
const refresh_secret = env.REFRESH_SECRET

export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ id: userId } as TokenPayload, access_secret, { expiresIn: '15m' })
}

export const generateRefreshToken = (sessionId: string): string => {
    return jwt.sign({ id: sessionId } as TokenPayload, refresh_secret, { expiresIn: '7d' })
}

export const sendRefreshTokenCookie = (
    res: Response,
    refreshToken: string,
    accessToken: string,
) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

export const clearAuthCookies = (res: Response) => {
    const cookieOptions = {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
    }

    res.clearCookie('refreshToken', cookieOptions)
    res.clearCookie('accessToken', cookieOptions)
}

export const generateVerifyToken = (): { token: string; expiry: Date } => {
    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    return { token, expiry }
}
