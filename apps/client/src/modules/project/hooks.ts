import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProject, deleteProject, editProject, getProject, getProjectDetails, getProjects } from "./services"
import type { Project, ProjectInput } from "@/schema/project.schema"

export const useProjects = () => {
    return useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: getProjects
    })
}

export const useProject = (id: string) => {
    return useQuery<Project>({
        queryKey: ["project", id],
        queryFn: () => getProject(id),
        enabled: !!id
    })
}


export const useProjectDetail = (slug: string) => {
    return useQuery({
        queryKey: ["project", slug],
        queryFn: () => getProjectDetails(slug),
        enabled: !!slug
    })
}

export const useCreateProject = () => {
    const queryClient = useQueryClient()
    return useMutation<Project, Error, ProjectInput>({
        mutationFn: (project: ProjectInput) => createProject(project),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['project'] })
        },
    })
}

export const useEditProject = (id?: string) => {
    const queryClient = useQueryClient()
    return useMutation<Project, Error, ProjectInput>({
        mutationFn: (edit: ProjectInput) => {
            if (!id) {
                throw new Error('Missing Project id')
            }
            return editProject(id, edit)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['project'] })
        },
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => {
            if (!id) {
                throw new Error("Missing project id")
            }
            return deleteProject(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['project'] })
        },
    })
}
