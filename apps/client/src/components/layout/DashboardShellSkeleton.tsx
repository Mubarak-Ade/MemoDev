import { Skeleton } from '@/components/ui/skeleton'
import { SidebarMenuSkeleton } from '@/components/ui/sidebar'

export const DashboardShellSkeleton = () => {
    return (
        <div className="flex min-h-svh w-full bg-background text-foreground">
            <aside className="hidden w-[var(--sidebar-width)] shrink-0 border-r border-border bg-sidebar px-4 py-4 lg:flex">
                <div className="flex w-full flex-col gap-4">
                    <div className="rounded-xl border border-sidebar-border bg-background/40 px-4 py-3">
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="mt-2 h-3 w-40" />
                    </div>
                    <div className="space-y-2">
                        <SidebarMenuSkeleton showIcon />
                        <SidebarMenuSkeleton showIcon />
                        <SidebarMenuSkeleton showIcon />
                    </div>
                    <div className="space-y-2 pt-2">
                        <Skeleton className="h-3 w-20" />
                        <SidebarMenuSkeleton showIcon />
                        <SidebarMenuSkeleton showIcon />
                        <SidebarMenuSkeleton showIcon />
                    </div>
                    <div className="mt-auto space-y-3">
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>
            </aside>

            <main className="flex-1">
                <div className="border-b border-border bg-background/80 px-5 py-4 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="mx-auto h-11 w-full max-w-2xl rounded-xl" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-28 rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="dv-section space-y-6">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-36" />
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div className="space-y-3">
                                <Skeleton className="h-10 w-[min(42rem,80vw)]" />
                                <Skeleton className="h-5 w-[min(38rem,74vw)]" />
                                <Skeleton className="h-5 w-[min(34rem,68vw)]" />
                            </div>
                            <Skeleton className="h-12 w-12 rounded-xl" />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-80 rounded-[1.25rem] border border-border bg-card p-4"
                            >
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="mt-4 h-4 w-3/4" />
                                <Skeleton className="mt-2 h-4 w-1/2" />
                                <Skeleton className="mt-6 h-36 w-full rounded-xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
