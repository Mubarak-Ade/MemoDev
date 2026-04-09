import { useQuery } from "@tanstack/react-query"
import { getDashboard } from "./services"
import type { Dashboard } from "@/schema/index.schema"

export const useDashboard = () => {
    return useQuery<Dashboard>({
        queryKey: ['dashboard'],
        queryFn: getDashboard
    })
}