import { TableHeader } from '@/components/ui/table'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'

export const EditorHeader = () => {
    return (
        <TableHeader className="flex items-center justify-between border-b border-border px-5 py-4">
            <TabsList variant="line" className="gap-4 rounded-none p-0">
                <TabsTrigger className="px-1 py-2 text-sm font-medium" value="editor">
                    Editor
                </TabsTrigger>
                <TabsTrigger className="px-1 py-2 text-sm font-medium" value="preview">
                    Preview
                </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="size-2 rounded-full bg-success shadow-[0_0_0_4px_rgba(34,197,94,0.12)]" />
                Auto-save active
            </div>
        </TableHeader>
    )
}
