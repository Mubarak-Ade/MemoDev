import { Button } from '@/components/ui/button'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group'
import { useModal } from '@/store/ModalStore'
import { HiCog, HiPlus, HiSearch, HiUserCircle } from 'react-icons/hi'
import { Link } from 'react-router'

interface DashboardHeaderProps {
    title?: string
}

export const DashboardHeader = ({title} : DashboardHeaderProps) => {

    const showModal = useModal(s => s.showModal)

    return (
        <div className="flex h-14 w-full items-center gap-4 border-b border-border bg-background/80 px-5 backdrop-blur-sm">
            <div className="flex w-52 items-center gap-2 dv-h2 text-muted-foreground">
                {title || "Overview"}
            </div>
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
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                    <HiCog />
                </Button>
                <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                    <HiUserCircle />
                </Button>
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
