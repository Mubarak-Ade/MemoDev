import { TabsContent } from '@/components/ui/tabs'
import CodeBlock from '@/pages/Dashboard/Snippet/CodeBlock'
import MarkdownRenderer from '@/pages/Dashboard/Snippet/MarkdownRender'

interface PreviewTabProps {
    title: string
    projectName: string
    explanation: string
    code: string
    language: string
}

export const PreviewTab = ({
    title,
    projectName,
    explanation,
    code,
    language,
}: PreviewTabProps) => {
    return (
        <TabsContent value="preview" className="m-0 p-0">
            <div className="grid xl:grid-cols-2">
                <div className="h-[36rem] overflow-auto border-b border-border p-6 xl:border-b-0 xl:border-r">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <p className="dv-small font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                                Live Preview
                            </p>
                            <h3 className="dv-h2 mt-3 text-foreground">
                                {title || 'Untitled snippet'}
                            </h3>
                        </div>
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 dv-small font-semibold text-primary">
                            {projectName || 'Draft'}
                        </span>
                    </div>
                    <MarkdownRenderer content={explanation} />
                </div>
                <div className="h-[36rem] overflow-auto">
                    <CodeBlock code={code} language={language} />
                </div>
            </div>
        </TabsContent>
    )
}
