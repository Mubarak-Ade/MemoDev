import { useProjects } from '@/modules/project/hooks'
import { useLangs, useTags } from '@/modules/snippet/hooks'
import { useFilterStore } from '@/store/FilteStore'
import { memo } from 'react'
import { HiFilter, HiOutlineFilter } from 'react-icons/hi'
import { Button } from '../ui/button'
import { Field, FieldLabel } from '../ui/field'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Separator } from '../ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'

const dateRangeOptions = [
    { label: 'Last 24 hours', value: '1d' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Custom range', value: 'custom' },
]

export const FilterBar = memo(() => {
    const { data: projects } = useProjects()
    const { data: tags } = useTags()
    const { data: langs } = useLangs()

    const {
        setLanguages,
        languages,
        setTags,
        tags: filterTag,
        setProject,
        project,
        setDateRange,
        dateRange,
        setStartTime,
        setEndTime,
        startTime,
        endTime,
        clearFilter,
    } = useFilterStore()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon-lg" className="self-start">
                    <HiOutlineFilter />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex items-center font-bold text-lg gap-2">
                        <HiFilter /> Advanced Filters
                    </SheetTitle>
                </SheetHeader>
                <Separator />
                <div className="px-5 space-y-2">
                    <Field className="mt-2">
                        <FieldLabel>Programming Language</FieldLabel>
                        <div className="flex flex-wrap mt-2 items-center gap-2">
                            {langs?.map((lang) => (
                                <FieldLabel
                                    key={lang}
                                    htmlFor={lang}
                                    className="rounded-md py-1 px-3 text-start border border-border has-checked:ring has-checked:ring-primary has-checked:bg-primary/50"
                                >
                                    <span className="capitalize">{lang}</span>
                                    <input
                                        type="checkbox"
                                        id={lang}
                                        checked={languages.includes(lang)}
                                        value={lang}
                                        name="lang"
                                        onChange={() => setLanguages(lang)}
                                        className="appearance-none hidden"
                                    />
                                </FieldLabel>
                            ))}
                        </div>
                        {/* {errors.color && <FieldError>{errors.color.message}</FieldError>} */}
                    </Field>
                    <Field className="gap-3">
                        <FieldLabel className="dv-small font-semibold uppercase tracking-widest text-muted-foreground">
                            Project
                        </FieldLabel>
                        <Select value={project || undefined} onValueChange={(value) => setProject(value)}>
                            <SelectTrigger className="py-6 w-full rounded-xl border-border bg-secondary px-4 text-[15px] text-foreground shadow-none hover:bg-tertiary">
                                <SelectValue placeholder="Select a project..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Projects</SelectLabel>
                                    {projects?.map((option) => (
                                        <SelectItem key={option._id} value={option._id}>
                                            {option.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="mt-2">
                        <FieldLabel>Tags</FieldLabel>
                        <div className="flex flex-wrap mt-2 items-center gap-2">
                            {tags?.map((tag) => (
                                <FieldLabel
                                    key={tag}
                                    htmlFor={tag}
                                    className="rounded-md py-1 px-3 text-start border border-border has-checked:ring has-checked:ring-primary has-checked:bg-primary/50"
                                >
                                    <span className="capitalize">#{tag}</span>
                                    <input
                                        type="checkbox"
                                        id={tag}
                                        value={tag}
                                        checked={filterTag.includes(tag)}
                                        onChange={() => setTags(tag)}
                                        name="tags"
                                        className="appearance-none hidden"
                                    />
                                </FieldLabel>
                            ))}
                        </div>
                        {/* {errors.color && <FieldError>{errors.color.message}</FieldError>} */}
                    </Field>
                    <Field className="mt-2">
                        <FieldLabel>Date Range</FieldLabel>
                        <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2">
                            {dateRangeOptions.map((option) => (
                                <FieldLabel
                                    key={option.value}
                                    htmlFor={option.value}
                                    className="rounded-md w-full p-4 text-start border border-border has-checked:ring has-checked:ring-primary has-checked:bg-primary/50"
                                >
                                    <span className="capitalize">{option.label}</span>
                                    <input
                                        type="radio"
                                        id={option.value}
                                        value={option.value}
                                        checked={dateRange === option.value}
                                        name="dateRange"
                                        onChange={() => setDateRange(option.value)}
                                        className="appearance-none hidden"
                                    />
                                </FieldLabel>
                            ))}
                        </div>
                        {dateRange === 'custom' && (
                            <div className="grid grid-cols-1 gap-2 pt-2 md:grid-cols-2">
                                <FieldLabel className="rounded-md border border-border p-4">
                                    <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                        From
                                    </span>
                                    <input
                                        type="date"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full bg-transparent outline-none"
                                    />
                                </FieldLabel>
                                <FieldLabel className="rounded-md border border-border p-4">
                                    <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                        To
                                    </span>
                                    <input
                                        type="date"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full bg-transparent outline-none"
                                    />
                                </FieldLabel>
                            </div>
                        )}
                        {/* {errors.color && <FieldError>{errors.color.message}</FieldError>} */}
                    </Field>
                    <Button type="button" onClick={clearFilter} className="w-full cursor-pointer">
                        Clear Filter
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
})
