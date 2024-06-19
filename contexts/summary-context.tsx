import type { Model, Prompt } from "lib/constants"
import { createContext, useContext } from "react"

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
