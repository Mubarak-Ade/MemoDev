import z from "zod"

export const AuthSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
}) 

export const LoginSchema = AuthSchema.omit({username: true})

export type Register = z.infer<typeof AuthSchema>
export type Login = z.infer<typeof LoginSchema>