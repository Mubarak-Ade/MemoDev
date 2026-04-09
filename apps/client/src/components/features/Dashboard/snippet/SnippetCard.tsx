import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { formatDistance } from 'date-fns'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import { SnippetMenuBar } from './SnippetMenuBar'
import { iconMap } from '@/lib/iconMap'
import { colorMap } from '@/lib/colorMap'
import { memo, useCallback } from 'react'

interface SnippetCardProps {
    id?: string
    title: string
    slug: string
    tags: string[]
    code: string
    updatedAt: string
    projectName: string
    projectColor: string,
    projectIcon: string,
}

const MotionCard = motion.create(Card)

export const SnippetCard = memo(({
    id,
    slug,
    title,
    tags,
    code,
    updatedAt,
    projectName,
    projectColor,
    projectIcon
}: SnippetCardProps) => {
    // const deleteMutation =

    const navigate = useNavigate()

    const handleNavigate = useCallback(() => {
        navigate(slug ? `/snippets/${slug}` : '/snippets/create')
    }, [navigate, slug])

    const Icon = iconMap[projectIcon] || iconMap.folder
    const color = colorMap[projectColor]

    return (
        <MotionCard
            onClick={handleNavigate}
            whileHover={{
                y: -2,
                borderColor: 'rgba(59, 130, 246, 0.45)',
            }}
            whileTap={{
                scale: 0.99,
            }}
            transition={{
                duration: 0.15,
            }}
            className="cursor-pointer transition-colors duration-150 ease-out"
        >
            <CardHeader className="border-b border-border pb-4">
                <CardTitle className="dv-h3 line-clamp-1 capitalize">{title}</CardTitle>
                <CardAction className="cursor-pointer z-50 p-0">
                    <SnippetMenuBar id={id} navigate={navigate} />
                </CardAction>
                <CardDescription className="mt-4 flex flex-wrap items-center gap-2">
                    {tags.slice(0,3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-border bg-primary/10 px-2 py-1 text-xs text-primary"
                        >
                            {tag}
                        </span>
                    ))}
                </CardDescription>
            </CardHeader>
            <CardContent className='min-h-40 flex items-center justify-center'>
                <div className="rounded-xl w-full h-full border border-border bg-[#111] p-4">
                    <p className="dv-code line-clamp-6 tracking-normal text-muted-foreground">
                        {code}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="justify-between bg-transparent text-muted-foreground">
                <div className="flex gap-2 items-center">
                    <Icon color={color} />
                    <p className="dv-small">{projectName}</p>
                </div>
                <div className="">
                    <p className="dv-small">
                        {formatDistance(new Date(updatedAt), new Date(), { addSuffix: true })}
                    </p>
                </div>
            </CardFooter>
        </MotionCard>
    )
})
