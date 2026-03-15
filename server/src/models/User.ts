import { Model, model, Schema } from "mongoose";
import bcrypt from "bcryptjs"

export interface IUser extends Document {
    email: string,
    username: string,
    password: string,
    profile: string,
    isVerified: boolean,

    verifyToken: string | null,

    verifyTokenExpiresAt: Date | null,
    comparePassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
    verifyToken: {
        type: String,
        default: null
    },
    verifyTokenExpiresAt: {
        type: Date,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(password: string) : Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

const User: Model<IUser> = model<IUser>('User', UserSchema)

export default User