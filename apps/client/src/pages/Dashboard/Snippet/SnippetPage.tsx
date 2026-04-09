import { DashboardHeader } from '@/components/features/Dashboard/DashboardHeader'
import { PaginationBar } from '@/components/features/Dashboard/PaginationBar'
import { SnippetCard } from '@/components/features/Dashboard/snippet/SnippetCard'
import { FilterBar } from '@/components/features/FilterBar'
import { useSnippet } from '@/modules/snippet/hooks'
import { useGetUser } from '@/modules/user/hooks'
import type { FilterSnippet } from '@/schema/snippet.schema'
import { OverviewSkeleton } from '../OverviewSkeleton'

export const SnippetPage = () => {
    const { data: user, isLoading: isUserLoading } = useGetUser()
    const { data: filteredSnippet, isLoading: isSnippetsLoading } = useSnippet()

    if (!filteredSnippet) return null
    const { snippets, filter } = filteredSnippet as FilterSnippet
    if (isUserLoading || isSnippetsLoading) return <OverviewSkeleton />



    return (
        <>
            <DashboardHeader />
            <div className="dv-section">
                <div className="space-y-3">
                    <p className="dv-small uppercase tracking-[0.24em] text-muted-foreground">
                        Command Center
                    </p>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-2">
                            <h1 className="dv-h1">
                                Welcome back, <span className="text-primary">{user?.username}</span>
                            </h1>
                            <p className="max-w-2xl dv-body text-muted-foreground">
                                Your snippets, tags, and notes are organized for fast scanning and
                                zero-friction reuse.
                            </p>
                        </div>
                        <FilterBar />
                    </div>
                </div>

                <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {snippets?.map((snippet, index) => (
                        <SnippetCard
                            code={snippet.code}
                            id={snippet._id}
                            slug={snippet.slug}
                            tags={snippet.tags}
                            title={snippet.title}
                            projectColor={snippet.project.color}
                            projectIcon={snippet.project.icon}
                            projectName={snippet.project.name}
                            updatedAt={
                                snippet.updatedAt ?? snippet.createdAt ?? new Date().toISOString()
                            }
                            key={snippet._id ?? index}
                        />
                    ))}
                </ul>
                <PaginationBar totalPages={filter.pages} />
            </div>
        </>
    )
}
