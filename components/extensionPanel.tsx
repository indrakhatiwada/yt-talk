import { useExtension } from "contexts/extension-context";



import Summary from "./Summary"

export default function ExtensionPanels() {
  const { extensionCurrentPanel } = useExtension()

  return (
    <div className="">
      {extensionCurrentPanel === "Summary" && <Summary />}
      {extensionCurrentPanel === "Transcript" && (
        <h1 className="text-white">Transcript</h1>
      )}
      {extensionCurrentPanel === "Chat" && <h1 className="text-white">Chat</h1>}
    </div>
  )
}