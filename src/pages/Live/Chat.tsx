import React, { useState, useEffect, useRef } from "react";

interface ChatProps {
  ws: React.MutableRefObject<WebSocket | null>;
}

const Chat: React.FC<ChatProps> = ({ ws }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ws.current) {
      ws.current.onmessage = (message) => {
        console.log(ws.current);

        try {
          const payload = JSON.parse(message.data);
          if (payload.CHAT) {
            const chatMessage = payload.CHAT;
            setMessages((prevMessages) => [...prevMessages, chatMessage]);
          }
        } catch (e) {
          console.error("Error parsing JSON:", e);
        }
      };
    }
  }, [ws]);

  const sendMessage = () => {
    if (input.trim() !== "" && ws.current) {
      const payload = { CHAT: input };
      ws.current.send(JSON.stringify(payload));
      setInput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className="p-2 my-1 bg-white rounded shadow">
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border border-gray-300 rounded mr-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;