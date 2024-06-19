import { Collapsible } from "@radix-ui/react-collapsible"
import { useExtension } from "contexts/extension-context"
import { useEffect, useRef } from "react"
import { getVideoData } from "utils/functions"

import { CollapsibleContent } from "./collapsible"
import ExtensionActions from "./extension-actions"
import ExtensionPanels from "./extensionPanel"

export default function Extension() {
  const ref = useRef<HTMLDivElement>(null)

  const {
    extensionContainer,
    extensionCurrentPanel,
    extensionData,
    extensionLoading,
    extensionOpen,
    extensionVideoId,
    extensiontheme,
    resetExtension,
    setExtensionContainer,
    setExtensionCurrentPanel,
    setExtensionData,
    setExtensionIsOpen,
    setExtensionLoading,
    setExtensionTheme,
    setExtensionVideoId
  } = useExtension()

  //change video Id

  useEffect(() => {
    const getVideoID = () => {
      return new URLSearchParams(window.location.search).get("v")
    }

    const fetchVideoData = async () => {
      const id = getVideoID()

      if (id && id !== extensionVideoId) {
        setExtensionVideoId(id)
        setExtensionLoading(true)

        const data = await getVideoData(id)
        setExtensionData(data)
        setExtensionLoading(false)
      }
    }
    fetchVideoData()

    const interval = setInterval(fetchVideoData, 2000)
    return () => clearInterval(interval)
  }, [extensionVideoId])

  useEffect(() => {
    const getCssvariable = (name: string) => {
      const rootStyles = getComputedStyle(document.documentElement)
      return rootStyles.getPropertyValue(name).trim()
    }

    const backgroundColor = getCssvariable("(--yt-spec-base-background")

    console.log(backgroundColor, "color")

    if (backgroundColor === "#fff") {
      setExtensionTheme("light")
    } else {
      setExtensionTheme("dark")
    }
  }, [])

  if (!extensiontheme) return null

  console.log({ extensionOpen })

  return (
    <main ref={setExtensionContainer} className="antialiased w-full mb-3 z-10">
      <div className="w-full">
        <Collapsible
          open={extensionOpen}
          onOpenChange={setExtensionIsOpen}
          className="space-y-3">
          <ExtensionActions />
          <CollapsibleContent className="w-full h-fit max-h-[500px] border border-zinc-200 rounded-md overflow-auto">
            <ExtensionPanels />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </main>
  )
}
