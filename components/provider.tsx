import { ExtensionProvider } from "contexts/extension-context"

interface ExtensionProviderProps {
  children: React.ReactNode
}

export default function Providers({ children }: ExtensionProviderProps) {
  return <ExtensionProvider>{children}</ExtensionProvider>
}
