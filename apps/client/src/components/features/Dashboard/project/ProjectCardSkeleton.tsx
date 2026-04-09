import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const ProjectCardSkeleton = () => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="mt-2 h-5 w-3/5" />
                <Skeleton className="mt-4 h-4 w-24" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-20 w-full rounded-xl" />
                <div className="mt-5 flex items-center justify-between gap-5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
        </Card>
    )
}
