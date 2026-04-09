import { DashboardHeader } from '@/components/features/Dashboard/DashboardHeader'
import { SnippetCardSkeleton } from '@/components/features/Dashboard/snippet/SnippetCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export const OverviewSkeleton = () => {
    return (
        <>
            <DashboardHeader />
            <div className="p-10">
                <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="border p-5 shadow-2xl space-y-3 rounded-xl">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-40" />
                            <Skeleton className="h-10 w-20" />
                        </div>
                    ))}
                </div>
                <div className="flex mt-10 gap-10">
                    <div className="max-w-2xl w-full">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-7 w-40" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                        <div className="mt-2 grid gap-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <SnippetCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                    <div className="max-w-xs w-full">
                        <Skeleton className="h-7 w-24" />
                        <div className="flex flex-wrap gap-2 mt-5">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className="h-8 w-20 rounded" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
