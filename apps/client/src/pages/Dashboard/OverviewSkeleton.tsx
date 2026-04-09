import { DashboardHeader } from '@/components/features/Dashboard/DashboardHeader'
import { SnippetCardSkeleton } from '@/components/features/Dashboard/snippet/SnippetCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export const OverviewSkeleton = () => {
    return (
        <>
            <DashboardHeader />
            <div className="dv-section">
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

                <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SnippetCardSkeleton key={index} />
                    ))}
                </ul>
            </div>
        </>
    )
}
