import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../db/connectDb'
import Project from '../models/Project'

const seedProject = async () => {
    await connectDB()
    await Project.aggregate([
        {
            $lookup: {
                from: 'snippets',
                let: { projectId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$project', '$$projectId'] } } },
                    { $count: 'count' },
                ],
                as: 'snippetCount',
            },
        },
        {
            $project: {
                snippetCount: {
                    $ifNull: [{$arrayElemAt: ["$snippetCount.count", 0]}, 0]
                }
            }
        }
    ]).then(async (results) => {
        const bulk = results.map(doc => ({
            updateOne: {
                filter: {_id: doc._id},
                update: {$set: {snippetCount: doc.snippetCount}}
            }
        }))
        await Project.bulkWrite(bulk)
    })
    await mongoose.disconnect()
}

seedProject()
    .then(() => process.exit(0))
    .catch(async (err) => {
        console.error('Failed to update project:', err)
        await mongoose.disconnect().catch(() => undefined)
        process.exit(1)
    })
