import Project from '../../models/Project'
import Snippet, { ISnippet } from '../../models/Snippet'

const dashboardService = async (userId: string) => {
    const [snippet, totalSnippets, totalDrafts, totalProjects, topTags] = await Promise.all([
        Snippet.find({ user: userId, isDraft: false }).sort({ updatedAt: -1 }).limit(5),
        Snippet.countDocuments({ user: userId, isDraft: false }),
        Snippet.countDocuments({isDraft: true, user: userId}),
        Project.countDocuments({ user: userId }),
        Snippet.find({ user: userId }).distinct('tags')
    ])
    let recentSnippets = snippet.map((snippet) => ({
        id: snippet._id,
        title: snippet.title,
        language: snippet.language,
        slug: snippet.slug,
        updatedAt: snippet.updatedAt
    })) 
    return { recentSnippets, totalSnippets, totalDrafts, totalProjects, topTags }
}

export default dashboardService
