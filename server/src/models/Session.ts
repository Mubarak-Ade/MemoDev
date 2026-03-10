import { Types, Model, model, Schema } from "mongoose";


interface ISession {
    userId: Types.ObjectId
    refreshTokenHash: string
    userAgent: string
    ip: string
    expireAt: Date
}

const SessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    refreshTokenHash: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        default: "unknown"
    },
    ip: {
        type: String,
        default: "unknown"
    },
    expireAt: {
        type: Date,
        default: Date.now() 
    }
}, { timestamps: true })

const Session : Model<ISession> = model<ISession>("Session", SessionSchema)
export default Session