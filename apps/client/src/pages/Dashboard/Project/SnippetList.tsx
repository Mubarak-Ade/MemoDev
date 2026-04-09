import { DashboardHeader } from '@/components/features/Dashboard/DashboardHeader'
import { SnippetCard } from '@/components/features/Dashboard/snippet/SnippetCard'
import { SnippetCardSkeleton } from '@/components/features/Dashboard/snippet/SnippetCardSkeleton'
import { useProjectDetail } from '@/modules/project/hooks'
import type { Project } from '@/schema/project.schema'
import type { Snippet } from '@/schema/snippet.schema'
import { useParams } from 'react-router'

export const SnippetList = () => {
    const { slug } = useParams()
    const { data: projectDetail, isLoading } = useProjectDetail(slug as string)
    const projectData = projectDetail as { project: Project; snippets: Snippet[] } | undefined
    const snippets = projectData?.snippets ?? []
    const project = projectData?.project
    return (
        <>
            <DashboardHeader title={isLoading ? 'Loading Project' : project?.name} />
            <div className="p-5">
                <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => <SnippetCardSkeleton key={index} />)
                        : snippets?.map((snippet, index) => (
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
            </div>
        </>
    )
}
