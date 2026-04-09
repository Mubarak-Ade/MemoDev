import { useModal } from '@/store/ModalStore'
import { ProjectModal } from '../features/Dashboard/project/ProjectModal'
import { SearchBar } from '../features/SearchBar'

export const Modal = () => {
    const current = useModal((s) => s.current)
    const props = current?.props as { id: string } | undefined

    const RenderModal = () => {
        switch (current?.type) {
            case 'create-project':
                return <ProjectModal />
            case 'edit-project':
                return <ProjectModal props={props} />
            case 'search':
                return <SearchBar />
            default:
                return null
        }
    }

    if (current === null) return null;
    

    return (
        <div className="absolute z-50 backdrop-blur-md h-screen w-full bg-popover/50 flex items-center justify-center top-0 left-0">
            <RenderModal />
        </div>
    )
}
