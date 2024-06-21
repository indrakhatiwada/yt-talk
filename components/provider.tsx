import { ExtensionProvider } from "contexts/extension-context";
import { SummaryProvider } from "contexts/summary-context"

interface ExtensionProviderProps {
  children: React.ReactNode
}

export default function Providers({ children }: ExtensionProviderProps) {
  return (
    <ExtensionProvider>
      <SummaryProvider>{children}</SummaryProvider>
    </ExtensionProvider>
  )
}