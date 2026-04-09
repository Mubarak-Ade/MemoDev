export const queryFilter = (query: any, userId: string) => {
    const ONE_DAY = 24 * 60 * 60 * 1000

    const { tags, languages, project, dateRange, startTime, endTime, limit=5, page=1 } = query
    let start: Date | null = null
    const end: Date = new Date()

    const filter: any = {}
    filter.user = userId
    if (tags) filter.tags = { $in: tags.split(",") }
    if (languages) filter.language = { $in: languages.split(",") }
    if (project) {
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
            filter.updatedAt.$gte = new Date(startTime)
        }

        if (endTime) {
            filter.updatedAt.$lte = new Date(endTime)
        }
    }

    filter.isDraft = false

    return {filter, limit: Number(limit), page: Number(page)}
}
