import z from "zod";

export const ProjectSchema = z.object({
    name: z.string().trim().min(1).max(80),
    description: z.string().trim().min(1).max(500),
    icon: z.string().trim().default("folder"),
    color: z.string().trim().default("gray")
})

export type ProjectDTO = z.infer<typeof ProjectSchema>
