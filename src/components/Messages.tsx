import {type Message as TMessage} from "ai/react" 
import { Message } from "./Message"
import {MessageSquare} from "lucide-react"

interface MessagesProps{
  messages: TMessage[]

}

export const Messages = ({messages}: MessagesProps) =>{
  return(
    <div className="flex max-h-[calc(100vh - 3.5rem - 7rem)] flex flex-col overflow-y-auto">
      {messages.length ? messages.map((message, i) => (
        <Message key={i}  content={message.content} isUserMessage={message.role === "user"} /> 
      )) : (<div className="flex flex-col items-center h-[90vh] justify-center gap-2 ">
              <MessageSquare className="size-8 text-blue-500 justify-center align-items:center"/>
              <h3 className="font-semibold text-xl text-white justify-center align-items:center">
                Everything's ready!
              </h3>
              <p className="text-zinc-500 text-sm">
                Ask a question to get started!
              </p>
      </div>)}
    </div>
  )
}