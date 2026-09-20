import z from 'zod'

const AccessTokenPayload = z.object({
    id: z.string(),
})

export const AuthSchema = z.object({
    username: z.string().trim().min(3).max(40),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8).max(128),
})

export const EmailSchema = z.object({
    email: z.string().trim().toLowerCase().email(),
})

export const ResetPasswordSchema = z.object({
    token: z.string().trim().length(64),
    password: z.string().min(8).max(128),
})

export type AuthDTO = z.infer<typeof AuthSchema>

export type TokenPayload = z.infer<typeof AccessTokenPayload>
