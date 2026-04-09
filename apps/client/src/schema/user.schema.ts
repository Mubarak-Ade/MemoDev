import z from "zod";

const UserSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
})

export type User = z.infer<typeof UserSchema>