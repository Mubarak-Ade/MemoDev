import type { User } from "@/schema/user.schema";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./services";

export const useGetUser = () => {
    return useQuery<User>({
        queryKey: ['users'],
        queryFn: getUsers,
        staleTime: Infinity,
        retry: false
    })
}