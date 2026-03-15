import createHttpError from "http-errors"
import { ProjectDTO } from "../../schema/project.schema"
import Project from "../../models/Project"

const CreateProjectService = async (data: ProjectDTO, userId: string) => {
    if (!data) {
        throw createHttpError(400, "Fields are missing")
    }
    const project = await Project.create({name: data.name, description: data.description, user: userId})
    return project
}

const GetProjectService = async (userId: string) => {
    const project = await Project.find({user: userId}).lean()

    return project
}

const GetSingleProjectService = async (id:string, userId: string) => {
    const project = await Project.findById(id)
    if (!project) {
        throw createHttpError(404, "Project Not Found")
    }

    if (project.user.toString() !== userId) {
        throw createHttpError(401, "unauthorized")
    }

    return project
}

const UpdateProjectService = async (id: string, data:Partial<ProjectDTO>, userId: string) => {
    const project = await Project.findOneAndUpdate({user: userId, _id: id}, data, {returnDocument: 'after', runValidators: true})
    if (project?.user.toString() !== userId) {
        throw createHttpError(400, "Unuauthorized")
    }
    if (!project) {
        throw createHttpError(404, "Project Not Found")
    }
    return project
}

const DeleteProjectService = async (id: string, userId: string) => {
    const project = await Project.findOneAndDelete({_id: id, user: userId})
    if (project?.user.toString() !== userId) {
        throw createHttpError(400, "Unuauthorized")
    }
    if (!project) {
        throw createHttpError(404, "Project Not Found")
    }    
    return project
}


export default {CreateProjectService, GetProjectService, GetSingleProjectService, UpdateProjectService, DeleteProjectService}