import { MotionWrap } from '@/components/features/Reusable/Motion'
import { Button } from '@/components/ui/button'
import { useSnippetDetails } from '@/modules/snippet/hooks'
import { HiArrowLeft, HiPencil, HiX } from 'react-icons/hi'
import { Link, useNavigate, useParams } from 'react-router'
import CodeBlock from './CodeBlock'
import MarkdownRenderer from './MarkdownRender'
import { SnippetPreviewSkeleton } from './SnippetPreviewSkeleton'

export const SnippetPreview = () => {
    const { slug } = useParams()
    const { data: snippet, isLoading } = useSnippetDetails(slug as string)

    const navigate = useNavigate()

    if (isLoading) return <SnippetPreviewSkeleton />
    if (!snippet) return null

    const handleNavigate = () => {
        navigate(-1)
    }

    const handleEdit = () => {
        navigate('/snippets/create', { state: snippet._id })
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center dv-section">
            <div className="dv-panel w-full max-w-6xl overflow-hidden">
                <div className="flex items-center p-5 gap-4 border-b border-border">
                    <Link to="/overview"><h1 className="dv-h1 border-r py-3 px-6">Memo Vault</h1></Link>
                    <div className="flex-1">
                        <h1 className="dv-h3 capitalize">{snippet?.title}</h1>
                        <p className="dv-body text-muted-foreground">{snippet?.project.name}</p>
                    </div>
                    <MotionWrap
                        whileHover={{
                            background: 'var(--color-muted)',
                            scale: 1.05,
                        }}
                        onClick={handleNavigate}
                        whileTap={{ scale: 0.9 }}
                        as={Button}
                        size={'icon-lg'}
                        variant={'outline'}
                        className="rounded-full cursor-pointer"
                    >
                        <HiX />
                    </MotionWrap>
                </div>
                <div className="grid xl:grid-cols-2 h-140">
                    <div className=" overflow-auto border-b border-border p-6 xl:border-b-0 xl:border-r">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="dv-small font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                                    Live Preview
                                </p>
                                <h3 className="dv-h2 mt-3 w-80 capitalize text-foreground">
                                    {snippet?.title}
                                </h3>
                            </div>
                            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 dv-small font-semibold text-primary">
                                {snippet?.project.name}
                            </span>
                        </div>
                        <MarkdownRenderer content={snippet?.explanation as string} />
                    </div>
                    <div className=" overflow-auto">
                        <CodeBlock
                            code={snippet?.code as string}
                            language={snippet?.language as string}
                        />
                    </div>
                </div>
                <div className="p-5 border-t mt-2 gap-5 flex">
                    <Button onClick={handleNavigate} variant={'outline'} className="p-6">
                        <HiArrowLeft /> Go Back
                    </Button>
                    <Button onClick={handleEdit} variant={'ghost'} className="p-6">
                        <HiPencil /> Edit Content
                    </Button>
                </div>
            </div>
        </div>
    )
}
