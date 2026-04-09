import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { Project } from '@/schema/project.schema'
import type { SnippetFormInput } from '@/schema/snippet.schema'
import { Controller, useFormContext } from 'react-hook-form'

interface ProjectSelectFieldProps {
    projects?: Project[]
    isLoading?: boolean
}

export const ProjectSelectField = ({
    projects = [],
    isLoading = false,
}: ProjectSelectFieldProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<SnippetFormInput>()

    const hasProjects = projects.length > 0

    return (
        <Field className="gap-3">
            <FieldLabel
                htmlFor="snippet-project"
                className="dv-small font-semibold uppercase tracking-widest text-muted-foreground"
            >
                PROJECT
            </FieldLabel>
            <Controller
                control={control}
                name="project"
                render={({ field }) => {
                    const selectedProjectName =
                        projects.find((option) => option._id === field.value)?.name ?? ''

                    return (
                        <Select
                            value={field.value || undefined}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger
                                id="snippet-project"
                                disabled={isLoading || !hasProjects}
                                className="h-16 py-5 w-full rounded-xl border-border bg-secondary px-4 text-left text-[15px] text-foreground shadow-none hover:bg-tertiary"
                            >
                                <SelectValue
                                    placeholder={
                                        isLoading
                                            ? 'Loading projects...'
                                            : hasProjects
                                              ? 'Select a project'
                                              : 'Create a project first'
                                    }
                                >
                                    {selectedProjectName}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Projects</SelectLabel>
                                    {projects.map((option) => (
                                        <SelectItem key={option._id} value={option._id}>
                                            {option.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
                }}
            />
            {!hasProjects && !isLoading && (
                <p className="text-sm text-muted-foreground">
                    You need at least one project before saving a snippet.
                </p>
            )}
            {errors.project && <FieldError>{errors.project.message}</FieldError>}
        </Field>
    )
}
