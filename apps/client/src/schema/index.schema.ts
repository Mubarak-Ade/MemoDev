import z from 'zod'

const DashboardSchema = z.object({
    totalSnippets: z.number(),
    totalProjects: z.number(),
    totalDrafts: z.number(),
    recentSnippets: z.array(
        z.object({
            id: z.string(),
            slug: z.string(),
            title: z.string(),
            language: z.string(),
            updatedAt: z.string(),
        }),
    ),
    topTags: z.array(z.string()),
})

export type Dashboard = z.infer<typeof DashboardSchema>
