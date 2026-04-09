export const queryBuilder = (filter: any) => {
    const params = new URLSearchParams()
    params.append('page', String(filter.page ?? 1))
    params.append('limit', String(filter.limit ?? 5))

    if (Array.isArray(filter.tags) && filter.tags.length > 0) {
        params.append('tags', filter.tags.join(','))
    }

    if (Array.isArray(filter.languages) && filter.languages.length > 0) {
        params.append('languages', filter.languages.join(','))
    }

    if (filter.project) params.append('project', filter.project)
    if (filter.dateRange && filter.dateRange !== 'custom') {
        params.append('dateRange', filter.dateRange)
    }
    if (filter.startTime) params.append('startTime', filter.startTime)
    if (filter.endTime) params.append('endTime', filter.endTime)

    return params.toString()
}
