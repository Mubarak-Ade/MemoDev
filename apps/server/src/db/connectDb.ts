import mongoose from 'mongoose'
import env from '../env';

const connectDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        return
    }

    await mongoose.connect(env.MONGO_URI)
    console.log('MongoDB is connected successfully')
}

export default connectDB
