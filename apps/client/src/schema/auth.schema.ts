import z from "zod"

const AuthSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z.string(),
})

export const RegisterSchema = AuthSchema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"]
})
export const LoginSchema = AuthSchema.omit({username: true, confirmPassword: true})

export type Register = z.infer<typeof RegisterSchema>
export type Login = z.infer<typeof LoginSchema>