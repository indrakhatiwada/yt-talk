import React, { createContext, useContext, useState } from "react"

interface ExtensionState {
  extensionContainer: any
  extensionOpen: boolean
  extensiontheme: string | null
  extensionLoading: boolean
  extensionCurrentPanel: string
  extensionVideoId: string
  extensionData: any
}

const initialState: ExtensionState = {
  extensionContainer: null,
  extensionOpen: false,
  extensiontheme: null,
  extensionLoading: false,
  extensionCurrentPanel: "Summary",
  extensionVideoId: "",
  extensionData: null
}

interface ExtensionActions {
  setExtensionContainer: (container: any) => void
  setExtensionIsOpen: (isOpen: boolean) => void
  setExtensionTheme: (theme: string | null) => void
  setExtensionLoading: (loading: boolean) => void
  setExtensionCurrentPanel: (panel: string) => void
  setExtensionVideoId: (videoId: string) => void
  setExtensionData: (data: any) => void
  resetExtension: () => void
}

interface ExtensionContextType extends ExtensionState, ExtensionActions {}

const ExtensionContext = createContext<ExtensionContextType | undefined>(
  undefined
)

export function useExtension() {
  const context = useContext(ExtensionContext)

  if (!context) {
    throw new Error("useContext must be used within Extension Provider")
  }

  return context
}

interface ExtensionProviderProps {
  children: React.ReactNode
}

export function ExtensionProvider({ children }: ExtensionProviderProps) {
  const [extensionContainer, setExtensionContainer] = useState<any>(
    initialState.extensionContainer
  )
  const [extensionOpen, setExtensionIsOpen] = useState<boolean>(
    initialState.extensionOpen
  )
  const [extensiontheme, setExtensionTheme] = useState<string | null>(
    initialState.extensiontheme
  )
  const [extensionLoading, setExtensionLoading] = useState<boolean>(
    initialState.extensionLoading
  )
  const [extensionCurrentPanel, setExtensionCurrentPanel] = useState<string>(
    initialState.extensionCurrentPanel
  )
  const [extensionVideoId, setExtensionVideoId] = useState<string>(
    initialState.extensionVideoId
  )
  const [extensionData, setExtensionData] = useState<any>(
    initialState.extensionData
  )

  //reset extension

  function resetExtension() {
    setExtensionContainer(initialState.extensionContainer)
    setExtensionIsOpen(initialState.extensionOpen)
    setExtensionTheme(initialState.extensiontheme)
    setExtensionLoading(initialState.extensionLoading)
    setExtensionCurrentPanel(initialState.extensionCurrentPanel)
    setExtensionVideoId(initialState.extensionVideoId)
    setExtensionData(initialState.extensionData)
  }

  const value = {
    extensionContainer,
    extensionOpen,
    extensiontheme,
    extensionLoading,
    extensionCurrentPanel,
    extensionVideoId,
    extensionData,
    setExtensionContainer,
    setExtensionIsOpen,
    setExtensionTheme,
    setExtensionLoading,
    setExtensionCurrentPanel,
    setExtensionVideoId,
    setExtensionData,
    resetExtension
  }

  return (
    <ExtensionContext.Provider value={value}>
      {children}
    </ExtensionContext.Provider>
  )
}
