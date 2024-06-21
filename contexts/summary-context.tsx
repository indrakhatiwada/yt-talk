import { models, prompts, type Model, type Prompt } from "lib/constants"
import { createContext, useContext, useEffect, useState } from "react"

import { usePort } from "@plasmohq/messaging/hook"

import { useExtension } from "./extension-context"

// Define the interface for the context
interface SummaryContext {
  summaryModel: Model
  setSummaryModel: (model: Model) => void
  summaryPrompt: Prompt
  setSummaryPrompt: (prompt: Prompt) => void
  summaryContent: string | null
  setSummaryContent: (content: string | null) => void
  summaryIsError: boolean
  setSummaryIsError: (isError: boolean) => void
  summaryIsGenerating: boolean
  setSummaryIsGenerating: (isGenerating: boolean) => void
  generateSummary: (e: any) => void
}

interface SummaryProviderProps {
  children: React.ReactNode
}
// Create the context with an initial value of undefined
const SummaryContext = createContext<SummaryContext | undefined>(undefined)

// Custom hook to use the SummaryContext
export function useSummary() {
  const context = useContext(SummaryContext)
  if (!context) {
    throw new Error("useSummary must be used within a SummaryProvider")
  }
  return context
}

export const SummaryProvider = ({ children }: SummaryProviderProps) => {
  const [summaryModel, setSummaryModel] = useState<Model>(models[0])
  const [summaryPrompt, setSummaryPrompt] = useState<Prompt>(prompts[0])
  const [summaryContent, setSummaryContent] = useState<string | null>(null)
  const [summaryIsError, setSummaryIsError] = useState<boolean>(false)
  const [summaryIsGenerating, setSummaryIsGenerating] = useState<boolean>(false)
  //this is calling the background worker we created in src/background/ports
  const port = usePort("completion")

  const { extensionData, extensionLoading } = useExtension()

  async function generateSummary(e: any) {
    e.preventDefault()

    if (summaryContent !== null) {
      setSummaryContent(null)
    }
    setSummaryIsGenerating(true)

    setSummaryIsError(false)

    port.send({
      prompt: summaryPrompt.content,
      model: summaryModel.content,
      context: extensionData
    })
  }

  useEffect(() => {
    setSummaryContent(null)
    setSummaryIsGenerating(false)
    setSummaryIsError(false)
  }, [extensionLoading])

  const value = {
    summaryModel,
    setSummaryModel,
    summaryPrompt,
    setSummaryPrompt,
    summaryContent,
    setSummaryContent,
    summaryIsError,
    setSummaryIsError,
    summaryIsGenerating,
    setSummaryIsGenerating,
    generateSummary
  }

  return (
    <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
  )
}
