import { DashboardHeader } from '@/components/features/Dashboard/DashboardHeader'
import { SnippetCard } from '@/components/features/Dashboard/snippet/SnippetCard'
import { SnippetCardSkeleton } from '@/components/features/Dashboard/snippet/SnippetCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { useDrafts } from '@/modules/snippet/hooks'

export const DraftPage = () => {
    const { data: drafts, isLoading } = useDrafts()

    if (isLoading) {
        return (
            <>
                <DashboardHeader />
                <div className="px-5 py-10 min-h-screen w-full">
                    <Skeleton className="h-10 w-52" />
                    <Skeleton className="h-5 w-64 mt-2" />
                    <div className="mt-5 grid grid-cols-3 w-full gap-5">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <SnippetCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </>
        )
    }

  return (
    <>
        <DashboardHeader />
        <div className="px-5 py-10 min-h-screen w-full">
            <h1 className='text-4xl font-bold'>All Drafts</h1>
            <h2 className='text-muted-foreground mt-2'>View all your unsaved snippets</h2>
            <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full  gap-5">
                {drafts && drafts.length > 0 ? drafts?.map((snippet, index) => (
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
                    )) : (
                        <h1 className='text-2xl '>No Draft</h1>
                    )}
            </div>
        </div>
    </>
  )
}
