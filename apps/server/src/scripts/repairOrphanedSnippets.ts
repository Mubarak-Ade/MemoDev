import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../db/connectDb'
import Snippet from '../models/Snippet'
import Project from '../models/Project'
import { findOrCreateFallbackProject } from '../modules/project/project.service'

const repairOrphanedSnippets = async (): Promise<void> => {
    await connectDB()

    const orphanSnippets = await Snippet.aggregate([
        {
            $lookup: {
                from: 'projects',
                localField: 'project',
                foreignField: '_id',
                as: 'projectDoc',
            },
        },
        {
            $match: {
                $expr: {
                    $eq: [{ $size: '$projectDoc' }, 0],
                },
            },
        },
        {
            $project: {
                _id: 1,
                user: 1,
            },
        },
    ])

    const snippetsByUser = new Map<string, string[]>()

    for (const snippet of orphanSnippets) {
        const userId = snippet.user?.toString()
        if (!userId) {
            continue
        }

        const userSnippets = snippetsByUser.get(userId) ?? []
        userSnippets.push(snippet._id.toString())
        snippetsByUser.set(userId, userSnippets)
    }

    let repairedCount = 0

    for (const [userId, snippetIds] of snippetsByUser.entries()) {
        const fallbackProject = await findOrCreateFallbackProject(userId)

        await Snippet.updateMany(
            { _id: { $in: snippetIds } },
            { $set: { project: fallbackProject._id } },
        )

        await Project.findByIdAndUpdate(fallbackProject._id, {
            $inc: { snippetCount: snippetIds.length },
        })

        repairedCount += snippetIds.length
    }

    console.log(`Repaired ${repairedCount} orphaned snippet(s).`)
    await mongoose.disconnect()
}

repairOrphanedSnippets()
    .then(() => process.exit(0))
    .catch(async (error) => {
        console.error('Failed to repair orphaned snippets:', error)
        await mongoose.disconnect().catch(() => undefined)
        process.exit(1)
    })
