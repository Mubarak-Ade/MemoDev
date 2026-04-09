import { ProjectCard } from '@/components/features/Dashboard/project/ProjectCard'
import { ProjectCardSkeleton } from '@/components/features/Dashboard/project/ProjectCardSkeleton'
import { ProjectHeader } from '@/components/features/Dashboard/project/ProjectHeader'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useProjects } from '@/modules/project/hooks'
import { HiOutlineFilter, HiOutlineSearch, HiOutlineSortAscending } from 'react-icons/hi'

export const ProjectManagement = () => {
    const { data: projects, isLoading } = useProjects()

    return (
        <>
            <ProjectHeader />
            <div className="p-5 flex items-center gap-4">
                <InputGroup className="h-10">
                    <InputGroupAddon>
                        <HiOutlineSearch />
                    </InputGroupAddon>
                    <InputGroupInput
                        placeholder="Search Project by name or technology"
                        className="h-10"
                    />
                </InputGroup>
                <Button variant={'ghost'}>
                    <HiOutlineFilter />
                    Filter
                </Button>
                <Button variant={'ghost'}>
                    <HiOutlineSortAscending />
                    Sort
                </Button>
            </div>
            <div className="grid grid-cols-3 p-10 gap-5">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => <ProjectCardSkeleton key={index} />)
                    : projects?.map((project) => (
                        <ProjectCard
                            description={project?.description}
                            icon={project?.icon}
                            id={project?._id}
                            slug={project.slug}
                            color={project.color}
                            name={project?.name}
                            totalSnippets={project.snippetCount ?? 0}
                            updatedAt={project?.updatedAt}
                            key={project._id}
                        />
                    ))}
            </div>
        </>
    )
}
