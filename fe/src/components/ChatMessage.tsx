import { FaUserAlt } from "react-icons/fa"
import Markdown from "react-markdown"
import { ChatHistory } from '../types/types'
import ChatGptImg from "../assets/images/chatGpt.png"


function ChatMessage(props: ChatHistory) {
    console.log(props)

    return (
        <div className="flex items-start gap-2.5">
        {props.role === "assistant" && <img className="w-8 h-8" src={ChatGptImg} alt="gpt" />}
        <div className="flex flex-col w-full max-w-[320px] leading-1.5">
            <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold">{props.role === "user" ? "User" : "SEEDLING AI"}</span>
                <span className="text-sm font-normal text-gray-500">11:46</span>
            </div>
            <Markdown className={"text-sm font-normal py-2 text-gray-900 dark:text-white"}>{props.content}</Markdown>
        </div>
        {props.role === "user" && <FaUserAlt size={30} />}
    </div>
    )
}

export default ChatMessage
