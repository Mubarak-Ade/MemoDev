import { Skeleton } from '@/components/ui/skeleton'

export const CreateSnippetSkeleton = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="border-b border-border bg-background/90 px-6 py-4 backdrop-blur-sm">
                <div className="mx-auto flex max-w-400 items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="size-12 rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-3 w-56" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-11 w-24 rounded-full" />
                        <Skeleton className="h-11 w-32 rounded-full" />
                    </div>
                </div>
            </div>

            <div className="mx-auto flex max-w-7xl flex-col gap-6 dv-section">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_480px]">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-16 w-full rounded-xl" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-14 w-full rounded-xl" />
                    </div>
                </div>

                <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card">
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                        <div className="flex gap-4">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-16" />
                        </div>
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="grid gap-0 xl:grid-cols-2">
                        <div className="border-b border-border p-6 xl:border-b-0 xl:border-r">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="mt-3 h-16 w-full rounded-xl" />
                        </div>
                        <div className="p-6">
                            <Skeleton className="h-[36rem] w-full rounded-xl" />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-16 w-full rounded-xl" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-24 w-full rounded-[12px]" />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-40" />
                </div>
            </div>
        </div>
    )
}
