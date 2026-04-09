import { Field, FieldLabel } from '@/components/ui/field'
import type { SnippetFormInput } from '@/schema/snippet.schema'
import { useFormContext, useWatch } from 'react-hook-form'
import { useState, type KeyboardEvent } from 'react'
import { HiOutlineGlobeAlt, HiX } from 'react-icons/hi'

const SUGGESTIONS = ['Performance', 'Security', 'Backend']

export const TagSection = () => {
    const { control, setValue } = useFormContext<SnippetFormInput>()
    const [tagDraft, setTagDraft] = useState('')

    const tags = useWatch({ control, name: 'tags' }) ?? []
    const isDraft = useWatch({ control, name: 'isDraft' }) ?? false

    const updateTags = (nextTags: string[]) => {
        setValue('tags', nextTags, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const addTag = (rawTag: string) => {
        const nextTag = rawTag.trim().replace(/,$/, '')
        if (!nextTag) {
            return
        }

        updateTags(
            tags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())
                ? tags
                : [...tags, nextTag],
        )
        setTagDraft('')
    }

    const removeTag = (tagToRemove: string) => {
        updateTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const handleTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault()
            addTag(tagDraft)
        }
    }

    const visibilityLabel = isDraft ? 'Public Snippet' : 'Private Snippet'

    return (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Field className="gap-3">
                <FieldLabel className="dv-small font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                    TAGS & CATEGORIES
                </FieldLabel>
                <div className="rounded-xl border border-border bg-secondary p-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 dv-small font-semibold text-primary transition-colors hover:bg-primary/20"
                            >
                                {tag}
                                <HiX className="text-xs" />
                            </button>
                        ))}
                        <input
                            value={tagDraft}
                            onChange={(event) => setTagDraft(event.target.value)}
                            onKeyDown={handleTagKeyDown}
                            onBlur={() => addTag(tagDraft)}
                            placeholder="Add tag..."
                            className="min-w-32 flex-1 border-0 bg-transparent px-2 py-2 dv-body text-foreground outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 dv-small font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <span>SUGGESTIONS:</span>
                    {SUGGESTIONS.map((suggestion) => (
                        <button
                            key={suggestion}
                            type="button"
                            onClick={() => addTag(suggestion)}
                            className="rounded-full border border-border bg-secondary px-3 py-1.5 dv-small text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </Field>

            <Field className="gap-3">
                <FieldLabel className="dv-small font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                    VISIBILITY & PERMISSIONS
                </FieldLabel>
                <button
                    type="button"
                    onClick={() =>
                        setValue('isDraft', !isDraft, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                        })
                    }
                    className="flex items-center justify-between gap-4 rounded-[12px] border border-border bg-secondary px-4 py-4 text-left transition-colors duration-150 ease-out hover:border-primary/40"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <HiOutlineGlobeAlt className="text-xl" />
                        </div>
                        <div>
                            <p className="dv-h3 text-foreground">
                                {visibilityLabel}
                            </p>
                            <p className="dv-body text-muted-foreground">
                                {isDraft
                                    ? 'Accessible by everyone in your organization'
                                    : 'Only visible to you and your team'}
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex h-9 w-16 items-center rounded-full border border-border p-1 transition-colors ${
                            isDraft ? 'bg-primary' : 'bg-muted'
                        }`}
                    >
                        <span
                            className={`size-7 rounded-full bg-white shadow-lg transition-transform ${
                                isDraft ? 'translate-x-7' : 'translate-x-0'
                            }`}
                        />
                    </div>
                </button>
            </Field>
        </div>
    )
}
