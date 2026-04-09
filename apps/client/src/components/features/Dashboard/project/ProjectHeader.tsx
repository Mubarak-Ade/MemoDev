import { Button } from '@/components/ui/button'
import { useModal } from '@/store/ModalStore'
import { HiPlus } from 'react-icons/hi'

export const ProjectHeader = () => {
    const showModal = useModal(s => s.showModal)
    return (
        <div className="flex justify-between px-5 py-3 items-center border-b">
            <h1 className='prose-2xl'>Project Management</h1>
            <Button onClick={() => showModal("create-project")}>
                <HiPlus /> Create New Project
            </Button>
        </div>
    )
}
