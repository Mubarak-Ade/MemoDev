import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <div className="flex h-14 w-full items-center justify-between border-b border-border bg-background/80 px-5 backdrop-blur-sm">
                <h1 className="text-base font-semibold tracking-tight">Dev Vault</h1>
            </div>
            <main className="flex w-full flex-1 flex-col items-center justify-center px-5 py-8">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
