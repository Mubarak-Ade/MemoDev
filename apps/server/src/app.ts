import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import authRoutes from './modules/auth/auth.route'
import projectRoutes from "./modules/project/project.route"
import snippetRoutes from "./modules/snippet/snippet.route"
import searchRoute from "./modules/global_search/search.route"
import dashboardRoute from "./modules/dashboard/dashboard.route"
import { isHttpError } from 'http-errors'
import cookieParser from 'cookie-parser';
import cors from "cors"
import env from './env';
import { errorHandler, NotFoundHandler } from './middlewares/errorMiddleware'
import { protect } from './middlewares/authMiddlewares'
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
app.use(protect)
app.use('/api/projects', projectRoutes)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/snippets', snippetRoutes)
app.use('/api/search', searchRoute)

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World',
    })
})

app.use(NotFoundHandler)
app.use(errorHandler)

export default app
