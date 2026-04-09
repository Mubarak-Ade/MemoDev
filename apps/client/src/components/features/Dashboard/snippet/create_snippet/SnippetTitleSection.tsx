import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import type { Project } from '@/schema/project.schema'
import type { SnippetFormInput } from '@/schema/snippet.schema'
import { Controller, useFormContext } from 'react-hook-form'
import { ProjectSelectField } from './ProjectSelectField'

interface SnippetTitleSectionProps {
    projects?: Project[]
    isProjectsLoading?: boolean
}

export const SnippetTitleSection = ({
    projects,
    isProjectsLoading = false,
}: SnippetTitleSectionProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<SnippetFormInput>()

    return (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
            <Field className="gap-3">
                <FieldLabel
                    htmlFor="snippet-title"
                    className="dv-small font-semibold uppercase tracking-widest text-muted-foreground"
                >
                    SNIPPET TITLE
                </FieldLabel>
                <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <input
                            id="snippet-title"
                            {...field}
                            placeholder="e.g. Robust React Hook for Local Storage"
                            className="m-0 h-16 rounded-xl border border-border bg-secondary px-4 text-[22px] font-semibold text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30"
                        />
                    )}
                />
                {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>
            <ProjectSelectField projects={projects} isLoading={isProjectsLoading} />
        </div>
    )
}
