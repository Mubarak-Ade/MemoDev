import { RequestHandler } from 'express'
import AuthService from './auth.service'
import { zodParser } from '../../utils/zodValidator'
import { AuthSchema, EmailSchema, ResetPasswordSchema } from '../../schema/auth.schema'
import { clearAuthCookies, sendRefreshTokenCookie } from '../../utils/tokenUtils'
import createHttpError from 'http-errors'
import { parseDevice, parseIp } from '../../utils/sessionUtils'
export const signup: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const data = zodParser(AuthSchema, req.body)
        const message = await AuthService.signup(data)
        res.status(200).json(message)
    } catch (error: unknown) {
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
    } catch (error: unknown) {
        next(error)
    }
}

export const verifyEmail: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const token = typeof req.query.token === 'string' ? req.query.token : ''
        await AuthService.verifyEmail(token)
        res.json({ message: 'Email Verified Successfully. You can now login' })
    } catch (error: unknown) {
        next(error)
    }
}

export const resendEmail: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { email } = zodParser(EmailSchema, req.body)
        const sent = await AuthService.resendVerifyEmail(email)
        res.status(200).json({
            message: 'If the email exists and is unverified, a link has been sent',
            sent,
        })
    } catch (error: unknown) {
        next(error)
    }
}

export const getUser: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const user = await AuthService.getUser(req.userId as string)
        res.status(200).json(user)
    } catch (error: unknown) {
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
    } catch (error: unknown) {
        clearAuthCookies(res)
        next(error)
    }
}

export const logout: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const token: string | undefined = req.cookies.refreshToken
        if (!token) {
            clearAuthCookies(res)
            res.sendStatus(204)
            return
        }
        await AuthService.logout(token)
        clearAuthCookies(res)
        res.status(200).json({ message: 'Logout Successfully' })
    } catch (error: unknown) {
        clearAuthCookies(res)
        next(error)
    }
}

export const forgotPassword : RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { email } = zodParser(EmailSchema, req.body)
    await AuthService.forgotPassword(email)
    res.status(200).json({ message: "If the email exists, a reset link has been sent" });
  } catch (error: unknown) {
    next(error);
  }
};

export const resetPassword : RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { token, password } = zodParser(ResetPasswordSchema, req.body)
    await AuthService.resetPassword(token, password)
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error: unknown) {
    next(error);
  }
};
