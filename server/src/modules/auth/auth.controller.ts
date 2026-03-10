import { RequestHandler } from 'express'
import AuthService from './auth.service'
import { zodParser } from '../../utils/zodValidator'
import { AuthSchema } from '../../schema/auth.schema'
import { sendRefreshTokenCookie } from '../../utils/tokenUtils'
import createHttpError from 'http-errors'
import env from '../../env'
import User from '../../models/User'
import { parseDevice, parseIp } from '../../utils/sessionUtils'
export const signup: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const data = zodParser(AuthSchema, req.body)
        await AuthService.signup(data)
        res.status(200).json({ message: 'Signup Successfully' })
    } catch (error) {
        next(error)
    }
}
export const login: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const data = zodParser(AuthSchema.omit({ username: true }), req.body)
        const userAgent = parseDevice(req)
        const ip = parseIp(req)
        const { refresh, access } = await AuthService.login(data, { userAgent, ip })
        sendRefreshTokenCookie(res, refresh, access)
        res.status(200).json({ message: 'Login Successfully' })
    } catch (error) {
        next(error)
    }
}

export const verifyEmail: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        await AuthService.verifyEmail(req.query.token as string)
        res.json({ message: 'Email Verified Successfully. You can now login' })
    } catch (error) {
        next(error)
    }
}

export const getUser: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const user = await AuthService.getUser(req.userId as string)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const refresh: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const token: string = req.cookies.refreshToken as string
        if (!token) {
            throw createHttpError(401, 'No refresh token')
        }
        const { refresh, access } = await AuthService.refresh(token)
        sendRefreshTokenCookie(res, refresh, access)
        res.status(200).json({ message: 'Token successfully refreshed' })
    } catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const token: string | undefined = req.cookies.refreshToken
        if (!token) {
            res.sendStatus(204)
            return
        }
        // await AuthService.logout(token)
        await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: null })
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict',
        })
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict',
        })
        res.status(200).json({ message: 'Logout Successfully' })
    } catch (error) {
        next(error)
    }
}

export const forgotPassword : RequestHandler = async (req, res, next): Promise<void> => {
  try {
    await AuthService.forgotPassword(req.body.email)
    res.status(200).json({ message: "Resent link sent to your email" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword : RequestHandler = async (req, res, next): Promise<void> => {
  try {
    await AuthService.resetPassword(req.body.token, req.body.password)
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};