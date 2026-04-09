import z from 'zod'
import { ProjectSchema } from './project.schema'

const LanguageSchema = z.enum(['javascript', 'typescript', 'markdown', 'tsx'])


export const SnippetSchema = z.object({
    _id: z.string().optional(),
    slug: z.string(),
    title: z.string().trim().min(1, 'Title is required'),
    project: ProjectSchema,
    explanation: z.string().trim().min(1, 'Explanation is required'),
    code: z.string().trim().min(1, 'Code is required'),
    language: LanguageSchema,
    tags: z.array(z.string().trim().min(1)).default([]),
    isDraft: z.boolean().default(true),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
})

const FilterSnippetSchema = z.object({
    filter: z.object({
        limit: z.number(),
        total: z.number(),
        page: z.number(),
        pages: z.number(),
    }),
    snippets: z.array(SnippetSchema)
})
export const EditSnippetSchema = z.object({
    title: z.string().trim().min(1, 'Title is required'),
    project: z.string().trim().min(1, 'Project is required'),
    explanation: z.string().trim().min(1, 'Explanation is required'),
    code: z.string().trim().min(1, 'Code is required'),
    language: LanguageSchema,
    tags: z.array(z.string().trim().min(1)).default([]),
    isDraft: z.boolean().default(true),
})

export type SnippetFormInput = z.input<typeof EditSnippetSchema>
export type SnippetFormOutput = z.output<typeof EditSnippetSchema>
export type SnippetInput = z.infer<typeof EditSnippetSchema>
export type Snippet = z.infer<typeof SnippetSchema>
export type FilterSnippet = z.infer<typeof FilterSnippetSchema>