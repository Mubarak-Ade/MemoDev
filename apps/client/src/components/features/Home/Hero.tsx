import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { codeLines } from '@/utils/constant';
import { HiDocumentDuplicate, HiSearch } from 'react-icons/hi';
import { RxCounterClockwiseClock } from 'react-icons/rx';
export const Hero = () => {
    return (
        <div className="grid gap-8 border-b border-border dv-section lg:grid-cols-2">
            <div className="max-w-2xl p-4">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                    Developer-first productivity
                </p>
                <h1 className="dv-h1 mb-4 max-w-xl">
                    Your personal developer <span className="text-primary">memory vault</span>
                </h1>
                <p className="dv-body mb-6 max-w-xl text-muted-foreground">
                    A high-performance command center for implementation knowledge. Store, search,
                    and reuse patterns without losing momentum.
                </p>
                <div className="flex flex-wrap gap-3">
                    <Button className="cursor-pointer px-4 py-2">Get Started For Free</Button>
                    <Button variant="outline" className="cursor-pointer px-4 py-2">
                        View Demo
                    </Button>
                </div>
            </div>

            <Card className="w-full max-w-xl gap-0 overflow-hidden p-0">
                <CardHeader className="m-0 flex items-center justify-between gap-4 border-b border-border bg-secondary px-4 py-3">
                    <div className="flex gap-2">
                        <span className="size-4 border border-yellow-500 bg-yellow-500/20 rounded-full" />
                        <span className="size-4 border border-red-500 bg-red-500/20 rounded-full" />
                        <span className="size-4 border border-green-500 bg-green-500/20 rounded-full" />
                    </div>
                    <div className="w-full rounded border border-border bg-background/50 p-2">
                        <div className="h-2 w-[12.5rem] rounded-full bg-muted" />
                    </div>
                    <div className="h-6 w-8 rounded bg-muted" />
                </CardHeader>
                <CardContent className="m-0 flex h-[25rem] bg-background p-0">
                    <div className="flex flex-col gap-4 border-r border-border p-4">
                        <span className="text-xl text-primary">
                            <HiDocumentDuplicate />
                        </span>
                        <span className="text-xl text-muted-foreground">
                            <HiSearch />
                        </span>

                        <span className="text-xl text-muted-foreground">
                            <RxCounterClockwiseClock />
                        </span>
                    </div>
                    <div className="">
                        {codeLines.map((line, i) => (
                            <div key={i} className="flex items-center justify-start px-4 py-2">
                                <span className="max-w-7 w-full select-none pr-4 text-right dv-small text-muted-foreground">
                                    {line.num ?? ''}
                                </span>
                                <span className="dv-code whitespace-pre">
                                    {line.tokens.map((t, j) => (
                                        <span key={j} style={{ color: t.color }}>
                                            {t.text}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
