import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { colorMap, folderColors } from '@/lib/colorMap'
import { allowedIcon, iconMap } from '@/lib/iconMap'
import { useCreateProject, useEditProject, useProject } from '@/modules/project/hooks'
import { ProjectInputSchema, type ProjectInput, type ProjectOutput } from '@/schema/project.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { HiX } from 'react-icons/hi'
import { toast } from 'sonner'
import { ProjectModalSkeleton } from './ProjectModalSkeleton'
import { useModal } from '@/store/ModalStore'
import { LoadingOverlay } from '@/components/ui/loading-spinner'


export const ProjectModal = ({props} : {props?: {id: string}}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProjectInput, unknown, ProjectOutput>({
        resolver: zodResolver(ProjectInputSchema),
        defaultValues: {
            color: 'gray',
            description: '',
            icon: 'folder',
            name: '',
        },
    })

    const closeModal = useModal(s => s.closeModal)
    const id = props?.id
    const isEditing = !!id
    
    const { data: project, isLoading: isProjectLoading } = useProject(id as string)
    useEffect(() => {
        if (project) {
            reset(
                ProjectInputSchema.parse({
                    color: project.color as ProjectInput['color'],
                    description: project.description,
                    icon: project.icon as ProjectInput['icon'],
                    name: project.name,
                }),
            )
        }
    }, [project, reset])
    const createProject = useCreateProject()
    const editProject = useEditProject(id as string)
    
    if (isEditing && isProjectLoading) {
        return <ProjectModalSkeleton />
    }



    const mutation = isEditing ? editProject : createProject

    const onSubmit = (data: ProjectInput) => {
        mutation.mutate(data, {
            onSuccess: () => {
                toast.success(isEditing ? 'Project updated successfully' : 'Project created successfully')
                closeModal("edit-project")
            },
            onError: (error) => {
                toast.error(String(error))
            },
        })
    }

    return (
        <>
            <Card className="relative max-w-lg w-full py-6 px-2">
                {mutation.isPending && (
                    <LoadingOverlay
                        label={isEditing ? 'Updating project...' : 'Creating project...'}
                    />
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle className="dv-h2">
                            {isEditing ? 'Edit Project' : 'Create New Project'}
                        </CardTitle>
                        <CardDescription>
                            {isEditing
                                ? 'Update how this project appears across your snippet library.'
                                : 'Initialize a new secure vault for your data architecture.'}
                        </CardDescription>
                        <CardAction onClick={() => closeModal("edit-project")}>
                            <HiX />
                        </CardAction>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <Field>
                            <FieldLabel>Project Name</FieldLabel>
                            <Input {...register('name')} className="h-12" />
                            {errors.name && <FieldError>{errors.name.message}</FieldError>}
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel>Project Details</FieldLabel>
                            <Textarea {...register('description')} className="h-12" />
                            {errors.description && (
                                <FieldError>{errors.description.message}</FieldError>
                            )}
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel>Project Color</FieldLabel>
                            <div className="flex mt-2 items-center gap-2">
                                {folderColors.map((color) => (
                                    <FieldLabel
                                        htmlFor={color}
                                        style={{
                                            backgroundColor: colorMap[color] ?? colorMap.gray,
                                        }}
                                        className="size-10 rounded-full border has-checked:ring-primary has-checked:ring-2"
                                    >
                                        <input
                                            type="radio"
                                            id={color}
                                            value={color}
                                            {...register('color')}
                                            className="appearance-none"
                                        />
                                    </FieldLabel>
                                ))}
                            </div>
                            {errors.color && <FieldError>{errors.color.message}</FieldError>}
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel>Project Icon</FieldLabel>
                            <div className="grid grid-cols-5 mt-2 items-center gap-2">
                                {allowedIcon.map((icon) => {
                                    const Icon = iconMap[icon]
                                    return (
                                        <FieldLabel
                                            htmlFor={icon}
                                            className="relative size-18 rounded-md border has-checked:ring-primary has-checked:ring-2"
                                        >
                                            <input
                                                type="radio"
                                                id={icon}
                                                value={icon}
                                                {...register('icon')}
                                                className="appearance-none"
                                            />
                                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <Icon size={25} />
                                            </span>
                                        </FieldLabel>
                                    )
                                })}
                            </div>
                            {errors.icon && <FieldError>{errors.icon.message}</FieldError>}
                        </Field>
                    </CardContent>
                    <CardFooter className="flex-row-reverse gap-2 mt-4">
                        <Button
                            className="px-6"
                            loading={mutation.isPending}
                            loadingText={isEditing ? 'Saving Changes...' : 'Creating Project...'}
                        >
                            {isEditing ? 'Save Changes' : 'Create Project'}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => closeModal("edit-project")}
                            className="px-6"
                            variant={'ghost'}
                            disabled={mutation.isPending}
                        >
                            Cancel
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}
