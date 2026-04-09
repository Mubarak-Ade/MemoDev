import { Button } from '@/components/ui/button'
import { HiCode, HiPlus, HiX } from 'react-icons/hi'
import { useNavigate } from 'react-router'

interface CreateSnippetHeaderProps {
    isEditing: boolean
    isSubmitting?: boolean
}
export const CreateSnippetHeader = ({
    isEditing,
    isSubmitting = false,
}: CreateSnippetHeaderProps) => {
    const navigate = useNavigate()
    
    return (
        <div className="border-b border-border bg-background/90 px-6 py-4 backdrop-blur-sm">
            <div className="mx-auto flex max-w-400 items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-secondary text-primary">
                        <HiCode className="text-xl" />
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="dv-h3 text-foreground">
                            {isEditing ? 'Edit Snippet' : 'Create New Snippet'}
                        </h1>
                        <p className="dv-small font-medium uppercase tracking-[0.24em] text-muted-foreground">
                            Developer tools / focused writing
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="cursor-pointer text-muted-foreground hover:text-foreground"
                        disabled={isSubmitting}
                    >
                        <HiX />
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="cursor-pointer gap-2"
                        loading={isSubmitting}
                        loadingText={isEditing ? 'Updating Snippet...' : 'Creating Snippet...'}
                    >
                        <HiPlus />
                        {isEditing ? "Update Snippet" : "Create Snippet"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
