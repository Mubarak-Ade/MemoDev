import z from 'zod'

const AccessTokenPayload = z.object({
    id: z.string(),
})

export const AuthSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
})

export type AuthDTO = z.infer<typeof AuthSchema>

export type TokenPayload = z.infer<typeof AccessTokenPayload>
