import { DashboardHeader } from '@/components/features/Dashboard/DashboardHeader'
import { SnippetCardSkeleton } from '@/components/features/Dashboard/snippet/SnippetCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { useDashboard } from '@/modules/dashboard/hooks'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router'

const LIMIT = 10

export const Overview = () => {
    const { data: dashboard, isLoading } = useDashboard()

    if (isLoading) {
        return (
            <>
                <DashboardHeader />
                <div className="p-10">
                    <div className="grid grid-cols-3 gap-5">
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

    return (
        <>
            <DashboardHeader />
            <div className="p-10">
                <div className="grid grid-cols-3 gap-5">
                    <div className="border p-5 shadow-2xl space-y-2 rounded-xl">
                        <h6 className="text-sm text-accent">ARCHITECTURE</h6>
                        <h2 className="text-2xl font-bold mb-5">Total Snippets</h2>
                        <h1 className="text-primary text-4xl font-bold">
                            {dashboard?.totalSnippets}
                        </h1>
                    </div>
                    <div className="border p-5 shadow-2xl space-y-2 rounded-xl">
                        <h6 className="text-sm text-accent">ARCHITECTURE</h6>
                        <h2 className="text-2xl font-bold mb-5">Total Projects</h2>
                        <h1 className="text-primary text-4xl font-bold">
                            {dashboard?.totalProjects}
                        </h1>
                    </div>
                    <div className="border p-5 shadow-2xl space-y-2 rounded-xl">
                        <h6 className="text-sm text-accent">ARCHITECTURE</h6>
                        <h2 className="text-2xl font-bold mb-5">Total Draft</h2>
                        <h1 className="text-primary text-4xl font-bold">
                            {dashboard?.totalDrafts || 0}
                        </h1>
                    </div>
                </div>
                <div className="flex mt-10 gap-10">
                    <div className="max-w-2xl w-full">
                        <div className="flex justify-between">
                            <h2 className="font-bold text-xl">Recent Snippets</h2>
                            <Link className="text-primary hover:underline" to="/snippets">
                                View All Snippets
                            </Link>
                        </div>
                        <ul className=" mt-2 p-5 rounded-xl space-y-2 border">
                            {dashboard?.recentSnippets.map((snippet) => (
                                <Link
                                    to={`/snippets/${snippet.slug}`}
                                    key={snippet.id}
                                    className="px-5 py-3 border rounded-xl flex justify-between"
                                >
                                    <div className="">
                                        <h2 className="font-semibold">{snippet.title}</h2>
                                        <p className="text-primary capitalize text-sm">
                                            {snippet.language}
                                        </p>
                                    </div>
                                    <span>{formatDistanceToNow(snippet.updatedAt)}</span>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className="max-w-xs w-full">
                        <h2 className="font-bold">Top Tags</h2>
                        <ul className="flex flex-wrap gap-2 mt-5">
                            {dashboard?.topTags.slice(0, LIMIT).map((tag) => (
                                <li
                                    key={tag}
                                    className="px-4 py-1 bg-primary/20 border border-primary rounded"
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
