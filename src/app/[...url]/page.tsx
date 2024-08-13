import { ragChat } from "@/lib/rag-chat"
import { redis } from "@/lib/redis"
import { Component } from "react"
import { ChatWrapper } from "@/components/ChatWrapper"
import { cookies } from "next/headers"

interface PageProps{
  params: {
    url: string | string[] | undefined
  }
}

function recconstructurl({url}: {url:string[]}) {
  const decodedComponent = url.map((component) => decodeURIComponent(component))
  return decodedComponent.join('/')
}

const Page = async ({params}: PageProps) => {
  const sessionCookie = cookies().get("sessionId")?.value
  const reconstructedUrl = recconstructurl({url:params.url as string[]})

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "")

  console.log(params)

  const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

  const initialMessages = await ragChat.history.getMessages({amount: 10, sessionId})


 if (!isAlreadyIndexed){
  await ragChat.context.add( {
    type: "html" ,
    source: reconstructedUrl ,
    config: {chunkOverlap: 50, chunkSize: 200}
  })

  await redis.sadd("indexed-urls", reconstructedUrl)
 }
  
  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
}

export default Page