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
}

export const ProjectMenuBar = memo(({ id, navigate }: MenuBarProps) => {


    const deleteMutation = useDeleteProject()
    const showModal = useModal(s => s.showModal)

     const handleEditSnippet = () => {
        showModal("edit-project", {id})
    }

    const handleDeleteSnippet = () => { 
         deleteMutation.mutate(id as string, {
            onSuccess: () => {
                toast.success('Project Deleted successful')
                navigate('/projects')
            },
            onError: (error) => {
                toast.error(String(error))
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
                        <MenubarItem onClick={handleEditSnippet}>
                            <HiOutlinePencil /> Edit Snippet <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            <HiOutlineShare />
                            Share Snippet
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
                        <MenubarItem onClick={handleDeleteSnippet} variant="destructive">
                            <HiTrash />
                            Delete Snippet
                        </MenubarItem>
                    </MenubarGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
})
