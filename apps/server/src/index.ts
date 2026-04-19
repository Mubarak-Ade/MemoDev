import Project from './models/Project'
import Snippet from './models/Snippet'
import app from './app'
import connectDB from './db/connectDb'
import env from './env'

const port = env.PORT || 3000

const startServer = async () => {
    try {
        await connectDB()
        const results = await Promise.allSettled([
            Project.syncIndexes(),
            Snippet.syncIndexes(),
        ])

        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                const modelName = index === 0 ? 'Project' : 'Snippet'
                console.warn(`Index sync skipped for ${modelName}:`, result.reason)
            }
        })

        app.listen(port, () => {
            console.log(`Server Listening in Port ${port}`)
        })
    } catch (error: unknown) {
        console.error('Failed to start server', error)
        process.exit(1)
    }
}

startServer()
