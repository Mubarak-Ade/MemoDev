import { HiOutlineClipboard } from 'react-icons/hi'
import { HiFolder } from 'react-icons/hi'
import { HiTrash } from 'react-icons/hi'
import { HiOutlineShare } from 'react-icons/hi'
import { HiOutlinePencil } from 'react-icons/hi'
import { HiDotsVertical } from 'react-icons/hi'
import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from '@/components/ui/menubar'
import type { NavigateFunction } from 'react-router'
import { memo } from 'react'
import { toast } from 'sonner'
import { useDeleteProject } from '@/modules/project/hooks'
import { useModal } from '@/store/ModalStore'

interface MenuBarProps {
    id?: string,
    navigate: NavigateFunction
    onActionStateChange?: (label: string | null) => void
}

export const ProjectMenuBar = memo(({ id, navigate, onActionStateChange }: MenuBarProps) => {


    const deleteMutation = useDeleteProject()
    const showModal = useModal(s => s.showModal)

     const handleEditProject = () => {
        showModal("edit-project", {id})
    }

    const handleDeleteProject = () => { 
         onActionStateChange?.('Deleting project...')
         deleteMutation.mutate(id as string, {
            onSuccess: () => {
                toast.success('Project Deleted successful')
                navigate('/projects')
            },
            onError: (error) => {
                onActionStateChange?.(null)
                toast.error(String(error))
            },
            onSettled: () => {
                onActionStateChange?.(null)
            },
        })    
    }

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    <HiDotsVertical />
                </MenubarTrigger>
                <MenubarContent className="w-50">
                    <MenubarGroup>
                        <MenubarItem onClick={handleEditProject}>
                            <HiOutlinePencil /> Edit Project <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            <HiOutlineShare />
                            Share Project
                        </MenubarItem>
                        <MenubarItem>
                            <HiFolder />
                            Add To Collection
                        </MenubarItem>
                        <MenubarItem>
                            <HiOutlineClipboard />
                            Duplicate
                        </MenubarItem>
                    </MenubarGroup>
                    <MenubarSeparator />
                    <MenubarGroup>
                        <MenubarItem
                            onClick={handleDeleteProject}
                            variant="destructive"
                            disabled={deleteMutation.isPending}
                        >
                            <HiTrash />
                            {deleteMutation.isPending ? 'Deleting Project...' : 'Delete Project'}
                        </MenubarItem>
                    </MenubarGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
})
