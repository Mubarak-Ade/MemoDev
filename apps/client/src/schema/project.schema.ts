import { folderColors } from "@/lib/colorMap";
import { allowedIcon } from "@/lib/iconMap";
import z from "zod";

export const ProjectSchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.string(),
    icon: z.string(),
    color: z.string(),
    description: z.string(),
    snippetCount: z.number(),
    updatedAt: z.string(),
    createdAt: z.string(),
})

export const ProjectInputSchema = z.object({
    name: z.string().min(3, "Project name is required"),
    description: z.string().min(3, "Please enter a description"),
    icon: z.enum(allowedIcon).default("folder"),
    color: z.enum(folderColors).default("gray")
})

export type ProjectInput = z.input<typeof ProjectInputSchema>
export type ProjectOutput = z.output<typeof ProjectInputSchema>
export type Project = z.infer<typeof ProjectSchema>
