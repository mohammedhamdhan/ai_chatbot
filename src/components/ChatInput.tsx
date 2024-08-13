"use client";

import { Button, Textarea } from "@nextui-org/react"
import { Send } from "lucide-react"
import { type useChat } from "ai/react"

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"]
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"]
type SetInput = ReturnType<typeof useChat>["setInput"]

interface ChatInputPromts {
  input: string
  handleInputChange: HandleInputChange
  handleSubmit: HandleSubmit
  setInput: SetInput
}

export const ChatInput = ({ input, handleInputChange, handleSubmit, setInput }: ChatInputPromts) => {
  return (
    <div className="z-10 bg-zinc-900 fixed bottom-0 left-0 w-full">
      <div className="flex flex-row items-center gap-2 max-w-screen-md mx-auto">
        <form onSubmit={handleSubmit} className="relative flex flex-grow items-center">
          <Textarea
            minRows={1}
            maxRows={4}
            autoFocus
            onChange={handleInputChange}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
                setInput("")
              }
            }}
            placeholder="Enter your question..."
            className="pl-4 pr-12 py-2 resize-none border-none bg-zinc-800 hover:bg-zinc-900 rounded-full text-base flex-grow"
          />
          <Button
            size="md"
            type="submit"
            className="absolute z-10 border-none bg-transparent right-4"
          >
            <Send className="size-5 text-gray-400" />
          </Button>
        </form>
      </div>
    </div>
  )
}
