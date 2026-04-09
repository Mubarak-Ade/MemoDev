import { CreateSnippetHeader } from '@/components/features/Dashboard/snippet/create_snippet/CreateSnippetHeader'
import { EditorHeader } from '@/components/features/Dashboard/snippet/create_snippet/EditorHeader'
import { EditorTab } from '@/components/features/Dashboard/snippet/create_snippet/EditorTab'
import { SnippetSuccessModal } from '@/components/features/Dashboard/snippet/create_snippet/SnippetSuccessModal'
import { PreviewTab } from '@/components/features/Dashboard/snippet/create_snippet/PreviewTab'
import { SnippetTitleSection } from '@/components/features/Dashboard/snippet/create_snippet/SnippetTitleSection'
import { TagSection } from '@/components/features/Dashboard/snippet/create_snippet/TagSection'
import { Tabs } from '@/components/ui/tabs'
import { useProjects } from '@/modules/project/hooks'
import { useCreateSnippet, useEditSnippet, useGetSnippet } from '@/modules/snippet/hooks'
import {
    EditSnippetSchema,
    type SnippetFormInput,
    type SnippetFormOutput,
    type Snippet,
} from '@/schema/snippet.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { CreateSnippetSkeleton } from '@/components/features/Dashboard/snippet/create_snippet/CreateSnippetSkeleton'
import type { Project } from '@/schema/project.schema'
import { LoadingOverlay } from '@/components/ui/loading-spinner'

const DEFAULT_VALUES: SnippetFormInput = {
    title: '',
    project: '',
    explanation: '',
    code: '',
    language: 'typescript',
    tags: ['React', 'Hooks', 'Frontend'],
    isDraft: true,
}

interface SnippetEditorFormProps {
    defaultValues: SnippetFormInput
    id?: string
    isEditing: boolean
    projects?: Project[]
    isProjectsLoading: boolean
}

const SnippetEditorForm = ({
    defaultValues,
    id,
    isEditing,
    projects,
    isProjectsLoading,
}: SnippetEditorFormProps) => {
    const [createdSnippetId, setCreatedSnippetId] = useState<string>()

    const methods = useForm<SnippetFormInput, undefined, SnippetFormOutput>({
        resolver: zodResolver(EditSnippetSchema),
        defaultValues,
    })

    const createSnippet = useCreateSnippet()
    const editSnippet = useEditSnippet(id)
    const navigate = useNavigate()
    const { handleSubmit, control, reset } = methods

    const title = useWatch({ control, name: 'title' })
    const project = useWatch({ control, name: 'project' })
    const explanation = useWatch({ control, name: 'explanation' })
    const code = useWatch({ control, name: 'code' })
    const language = useWatch({ control, name: 'language' })
    const selectedProjectName = projects?.find((option) => option._id === project)?.name ?? ''

    const mutation = isEditing ? editSnippet : createSnippet

    const onSubmit: SubmitHandler<SnippetFormOutput> = (data) => {
        mutation.mutate(data, {
            onSuccess: (result) => {
                if (!isEditing) {
                    setCreatedSnippetId(result.slug)
                }
                toast.success('Snippet draft submitted')
            },
            onError: (error) => {
                toast.error(String(error))
            },
        })
    }

    const handleViewSnippet = () => {
        mutation.reset()
        navigate(`/snippets/${createdSnippetId ?? id}`)
    }

    const handleCreateAnother = () => {
        setCreatedSnippetId(undefined)
        mutation.reset()
        reset(DEFAULT_VALUES)
        navigate('/snippets/create', { replace: true })
    }

    const handleGoBack = () => {
        mutation.reset()
        navigate('/overview')
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative min-h-screen bg-background text-foreground"
            >
                {mutation.isPending && (
                    <LoadingOverlay
                        className="rounded-none"
                        label={isEditing ? 'Updating snippet...' : 'Creating snippet...'}
                    />
                )}

                <CreateSnippetHeader isEditing={isEditing} isSubmitting={mutation.isPending} />

                <div className="mx-auto flex max-w-7xl flex-col gap-6 dv-section">
                    <SnippetTitleSection
                        projects={projects}
                        isProjectsLoading={isProjectsLoading}
                    />

                    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card">
                        <Tabs defaultValue="editor" className="gap-0">
                            <EditorHeader />
                            <EditorTab />

                            <PreviewTab
                                code={code ?? ''}
                                explanation={explanation ?? ''}
                                language={language ?? 'typescript'}
                                projectName={selectedProjectName}
                                title={title ?? ''}
                            />
                        </Tabs>
                    </div>

                    <TagSection />

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 dv-small font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        <div className="flex flex-wrap items-center gap-4">
                            <span>⌘ S TO SAVE</span>
                            <span>^ ENTER TO CREATE</span>
                        </div>
                        <span>SNIPPET DRAFT VERSION 1.0.4</span>
                    </div>
                </div>
            </form>
            {mutation.isSuccess && (
                <SnippetSuccessModal
                    handleViewSnippet={handleViewSnippet}
                    handleCreateAnother={handleCreateAnother}
                    goHome={handleGoBack}
                />
            )}
        </FormProvider>
    )
}

export const SnippetEditor = () => {
    const location = useLocation()
    const id = typeof location.state === 'string' ? location.state : undefined
    const isEditing = !!id

    const { data: snippet, isLoading: isSnippetLoading } = useGetSnippet(id)
    const { data: projects, isLoading: isProjectsLoading } = useProjects()

    if (isEditing && (isSnippetLoading || isProjectsLoading)) {
        return <CreateSnippetSkeleton />
    }

    const defaultValues: SnippetFormInput =
        isEditing && snippet
            ? {
                  title: snippet.title,
                  project:
                      typeof snippet.project === 'string'
                          ? snippet.project
                          : String((snippet.project as Snippet['project'])?._id ?? ''),
                  explanation: snippet.explanation,
                  code: snippet.code,
                  language: snippet.language,
                  tags: snippet.tags,
                  isDraft: snippet.isDraft,
              }
            : DEFAULT_VALUES

    return (
        <SnippetEditorForm
            key={id ?? 'create'}
            defaultValues={defaultValues}
            id={id}
            isEditing={isEditing}
            projects={projects}
            isProjectsLoading={isProjectsLoading}
        />
    )
}
