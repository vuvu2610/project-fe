import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { formatAMPM, nameTruncated } from "../../utils/helper";

interface Props {}

function Chat(props: Props) {
  const { messages, publish } = usePubSub("CHAT");
  const input = useRef<HTMLInputElement>(null);
  const listMessage = useRef<HTMLUListElement>(null);
  const meeting = useMeeting();

  const handleClick = () => {
    if (input.current) {
      const message = input.current.value;
      if (message.trim() !== "") {
        publish(message, { persist: true });
        input.current.value = "";
      }
    }
  };

  const scrollToBottom = () => {
    if (listMessage.current) {
      listMessage.current.scrollTop = listMessage.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="border-solid border-2 border-gray-500 p-5 rounded-md">
      <h1 className="text-lg uppercase">Phòng chat</h1>
      <ul ref={listMessage} className="flex flex-col gap-y-4 my-4 text-sm max-h-80 overflow-y-auto scroll-smooth">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <li key={index}>
              <h1>
                {nameTruncated(message.senderName, 15)}

                {meeting.localParticipant.id === message.senderId && (
                  <span className="bg-slate-400 p-1 px-2 ml-2 rounded-full text-[11px]">
                    Chủ phiên live
                  </span>
                )}
              </h1>
              <p>{message.message}</p>
              <h5 className="text-gray-400 text-sm">
                {formatAMPM(new Date(message.timestamp))}
              </h5>
            </li>
          ))
        ) : (
          <li className="text-gray-400 grid place-items-center p-10 gap-2">
            <FaMessage className="text-gray-300" size={60} />
            Hãy cùng nhau làm phiên live sôi động hơn nào !!!
          </li>
        )}
      </ul>

      <div className="flex">
        <input
          ref={input}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
          className="outline focus:outline-primary focus:outline-2 flex-1  p-2 outline-1 caret-primary rounded-lg outline-gray-400"
        />
        <button
          onClick={handleClick}
          className=" flex items-center justify-center gap-x-2 py-2 px-4 bg-gray-300 rounded-md ml-3 hover:bg-primary hover:text-white transition-all duration-300"
        >
          Gửi
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default Chat;
