import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import z from 'zod'

const optionalCsv = z
    .string()
    .trim()
    .optional()
    .transform((value) => value ? value.split(',').map((item) => item.trim()).filter(Boolean) : undefined)

const querySchema = z.object({
    tags: optionalCsv,
    languages: optionalCsv,
    project: z.string().trim().optional(),
    dateRange: z.enum(['1d', '7d', '30d']).optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    limit: z.coerce.number().int().min(1).max(50).default(5),
    page: z.coerce.number().int().min(1).default(1),
})

export const queryFilter = (query: any, userId: string) => {
    const parsed = querySchema.safeParse(query)
    if (!parsed.success) {
        throw createHttpError(400, parsed.error.format())
    }

    const ONE_DAY = 24 * 60 * 60 * 1000

    const { tags, languages, project, dateRange, startTime, endTime, limit, page } = parsed.data
    let start: Date | null = null
    const end: Date = new Date()

    const filter: any = {}
    filter.user = userId
    if (tags) filter.tags = { $in: tags }
    if (languages) filter.language = { $in: languages }
    if (project) {
        if (!mongoose.isValidObjectId(project)) {
            throw createHttpError(400, 'Invalid project filter')
        }
        filter.project = project
    }

    if (dateRange) {
        const now = new Date()

        switch (dateRange) {
            case '1d':
                start = new Date(now.getTime() - 1 * ONE_DAY)
                break

            case '7d':
                start = new Date(now.getTime() - 7 * ONE_DAY)
                break

            case '30d':
                start = new Date(now.getTime() - 30 * ONE_DAY)
                break

            default:
                break
        }

        if (start) {
            filter.updatedAt = {
                $gte: start,
                $lte: end,
            }
        }
    }

    if (startTime || endTime) {
        filter.updatedAt = {}

        if (startTime) {
            filter.updatedAt.$gte = startTime
        }

        if (endTime) {
            filter.updatedAt.$lte = endTime
        }
    }

    filter.isDraft = false

    return {filter, limit, page}
}
