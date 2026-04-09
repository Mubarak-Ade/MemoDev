import nodemailer from 'nodemailer'
import env from '../env'
import { CreateEmailOptions, Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)
const sendMail = async (option: CreateEmailOptions) => {
    return await resend.emails.send(option)
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const link = `${env.CLIENT_URL}/verify-email?token=${token}`
    const {data, error} = await sendMail({
        from: `MemoDev: <${env.EMAIL_FROM}>`,
        to: email,
        subject: 'Verify your email',
        html: `<div style="font-family: sans-serif; line-height: 1.5;">
                    <h2>Welcome to My MERN App!</h2>
                    <p>Please verify your email by clicking the button below:</p>
                    <a href="${link}" 
                    style="display:inline-block; padding:10px 20px; background:#4f46e5; color:white; border-radius:5px; text-decoration:none;">
                    Verify Email
                    </a>
                    <p>If you didn’t sign up, ignore this email.</p>
                </div>`,
    })
    if (error) {
    console.error('Email error:', error)
    throw new Error('Failed to send email')
}
}

export const resetPasswordEmail = async (email: string, token: string) => {
    const link = `${env.CLIENT_URL}/reset-password?token=${token}`
    const {data, error} = await sendMail({
        from: `MemoDev: <${env.EMAIL_FROM}>`,
        to: email,
        subject: 'Reset your password',
        html: `<div style="font-family: sans-serif; line-height: 1.5;">
                    <h2>Reset your password</h2>
                    <p>Please reset your password by clicking the button below:</p>
                    <a href="${link}" 
                    style="display:inline-block; padding:10px 20px; background:#4f46e5; color:white; border-radius:5px; text-decoration:none;">
                    Reset Password
                    </a>
                    <p>If you didn’t request a password reset, ignore this email.</p>
                </div>`,
    })
}