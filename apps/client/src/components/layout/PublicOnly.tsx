import { useGetUser } from '@/modules/user/hooks'
import { Navigate, Outlet } from 'react-router'
import { AuthShellSkeleton } from './AuthShellSkeleton'

export const PublicOnly = () => {
    const { data: user, isLoading } = useGetUser()
    if (isLoading) {
        return <AuthShellSkeleton />
    }
    if (user) {
        return <Navigate to="/overview" replace />
    }
    return <Outlet />
}
