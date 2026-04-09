import z from 'zod'

export const SnippetSchema = z.object({
    title: z.string().trim().min(1, 'Title is required'),
    code: z.string().trim().min(1, 'Code is required'),
    explanation: z.string().trim().min(1, 'Explanation is required'),
    tags: z.array(z.string().trim().min(1)).default([]),
    project: z.string().trim().min(1, 'Project is required'),
    language: z.enum(['javascript', 'typescript', 'markdown', 'tsx']),
    isDraft: z.boolean().default(true),
})

export type SnippetDTO = z.infer<typeof SnippetSchema>
