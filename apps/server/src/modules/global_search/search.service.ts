import Project from '../../models/Project'
import Snippet from '../../models/Snippet'

const GlobalSearchServices = async (q: string, userId: string) => {
    if (!q) {
        return {
            snippets: [],
            projects: []
        }
    }
    const filter = { $text: { $search: q }, user: userId }
    const [snippets, projects] = await Promise.all([
        Snippet.find(filter)
            .sort({ score: { $meta: 'textScore' }, updatedAt: -1 })
            .select('_id title slug language updatedAt createdAt project')
            .populate('project', 'name slug color icon')
            .lean(),
        Project.find(filter)
            .sort({ score: { $meta: 'textScore' }, updatedAt: -1 })
            .select('_id name slug description color icon updatedAt createdAt')
            .lean(),
    ])
    
    const output = {
        snippets,
        projects
    }
    return output
}

export default GlobalSearchServices
