import { useGetUser } from '@/modules/user/hooks';
import { Navigate, Outlet } from 'react-router';

export const DashboardLayout = () => {
    const { data: user, isLoading } = useGetUser()
    if (isLoading) {
        return null
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
