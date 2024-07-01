import { useEffect, useRef, useState } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import ChatGptImg from "../assets/images/chatGpt.png"
import axios from "axios";
import ChatMessage from "./ChatMessage";
import { ChatHistory } from '../types/types';

function ChatGpt() {
    const [isChatContentVisible, setIsChatContentVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const chatContentRef = useRef<HTMLDivElement>(null);

    const apiUrl = process.env.REACT_APP_RUNAI_URL || "";
    const apiToken = process.env.REACT_APP_RUNAI_TOKEN || "";

    const instance = axios.create({
        baseURL: apiUrl,
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        chatContentRef.current?.scrollTo(0, chatContentRef.current.scrollHeight);
    }, [chatHistory]);

    const toggleChatContent = () => setIsChatContentVisible(prev => !prev);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    const handleSendMessage = async () => {
        if (inputValue.trim() === "" || isLoading) return;
        setIsLoading(true);
        const userHistoryMessage: ChatHistory = { role: "user", content: inputValue };

        setChatHistory(prev => [...prev, userHistoryMessage]);
        setInputValue("");

        try {
            const response = await instance.post("/chat/completions", {
                model: "gpt-4o",
                messages: [
                    {
                        "role": "system",
                        "content": "Bạn là trợ lý ảo về lĩnh vực mua bán giống cây trồng và luôn sẵn sàng giúp đỡ."
                    },
                    ...chatHistory,
                    userHistoryMessage
                ]
            });
            const botHistoryMessage: ChatHistory = response.data.choices[0].message;
            setChatHistory(prev => [...prev, botHistoryMessage]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-10 right-28 rounded-full bg-slate-200 z-10 shadow-lg">
            <div className="w-20 h-20 flex items-center justify-center cursor-pointer select-none" onClick={toggleChatContent}>
                <IoChatbubblesSharp size={34} />
            </div>
            <div className={`w-80 h-96 border bg-slate-200 rounded-md shadow-sm absolute bottom-28 -right-20 ${isChatContentVisible ? "opacity-100" : "opacity-0"} flex flex-col gap-2`}
                style={{
                    transition: "opacity 0.5s, transform 0.5s",
                    transform: `translateY(${isChatContentVisible ? "0" : "50%"}) scale(${isChatContentVisible ? "1" : "0.1"})`
                }}>
                <div className="flex-1 border-b border-gray-400 p-4 overflow-auto gap-4 flex flex-col scroll-smooth" ref={chatContentRef}>
                    {chatHistory.length === 0 ? <div className="flex justify-center items-center flex-col gap-4 flex-1">
                        <img className="w-8 h-8" src={ChatGptImg} alt="gpt" />
                        <p>Tôi có thể giúp gì cho bạn</p>
                    </div> : chatHistory.map((msg, index) => <ChatMessage key={index} {...msg} />)}
                </div>
                <div className="p-2 flex gap-2">
                    <input type="text" className="w-3/4 px-2 border rounded" onChange={handleInputChange} value={inputValue} onKeyDown={handleKeyDown} />
                    <button className={`flex-1 py-2.5 px-5 text-sm font-medium rounded-lg border focus:outline-none ${isLoading ? "cursor-not-allowed" : "cursor-pointer text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700"}`}
                        onClick={handleSendMessage}>{isLoading ? <AiOutlineLoading size={22} className="animate-spin" /> : "Send"}</button>
                </div>
            </div>
        </div>
    );
}

export default ChatGpt;