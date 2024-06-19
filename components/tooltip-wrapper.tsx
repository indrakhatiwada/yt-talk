import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./tooltip"

export function TooltipWrapper({ children, text }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {children}
          <TooltipContent className="dark:text-white text-white">
            {text}
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
