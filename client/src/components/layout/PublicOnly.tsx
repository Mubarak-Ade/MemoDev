import { useGetUser } from '@/modules/user/hooks'
import { Navigate, Outlet } from 'react-router'

export const PublicOnly = () => {
    const { data: user, isLoading } = useGetUser()
    if (isLoading) {
        return null
    }
    if (user) {
        return <Navigate to="/dashboard" replace />
    }
    return <Outlet />
}
