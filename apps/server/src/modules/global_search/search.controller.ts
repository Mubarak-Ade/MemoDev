import { RequestHandler } from "express"
import GlobalSearchServices from "./search.service"

export const searchController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const q = req.query.q as string
        const searchOutput = await GlobalSearchServices(q, req.userId as string)
        res.status(200).json(searchOutput)
    } catch (error: unknown) {
        next(error)
    }
}
