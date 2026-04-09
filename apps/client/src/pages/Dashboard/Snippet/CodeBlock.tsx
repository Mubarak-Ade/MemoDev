import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
  code: string
  language: string
  className?: string
}

export default function CodeBlock({ code, language, className }: Props) {

  const copyCode = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code)
    }
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden border border-border bg-[#111] ${className ?? ''}`}
    >

      <button
        onClick={copyCode}
        className="absolute right-4 top-4 z-10 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      >
        Copy
      </button>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        customStyle={{
            backgroundColor: "transparent",
            margin: 0,
            padding: "24px",
            height: "100%",
            minHeight: "100%",
            fontSize: "0.9rem"
        }}
      >
        {code}
      </SyntaxHighlighter>

    </div>
  )
}
