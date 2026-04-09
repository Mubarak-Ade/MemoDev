import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginService, logoutService, registerService } from "./services";

export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: loginService,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user"]})
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: registerService,
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