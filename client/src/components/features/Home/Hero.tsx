import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { codeLines } from '@/utils/constant';
import { HiDocumentDuplicate, HiSearch } from 'react-icons/hi';
import { RxCounterClockwiseClock } from 'react-icons/rx';
export const Hero = () => {
    return (
        <div className="py-20 px-6 border-b border-accent/10 grid grid-cols-2">
            <div className="p-4">
                <h1 className="text-7xl mb-5 font-bold">
                    Your personal developer <span className="text-primary">memory vault</span>
                </h1>
                <p className="mb-5 font-light font-sans text-xl text-gray-400">
                    A high-performance command center for implementation knowledge. Store, search,
                    and reuse complex patterns with zero friction.
                </p>
                <div className="flex gap-5">
                    <Button className="px-10 py-7 cursor-pointer">Get Started For Free</Button>
                    <Button variant="outline" className="py-7 px-10 cursor-pointer">
                        View Demo
                    </Button>
                </div>
            </div>

            <Card className="max-w-xl w-full shadow-[0px_5px_30px] shadow-primary/20 p-0 gap-0 overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-foreground/20 py-4 m-0 flex gap-4 justify-between items-center px-5">
                    <div className="flex gap-2">
                        <span className="size-4 border border-yellow-500 bg-yellow-500/20 rounded-full" />
                        <span className="size-4 border border-red-500 bg-red-500/20 rounded-full" />
                        <span className="size-4 border border-green-500 bg-green-500/20 rounded-full" />
                    </div>
                    <div className="w-full border p-2 border-foreground/20 bg-slate-400/10 rounded">
                        <div className="w-50 h-2 rounded-full bg-gray-700"></div>
                    </div>
                    <div className="w-8 h-6 rounded bg-slate-400/10"></div>
                </CardHeader>
                <CardContent className="flex m-0 bg-background h-100 p-0">
                    <div className="border-r flex flex-col gap-5 border-foreground/20 p-5">
                        <span className='text-2xl text-primary space-y-6'>
                            <HiDocumentDuplicate />
                        </span>
                        <span className='text-2xl text-gray-500 space-y-6'>
                            <HiSearch />
                        </span>

                        <span className='text-2xl text-gray-500 space-y-6'> 
                            <RxCounterClockwiseClock />
                        </span>
                    </div>
                    <div className="">
                        {codeLines.map((line, i) => (
                            <div key={i} className="flex justify-start py-2 px-5 items-center">
                                <span className="max-w-7 text-right text-sm pr-5 leading-7 select-none text-gray-400 w-full">{line.num ?? ''}</span>
                                <span className="text-sm whitespace-pre leading-7">
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
