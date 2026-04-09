import { DashboardHeader } from '@/components/features/Dashboard/DashboardHeader'
import { useDashboard } from '@/modules/dashboard/hooks'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router'
import { OverviewSkeleton } from './OverviewSkeleton'

const LIMIT = 10

export const Overview = () => {
    const { data: dashboard, isLoading } = useDashboard()

    if (isLoading) {
        return <OverviewSkeleton />
    }

    return (
        <>
            <DashboardHeader />
            <div className="">
                <div className="grid p-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
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
                <div className="flex md:flex-row flex-col p-5 mt-10 gap-10">
                    <div className="max-w-2xl w-full">
                        <div className="flex justify-between">
                            <h2 className="font-bold text-lg md:text-xl">Recent Snippets</h2>
                            <Link
                                className="text-primary md:text-base text-sm hover:underline"
                                to="/snippets"
                            >
                                View All
                            </Link>
                        </div>
                        <ul className=" mt-2 p-5 rounded-xl space-y-2 border">
                            {dashboard?.recentSnippets.map((snippet) => (
                                <Link
                                    to={`/snippets/${snippet.slug}`}
                                    key={snippet.id}
                                    className="md:px-5 px-3 py-3 border rounded-xl flex flex-col md:flex-row justify-between"
                                >
                                    <div className="">
                                        <h2 className="font-semibold md:text-base text-sm">
                                            {snippet.title}
                                        </h2>
                                        <p className="text-primary capitalize text-sm">
                                            {snippet.language}
                                        </p>
                                    </div>
                                    <span className="text-sm text-muted-foreground md:m-0 mt-2">
                                        {formatDistanceToNow(snippet.updatedAt)}
                                    </span>
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
