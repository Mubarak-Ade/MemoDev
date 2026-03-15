import z from "zod";

export const ProjectSchema = z.object({
    name: z.string(),
    description: z.string(),
})

export type ProjectDTO = z.infer<typeof ProjectSchema>