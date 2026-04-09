import mongoose, { Document, model, Model, Schema } from 'mongoose'
import { createSlug } from '../utils/slug'

export interface IProject extends Document {
    name: string
    description: string
    slug: string
    icon: string
    color: string
    user: string
    snippetCount: number
    isFallback: boolean
}
const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        index: true,
    },
    icon: {
        type: String,
        default: "folder"
    },
    color: {
        type: String,
        default: "gray",
    },
    snippetCount: {
        type: Number,
        default: 0,
    },
    isFallback: {
        type: Boolean,
        default: false,
        index: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {timestamps: true})

ProjectSchema.index(
    { user: 1, isFallback: 1 },
    { unique: true, partialFilterExpression: { isFallback: true } },
)

ProjectSchema.index(
    {
        name: "text",
        description: "text",
    },
    {
        weights: {
            name: 10,
            description: 2,
        },
    },
)

ProjectSchema.pre('save', async function (this: IProject) {
    if (!this.isModified('name') || !this.isNew) return
    const ProjectModel = this.constructor as Model<IProject>
    const baseSlug = createSlug(this.name)
    let candidateSlug = baseSlug
    let suffix = 2

    while (await ProjectModel.exists({ slug: candidateSlug, _id: { $ne: this._id } })) {
        candidateSlug = `${baseSlug}-${suffix}`
        suffix += 1
    }
    this.slug = candidateSlug
})
ProjectSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate() as {
        name?: string
        slug?: string
        $set?: { name?: string; slug?: string }
    } | null
    const nextName = update?.name ?? update?.$set?.name

    if (!nextName) {
        return
    }

    const ProjectModel = this.model as unknown as Model<IProject>
    const baseSlug = createSlug(nextName)
    const query = this.getQuery()
    const currentId = query._id
    let candidateSlug = baseSlug
    let suffix = 2

    while (await ProjectModel.exists({ slug: candidateSlug, _id: { $ne: currentId } })) {
        candidateSlug = `${baseSlug}-${suffix}`
        suffix += 1
    }

    if (update?.$set) {
        update.$set.slug = candidateSlug
    } else if (update) {
        update.slug = candidateSlug
    }
})

const Project: Model<IProject> = model<IProject>('Project', ProjectSchema)
export default Project
