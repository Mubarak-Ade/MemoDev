import { useDeferredValue, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { HiSearch, HiX } from 'react-icons/hi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '../ui/input-group'
import { Separator } from '../ui/separator'
import { useModal } from '@/store/ModalStore'
import { useVaultSearch } from '@/modules/search/hooks'
import { Button } from '../ui/button'
import { colorMap } from '@/lib/colorMap'
import { iconMap } from '@/lib/iconMap'

export const SearchBar = () => {
    const closeModal = useModal((s) => s.closeModal)
    const [query, setQuery] = useState('')
    const deferredQuery = useDeferredValue(query)
    const { data, isFetching } = useVaultSearch(deferredQuery)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal('search')
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [closeModal])

    const snippets = data?.snippets ?? []
    const projects = data?.projects ?? []

    return (
        <Card className="w-[min(92vw,48rem)] border-border bg-card/95 shadow-2xl backdrop-blur-sm">
            <CardHeader className="gap-4 border-b border-border">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle>Search vault</CardTitle>
                        <CardDescription>
                            Search snippets, projects, and tags from your workspace.
                        </CardDescription>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => closeModal('search')}
                        className="text-muted-foreground"
                    >
                        <HiX />
                    </Button>
                </div>
                <InputGroup className="h-12 border-border bg-secondary">
                    <InputGroupAddon>
                        <HiSearch />
                    </InputGroupAddon>
                    <InputGroupInput
                        autoFocus
                        className="h-12"
                        placeholder="Search snippets, projects, or tags"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <InputGroupAddon onClick={() => closeModal('search')} align="inline-end">
                        <InputGroupButton>Esc</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </CardHeader>
            <Separator />
            <CardContent className="max-h-[70vh] overflow-y-auto py-4">
                {query.trim().length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        Start typing to search your saved snippets and projects.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {isFetching && (
                            <p className="text-sm text-muted-foreground">Searching...</p>
                        )}

                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                                Snippets
                            </h3>
                            {snippets.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No snippets matched "{query.trim()}".
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {snippets.map((snippet) => {
                                        const project = snippet.project
                                        const Icon = iconMap[project.icon] ?? iconMap.folder
                                        const color = colorMap[project.color]

                                        return (
                                            <Link
                                                key={snippet._id}
                                                to={`/snippets/${snippet.slug}`}
                                                onClick={() => closeModal('search')}
                                                className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
                                            >
                                                <div className="space-y-1">
                                                    <p className="font-medium capitalize">{snippet.title}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {snippet.language} in {project.name}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Icon color={color} />
                                                    <span>{project.name}</span>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                                Projects
                            </h3>
                            {projects.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No projects matched "{query.trim()}".
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {projects.map((project) => {
                                        const Icon = iconMap[project.icon] ?? iconMap.folder
                                        const color = colorMap[project.color]

                                        return (
                                            <Link
                                                key={project._id}
                                                to={`/projects/${project.slug}`}
                                                onClick={() => closeModal('search')}
                                                className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
                                            >
                                                <div className="space-y-1">
                                                    <p className="font-medium">{project.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {project.description || 'Project collection'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Icon color={color} />
                                                    <span>Project</span>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
