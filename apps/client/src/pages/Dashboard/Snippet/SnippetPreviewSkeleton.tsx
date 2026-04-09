import { Skeleton } from '@/components/ui/skeleton'

export const SnippetPreviewSkeleton = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center dv-section">
            <div className="dv-panel w-full max-w-6xl overflow-hidden">
                <div className="flex items-center gap-4 border-b border-border p-5">
                    <Skeleton className="h-14 w-44 rounded-none border-r border-border bg-muted/60" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-7 w-56" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="size-11 rounded-full" />
                </div>

                <div className="grid h-140 xl:grid-cols-2">
                    <div className="border-b border-border p-6 xl:border-b-0 xl:border-r">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="mt-3 h-10 w-80" />
                        <Skeleton className="mt-6 h-[24rem] w-full rounded-xl" />
                    </div>
                    <div className="p-6">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="mt-3 h-[30rem] w-full rounded-xl" />
                    </div>
                </div>

                <div className="flex gap-4 border-t border-border p-5">
                    <Skeleton className="h-12 w-28 rounded-xl" />
                    <Skeleton className="h-12 w-32 rounded-xl" />
                </div>
            </div>
        </div>
    )
}
