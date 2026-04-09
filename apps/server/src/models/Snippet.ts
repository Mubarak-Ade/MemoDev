import mongoose, { Document, model, Model } from "mongoose";
import { takeCoverage } from "node:v8";
import { createSlug } from "../utils/slug";

type TimeStamps = {
    createdAt: Date,
    updatedAt: Date
}
export interface ISnippet extends Document, TimeStamps {
    title: string,
    code: string,
    explanation: string,
    tags: [string],
    project: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId, 
    language: string
    slug: string,
    isDraft: boolean
}

const SnippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    code: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true
    },
    tags: [{type: String, trim: true, lowercase: true}],
    project: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isDraft: {
        type: Boolean,
        default: true
    },
}, {timestamps: true})

SnippetSchema.index({tags: 1, slug: 1})
SnippetSchema.index(
    { title: "text", tags: "text", code: "text", explanation: "text" },
    {
        default_language: "none",
        language_override: "_textLanguage",
        weights: {
            title: 10,
            tags: 8,
            explanation: 4,
            code: 1,
        },
    },
)

SnippetSchema.pre("save", async function () {
    if (!this.isModified("title") && !this.isNew) {
        return;
    }

    const SnippetModel = this.constructor as Model<ISnippet>;
    const baseSlug = createSlug(this.title);
    let candidateSlug = baseSlug;
    let suffix = 2;

    while (await SnippetModel.exists({ slug: candidateSlug, _id: { $ne: this._id } })) {
        candidateSlug = `${baseSlug}-${suffix}`;
        suffix += 1;
    }

    this.slug = candidateSlug;
})

SnippetSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate() as { title?: string; slug?: string; $set?: { title?: string; slug?: string } } | null;
    const nextTitle = update?.title ?? update?.$set?.title;

    if (!nextTitle) {
        return;
    }

    const SnippetModel = this.model as unknown as Model<ISnippet>;
    const baseSlug = createSlug(nextTitle);
    const query = this.getQuery();
    const currentId = query._id;
    let candidateSlug = baseSlug;
    let suffix = 2;

    while (await SnippetModel.exists({ slug: candidateSlug, _id: { $ne: currentId } })) {
        candidateSlug = `${baseSlug}-${suffix}`;
        suffix += 1;
    }

    if (update?.$set) {
        update.$set.slug = candidateSlug;
    } else if (update) {
        update.slug = candidateSlug;
    }

})

const Snippet: Model<ISnippet> = model<ISnippet>("Snippet", SnippetSchema)

export default Snippet
