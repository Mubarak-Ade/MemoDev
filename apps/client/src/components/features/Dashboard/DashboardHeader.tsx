import { Button } from '@/components/ui/button'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useModal } from '@/store/ModalStore'
import { HiPlus, HiSearch } from 'react-icons/hi'
import { Link } from 'react-router'

interface DashboardHeaderProps {
    title?: string
}

export const DashboardHeader = ({title} : DashboardHeaderProps) => {

    const showModal = useModal(s => s.showModal)

    return (
        <div className="flex w-full justify-between items-center gap-4 border-b py-5 border-border bg-background/80 px-5 backdrop-blur-sm">

            <div className="flex w-52 items-center gap-2 dv-h2 text-muted-foreground">
                <SidebarTrigger />
                {title || "Overview"}
            </div>
            <div className="lg:block hidden w-full">
                <InputGroup className="mx-auto max-w-2xl flex-1 border-border bg-secondary">
                    <InputGroupButton variant="ghost" size="icon-xs">
                        <InputGroupAddon align="inline-start">
                            <HiSearch />
                        </InputGroupAddon>
                    </InputGroupButton>
                    <InputGroupInput onClick={() => showModal("search")} placeholder="Search snippets, tags, projects" />
                    <InputGroupAddon align="inline-end">
                        <kbd className="rounded-[8px] border border-border bg-background px-1.5 py-0.5 text-[11px] text-muted-foreground">
                            /
                        </kbd>
                    </InputGroupAddon>
                </InputGroup>
            </div>
            <div className="flex items-center gap-2">
                <Link to="/snippets/create">
                    <Button className="cursor-pointer gap-2">
                        <HiPlus />
                        New Snippet
                    </Button>
                </Link>
            </div>
        </div>
    )
}
