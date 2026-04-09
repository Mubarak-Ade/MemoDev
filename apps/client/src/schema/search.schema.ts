import z from 'zod'

const SearchProjectSchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string().optional().default(''),
    icon: z.string(),
    color: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

const SearchSnippetSchema = z.object({
    _id: z.string(),
    title: z.string(),
    slug: z.string(),
    language: z.string(),
    updatedAt: z.string().optional(),
    createdAt: z.string().optional(),
    project: SearchProjectSchema,
})

export const SearchResponseSchema = z.object({
    snippets: z.array(SearchSnippetSchema),
    projects: z.array(SearchProjectSchema),
})

export type SearchProject = z.infer<typeof SearchProjectSchema>
export type SearchSnippet = z.infer<typeof SearchSnippetSchema>
export type SearchResponse = z.infer<typeof SearchResponseSchema>
