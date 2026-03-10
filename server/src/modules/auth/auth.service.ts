import createHttpError from 'http-errors'
import { AuthDTO } from '../../schema/auth.schema'
import User, { IUser } from '../../models/User'
import {
    generateAccessToken,
    generateRefreshToken,
    generateVerifyToken,
    sendRefreshTokenCookie,
} from '../../utils/tokenUtils'
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../../env'
import { isTokenPayload } from '../../middlewares/authMiddlewares'
import { Request, Response } from 'express'
import { resetPasswordEmail, sendVerificationEmail } from '../../utils/emailUtils'
import Session from '../../models/Session'
import bcrypt from 'bcryptjs'
import PasswordReset, { IResetPassword } from '../../models/PasswordReset'

const signup = async (data: AuthDTO) => {
    if (!data) {
        throw createHttpError(400, 'Missing Fields')
    }
    const existing = await User.findOne({ email: data.email })
    if (existing) {
        throw createHttpError(400, 'User Already Exists')
    }

    const { token, expiry } = generateVerifyToken()
    const user = await User.create({ ...data, verifyToken: token, verifyTokenExpiresAt: expiry })

    await sendVerificationEmail(data.email, token)

    await user.save()
}

export const verifyEmail = async (token: string) => {
    if (!token) throw createHttpError(400, 'Token is required')
    const user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiresAt: { $gt: Date.now() },
    })

    if (!user) throw createHttpError(404, 'Invalid or expired verification token')

    user.isVerified = true
    user.verifyToken = null
    user.verifyTokenExpiresAt = null
    await user.save()
}

interface SessionDTO {
    userAgent: string
    ip: string
}

export const login = async (data: Omit<AuthDTO, 'username'>, { userAgent, ip }: SessionDTO) => {
    const user = await User.findOne({ email: data.email })

    if (!user) {
        throw createHttpError(404, 'User Not Found')
    }
    const isMatch = await user.comparePassword(data.password)

    if (!isMatch) {
        throw createHttpError(400, 'Incorrect Password')
    }

    if (!user.isVerified) {
        throw createHttpError(403, 'Email not verified')
    }

    const session = new Session({
        userId: user._id,
        userAgent: userAgent,
        ip: ip,
        expireAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    })

    const accessToken = generateAccessToken(user._id.toString())
    const refreshToken = generateRefreshToken(session._id.toString())

    session.refreshTokenHash = await bcrypt.hash(refreshToken, 10)

    await session.save()
    return {
        access: accessToken,
        refresh: refreshToken,
    }
}

const refresh = async (token: string) => {
    const decoded = jwt.verify(token, env.REFRESH_SECRET) as JwtPayload

    if (!isTokenPayload(decoded)) {
        throw createHttpError(401, 'Malformed token payload')
    }

    const session = await Session.findById(decoded.id)
    if (!session) {
        throw createHttpError(400, 'Session Expired')
    }

    const valid = await bcrypt.compare(token, session.refreshTokenHash)
    if (!valid) {
        throw createHttpError(400, 'Session Expired')
    }

    // Rotate — issue brand new pair
    const newAccessToken = generateAccessToken(session.userId.toString())
    const newRefreshToken = generateRefreshToken(session._id.toString())

    session.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10)
    await session.save()

    return { access: newAccessToken, refresh: newRefreshToken }
}

export const logout = async (token: string) => {
    const payload = jwt.verify(token, env.REFRESH_SECRET) as JwtPayload
    await Session.findByIdAndDelete(payload.id)
}

export const forgotPassword = async (email: string) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw createHttpError(404, 'User Not Found')
    }

    const { token, expiry } = generateVerifyToken()

    const tokenHash = await bcrypt.hash(token, 10)

    await PasswordReset.create({ userId: user._id, token: tokenHash, expiresAt: expiry })

    await resetPasswordEmail(email, token)
    return
}

export const resetPassword = async (token: string, password: string) => {
    const records = await PasswordReset.find()
    let validRecords: IResetPassword | null = null

    for (const record of records) {
        const match = await bcrypt.compare(token, record.token)
        validRecords = record
        break
    }

    if (!validRecords) {
        throw createHttpError(400, 'Invalid token')
    }

    if (validRecords.expiresAt < new Date()) {
        throw createHttpError(400, 'expired token')
    }

    const user = await User.findById(validRecords.userId)
    if (!user) throw createHttpError(404, 'User not found')
    user.password = password
    await user.save()
    await PasswordReset.deleteMany({ userId: user._id })
    return user
}

export const getUser = async (userId: string) => {
    const user = await User.findById(userId).select('-password -refreshToken').lean()
    if (!user) {
        throw createHttpError(404, 'User Not Found')
    }
    return user
}

export default {
    signup,
    login,
    refresh,
    logout,
    getUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
}
