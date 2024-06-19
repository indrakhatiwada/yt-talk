import { useExtension } from "contexts/extension-context"

export default function ExtensionPanels() {
  const { extensionCurrentPanel } = useExtension()

  return (
    <div className="">
      {extensionCurrentPanel === "Summary" && (
        <h1 className="text-white">Summary</h1>
      )}
      {extensionCurrentPanel === "Transcript" && (
        <h1 className="text-white">Transcript</h1>
      )}
      {extensionCurrentPanel === "Chat" && <h1 className="text-white">Chat</h1>}
    </div>
  )
}
