import { Request } from "express";
import { UAParser } from "ua-parser-js";

export const parseDevice = (req: Request) => {
    const ua = UAParser(req.headers['user-agent'])
    const browser = ua.browser.name || 'Unknown'
    const os = ua.os.name || 'Unknown'
    return `${browser} - ${os}`
}


export const parseIp = (req: Request) => {
    const forwarded = req.headers['x-forwarded-for']
    if (typeof forwarded === "string") return forwarded.split(",")[0].trim()
    return req.socket.remoteAddress ?? "Unknown"
}