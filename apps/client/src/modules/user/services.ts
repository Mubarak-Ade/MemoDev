import type { User } from "@/schema/user.schema";
import api from "@/utils/api";

export const getUsers = async () : Promise<User> => {
    const res = await api.get('/auth/me', {requireAuth: true} as any)
    return res.data
}