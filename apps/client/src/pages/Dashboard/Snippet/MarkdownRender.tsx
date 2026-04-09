import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className }: Props) {
  return (
    <div className={`prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-li:text-muted-foreground ${className ?? ''}`}>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "")

            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              )
            }

            return (
              <code
                className="rounded-md border border-border bg-secondary px-1.5 py-0.5 text-sm text-foreground"
                {...props}
              >
                {children}
              </code>
            )
          },
          h1({ children }) {
            return <h1 className="dv-h1 text-foreground">{children}</h1>
          },
          h2({ children }) {
            return <h2 className="dv-h2 mt-8 text-foreground">{children}</h2>
          },
          p({ children }) {
            return <p className="dv-body text-muted-foreground">{children}</p>
          },
          ul({ children }) {
            return <ul className="space-y-2 text-muted-foreground">{children}</ul>
          },
          ol({ children }) {
            return <ol className="space-y-2 text-muted-foreground">{children}</ol>
          },
          li({ children }) {
            return <li className="text-muted-foreground">{children}</li>
          },
          pre({ children }) {
            return (
              <pre className="overflow-x-auto rounded-2xl border border-border bg-[#111] p-4">
                {children}
              </pre>
            )
          },
        }}
      >
        {content}

      </ReactMarkdown>

    </div>
  )
}
