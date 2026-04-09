import { FieldError } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { TabsContent } from '@/components/ui/tabs'
import type { SnippetFormInput } from '@/schema/snippet.schema'
import { javascript } from '@codemirror/lang-javascript'
import { markdown } from '@codemirror/lang-markdown'
import CodeMirror, { oneDark } from '@uiw/react-codemirror'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { HiCode, HiDocument } from 'react-icons/hi'

const LANGUAGE_OPTIONS = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Markdown', value: 'markdown' },
    { label: 'TSX', value: 'tsx' },
] as const

export const EditorTab = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<SnippetFormInput>()

    const explanation = useWatch({ control, name: 'explanation' }) ?? ''
    const code = useWatch({ control, name: 'code' }) ?? ''
    const language = useWatch({ control, name: 'language' }) ?? 'typescript'

    const editorPlaceholderClass =
        'pointer-events-none absolute left-6 top-6 text-sm text-muted-foreground'

    const codeExtensions =
        language === 'markdown'
            ? [markdown()]
            : language === 'javascript'
              ? [javascript()]
              : [javascript({ typescript: true, jsx: language === 'tsx' })]

    return (
        <TabsContent value="editor" className="m-0 p-0">
            <div className="grid min-h-[36rem] lg:grid-cols-2">
                <section className="border-b border-border lg:border-b-0 lg:border-r">
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                        <Label className="gap-3 text-[0.82rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                            <HiDocument className="text-muted-foreground" />
                            MARKDOWN EXPLANATION
                        </Label>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <button className="rounded-[8px] border border-border bg-background/40 px-2 py-1 text-xs font-semibold hover:border-border hover:text-foreground">
                                B
                            </button>
                            <button className="rounded-[8px] border border-border bg-background/40 px-2 py-1 text-xs font-semibold italic hover:border-border hover:text-foreground">
                                I
                            </button>
                            <button className="rounded-[8px] border border-border bg-background/40 px-2 py-1 text-xs font-semibold hover:border-border hover:text-foreground">
                                ⌘
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        {!explanation && (
                            <div className={editorPlaceholderClass}>
                                Describe why this snippet is useful and how to use it...
                            </div>
                        )}
                        <Controller
                            control={control}
                            name="explanation"
                            render={({ field }) => (
                                <CodeMirror
                                    value={field.value ?? ''}
                                    height="560px"
                                    extensions={[markdown()]}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    className="border-0"
                                    theme={oneDark}
                                />
                            )}
                        />
                    </div>
                    {errors.explanation && (
                        <div className="px-5 pb-4">
                            <FieldError>{errors.explanation.message}</FieldError>
                        </div>
                    )}
                </section>

                <section>
                    <div className="flex items-center justify-between border-b border-border px-5 py-3">
                        <Label className="gap-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            <HiCode className="text-muted-foreground" />
                            SYNTAX-HIGHLIGHTED CODE
                        </Label>
                        <Controller
                            control={control}
                            name="language"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-auto border-border bg-secondary text-sm font-medium uppercase tracking-wider text-primary shadow-none">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Language</SelectLabel>
                                            {LANGUAGE_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className="relative">
                        {!code && (
                            <div className={`${editorPlaceholderClass} font-mono text-base`}>
                                // Paste your code here...
                            </div>
                        )}
                        <Controller
                            control={control}
                            name="code"
                            render={({ field }) => (
                                <CodeMirror
                                    value={field.value ?? ''}
                                    height="560px"
                                    
                                    extensions={codeExtensions}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    className="border-0"
                                    theme={oneDark}
                                />
                            )}
                        />
                    </div>
                    {errors.code && (
                        <div className="px-5 pb-4">
                            <FieldError>{errors.code.message}</FieldError>
                        </div>
                    )}
                </section>
            </div>
        </TabsContent>
    )
}
