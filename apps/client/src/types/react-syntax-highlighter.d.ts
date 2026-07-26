declare module 'react-syntax-highlighter' {
  import type { ComponentType, PropsWithChildren } from 'react'

  export const Prism: ComponentType<PropsWithChildren<Record<string, unknown>>>
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const vscDarkPlus: Record<string, unknown>
}
