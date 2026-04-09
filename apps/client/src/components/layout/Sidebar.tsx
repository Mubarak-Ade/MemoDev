import { colorMap } from '@/lib/colorMap'
import { iconMap } from '@/lib/iconMap'
import { useLogout } from '@/modules/auth/hooks'
import { useProjects } from '@/modules/project/hooks'
import { useCallback } from 'react'
import {
    HiBookmark,
    HiDotsHorizontal,
    HiLogout,
    HiPlus,
    HiViewGrid,
    HiViewList
} from 'react-icons/hi'
import type { IconType } from 'react-icons/lib'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { MotionWrap } from '../features/Reusable/Motion'
import { Button } from '../ui/button'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from '../ui/sidebar'
import { useModal } from '@/store/ModalStore'

interface SideBtnProps {
    link: string
    name: string
    color?: string
    icon: string | IconType
}

export const SidebarButton = ({ link, name, icon: Icon, color }: SideBtnProps) => {
    
    return (
        <SidebarMenuItem>
            <Link
                to={link}
                className="flex items-center gap-2 text-sm font-medium text-sidebar-foreground/80 transition-colors duration-150 hover:text-sidebar-foreground"
            >
                <MotionWrap
                    as={Button}
                    variant={'ghost'}
                    whileHover={{
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    }}
                    className="w-full justify-start rounded-[8px] px-3 py-5 transition-colors duration-150 ease-out"
                >
                    <Icon size={25} color={colorMap[color as string]} />
                    {name}
                </MotionWrap>
            </Link>
        </SidebarMenuItem>
    )
}

export const SideBar = () => {
    const { data: project, isLoading } = useProjects()
    const logout = useLogout()

    const showModal = useModal(s => s.showModal)

    const handleLogout = useCallback(() => {
        logout.mutate(undefined, {
            onSuccess: () => {
                toast.success('Logged out.')
                window.location.href = '/login'
            },
            onError: (error) => {
                toast.error(String(error))
            },
        })
    }, [logout])

    return (
        <Sidebar className="border-r border-sidebar-border bg-sidebar px-4 py-4">
            <SidebarHeader>
                <div className="rounded-xl border border-sidebar-border bg-background/40 px-4 py-3">
                    <h1 className="text-lg font-semibold tracking-tight">Dev Vault</h1>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Developer memory, organized.
                    </p>
                </div>
                <div className="mt-2">
                    <SidebarMenu>
                        <SidebarButton link="/overview" name="Overview" icon={HiViewGrid} />
                        <SidebarButton link="/snippets" name="All Snippets" icon={HiViewList} />
                        <SidebarButton link="/drafts" name="Draft" icon={HiBookmark} />
                    </SidebarMenu>
                </div>
            </SidebarHeader>
            <SidebarContent className="mt-2 gap-2">
                <SidebarGroupLabel className="items-center justify-between px-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    <h2>PROJECTS</h2>
                    <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => showModal("create-project")}
                        className="text-muted-foreground p-5 rounded-xl cursor-pointer hover:text-foreground"
                    >
                        <HiPlus />
                    </Button>
                </SidebarGroupLabel>
                {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <SidebarMenuSkeleton key={index} showIcon />
                    ))
                    : project?.slice(0, 3).map((project) => (
                        <SidebarButton
                            link={`/projects/${project.slug}`}
                            name={project.name}
                            color={project.color}
                            icon={iconMap[project.icon] ?? iconMap.folder}
                            key={project._id}
                        />
                    ))}
                <Link to="projects">
                    <Button className="justify-start" variant={'link'}>
                        More Project <HiDotsHorizontal />
                    </Button>
                </Link>
            </SidebarContent>
            <SidebarFooter>
                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="cursor-pointer justify-start gap-2 border-sidebar-border bg-background/30 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                    <HiLogout /> Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
