import z from "zod";

export const SnippetSchema = z.object({
    title: z.string(),
    code: z.string(),
    explanation: z.string(),
    tags: z.array(z.string()),
    project: z.string().optional(),
    isPublic: z.boolean().default(false)
})

export type SnippetDTO = z.infer<typeof SnippetSchema>