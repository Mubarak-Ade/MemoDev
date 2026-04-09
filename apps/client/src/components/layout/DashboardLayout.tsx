import { useGetUser } from '@/modules/user/hooks';
import { Navigate, Outlet } from 'react-router';
import { SidebarProvider } from '../ui/sidebar';
import { SideBar } from './Sidebar';
import type { CSSProperties } from 'react';
import { devVaultTheme } from '@/theme/devVault';
import { DashboardShellSkeleton } from './DashboardShellSkeleton';

export const DashboardLayout = () => {
    const { data: user, isLoading } = useGetUser()
    if (isLoading) {
        return <DashboardShellSkeleton />
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return (
        <SidebarProvider
            style={{ ['--sidebar-width']: devVaultTheme.layout.sidebarWidth } as CSSProperties}
        >
            <SideBar />
            <main className="min-h-svh w-full bg-background">
                <Outlet />
            </main>
        </SidebarProvider>
    )
}
