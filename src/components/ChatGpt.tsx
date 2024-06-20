import { useRef, useState } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import ChatGptImg from "../assets/images/chatGpt.png";
import { FaUserAlt } from "react-icons/fa";

function ChatGpt() {
    const chatRef = useRef<HTMLDivElement>(null);
    const chatContentRef = useRef<HTMLDivElement>(null);
    const [isChatContentVisible, setIsChatContentVisible] = useState(false);

    const toggleChatContent = () => {
        setIsChatContentVisible(!isChatContentVisible);
    };

    return (
        <div className="fixed bottom-10 right-28 rounded-full bg-slate-100">
            <div ref={chatRef} className="w-20 h-20 flex items-center justify-center cursor-pointer select-none" onClick={toggleChatContent}>
                <IoChatbubblesSharp size={34}/>
                </div>
            <div
                ref={chatContentRef}
                className={`w-80 h-96 border bg-slate-200 rounded-md shadow-sm absolute bottom-28 -right-20 ${isChatContentVisible ? "opacity-100" : "opacity-0"}
                 flex flex-col gap-2`}
                style={{
                    transition: "opacity 0.5s, transform 0.5s",
                    transform: `translateY(${isChatContentVisible ? "0" : "50%"}) scale(${isChatContentVisible ? "1" : "0.1"})`
                }}
            >
                <div className="flex-1 border-b border-gray-400 p-4 overflow-auto gap-4 flex flex-col">
                    <div className="flex items-start gap-2.5">
                        <img className="w-8 h-8" src={ChatGptImg} alt="gpt" />
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold">Chat GPT</span>
                                <span className="text-sm font-normal">11:46</span>
                            </div>
                            <p className="text-sm font-normal py-2 text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-gray-900">Chat GPT</span>
                                <span className="text-sm font-normal text-gray-500 ">11:46</span>
                            </div>
                            <p className="text-sm font-normal py-2 text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
                        </div>
                        <FaUserAlt size={30}/>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <img className="w-8 h-8" src={ChatGptImg} alt="gpt" />
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold">Chat GPT</span>
                                <span className="text-sm font-normal">11:46</span>
                            </div>
                            <p className="text-sm font-normal py-2 text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-gray-900">Chat GPT</span>
                                <span className="text-sm font-normal text-gray-500 ">11:46</span>
                            </div>
                            <p className="text-sm font-normal py-2 text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
                        </div>
                        <FaUserAlt size={30}/>
                    </div>
                </div>
                <div className="p-2 flex gap-2">
                    <input type="text" className="w-3/4 px-2" />
                    <button className="flex-1 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatGpt;