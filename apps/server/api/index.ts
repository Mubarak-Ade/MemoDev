import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import authRoutes from '../src/modules/auth/auth.route'
import projectRoutes from "../src/modules/project/project.route"
import snippetRoutes from "../src/modules/snippet/snippet.route"
import searchRoute from "../src/modules/global_search/search.route"
import dashboardRoute from "../src/modules/dashboard/dashboard.route"
import { isHttpError } from 'http-errors'
import cookieParser from 'cookie-parser';
import cors from "cors"
import env from '../src/env';
import { errorHandler, NotFoundHandler } from '../src/middlewares/errorMiddleware'
import { protect } from '../src/middlewares/authMiddlewares'
import connectDB from '../src/db/connectDb'
import Project from '../src/models/Project'
import Snippet from '../src/models/Snippet'
const app = express()

app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await connectDB();
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

        next();
    } catch (error: unknown) {
        console.error('Database connection failed:', error);
        res.status(503).json({ 
            error: 'Database connection failed',
            message: 'Service temporarily unavailable'
        });
    }
});

app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true
}))

app.use(cookieParser())

app.set('trust-proxy', 1)


app.use(express.json())

app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use(protect)
app.use('/api/projects', projectRoutes)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/snippets', snippetRoutes)
app.use('/api/search', searchRoute)

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Hello World',
    })
})

app.use(NotFoundHandler)
app.use(errorHandler)

export default app
