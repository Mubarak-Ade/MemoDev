import type { ProjectInput } from "@/schema/project.schema"
import api from "@/utils/api"

export const getProjects = async () => {
    const res = await api.get("projects")
    return res.data
}

export const getProject = async (id: string) => {
    const res = await api.get(`projects/${id}`)
    return res.data
}

export const getProjectDetails = async (slug:string) => {
    const res = await api.get(`projects/${slug}/snippets`)
    return res.data
}

export const createProject = async (data:ProjectInput) => {
    const res = await api.post("projects", data) 
    return res.data
}

export const editProject = async (id:string, data: ProjectInput) => {
    const res = await api.put(`projects/${id}`, data)
    return res.data
}

export const deleteProject = async (id:string) => {
    const res = await api.delete(`projects/${id}`)  
    return res.data
}