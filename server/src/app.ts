import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import authRoute from './modules/auth/auth.route'
import { isHttpError } from 'http-errors'
import cookieParser from 'cookie-parser';

const app = express()

app.use(cookieParser())

app.set('trust-proxy', 1)

app.use(express.json())

app.use(morgan('dev'))

app.use('/api/auth', authRoute)

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
