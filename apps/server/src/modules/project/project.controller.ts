import { RequestHandler } from 'express'
import ProjectService from './project.service'
import { zodParser } from '../../utils/zodValidator'
import { ProjectSchema } from '../../schema/project.schema'
 
export const getProjects: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const project = await ProjectService.GetProjectService(req.userId as string)
        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
}

export const getSingleProject: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = req.params.id as string
        const userId = req.userId as string
        const project = await ProjectService.GetSingleProjectService(id, userId)
        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
}

export const GetProjectDetails: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const slug = req.params.slug as string
        const userId = req.userId as string
        const project = await ProjectService.GetProjectDetails(slug, userId)
        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
}

export const createProject: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const data = zodParser(ProjectSchema, req.body)
        const project = await ProjectService.CreateProjectService(data, req.userId as string)
        res.status(201).json(project)
    } catch (error) {
        next(error)
    }
}

export const updateProject: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = req.params.id as string
        const userId = req.userId as string
        const data = zodParser(ProjectSchema.partial(), req.body)
        const project = await ProjectService.UpdateProjectService(id, data, userId)
        res.status(201).json(project)
    } catch (error) {
        next(error)
    }
}

export const deleteProject: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = req.params.id as string
        const userId = req.userId as string
        await ProjectService.DeleteProjectService(id, userId)
        res.status(204).json({ message: 'Project Deleted Successfully' })
    } catch (error) {
        next(error)
    }
}