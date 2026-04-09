import createHttpError from 'http-errors'
import Snippet, { ISnippet } from '../../models/Snippet'
import { SnippetDTO } from '../../schema/snippet.schema'
import Project from '../../models/Project'
import { _QueryFilter } from 'mongoose'
import { queryFilter } from '../../utils/queryBuilder'

const GetSnippetService = async (userId: string, query: any) => {
    const { filter, limit, page } = queryFilter(query, userId)
    const [snippets, total] = await Promise.all([
        Snippet.find(filter)
            .sort({ updatedAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .populate('project', 'name color icon')
            .lean(),
        Snippet.countDocuments(filter),
    ])

    return { filter: { limit, total, page, pages: Math.ceil(total / limit) }, snippets }
}

const GetDraftSnippetService = async (userId: string) => {
    const draftSnippets = await Snippet.find({ isDraft: true, user: userId }).lean()
    return draftSnippets
}

const GetTagsService = async (userId: string) => {
    const tags = await Snippet.find({ user: userId }).distinct('tags')
    return tags
}

const GetLangsService = async (userId: string) => {
    const lang = await Snippet.find({ user: userId }).distinct('language')
    return lang
}

const getOwnedProjectOrThrow = async (projectId: string, userId: string) => {
    const project = await Project.findOne({ _id: projectId, user: userId })

    if (!project) {
        throw createHttpError(404, 'Project Not Found')
    }

    return project
}

const CreateSnippetService = async (data: SnippetDTO, userId: string) => {
    if (!data) {
        throw createHttpError(404, 'Fields are missing')
    }

    const normalizedTags = data.tags.map((tag) => tag.trim().toLowerCase())
    await getOwnedProjectOrThrow(data.project, userId)

    const snippet = await Snippet.create({
        title: data.title,
        explanation: data.explanation,
        language: data.language,
        code: data.code,
        user: userId,
        tags: normalizedTags,
        project: data.project,
        isDraft: data.isDraft,
    })
    await Project.findByIdAndUpdate(data.project, { $inc: { snippetCount: 1 } })
    return snippet
}

const GetSingleSnippetService = async (id: string, userId: string) => {
    const snippet = await Snippet.findById(id).populate('project', 'name icon color')
    if (!snippet) {
        throw createHttpError(404, 'Snippet Not Found')
    }

    if (snippet.user.toString() !== userId) {
        throw createHttpError(401, 'unauthorized')
    }

    return snippet
}

const GetSnippetDetails = async (slug: string) => {
    const snippet = await Snippet.findOne({ slug }).populate('project', 'name icon color').lean()
    if (!snippet) throw createHttpError(404, 'Snippet Not Found')
    return snippet
}

const UpdateSnippetService = async (id: string, data: Partial<SnippetDTO>, userId: string) => {
    const snippet = await Snippet.findOne({ user: userId, _id: id })

    if (!snippet) {
        throw createHttpError(404, 'Snippet Not Found')
    }

    const nextProjectId = data.project ?? snippet.project.toString()
    if (data.project && nextProjectId !== snippet.project.toString()) {
        await getOwnedProjectOrThrow(data.project, userId)
    }

    const update: Partial<SnippetDTO> = {}
    if (data.title !== undefined) update.title = data.title
    if (data.code !== undefined) update.code = data.code
    if (data.explanation !== undefined) update.explanation = data.explanation
    if (data.language !== undefined) update.language = data.language
    if (data.isDraft !== undefined) update.isDraft = data.isDraft
    if (data.project !== undefined) update.project = data.project
    if (data.tags !== undefined) {
        update.tags = data.tags.map((tag) => tag.trim().toLowerCase())
    }

    if (Object.keys(update).length === 0) {
        return snippet
    }

    const updatedSnippet = await Snippet.findOneAndUpdate({ user: userId, _id: id }, update, {
        returnDocument: 'after',
        runValidators: true,
    })

    if (!updatedSnippet) {
        throw createHttpError(404, 'Snippet Not Found')
    }

    if (data.project && data.project !== snippet.project.toString()) {
        await Project.findByIdAndUpdate(snippet.project, { $inc: { snippetCount: -1 } })
        await Project.findByIdAndUpdate(data.project, { $inc: { snippetCount: 1 } })
    }

    return updatedSnippet
}


const DeleteSnippetService = async (id: string, userId: string) => {
    const snippet = await Snippet.findOneAndDelete({ _id: id, user: userId })
    if (!snippet) {
        throw createHttpError(404, 'Snippet Not Found')
    }

    await Project.findByIdAndUpdate(snippet.project, { $inc: { snippetCount: -1 } })

    return snippet
}

export default {
    GetSnippetService,
    GetDraftSnippetService,
    CreateSnippetService,
    GetSingleSnippetService,
    UpdateSnippetService,
    DeleteSnippetService,
    GetTagsService,
    GetSnippetDetails,
    GetLangsService,
}
