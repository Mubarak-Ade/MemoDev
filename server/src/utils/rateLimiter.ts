import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 5,
    message: "Too many login attempts from this IP",
    standardHeaders: true,
    legacyHeaders: false
})

export const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 100,
    max: 10,
    message: "Too many register attempts from this IP",
    standardHeaders: true,
    legacyHeaders: false
})
export const passwordLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 3,
    message: "Too many password reset request",
    standardHeaders: true,
    legacyHeaders: false
})