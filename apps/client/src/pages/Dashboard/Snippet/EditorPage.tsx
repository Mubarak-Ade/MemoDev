import { snippet } from '@/data'
import CodeBlock from './CodeBlock'
import MarkdownRenderer from './MarkdownRender'
import { Button } from '@/components/ui/button'
import { HiArrowLeft, HiTag } from 'react-icons/hi'

export const EditorPage = () => {
    return (
        <>
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
                <div className="">
                    <Button variant="ghost" className="cursor-pointer gap-3 px-4 py-2">
                        <HiArrowLeft />
                        Dashboard
                    </Button>
                    <span></span>
                </div>
                <div className="">
                    <Button variant="ghost" className="cursor-pointer px-4 py-2">
                        Discard
                    </Button>
                    <Button className="cursor-pointer px-4 py-2">Save Snippet</Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] dv-section">
                <div className="space-y-4">
                    <div>
                        <input value={snippet.title} className="dv-h1 w-full bg-transparent" />

                        <div className="">
                            <div className="flex items-center gap-3">
                                <label htmlFor="">
                                    <HiTag />
                                </label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="dv-h3 mb-3">Code</h2>

                        <CodeBlock code={snippet.code} language={snippet.language} />
                    </div>
                </div>

                <div className="">
                    <h2 className="dv-h3 mb-3">Documentation</h2>

                    <MarkdownRenderer content={snippet.explanation} />
                </div>
            </div>
        </>
    )
}
