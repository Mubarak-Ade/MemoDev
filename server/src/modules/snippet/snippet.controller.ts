import { RequestHandler } from 'express'
import SnippetService from './snippet.service'
import { zodParser } from '../../utils/zodValidator'
import { SnippetSchema } from '../../schema/snippet.schema'
 
export const getSnippets: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const snippet = await SnippetService.GetSnippetService(req.userId as string)
        res.status(200).json(snippet)
    } catch (error) {
        next(error)
    }
}

export const getSingleSnippet: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = req.params.id as string
        const userId = req.userId as string
        const snippet = await SnippetService.GetSingleSnippetService(id, userId)
        res.status(200).json(snippet)
    } catch (error) {
        next(error)
    }
}

export const getTags: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const tags = await SnippetService.GetTagsService()
        res.status(200).json(tags)
    } catch (error) {
        next(error)
    }
}

export const createSnippet: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const data = zodParser(SnippetSchema, req.body)
        const snippet = await SnippetService.CreateSnippetService(data, req.userId as string)
        res.status(200).json(snippet)
    } catch (error) {
        next(error)
    }
}

export const updateSnippet: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = req.params.id as string
        const userId = req.userId as string
        const data = zodParser(SnippetSchema.partial(), req.body)
        const snippet = await SnippetService.UpdateSnippetService(id, data, userId)
        res.status(200).json(snippet)
    } catch (error) {
        next(error)
    }
}

export const deleteSnippet: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        await SnippetService.DeleteSnippetService(req.params.id as string, req.userId as string)
        res.status(200).json({ message: 'Snippet Deleted Successfully' })
    } catch (error) {
        next(error)
    }
}