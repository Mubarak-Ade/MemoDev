import { Skeleton } from '@/components/ui/skeleton'

export const ProjectModalSkeleton = () => {
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-popover/50 px-4 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-[1.5rem] border border-border bg-card p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-20 w-full rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <div className="grid grid-cols-5 gap-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton key={index} className="h-16 rounded-md" />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row-reverse gap-2 pt-2">
                        <Skeleton className="h-11 w-32 rounded-full" />
                        <Skeleton className="h-11 w-28 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
