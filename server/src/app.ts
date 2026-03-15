import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import authRoutes from './modules/auth/auth.route'
import projectRoutes from "./modules/project/project.route"
import snippetRoutes from "./modules/snippet/snippet.route"
import { isHttpError } from 'http-errors'
import cookieParser from 'cookie-parser';
import cors from "cors"
import env from './env';
const app = express()

app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true
}))

app.use(cookieParser())

app.set('trust-proxy', 1)


app.use(express.json())

app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/snippets', snippetRoutes)

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World',
    })
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = 'Unknown Error Occured'
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({ error: errorMessage })
})

export default app
