import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
    className?: string
}

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
    return (
        <span
            aria-hidden="true"
            className={cn(
                'inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent',
                className,
            )}
        />
    )
}

interface LoadingOverlayProps {
    className?: string
    label?: string
}

export const LoadingOverlay = ({
    className,
    label = 'Processing request...',
}: LoadingOverlayProps) => {
    return (
        <div
            className={cn(
                'absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-background/80 backdrop-blur-sm',
                className,
            )}
        >
            <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                <LoadingSpinner className="size-5" />
                <span>{label}</span>
            </div>
        </div>
    )
}
