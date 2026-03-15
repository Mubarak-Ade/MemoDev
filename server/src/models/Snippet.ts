import mongoose, { Document, model, Model } from "mongoose";
import { takeCoverage } from "node:v8";

interface ISnippet extends Document {
    title: string,
    code: string,
    explanation: string,
    tags: [string],
    project: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId, 
    isPublic: boolean
}

const SnippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
    tags: [{type: String, trim: true, lowercase: true}],
    project: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        default: "unknown"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    isPublic: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

SnippetSchema.index({title: 1, tags: 1})

const Snippet: Model<ISnippet> = model<ISnippet>("Snippet", SnippetSchema)

export default Snippet