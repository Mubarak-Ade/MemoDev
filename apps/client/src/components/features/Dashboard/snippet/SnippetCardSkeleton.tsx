import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const SnippetCardSkeleton = () => {
    return (
        <Card className="cursor-wait transition-colors duration-150 ease-out">
            <CardHeader className="border-b border-border pb-4">
                <CardTitle className="dv-h3 line-clamp-1">
                    <Skeleton className="h-5 w-3/4" />
                </CardTitle>
                <CardAction className="cursor-not-allowed p-0">
                    <Skeleton className="h-8 w-8 rounded-full" />
                </CardAction>
                <CardDescription className="mt-4 flex flex-wrap items-center gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-40 items-center justify-center">
                <Skeleton className="h-32 w-full rounded-xl" />
            </CardContent>
            <CardFooter className="justify-between bg-transparent text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-24" />
            </CardFooter>
        </Card>
    )
}
