import z from "zod";

export const FilterSchema = z.object({
    tags: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    project: z.string().optional(),
    dateRange: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
})

export type Filtering = z.infer<typeof FilterSchema>
