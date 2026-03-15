import mongoose, { Document, model, Model, Schema } from "mongoose";

interface IProject extends Document {
    name: string,
    description: string,
    user: string
    
}
const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true 
    }
})

const Project: Model<IProject> = model<IProject>("Project", ProjectSchema)
export default Project