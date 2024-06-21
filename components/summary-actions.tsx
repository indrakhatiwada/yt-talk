import { ReloadIcon } from "@radix-ui/react-icons"
import { useSummary } from "contexts/summary-context"
import { models, prompts, type Model } from "lib/constants"
import { useCopyToClipboard } from "lib/hooks/useCopyToClipboard"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "./button"
import { TooltipWrapper } from "./tooltip-wrapper"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"

export default function SummaryActions() {
  const {
    summaryPrompt,
    summaryIsGenerating,
    summaryModel,
    summaryContent,
    setSummaryPrompt,
    setSummaryModel,
    generateSummary
  } = useSummary()

  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 200 })

  function copySummary() {
    if (isCopied || !summaryContent || summaryIsGenerating) return
    copyToClipboard(summaryContent)
  }
  return (
    <div className="flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white pb-3 pt-3 px-3">
      <Select
        value={summaryModel.value}
        onValueChange={(value) =>
          setSummaryModel(models.find((model) => model.value === value))
        }>
        <SelectTrigger className="w-fit space-x-2 ">
          <SelectValue placeholder="Model"></SelectValue>
        </SelectTrigger>
        <SelectContent className="flex flex-row p-3 ">
          {models.map((model: Model) => (
            <SelectItem key={model.value} value={model.value}>
              <div className="flex flex-row items-">
                <div className="mr-">{model.icon}</div>
                {model.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-row space-x-2">
        <TooltipWrapper text={"Generate Summary"}>
          <Button
            variant="outline"
            size="icon"
            onClick={generateSummary}
            disabled={summaryIsGenerating}>
            <ReloadIcon className="h-4 w-4" />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper text={"Copy Summary"}>
          <Button
            variant="outline"
            size="icon"
            onClick={copySummary}
            disabled={summaryIsGenerating}>
            {isCopied ? (
              <CheckIcon className="h-4 w-4 opacity-60" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </TooltipWrapper>
        <Select
          value={summaryPrompt.value}
          onValueChange={(value) =>
            setSummaryPrompt(prompts.find((prompt) => prompt.value === value))
          }>
          <SelectTrigger className="w-fit space-x-2 ">
            <SelectValue placeholder="prompt"></SelectValue>
          </SelectTrigger>
          <SelectContent className="flex flex-row p-3 ">
            {prompts.map((prompt: prompt) => (
              <SelectItem key={prompt.value} value={prompt.value}>
                <div className="flex flex-row items-">
                  <div className="mr-">{prompt.icon}</div>
                  {prompt.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
