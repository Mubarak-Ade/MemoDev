import { Navigate, Outlet, useLocation } from 'react-router'
import { Navbar } from '../features/Navbar'
import { useGetUser } from '@/modules/user/hooks'

const MainLayout = () => {
    const location = useLocation()
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register'
    const { data: user, isLoading } = useGetUser(!isAuthRoute)
    if (isLoading) {
        return null
    }
    if (user) {
        return <Navigate to="/dashboard" replace />
    }
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
