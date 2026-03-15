import createHttpError from 'http-errors'
import Snippet from '../../models/Snippet'
import { SnippetDTO } from '../../schema/snippet.schema'

const GetSnippetService = async (userId: string) => {
    const snippet = await Snippet.find({ user: userId }).lean()
    return snippet
}

const GetTagsService = async () => {
    const tags = await Snippet.distinct('tags')
    return tags    
}


const CreateSnippetService = async (data: SnippetDTO, userId: string) => {
    if (!data) {
        throw createHttpError(404, 'Fields are missing')
    }

    const normalizedTags = data.tags.map(tag => tag.trim().toLowerCase())

    const snippet = await Snippet.create({
        title: data.title,
        explanation: data.explanation,
        code: data.code,
        user: userId,
        tags: normalizedTags,
        project: data.project,
        isPublic: data.isPublic,
    })
    return snippet
}

const GetSingleSnippetService = async (id: string, userId: string) => {
    const snippet = await Snippet.findById(id)
    if (!snippet) {
        throw createHttpError(404, 'Snippet Not Found')
    }

    if (snippet.user.toString() !== userId) {
        throw createHttpError(401, 'unauthorized')
    }

    return snippet
}

const UpdateSnippetService = async (id: string, data: Partial<SnippetDTO>, userId: string) => {
    const {tags, ...rest} = data
    const normalizedTags = tags?.map(tag => tag.trim().toLowerCase())
    const snippet = await Snippet.findOneAndUpdate({ user: userId, _id: id }, { ...rest, tags: normalizedTags }, { returnDocument: 'after', runValidators: true })
    if (snippet?.user.toString() !== userId) {
        throw createHttpError(400, "Unuauthorized")
    }
    if (!snippet) {
        throw createHttpError(404, "Snippet Not Found")
    }
    return snippet
}

const DeleteSnippetService = async (id: string, userId: string) => {
    const snippet = await Snippet.findOneAndDelete({ _id: id, user: userId })
    if (snippet?.user.toString() !== userId) {
        throw createHttpError(400, "Unuauthorized")
    }
    if (!snippet) {
        throw createHttpError(404, "Snippet Not Found")
    }

    return snippet
}

export default { GetSnippetService, CreateSnippetService, GetSingleSnippetService, UpdateSnippetService, DeleteSnippetService, GetTagsService }
