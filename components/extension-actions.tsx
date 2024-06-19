import {
  ActivityLogIcon,
  CardStackIcon,
  CaretSortIcon,
  Pencil2Icon
} from "@radix-ui/react-icons"
import { useExtension } from "contexts/extension-context"
import { useCopyToClipboard } from "lib/hooks/useCopyToClipboard"
import { CheckCheckIcon, CopyIcon, MessageCircle } from "lucide-react"

import { Button } from "./button"
import { CollapsibleTrigger } from "./collapsible"
import { TooltipWrapper } from "./tooltip-wrapper"

export default function ExtensionActions() {
  const {
    setExtensionCurrentPanel,
    extensionCurrentPanel,
    extensionOpen,
    setExtensionIsOpen
  } = useExtension()

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  function copyVideoUrl() {
    if (!isCopied) {
      return copyToClipboard(window.location.href)
    }
  }

  return (
    <div className="border border-zinc-200 rounded-md flex items-center justify-between p-2.5 px-3 dark:bg-[#0f0f0f] dark:text-white dark:border-zinc-800">
      <CardStackIcon className="w-4 h-4 opacity-60  text-white" />
      <div className="flex justify-center items-center space-x-2">
        <div className="flex -space-x-1">
          <Button
            variant="outline"
            onClick={() => {
              setExtensionCurrentPanel("Summary")
              if (!extensionOpen) {
                setExtensionIsOpen(true)
              }
            }}
            className="rounded-r-none focus:z-10 bg-transparent space-x-2">
            <Pencil2Icon className="w-4 h-4 opacity-60 space-x-2 items-center text-white" />
            <span className="text-white opacity-90">Summary</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setExtensionCurrentPanel("Transcript")
              if (!extensionOpen) {
                setExtensionIsOpen(true)
              }
            }}
            className="rounded-r-none focus:z-10 bg-transparent space-x-2">
            <ActivityLogIcon className="w-4 h-4 opacity-60 space-x-2 items-center text-white" />

            <span className="text-white">Transcript</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setExtensionCurrentPanel("Chat")
              if (!extensionOpen) {
                setExtensionIsOpen(true)
              }
            }}
            className="rounded-r-none focus:z-10 bg-transparent space-x-2">
            <MessageCircle className="w-4 h-4 opacity-60 space-x-2 items-center text-white" />

            <span className="text-white">Chat</span>
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <TooltipWrapper text={"Copy Video Url"}>
          <Button variant="outline" size="icon" onClick={copyVideoUrl}>
            {isCopied ? (
              <CheckCheckIcon className="h-4 w-4 text-white"></CheckCheckIcon>
            ) : (
              <CopyIcon className="h-4 w-4 text-white"></CopyIcon>
            )}
          </Button>
        </TooltipWrapper>

        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon">
            <CaretSortIcon className="h-5 w-5 text-white" />
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
  )
}
