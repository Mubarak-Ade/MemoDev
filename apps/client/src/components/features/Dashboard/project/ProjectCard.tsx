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
import { iconMap } from '@/lib/iconMap'
import { formatDistance } from 'date-fns'
import { HiClock } from 'react-icons/hi'
import { ProjectMenuBar } from './ProjectMenuBar'
import { Link, useNavigate } from 'react-router'
import { colorMap } from '@/lib/colorMap'

interface ProjectCardProps{
    id: string,
    slug: string,
    icon: string,
    name: string,
    description: string,
    updatedAt: string,
    totalSnippets: number,
    color: string,
}

export const ProjectCard = ({id, slug, icon, name: title, color, description, updatedAt, totalSnippets} : ProjectCardProps) => {
    const Icon = iconMap[icon] || iconMap.folder
    console.log(color);

    const navigate = useNavigate()
    
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>
                    <Icon size={30} color={colorMap[color]} />
                </CardTitle>
                <CardDescription className='mt-2'>{title}</CardDescription>
                <CardAction className='cursor-pointer'>
                    <ProjectMenuBar id={id} navigate={navigate} />
                </CardAction>
            </CardHeader>
            <CardContent>
                <p className='h-20'>
                   {description}
                </p>
                <div className="flex justify-between mt-5 gap-5 items-center">
                    <div className="flex gap-2 text-xs items-center">
                        <span className=''>{"{ }"}</span>
                        <p>{totalSnippets} Snippets</p>
                    </div>
                    <div className="flex gap-1 text-xs items-center">
                        <span className='text-lg'>
                            <HiClock />
                        </span>
                        <p>{formatDistance(new Date(updatedAt), new Date(), { addSuffix: true })}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link to={`${slug}`} className='w-full'>
                    <Button variant={"outline"} className='w-full'>
                        View Snippets
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
