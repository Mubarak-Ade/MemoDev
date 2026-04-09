import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    forgotPassword,
    loginService,
    logoutService,
    registerService,
    resetPassword,
} from "./services";
import type { Login, Register } from "@/schema/auth.schema";

export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: Login) => loginService(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user"]})
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: Register) => registerService(data),
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: logoutService,
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['users']})
        }
    })
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email: string) => forgotPassword(email),
    })
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: ({ token, password }: { token: string; password: string }) =>
            resetPassword(token, password),
    })
}
