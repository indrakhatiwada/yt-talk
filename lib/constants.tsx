import { PencilIcon } from "lucide-react"

export type Model = {
  value: string
  label: string
  content: string
  icon?: any
}

export type Prompt = {
  value: string
  label: string
  content: string
}

export const models: Model[] = [
  {
    value: "default",
    label: "GPT-3.5",
    content: "gpt-3.5-turbo",
    icon: <PencilIcon className="h-4 w-4 opacity-60 text-white" />
  },
  {
    value: "gpt-4",
    label: "GPT-4",
    content: "OpenAI's GPT-4 model",
    icon: <PencilIcon className="h-4 w-4 opacity-60 text-white" />
  }
]
