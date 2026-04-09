import createHttpError from 'http-errors'
import { ProjectDTO } from '../../schema/project.schema'
import Project from '../../models/Project'
import Snippet from '../../models/Snippet'
import mongoose from 'mongoose'

const validateIcon = (icon: string) => {
    const allowedIcon = ['folder', 'database', 'code', 'terminal', 'auth']
    if (!allowedIcon.includes(icon)) {
        throw createHttpError(400, 'Invalid Icon')
    }
}

const FALLBACK_PROJECT_NAME = 'Unassigned'
const FALLBACK_PROJECT_DESCRIPTION = 'Snippets moved from deleted projects'

export const findOrCreateFallbackProject = async (userId: string) => {
    const existingFallbackProject = await Project.findOne({
        user: userId,
        isFallback: true,
    })

    if (existingFallbackProject) {
        return existingFallbackProject
    }

    const [createdFallbackProject] = await Project.create(
        [{
            name: FALLBACK_PROJECT_NAME,
            description: FALLBACK_PROJECT_DESCRIPTION,
            user: userId,
            icon: 'folder',
            color: 'gray',
            isFallback: true,
        }],
    )

    return createdFallbackProject
}

const getOwnedProjectOrThrow = async (id: string, userId: string) => {
    const project = await Project.findById(id)

    if (!project) {
        throw createHttpError(404, 'Project Not Found')
    }

    if (project.user.toString() !== userId) {
        throw createHttpError(403, 'unauthorized')
    }

    return project
}

const CreateProjectService = async (data: ProjectDTO, userId: string) => {
    if (!data) {
        throw createHttpError(400, 'Fields are missing')
    }
    validateIcon(data.icon)
    const project = await Project.create({
        name: data.name,
        description: data.description,
        user: userId,
        icon: data.icon,
        color: data.color,
    })
    return project
}

const GetProjectService = async (userId: string) => {
    const userObjectId = new mongoose.Types.ObjectId(userId)

    const project = await Project.aggregate([
        {
            $match: {
                user: userObjectId,
            },
        },
        {
            $lookup: {
                from: "snippets",
                let: { projectId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$project", "$$projectId"] },
                                    { $eq: ["$user", userObjectId] },
                                ],
                            },
                        },
                    },
                    {
                        $count: "count",
                    },
                ],
                as: "snippetStats",
            },
        },
        {
            $addFields: {
                snippetCount: {
                    $ifNull: [{ $arrayElemAt: ["$snippetStats.count", 0] }, 0],
                },
            },
        },
        {
            $project: {
                snippetStats: 0,
            },
        },
        {
            $sort: { updatedAt: -1 },
        },
    ])

    return project
}

const GetSingleProjectService = async (id: string, userId: string) => {
    const project = await Project.findById(id)
    if (!project) {
        throw createHttpError(404, 'Project Not Found')
    }

    if (project.user.toString() !== userId) {
        throw createHttpError(403, 'unauthorized')
    }

    return project
}

const GetProjectDetails = async (slug: string, userId: string) => {
    const project = await Project.findOne({slug: slug})
    if (!project) {
        throw createHttpError(404, 'Project Not Found')
    }
    if (project.user.toString() !== userId) {
        throw createHttpError(403, 'unauthorized')
    }
    const snippets = await Snippet.find({project: project._id, user: userId})
    return {project, snippets}
}

const UpdateProjectService = async (id: string, data: Partial<ProjectDTO>, userId: string) => {
    if (data.icon !== undefined) {
        validateIcon(data.icon)
    }
    const project = await Project.findOneAndUpdate({ user: userId, _id: id }, data, {
        returnDocument: 'after',
        runValidators: true,
    })
    if (project?.user.toString() !== userId) {
        throw createHttpError(400, 'Unuauthorized')
    }
    if (!project) {
        throw createHttpError(404, 'Project Not Found')
    }
    return project
}

const DeleteProjectService = async (id: string, userId: string) => {
    const project = await getOwnedProjectOrThrow(id, userId)

    if (project.isFallback) {
        throw createHttpError(400, 'Fallback project cannot be deleted')
    }

    const fallbackProject = await findOrCreateFallbackProject(userId)
    const moveResult = await Snippet.updateMany(
        { project: project._id, user: userId },
        { $set: { project: fallbackProject._id } },
    )
    const movedCount = moveResult.modifiedCount ?? 0

    if (movedCount > 0) {
        await Project.findByIdAndUpdate(fallbackProject._id, {
            $inc: { snippetCount: movedCount },
        })
    }

    const deletedProject = await Project.findOneAndDelete({ _id: project._id, user: userId })

    if (!deletedProject) {
        if (movedCount > 0) {
            await Snippet.updateMany(
                { project: fallbackProject._id, user: userId },
                { $set: { project: project._id } },
            )
            await Project.findByIdAndUpdate(fallbackProject._id, {
                $inc: { snippetCount: -movedCount },
            })
        }

        throw createHttpError(500, 'Failed to delete project')
    }

    return deletedProject
}

export default {
    CreateProjectService,
    GetProjectService,
    GetProjectDetails,
    GetSingleProjectService,
    UpdateProjectService,
    DeleteProjectService,
    findOrCreateFallbackProject,
}
