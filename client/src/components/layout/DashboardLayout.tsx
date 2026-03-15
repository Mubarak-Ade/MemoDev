import { useGetUser } from '@/modules/user/hooks';
import { Navigate, Outlet } from 'react-router';
import { SidebarProvider } from '../ui/sidebar';
import { SideBar } from './Sidebar';
import type { CSSProperties } from 'react';

const SIDEBAR_WIDTH = '18rem'

export const DashboardLayout = () => {
    const { data: user, isLoading } = useGetUser()
    if (isLoading) {
        return null
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return (
        <SidebarProvider style={{['--sidebar-width'] : SIDEBAR_WIDTH} as CSSProperties}>
            <SideBar />
            <main>
                <Outlet />
            </main>
        </SidebarProvider>
    )
}
