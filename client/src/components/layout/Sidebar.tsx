import { HiDocumentText, HiStar } from 'react-icons/hi'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../ui/sidebar'
import { Link } from 'react-router'

export const SideBar = () => {
    return (
        <Sidebar className="border-accent">
            <SidebarHeader className="p-5">
                <div className="">
                    <h1 className="text-2xl font-bold font-sans">Memo Dev</h1>
                </div>
                <div className="">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link className="flex text-2xl">
                                    <HiDocumentText size={50} />
                                    All Snippets
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link className="flex text-2xl">
                                    <HiStar size={50} />
                                    Favourites
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </SidebarHeader>
            <SidebarContent>
                
            </SidebarContent>
            <SidebarFooter>
                
            </SidebarFooter>
        </Sidebar>
    )
}
