import { date } from "zod"
import dashboardService from "./dashboard.service"
import { RequestHandler } from "express"

export const dashboardController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const userId = req.userId as string
        const output = await dashboardService(userId)
        res.status(200).json(output)
    } catch (error: unknown) {
        next(error)
    }
}
