import app from './app'
import connectDB from './db/connectDb';
import env from './env'

const port = env.PORT || 3000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`Server Listening in Port ${port}`)
        })
    } catch (error) {
        console.error('Failed to start server', error)
        process.exit(1)
    }
}

startServer()