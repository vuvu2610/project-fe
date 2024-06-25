import { useEffect, useRef, useState } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import ChatGptImg from "../assets/images/chatGpt.png";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import Markdown from 'react-markdown'

interface ChatMessageProps {
    isUser: boolean;
    message: string;
}

function ChatGpt() {
    const chatRef = useRef<HTMLDivElement>(null);
    const chatContentRef = useRef<HTMLDivElement>(null);

    const [isChatContentVisible, setIsChatContentVisible] = useState(false);
    const [listMessages, setListMessages] = useState<ChatMessageProps[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const apiUrl = process.env.REACT_APP_RUNAI_URL || "";
    const apiToken = process.env.REACT_APP_RUNAI_TOKEN || "";

    const instance = axios.create({
        baseURL: apiUrl,
        headers: {
            'Authorization': 'Bearer ' + apiToken,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        chatContentRef.current?.scrollTo(0, chatContentRef.current.scrollHeight);
    }, [listMessages]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const toggleChatContent = () => {
        setIsChatContentVisible(!isChatContentVisible);
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (inputValue === "" || isLoading) return;
        setIsLoading(true);
        const userMessage: ChatMessageProps = {
            isUser: true,
            message: inputValue
        };
        setListMessages(currentMessages => [...currentMessages, userMessage]);
        setInputValue("");
        try {
            const response = await instance.post("/chat/completions", {
                model: "gpt-4o",
                messages: [
                    {
                        "role": "system",
                        "content": inputValue
                    }
                ]
            });
            const botMessage: ChatMessageProps = {
                isUser: false,
                message: response.data.choices[0].message.content
            };
            setListMessages(currentMessages => [...currentMessages, botMessage]);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const ChatMessage = (prop: ChatMessageProps) => (
        <div className="flex items-start gap-2.5">
            {!prop.isUser && <img className="w-8 h-8" src={ChatGptImg} alt="gpt" />}
            <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">{prop.isUser ? "User" : "SEEDLING AI"}</span>
                    <span className="text-sm font-normal text-gray-500">11:46</span>
                </div>
                <Markdown className={"text-sm font-normal py-2 text-gray-900 dark:text-white"}>{prop.message}</Markdown>
            </div>
            {prop.isUser && <FaUserAlt size={30} />}
        </div>
    );

    return (
        <div className="fixed bottom-10 right-28 rounded-full bg-slate-100 z-10">
            <div ref={chatRef} className="w-20 h-20 flex items-center justify-center cursor-pointer select-none" onClick={toggleChatContent}>
                <IoChatbubblesSharp size={34} />
            </div>
            <div

                className={`w-80 h-96 border bg-slate-200 rounded-md shadow-sm absolute bottom-28 -right-20 ${isChatContentVisible ? "opacity-100" : "opacity-0"}
                 flex flex-col gap-2`}
                style={{
                    transition: "opacity 0.5s, transform 0.5s",
                    transform: `translateY(${isChatContentVisible ? "0" : "50%"}) scale(${isChatContentVisible ? "1" : "0.1"})`
                }}
            >
                <div className="flex-1 border-b border-gray-400 p-4 overflow-auto gap-4 flex flex-col scroll-smooth" ref={chatContentRef}>
                    {listMessages.length === 0 ?
                        <div className="flex justify-center items-center flex-col gap-4 flex-1">
                            <img className="w-8 h-8" src={ChatGptImg} alt="gpt" />
                            <p>Tôi có thể giúp gì cho bạn</p>
                        </div> : listMessages.map((msg, index) => (
                            <ChatMessage key={index} isUser={msg.isUser} message={msg.message} />
                        ))}
                </div>
                {isLoading && <div className="flex justify-center items-center">...loading</div>}
                <div className="p-2 flex gap-2">
                    <input type="text" className="w-3/4 px-2" onChange={handleInputChange} value={inputValue} onKeyDown={handleKeyDown} />
                    <button className={`flex-1 py-2.5 px-5 text-sm font-medium rounded-lg border ${isLoading ? "cursor-not-allowed bg-slate-600" : "cursor-pointer text-gray-900 focus:outline-none bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700"}`}
                        onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatGpt;