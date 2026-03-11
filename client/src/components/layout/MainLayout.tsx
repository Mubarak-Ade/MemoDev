import { Navigate, Outlet } from 'react-router'
import { Navbar } from '../features/Navbar'
import { useGetUser } from '@/modules/user/hooks'

const MainLayout = () => {
    const { data: user } = useGetUser()
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
