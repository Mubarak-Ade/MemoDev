import { mutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginService, logoutService } from "./services";

export const useLogin = () => {
    const queryClient = useQueryClient()
    return mutationOptions({
        mutationFn: loginService,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user"]})
        }
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