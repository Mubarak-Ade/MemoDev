import { MotionWrap } from '@/components/features/Reusable/Motion'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { HiLink, HiOutlineCheck, HiX } from 'react-icons/hi'

interface ModalProps {
    handleViewSnippet: () => void
    handleCreateAnother: () => void
    goHome: () => void
}

export const SnippetSuccessModal = ({
    handleCreateAnother,
    handleViewSnippet,
    goHome,
}: ModalProps) => {
    return (
        <div className="h-screen fixed w-full flex items-center justify-center bg-accent/40 backdrop-blur-2xl z-10 top-0 left-0">
            <Card className="max-w-md flex w-full p-5 relative">
                <CardHeader className="flex items-center justify-center flex-col">
                    <CardAction className="ml-auto absolute top-3 right-3">
                        <MotionWrap
                            whileHover={{
                                background: 'var(--color-muted)',
                            }}
                            onClick={goHome}
                            whileTap={{ scale: 0.9 }}
                            as={HiX}
                            size={35}
                            className="border p-2 cursor-pointer rounded-full"
                        />
                    </CardAction>
                    <div className="p-5 m-5 justify-self-center border border-green-500 bg-green-500/10 rounded-full size-25 flex items-center justify-center">
                        <HiOutlineCheck className="text-5xl text-green-500 rounded-full border-4 border-green-500 " />
                    </div>
                    <CardTitle>Snippet successfully created!</CardTitle>
                    <CardDescription className="w-[80%] text-center">
                        Your code block has been saved to your library and is ready to be shared
                        with your team.
                    </CardDescription>
                </CardHeader>
                <CardContent className="mt-2 space-y-2">
                    <MotionWrap onClick={handleViewSnippet} as={Button} className="w-full py-6">
                        View Snippet
                        <HiLink />
                    </MotionWrap>
                    <MotionWrap
                        onClick={handleCreateAnother}
                        variant="outline"
                        as={Button}
                        className="w-full py-6"
                    >
                        Create Another
                    </MotionWrap>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </div>
    )
}
