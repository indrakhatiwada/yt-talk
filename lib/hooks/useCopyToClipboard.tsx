import { useState } from "react"

export interface useCopyToClipBoardProps {
  timeout?: number
}

export function useCopyToClipboard({
  timeout = 2000
}: useCopyToClipBoardProps) {
  const [isCopied, setCopied] = useState(false)

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return
    }

    if (!value) {
      return
    }

    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, timeout)
    })
  }

  return { isCopied, copyToClipboard }
}
