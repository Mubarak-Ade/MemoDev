import z from "zod";

export const ProjectSchema = z.object({
    name: z.string(),
    description: z.string(),
    icon: z.string().default("folder"),
    color: z.string().default("gray")
})

export type ProjectDTO = z.infer<typeof ProjectSchema>