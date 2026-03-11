import type { Login } from "@/schema/AuthSchema";
import api from "@/utils/api";

export const loginService = async (data: Login): Promise<void> => {
    const res = await api.post('/auth/login', data)
    return res.data
}

export const logoutService = async (): Promise<void> => {
    const res = await api.post('/auth/logout')
    return res.data
}