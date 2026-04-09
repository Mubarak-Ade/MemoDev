import { Skeleton } from '@/components/ui/skeleton'

export const AuthShellSkeleton = () => {
    return (
        <div className="flex min-h-svh items-center justify-center bg-background px-6">
            <div className="w-full max-w-md rounded-[1.5rem] border border-border bg-card p-6 shadow-sm">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-3 h-4 w-48" />
                <div className="mt-8 space-y-4">
                    <Skeleton className="h-12 w-full rounded-xl" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                    <Skeleton className="h-12 w-2/3 rounded-xl" />
                </div>
            </div>
        </div>
    )
}
