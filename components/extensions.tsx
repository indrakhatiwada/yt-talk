import { get } from "http"
import { Collapsible } from "@radix-ui/react-collapsible"
import { useExtension } from "contexts/extension-context"
import { useEffect } from "react"
import { getVideoData } from "utils/functions"

export default function Extension() {
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

        console.log("Data")
        console.log(data)

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

  return (
    <main className="antialiased w-full mb-3 z-10">
      <div className="w-full">
        <Collapsible className="space-y-3">
          <h1 className="text-white">Extension Actions</h1>
        </Collapsible>
      </div>
    </main>
  )
}
