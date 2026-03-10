import { Types, Schema, Model, model } from 'mongoose'

export interface IResetPassword {
    userId: Types.ObjectId
    token: string
    expiresAt: Date
}

export const ResetPasswordSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
})

const PasswordReset: Model<IResetPassword> = model<IResetPassword>('PasswordReset', ResetPasswordSchema)
export default PasswordReset
