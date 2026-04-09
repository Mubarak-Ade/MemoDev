import type { Login, Register } from "@/schema/auth.schema";
import api from "@/utils/api";

export const loginService = async (data: Login): Promise<void> => {
    const res = await api.post('/auth/login', data)
    return res.data
}

export const registerService = async (data: Register) : Promise<void> => {
    const res = await api.post('/auth/signup', data)
    return res.data
}

export const forgotPassword = async (email: string) : Promise<void> => {
    return await api.post('/auth/forgot-password', { email })

}

export const resetPassword = async (token: string, password: string) : Promise<void> => {
    return await api.post('/auth/reset-password', { token, password })
}

export const logoutService = async (): Promise<void> => {
    const res = await api.post('/auth/logout')
    return res.data
}